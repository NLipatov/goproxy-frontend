import React, { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle, faInfinity } from "@fortawesome/free-solid-svg-icons";

export function Plans() {
    const [currentPlan, setCurrentPlan] = useState<Plan | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [lastReceived, setLastReceived] = useState<Date | null>(null);

    const SOCKET_URL = "ws://localhost:3031/ws";

    const { lastMessage, readyState, getWebSocket } = useWebSocket(SOCKET_URL, {
        shouldReconnect: (closeEvent) => true,
        reconnectAttempts: 10,
        reconnectInterval: 5000,
    });

    useEffect(() => {
        if (lastMessage !== null) {
            try {
                const data = JSON.parse(lastMessage.data);
                if (data.error) {
                    setError(data.error);
                } else {
                    setError(null);
                    setCurrentPlan(data.plan);
                }
                setLastReceived(new Date());
            } catch (err) {
                console.error("Failed to parse WebSocket message:", err);
                setError("Failed to parse WebSocket message.");
                setLastReceived(new Date());
            }
        }
    }, [lastMessage]);

    const getStatus = () => {
        if (error) return "error";
        if (lastReceived) {
            const now = new Date();
            const diff = (now.getTime() - lastReceived.getTime()) / 1000;
            if (diff <= 15) return "active";
        }
        return "idle";
    };

    const status = getStatus();

    const formatBytes = (bytes: number) => {
        const units = ["Bytes", "KB", "MB", "GB", "TB"];
        let i = 0;
        while (bytes >= 1024 && i < units.length - 1) {
            bytes /= 1024;
            i++;
        }
        return { value: bytes.toFixed(2), unit: units[i] };
    };

    const calculateProgress = (used: number, total: number) => {
        return Math.min((used / total) * 100, 100).toFixed(2);
    };

    return (
        <div className="bg-zinc-900 text-white p-6 rounded-lg shadow-lg max-w-xl mx-auto space-y-6">
            <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold">Your Current Plan</h1>
                <span
                    className={`w-3 h-3 rounded-full 
                        ${
                        status === "active"
                            ? "bg-green-500 animate-pulse"
                            : status === "error"
                                ? "bg-red-500 animate-pulse"
                                : "bg-gray-500"
                    }
                    `}
                    aria-label={
                        status === "active"
                            ? "Data is up to date"
                            : status === "error"
                                ? "Error updating data"
                                : "No recent updates"
                    }
                    role="status"
                ></span>
            </div>

            <div className="space-y-4">
                {status === "active" && (
                    <p className="text-green-500">Data is up to date.</p>
                )}

                {error && (
                    <div className="flex items-center space-x-2 text-red-500">
                        <FontAwesomeIcon icon={faExclamationTriangle} size="lg" />
                        <p>{error}</p>
                    </div>
                )}

                {currentPlan && (
                    <>
                        <div className="bg-zinc-800 p-4 rounded-md shadow-inner">
                            <p className="text-green-500 font-bold">Plan Name:</p>
                            <p className="text-xl mt-2">{currentPlan.name}</p>
                        </div>

                        <div className="bg-zinc-800 p-4 rounded-md shadow-inner">
                            <p className="text-green-500 font-bold">Bandwidth:</p>
                            <div className="mt-4">
                                <div
                                    className="w-full h-6 rounded-full bg-gray-700 overflow-hidden relative"
                                    style={{
                                        boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.5)",
                                    }}
                                >
                                    <div
                                        className="h-full"
                                        style={{
                                            width: `${calculateProgress(
                                                currentPlan.limits.bandwidth.used,
                                                currentPlan.limits.bandwidth.total
                                            )}%`,
                                            background:
                                                "linear-gradient(90deg, rgba(34, 197, 94, 0.8), rgba(59, 130, 246, 0.8))",
                                            boxShadow: "0 0 15px rgba(34, 197, 94, 0.8)",
                                        }}
                                    ></div>
                                </div>
                                <p className="text-sm mt-2 text-gray-300">
                                    Used: {formatBytes(currentPlan.limits.bandwidth.used).value}{" "}
                                    {formatBytes(currentPlan.limits.bandwidth.used).unit} /{" "}
                                    {formatBytes(currentPlan.limits.bandwidth.total).value}{" "}
                                    {formatBytes(currentPlan.limits.bandwidth.total).unit}
                                </p>
                            </div>
                        </div>

                        <div className="bg-zinc-800 p-4 rounded-md shadow-inner">
                            <p className="text-green-500 font-bold">Connections:</p>
                            <p className="text-xl mt-2">
                                {currentPlan.limits.connections} connections
                            </p>
                        </div>

                        <div className="bg-zinc-800 p-4 rounded-md shadow-inner">
                            <p className="text-green-500 font-bold">Speed:</p>
                            <p className="text-xl mt-2 flex items-center">
                                {currentPlan.limits.speed === "unlimited" ? (
                                    <>
                                        <FontAwesomeIcon icon={faInfinity} className="mr-2" />
                                        Unlimited
                                    </>
                                ) : (
                                    currentPlan.limits.speed
                                )}
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
