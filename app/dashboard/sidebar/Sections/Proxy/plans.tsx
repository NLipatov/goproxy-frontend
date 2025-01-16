import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

export function Plans() {
    const [currentPlan, setCurrentPlan] = useState<Plan | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const wsRef = useRef<WebSocket | null>(null);
    const reconnectTimer = useRef<NodeJS.Timeout | null>(null);
    const reconnectAttempts = useRef(0);
    const MAX_RECONNECT_ATTEMPTS = 10;

    const connectWebSocket = () => {
        if (wsRef.current) {
            console.log("WebSocket already connected.");
            return;
        }

        setLoading(true);
        const ws = new WebSocket("ws://localhost:3031/ws");
        wsRef.current = ws;

        ws.onopen = () => {
            console.log("WebSocket connection established.");
            setError(null);
            reconnectAttempts.current = 0;
        };

        ws.onmessage = (event) => {
            console.log("Received message:", event.data);
            try {
                const data = JSON.parse(event.data);
                if (data.error) {
                    console.error("Error from server:", data.error);
                    setError(data.error);
                } else {
                    setError(null);
                    setCurrentPlan(data.plan);
                }
            } catch (err) {
                console.error("Failed to parse WebSocket message:", err);
                setError("Failed to parse WebSocket message.");
            } finally {
                setLoading(false);
            }
        };

        ws.onerror = () => {
            setError("WebSocket error occurred.");
            setLoading(false);
        };

        ws.onclose = () => {
            wsRef.current = null;
            if (reconnectAttempts.current < MAX_RECONNECT_ATTEMPTS) {
                const delay = Math.min(1000 * 2 ** reconnectAttempts.current, 30000);
                reconnectTimer.current = setTimeout(() => {
                    reconnectAttempts.current++;
                    connectWebSocket();
                }, delay);
            } else {
                setError("Unable to reconnect to WebSocket server.");
            }
        };
    };

    useEffect(() => {
        connectWebSocket();
        return () => {
            if (wsRef.current) wsRef.current.close();
            if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
        };
    }, []);

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
            <h1 className="text-2xl font-bold">Your Current Plan</h1>

            <div className="space-y-4">
                {loading && (
                    <p className="text-yellow-500">Loading your plan...</p>
                )}

                {error && (
                    <div className="flex items-center space-x-2 text-yellow-400">
                        <FontAwesomeIcon icon={faExclamationTriangle} size="lg" />
                        <p>There are some issues updating the data. Retrying...</p>
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
                            <p className="text-xl mt-2">{currentPlan.limits.speed}</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
