import { useState } from "react";
import {
    TextField,
    Button,
    MenuItem,
    Stack,
    Typography,
    InputAdornment,
} from "@mui/material";
import { useAddNode } from "./hooks";
import { useAuthToken } from "../../shared/auth/useAuthToken";

export default function OperationForm({ parentId }: any) {
    const { mutate, isPending } = useAddNode();
    const { token } = useAuthToken();

    const [op, setOp] = useState("+");
    const [value, setValue] = useState("");

    if (!token) {
        return (
            <Typography variant="caption" color="text.secondary">
                Login to reply with an operation
            </Typography>
        );
    }

    return (
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
            <TextField
                select
                size="small"
                value={op}
                label="Op"
                sx={{ minWidth: 90 }}
                onChange={(e) => setOp(e.target.value)}
            >
                {["+", "-", "*", "/"].map((o) => (
                    <MenuItem key={o} value={o}>
                        {o}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                size="small"
                type="number"
                label="Value"
                value={value}
                sx={{ minWidth: 140 }}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">#</InputAdornment>
                        ),
                    },
                }}
                onChange={(e) => setValue(e.target.value)}
            />

            <Button
                variant="contained"
                size="small"
                disabled={isPending || value.trim() === ""}
                sx={{ minWidth: 110 }}
                onClick={() =>
                    mutate({
                        parentId,
                        operation: op,
                        operand: Number(value),
                    }, {
                        onSuccess: () => {
                            setValue("");
                        },
                    })
                }
            >
                Add Reply
            </Button>
        </Stack>
    );
}