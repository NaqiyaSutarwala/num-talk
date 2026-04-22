import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./app/queryClient";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Toaster } from "react-hot-toast";

const theme = createTheme({
    palette: {
        mode: "light",
        primary: { main: "#2563eb" },
        secondary: { main: "#7c3aed" },
        background: {
            default: "#f3f6fb",
            paper: "#ffffff",
        },
    },
    shape: { borderRadius: 14 },
    typography: {
        fontFamily: "'Inter', 'Segoe UI', Roboto, Arial, sans-serif",
        h4: { fontWeight: 700 },
        h5: { fontWeight: 700 },
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    border: "1px solid #e7ecf3",
                    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: 10,
                },
            },
        },
    },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 3000,
                    style: {
                        borderRadius: "10px",
                        border: "1px solid #e5e7eb",
                    },
                }}
            />
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </ThemeProvider>
    </BrowserRouter>
);