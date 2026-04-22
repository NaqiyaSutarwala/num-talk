import {
    Card,
    CardContent,
    Typography,
    Box,
} from "@mui/material";
import OperationForm from "./OperationForm";

export default function TreeNode({ node }: any) {
    return (
        <Box sx={{ ml: { xs: 1, sm: 2.5 }, mt: 1.5 }}>
            <Card
                variant="outlined"
                sx={{
                    borderRadius: 3,
                    borderColor: "divider",
                }}
            >
                <CardContent>
                    <Typography variant="caption" color="text.secondary">
                        {node.operation ? "Operation" : "Start"}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, mt: 0.5 }}>
                        {node.operation
                            ? `${node.operation} ${node.operand} = ${node.value}`
                            : `Start: ${node.value}`}
                    </Typography>

                    <Box sx={{ mt: 2 }}>
                        <OperationForm parentId={node._id} />
                    </Box>
                </CardContent>
            </Card>

            {/* Children */}
            {node.children?.length > 0 && (
                <Box sx={{ borderLeft: "2px solid #dfe6f0", pl: 1.5, mt: 1 }}>
                    {node.children.map((child: any) => (
                        <TreeNode key={child._id} node={child} />
                    ))}
                </Box>
            )}
        </Box>
    );
}