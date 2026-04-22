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
import { toast } from "react-hot-toast";
import { useRegister } from "./hooks";

export default function Register() {
    const navigate = useNavigate();
    const { mutate, isPending } = useRegister();

    const [form, setForm] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const isPasswordMismatch =
        form.confirmPassword !== "" && form.password !== form.confirmPassword;

    const handleRegister = () => {
        if (form.password !== form.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        mutate(
            { username: form.username, password: form.password },
            {
                onSuccess: () => navigate("/login"),
            }
        );
    };

    return (
        <Stack spacing={2.5}>
            <Stack spacing={0.5}>
                <Typography variant="h5">Create account</Typography>
                <Typography variant="body2" color="text.secondary">
                    Sign up to publish roots and participate in numeric threads.
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

            <TextField
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                size="small"
                fullWidth
                error={isPasswordMismatch}
                helperText={isPasswordMismatch ? "Passwords do not match" : " "}
                slotProps={{
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    edge="end"
                                    onClick={() =>
                                        setShowConfirmPassword((prev) => !prev)
                                    }
                                >
                                    {showConfirmPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    },
                }}
                onChange={(e) =>
                    setForm({ ...form, confirmPassword: e.target.value })
                }
            />

            <Button
                variant="outlined"
                disabled={isPending || isPasswordMismatch}
                size="large"
                onClick={handleRegister}
            >
                Register
            </Button>

            <Typography variant="body2">
                Already have an account? <Link to="/login">Login</Link>
            </Typography>
        </Stack>
    );
}