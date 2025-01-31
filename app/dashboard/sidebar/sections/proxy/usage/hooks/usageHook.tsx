import { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { PLAN_WS_URL } from "../../../../../../../constants";
import type { Usage } from "~/dashboard/sidebar/sections/proxy/usage/dto/usage";
import type { ApiResponse } from "~/dto/apiResponse";

export function usageHook() {
    const [usage, setUsage] = useState<ApiResponse<Usage> | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [lastReceived, setLastReceived] = useState<Date | null>(null);

    const isClient = typeof window !== "undefined";
    const { lastMessage } = isClient
        ? useWebSocket(PLAN_WS_URL, {
            shouldReconnect: () => true,
            reconnectAttempts: 10,
            reconnectInterval: 5000,
        })
        : { lastMessage: null };

    useEffect(() => {
        if (!isClient || lastMessage === null) return;
        try {
            const data = JSON.parse(lastMessage.data);
            if (data.error) {
                setError(data.error);
            } else {
                setError(null);
                setUsage(data);
            }
            setLastReceived(new Date());
        } catch (err) {
            console.error("Failed to parse WebSocket message:", err);
            setError("Failed to parse WebSocket message.");
            setLastReceived(new Date());
        }
    }, [lastMessage, isClient]);

    const getStatus = () => {
        if (error) return "error";
        if (lastReceived) {
            const now = new Date();
            const diff = (now.getTime() - lastReceived.getTime()) / 1000;
            if (diff <= 15) return "active";
        }
        return "idle";
    };

    return { usage, error, status: getStatus(), lastReceived };
}
