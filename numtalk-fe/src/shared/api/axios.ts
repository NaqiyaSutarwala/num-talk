import axios from "axios";

const baseUrl = import.meta.env.REACT_BASE_URL || "https://num-talk-be.onrender.com";
console.log(baseUrl)

const api = axios.create({
    baseURL: `${baseUrl}/api`,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;