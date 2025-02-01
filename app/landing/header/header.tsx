import React, { useEffect, useState } from "react";
import headerStyles from "./header.module.css";
import { FaGithub } from "react-icons/fa";
import {AUTH_API_BASE_URL} from "../../../constants";
import {useAuth} from "~/hooks/useAuth";
import {Button} from "~/sharedComponent/Button";

export function Header() {
    const { login } = useAuth();
    const [user, setUser] = useState<{ name: string; picture: string } | null>(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const response = await fetch(`${AUTH_API_BASE_URL}/auth/user-info`, {
                method: "GET",
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data);
            }
        };

        fetchUserInfo()
            .then(() => console.log("User info fetched successfully"))
            .catch((error) => console.error("Error fetching user info:", error));
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
                        <Button onClick={login} label={"Login"}/>
                    )}
                </div>
            </header>
        </div>
    );
}
