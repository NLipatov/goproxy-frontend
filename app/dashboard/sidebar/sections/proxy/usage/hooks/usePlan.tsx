import { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { AUTH_API_LOGIN_URL, PLAN_WS_URL } from "../../../../../../../constants";
import { type PlanResponse } from "~/dto/apiResponse";

export function usePlan() {
    const [currentPlan, setCurrentPlan] = useState<PlanResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [lastReceived, setLastReceived] = useState<Date | null>(null);

    const { lastMessage } = useWebSocket(PLAN_WS_URL, {
        shouldReconnect: () => true,
        reconnectAttempts: 10,
        reconnectInterval: 5000,
    });

    useEffect(() => {
        if (lastMessage !== null) {
            try {
                const data = JSON.parse(lastMessage.data);

                if (data.errorCode === 401) {
                    window.location.href = AUTH_API_LOGIN_URL;
                    return;
                }

                if (data.error) {
                    setError(data.error);
                } else {
                    setError(null);
                    setCurrentPlan(data);
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

    return { currentPlan, error, status, lastReceived };
}
