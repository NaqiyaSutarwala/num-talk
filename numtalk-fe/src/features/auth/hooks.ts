// features/auth/hooks.ts
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { loginApi, registerApi } from "./api";
import { setAuthToken } from "../../shared/auth/useAuthToken";
import { toastApiError } from "../../shared/ui/toast";

export const useLogin = () =>
    useMutation({
        mutationFn: loginApi,
        onSuccess: (res: any) => {
            setAuthToken(res.data.token);
            toast.success("Logged in successfully");
        },
        onError: toastApiError,
    });

export const useRegister = () =>
    useMutation({
        mutationFn: registerApi,
        onSuccess: () => {
            toast.success("Account created successfully");
        },
        onError: toastApiError,
    });