import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle, faInfinity } from "@fortawesome/free-solid-svg-icons";
import { usageHook } from "./hooks/usageHook";
import type {ApiResponse} from "~/dto/apiResponse";
import type {Usage} from "./dto/usage"

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

const planExpirationDateString = (usage: ApiResponse<Usage> | null) => {
    if (usage?.payload === undefined || usage?.payload === null) {
        return "N/A"
    }

    const createdAtRaw = usage.payload.created_at;
    const createdAt = new Date(createdAtRaw);
    const expiresAt = new Date(createdAt);
    expiresAt.setDate(expiresAt.getDate() + usage.payload.duration_days);

    return expiresAt;
}

export function Usage() {
    const { usage, error, status } = usageHook();

    if ((usage?.error_code ?? 0) > 0 || error) {
        console.log(usage)
        return (
            <div className="bg-zinc-900 text-white p-6 rounded-lg shadow-lg max-w-xl mx-auto space-y-6">
                <h1 className="text-2xl font-bold">Your Current Plan Usage</h1>
                <div className="flex items-center space-x-2 text-red-500">
                    <FontAwesomeIcon icon={faExclamationTriangle} size="lg" />
                    <p>{usage?.error_message ?? ""}</p>
                    <p>{error ?? ""}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-zinc-900 text-white p-6 rounded-lg shadow-lg max-w-xl mx-auto space-y-6">
            <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold">Your Current Plan Usage</h1>
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
                <div className="bg-zinc-800 p-4 rounded-md shadow-inner">
                    <p className="text-green-500 font-bold">Plan Name:</p>
                    <p className="text-xl mt-2">{usage?.payload?.name}</p>
                </div>

                <div className="bg-zinc-800 p-4 rounded-md shadow-inner">
                    <p className="text-green-500 font-bold mb-2">Expires at:</p>
                    {(() => {
                        const planExpirationDate = planExpirationDateString(usage);
                        const formattedDate = planExpirationDate.toLocaleString(undefined, { dateStyle: "short", timeStyle: "short" });
                        const isExpired = planExpirationDate <= new Date();

                        return (
                            <div className={`flex flex-col gap-2 ${isExpired ? "text-red-500" : "text-gray-300"}`}>
                                <div className="flex items-center gap-2">
                                    {isExpired && <FontAwesomeIcon icon={faExclamationTriangle} size="lg" />}
                                    <p className="font-semibold">{isExpired ? "Expired" : formattedDate}</p>
                                    {isExpired && <p className="text-gray-400">{formattedDate}</p>}
                                </div>

                                {isExpired && (
                                    <a href="/dashboard/account/plans">
                                        <button className="border border-green-500 text-green-500 px-4 py-2 rounded hover:bg-green-500 hover:text-black transition-all duration-300">
                                            Renew / Buy Plan
                                        </button>
                                    </a>
                                )}
                            </div>
                        );
                    })()}
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
                                        usage?.payload?.limits?.bandwidth?.used ?? 0,
                                        usage?.payload?.limits?.bandwidth?.total ?? 0
                                    )}%`,
                                    background:
                                        "linear-gradient(90deg, rgba(34, 197, 94, 0.8), rgba(59, 130, 246, 0.8))",
                                    boxShadow: "0 0 15px rgba(34, 197, 94, 0.8)",
                                }}
                            ></div>
                        </div>
                    </div>
                    <p className="text-gray-300">
                        {usage?.payload?.limits?.bandwidth?.is_limited ? (
                            <>
                                Used: {formatBytes(usage?.payload?.limits?.bandwidth?.used ?? 0).value}{" "}
                                {formatBytes(usage?.payload?.limits?.bandwidth?.used ?? 0).unit} /{" "}
                                {formatBytes(usage?.payload?.limits?.bandwidth?.total ?? 0).value}{" "}
                                {formatBytes(usage?.payload?.limits?.bandwidth?.total ?? 0).unit}
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
                        {usage?.payload?.limits?.connections?.is_limited ? (
                            `Max Concurrent Connections: ${usage?.payload.limits?.connections?.max_concurrent_connections ?? "N/A"}`
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
                        {usage?.payload?.limits?.speed?.is_limited ? (
                            `Max Speed: ${formatBytes(usage?.payload?.limits?.speed?.max_bytes_per_second ?? 0).value} 
                             ${formatBytes(usage?.payload?.limits?.speed?.max_bytes_per_second ?? 0).unit}/s`
                        ) : (
                            <>
                                <FontAwesomeIcon icon={faInfinity} className="mr-2" />
                                Unlimited
                            </>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
}
