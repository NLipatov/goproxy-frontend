import React, { useState } from "react";
import {AUTH_API_BASE_URL} from "../../../../../constants";

export function Credentials() {
    const [proxyCredentials, setProxyCredentials] = useState({ username: "", password: "" });
    const [error, setError] = useState<string | null>(null);

    const handleGeneratePassword = async () => {
        try {
            const response = await fetch(`${AUTH_API_BASE_URL}/auth/reset-password`, {
                method: "POST",
                credentials: "include",
            });

            if (!response.ok) {
                setError(`Failed to generate password: ${response.status}`);
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

    return (
        <div className="bg-zinc-900 text-white p-6 rounded-lg shadow-lg max-w-xl mx-auto">
            <p className="text-gray-300 mb-6">
                Manage your proxy credentials for BASIC authentication. Please save the password after generating it, as it will not be shown again.
            </p>
            <div className="space-y-4">
                {proxyCredentials.password && (
                    <div className="bg-zinc-800 p-4 rounded-md shadow-inner">
                        <p className="text-green-500 font-bold">Your new credentials:</p>
                        <div className="mt-2">
                            <p><span className="font-semibold">Username:</span> {proxyCredentials.username}</p>
                            <p><span className="font-semibold">Password:</span> {proxyCredentials.password}</p>
                        </div>
                    </div>
                )}
                {error && (
                    <div className="bg-red-500 p-3 rounded-md text-black font-semibold">
                        Error: {error}
                    </div>
                )}
                <button
                    onClick={handleGeneratePassword}
                    className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-2 px-4 rounded transition duration-300"
                >
                    Generate New Password
                </button>
            </div>
        </div>
    );
}