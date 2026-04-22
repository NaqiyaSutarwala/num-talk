import {
    Container,
    Typography,
    Paper,
    Stack,
    Button,
    Box,
} from "@mui/material";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import Home from "./pages/Home";
import { clearAuthToken, useAuthToken } from "./shared/auth/useAuthToken";

export default function App() {
    const { isAuthenticated } = useAuthToken();
    const location = useLocation();
    const isGuestOnTree = !isAuthenticated && location.pathname === "/tree";

    const PrivateRoute = ({ children }: { children: ReactNode }) => {
        if (!isAuthenticated) return <Navigate to="/login" replace />;
        return children;
    };

    const PublicOnlyRoute = ({ children }: { children: ReactNode }) => {
        if (isAuthenticated) return <Navigate to="/app" replace />;
        return children;
    };

    return (
        <Container maxWidth="lg" sx={{ py: 5 }}>
            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{
                    mb: 4,
                    alignItems: { xs: "flex-start", sm: "center" },
                    justifyContent: "space-between",
                }}
            >
                <Box>
                    <Typography variant="h4">Number Discussion</Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
                        Discuss with numbers and operations in a live tree.
                    </Typography>
                </Box>

                <Stack direction="row" spacing={1.2} sx={{ flexWrap: "wrap" }}>
                    {isAuthenticated ? (
                        <>
                            <Button component={Link} to="/app" variant="contained">
                                My Feed
                            </Button>
                            <Button
                                variant="text"
                                onClick={() => {
                                    clearAuthToken();
                                }}
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            {!isGuestOnTree && (
                                <Button component={Link} to="/tree" variant="text">
                                    Continue as guest
                                </Button>
                            )}
                            {isGuestOnTree && <Button component={Link} to="/login" variant="text">Back to Login</Button>
                            }
                        </>
                    )}
                </Stack>
            </Stack>

            <Routes>
                <Route path="/" element={<Navigate to="/tree" replace />} />
                <Route
                    path="/tree"
                    element={
                        <Paper sx={{ p: { xs: 2, sm: 3 } }}>
                            <Home />
                        </Paper>
                    }
                />
                <Route
                    path="/app"
                    element={
                        <PrivateRoute>
                            <Paper sx={{ p: { xs: 2, sm: 3 } }}>
                                <Home allowCreate />
                            </Paper>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <PublicOnlyRoute>
                            <Paper sx={{ p: { xs: 2, sm: 3 }, maxWidth: 520, mx: "auto" }}>
                                <Login />
                            </Paper>
                        </PublicOnlyRoute>
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <PublicOnlyRoute>
                            <Paper sx={{ p: { xs: 2, sm: 3 }, maxWidth: 520, mx: "auto" }}>
                                <Register />
                            </Paper>
                        </PublicOnlyRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/tree" replace />} />
            </Routes>

        </Container>
    );
}