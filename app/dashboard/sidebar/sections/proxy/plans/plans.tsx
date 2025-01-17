import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle, faInfinity } from "@fortawesome/free-solid-svg-icons";
import { usePlan } from "./hooks/usePlan";

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
    if (total === 0) return "0.00";
    return Math.min((used / total) * 100, 100).toFixed(2);
};

export function Plans() {
    const { currentPlan, error, status } = usePlan();

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

                {!currentPlan?.payload && !error && (
                    <p className="text-gray-400">No plan information available.</p>
                )}

                {currentPlan?.payload && (
                    <>
                        <div className="bg-zinc-800 p-4 rounded-md shadow-inner">
                            <p className="text-green-500 font-bold">Plan Name:</p>
                            <p className="text-xl mt-2">{currentPlan.payload.name}</p>
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
                                                currentPlan.payload.limits.bandwidth.used,
                                                currentPlan.payload.limits.bandwidth.total
                                            )}%`,
                                            background:
                                                "linear-gradient(90deg, rgba(34, 197, 94, 0.8), rgba(59, 130, 246, 0.8))",
                                            boxShadow: "0 0 15px rgba(34, 197, 94, 0.8)",
                                        }}
                                    ></div>
                                </div>
                            </div>
                            <p className="text-gray-300">
                                {currentPlan.payload.limits.bandwidth.isLimited ? (
                                    <>
                                        Used: {formatBytes(currentPlan.payload.limits.bandwidth.used).value}{" "}
                                        {formatBytes(currentPlan.payload.limits.bandwidth.used).unit} /{" "}
                                        {formatBytes(currentPlan.payload.limits.bandwidth.total).value}{" "}
                                        {formatBytes(currentPlan.payload.limits.bandwidth.total).unit}
                                    </>
                                ) : (
                                    <>
                                        <FontAwesomeIcon icon={faInfinity} className="mr-2" />
                                        Unlimited
                                    </>
                                )}
                            </p>
                        </div>

                        <div className="bg-zinc-800 p-4 rounded-md shadow-inner">
                            <p className="text-green-500 font-bold">Connections:</p>
                            <p className="text-gray-300">
                                {currentPlan.payload.limits.connections.isLimited ? (
                                    `Max Concurrent Connections: ${currentPlan.payload.limits.connections.maxConcurrentConnections}`
                                ) : (
                                    <>
                                        <FontAwesomeIcon icon={faInfinity} className="mr-2" />
                                        Unlimited
                                    </>
                                )}
                            </p>
                        </div>

                        <div className="bg-zinc-800 p-4 rounded-md shadow-inner">
                            <p className="text-green-500 font-bold">Speed:</p>
                            <p className="text-gray-300">
                                {currentPlan.payload.limits.speed.isLimited ? (
                                    `Max Speed: ${formatBytes(currentPlan.payload.limits.speed.maxBytesPerSecond).value} 
                                     ${formatBytes(currentPlan.payload.limits.speed.maxBytesPerSecond).unit}/s`
                                ) : (
                                    <>
                                        <FontAwesomeIcon icon={faInfinity} className="mr-2" />
                                        Unlimited
                                    </>
                                )}
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
