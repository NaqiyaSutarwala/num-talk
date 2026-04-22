import { useEffect, useState } from "react";

const TOKEN_KEY = "token";
const AUTH_EVENT = "auth-token-changed";

export const getAuthToken = () => localStorage.getItem(TOKEN_KEY);

export const setAuthToken = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
    window.dispatchEvent(new Event(AUTH_EVENT));
};

export const clearAuthToken = () => {
    localStorage.removeItem(TOKEN_KEY);
    window.dispatchEvent(new Event(AUTH_EVENT));
};

export const useAuthToken = () => {
    const [token, setToken] = useState<string | null>(() => getAuthToken());

    useEffect(() => {
        const syncToken = () => setToken(getAuthToken());

        window.addEventListener(AUTH_EVENT, syncToken);
        window.addEventListener("storage", syncToken);

        return () => {
            window.removeEventListener(AUTH_EVENT, syncToken);
            window.removeEventListener("storage", syncToken);
        };
    }, []);

    return { token, isAuthenticated: Boolean(token) };
};
