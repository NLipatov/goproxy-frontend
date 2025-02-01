import { useState, useEffect } from "react";
import { AUTH_API_BASE_URL } from "../../constants";
import { useNavigate } from "react-router-dom";

interface User {
    name: string;
    picture: string;
}

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);

    async function fetchUserInfo() {
        try {
            const response = await fetch(`${AUTH_API_BASE_URL}/auth/user-info`, {
                method: "GET",
                credentials: "include",
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data);
            } else {
                setError(`Could not get user data: ${response.status}`);
            }
        } catch (err: any) {
            setError(err.message);
        }
    }

    async function login() {
        window.location.href = `${AUTH_API_BASE_URL}/auth/login`;
    }

    async function resetPassword() {
        try {
            const response = await fetch(`${AUTH_API_BASE_URL}/auth/reset-password`, {
                method: "POST",
                credentials: "include",
            });
            if (response.ok) {
                return await response.json();
            } else {
                setError(`Could not reset password: ${response.status}`);
            }
        } catch (err: any) {
            setError(err.message);
        }
    }

    useEffect(() => {
        fetchUserInfo().then(r => r);
    }, []);

    return { user, error, fetchUserInfo, login: login, resetPassword };
}
