import { CircularProgress, Box } from "@mui/material";
import { useTree } from "./hooks";
import TreeNode from "./TreeNode";

export default function TreeView({ rootId }: any) {
    const { data, isLoading } = useTree(rootId);

    if (isLoading) {
        return (
            <Box sx={{ textAlign: "center", py: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ p: 1, borderRadius: 3, bgcolor: "#f8faff" }}>
            {data?.map((node: any) => (
                <TreeNode key={node._id} node={node} />
            ))}
        </Box>
    );
}