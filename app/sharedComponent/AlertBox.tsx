import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle, faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

interface AlertBoxProps {
    type: "error" | "warning" | "success";
    message: string;
}

export function AlertBox({ type, message }: AlertBoxProps) {
    const getAlertStyles = () => {
        switch (type) {
            case "error":
                return { icon: faTimesCircle, iconColor: "text-red-400" };
            case "warning":
                return { icon: faExclamationTriangle, iconColor: "text-yellow-400" };
            case "success":
                return { icon: faCheckCircle, iconColor: "text-green-400" };
            default:
                return { icon: faExclamationTriangle, iconColor: "text-gray-400" };
        }
    };

    const { icon, iconColor } = getAlertStyles();

    return (
        <div className="flex items-center bg-zinc-800 p-3 rounded-md text-gray-400 text-sm shadow-inner space-x-2">
            <FontAwesomeIcon icon={icon} className={iconColor} />
            <p>{message}</p>
        </div>
    );
}
