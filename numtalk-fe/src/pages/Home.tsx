import { useState } from "react";
import {
    TextField,
    Button,
    Typography,
    Stack,
    Divider,
    Card,
    CardActionArea,
    CardContent,
    Alert,
    Box,
    Chip,
} from "@mui/material";
import TreeView from "../features/tree/TreeView";
import { useCreateRoot, useRoots } from "../features/tree/hooks";
import { useAuthToken } from "../shared/auth/useAuthToken";

type HomeProps = {
    allowCreate?: boolean;
};

export default function Home({ allowCreate = false }: HomeProps) {
    const [rootId, setRootId] = useState("");
    const [value, setValue] = useState("");
    const { token } = useAuthToken();

    const { mutate, isPending } = useCreateRoot();
    const { data: roots = [] } = useRoots();

    return (
        <Stack spacing={2.5}>
            {allowCreate && (
                <>
                    <Stack spacing={0.5}>
                        <Typography variant="h5">Start Discussion</Typography>
                        <Typography variant="body2" color="text.secondary">
                            Publish a root number to start a new conversation thread.
                        </Typography>
                    </Stack>

                    {!token && (
                        <Alert severity="info">
                            Login to create a new discussion or reply with operations.
                        </Alert>
                    )}

                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                        <TextField
                            label="Starting Number"
                            type="number"
                            fullWidth
                            size="small"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />

                        <Button
                            variant="contained"
                            size="large"
                            disabled={isPending || !token || value.trim() === ""}
                            onClick={() =>
                                mutate(
                                    { value: Number(value) },
                                    {
                                        onSuccess: (res: any) =>
                                            setRootId(res.data._id),
                                    }
                                )
                            }
                        >
                            Create Discussion
                        </Button>
                    </Stack>

                    <Divider />
                </>
            )}

            <Stack
                direction={{ xs: "column", sm: "row" }}
                sx={{
                    alignItems: { xs: "flex-start", sm: "center" },
                    justifyContent: "space-between",
                }}
            >
                <Typography variant="h6">All Discussions</Typography>
                <Chip label={`${roots.length} threads`} variant="outlined" />
            </Stack>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                    gap: 1.25,
                }}
            >
                {roots.map((root: any) => (
                    <Card
                        key={root._id}
                        sx={{
                            borderColor: root._id === rootId ? "primary.main" : "divider",
                            bgcolor: root._id === rootId ? "primary.50" : "background.paper",
                        }}
                    >
                        <CardActionArea onClick={() => setRootId(root._id)}>
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    Root Number
                                </Typography>
                                <Typography variant="h6">{root.value}</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </Box>

            {rootId && (
                <>
                    <Typography variant="h6" sx={{ pt: 1 }}>
                        Discussion Tree
                    </Typography>
                    <TreeView rootId={rootId} />
                </>
            )}
        </Stack>
    );
}