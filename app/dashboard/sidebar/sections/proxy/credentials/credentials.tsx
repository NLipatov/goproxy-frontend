import React, { useState } from "react";
import { AUTH_API_BASE_URL } from "../../../../../../constants";
import { faCopy, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "~/sharedComponent/Button";
import {AlertBox} from "~/sharedComponent/AlertBox";

export function Credentials() {
    const [proxyCredentials, setProxyCredentials] = useState({ username: "", password: "" });
    const [error, setError] = useState<string | null>(null);
    const [copyMessage, setCopyMessage] = useState<string | null>(null);

    const handleGeneratePassword = async () => {
        try {
            const response = await fetch(`${AUTH_API_BASE_URL}/auth/reset-password`, {
                method: "POST",
                credentials: "include",
            });

            if (!response.ok) {
                setError(`Failed to generate password: ${response.status}`);
                return;
            }

            const data = await response.json();
            setProxyCredentials(data);
            setError(null);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred.");
            }
        }
    };

    const handleCopyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(
            () => {
                setCopyMessage("Copied to clipboard!");
                setTimeout(() => setCopyMessage(null), 2000);
            },
            () => {
                setCopyMessage("Failed to copy.");
                setTimeout(() => setCopyMessage(null), 2000);
            }
        );
    };

    return (
        <div className="bg-zinc-900 text-white p-6 rounded-lg shadow-lg max-w-xl mx-auto space-y-4">
            <AlertBox
                type={"warning"}
                message={"We do not store your credentials. Please save them after generation. You can regenerate them at any time."}/>

            {proxyCredentials.password && (
                <div className="bg-zinc-800 p-4 rounded-md shadow-inner space-y-2">
                    <p className="text-green-500 font-bold">Your new credentials:</p>
                    <div>
                        <p>
                            <span className="font-semibold">Username:</span> {proxyCredentials.username}{" "}
                            <button
                                onClick={() => handleCopyToClipboard(proxyCredentials.username)}
                                className="ml-2 text-gray-400 hover:text-gray-200 transition"
                                aria-label="Copy Username"
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </p>
                        <p>
                            <span className="font-semibold">Password:</span> {proxyCredentials.password}{" "}
                            <button
                                onClick={() => handleCopyToClipboard(proxyCredentials.password)}
                                className="ml-2 text-gray-400 hover:text-gray-200 transition"
                                aria-label="Copy Password"
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </p>
                    </div>
                </div>
            )}

            {error && (
                <div className="bg-red-500 p-3 rounded-md text-black font-semibold">
                    Error: {error}
                </div>
            )}

            {copyMessage && (
                <div className="bg-green-500 p-2 rounded-md text-black font-semibold">
                    {copyMessage}
                </div>
            )}

            <div className="mt-6 flex justify-center">
                <Button onClick={handleGeneratePassword} label="Generate new credentials" />
            </div>
        </div>
    );
}
