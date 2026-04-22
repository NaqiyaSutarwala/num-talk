import { toast } from "react-hot-toast";
import axios from "axios";

export const getApiErrorMessage = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;
        if (typeof message === "string" && message.trim() !== "") {
            return message;
        }
    }

    if (error instanceof Error && error.message.trim() !== "") {
        return error.message;
    }

    return "Something went wrong. Please try again.";
};

export const toastApiError = (error: unknown) => {
    toast.error(getApiErrorMessage(error));
};
