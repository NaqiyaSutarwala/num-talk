import { useState } from "react";
import {
    TextField,
    Button,
    Typography,
    Stack,
    InputAdornment,
    IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "./hooks";

export default function Login() {
    const navigate = useNavigate();
    const { mutate, isPending } = useLogin();
    const [showPassword, setShowPassword] = useState(false);

    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    return (
        <Stack spacing={2.5}>
            <Stack spacing={0.5}>
                <Typography variant="h5">Welcome back</Typography>
                <Typography variant="body2" color="text.secondary">
                    Login to start new discussions and reply with operations.
                </Typography>
            </Stack>

            <TextField
                label="Username"
                size="small"
                fullWidth
                onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                }
            />

            <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                size="small"
                fullWidth
                slotProps={{
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    edge="end"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    },
                }}
                onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                }
            />

            <Button
                variant="contained"
                disabled={isPending}
                size="large"
                onClick={() =>
                    mutate(form, {
                        onSuccess: () => navigate("/app"),
                    })
                }
            >
                {isPending ? "Logging in..." : "Login"}
            </Button>

            <Typography variant="body2">
                No account? <Link to="/signup">Sign up</Link>
            </Typography>
        </Stack>
    );
}