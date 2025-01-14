import React, { useEffect, useState } from "react";
import headerStyles from "./header.module.css";
import { FaGithub } from "react-icons/fa";
import {AUTH_API_BASE_URL} from "../../../constants";

export function Header() {
    const [user, setUser] = useState<{ name: string; picture: string } | null>(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch(`${AUTH_API_BASE_URL}/auth/user-info`, {
                    method: "GET",
                    credentials: "include", // Enable cookies
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                }
            } catch (error) {
                console.error("Failed to fetch user info:", error);
            }
        };

        fetchUserInfo().then(r => r);
    }, []);

    return (
        <div>
            <header
                className={`${headerStyles["header"]} fixed top-0 w-full backdrop-blur-md bg-black/50 z-50 shadow-md`}
            >
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center">
                        <span className="text-white text-xl font-semibold">ηProxy</span>
                    </div>

                    <nav className="flex space-x-6">
                        <a
                            href={"#Pricing"}
                            className="text-white/80 hover:text-green-500 transition-colors duration-300"
                        >
                            Pricing
                        </a>
                        <a
                            href={"#FAQ"}
                            className="text-white/80 hover:text-green-500 transition-colors duration-300"
                        >
                            FAQ
                        </a>
                        <a
                            href="https://github.com/NLipatov/goproxy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-green-500 flex items-center"
                        >
                            <FaGithub className="mr-1 text-2xl" /> GitHub
                        </a>
                    </nav>

                    {user ? (
                        <a
                            href="/dashboard"
                            className="flex items-center cursor-pointer hover:opacity-80"
                        >
                            <img
                                src={user.picture}
                                alt="profile picture"
                                className="rounded-full w-8 h-8 mr-2"
                            />
                            <span className="text-white">{user.name}</span>
                        </a>
                    ) : (
                        <a
                            href={`${AUTH_API_BASE_URL}/auth/login`}
                            className="border border-green-500 text-green-500 px-4 py-2 rounded hover:bg-green-500 hover:text-black transition-all duration-300"
                        >
                            Log in
                        </a>
                    )}
                </div>
            </header>
        </div>
    );
}
