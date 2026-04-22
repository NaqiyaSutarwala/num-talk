import Node from "../node/node.model";
import { calculate } from "../../utils/calculate";
import { ApiError } from "../../utils/ApiError";

export const getRoots = async () => {
    return Node.find({ parentId: null })
        .sort({ createdAt: -1 })
        .lean();
};

export const createRoot = async (value: number, userId: string) => {
    if (!Number.isFinite(value)) {
        throw new ApiError(400, "Starting number must be a valid number");
    }

    const root = new Node({
        value,
        userId,
        parentId: null,
    });
    root.rootId = root._id;
    await root.save();

    return root;
};

export const addNode = async (
    parentId: string,
    operation: string,
    operand: number,
    userId: string
) => {
    if (!Number.isFinite(operand)) {
        throw new ApiError(400, "Operand must be a valid number");
    }

    const parent = await Node.findById(parentId);
    if (!parent) throw new ApiError(404, "Parent not found");

    const newValue = calculate(parent.value, operation, operand);

    return Node.create({
        parentId,
        rootId: parent.rootId,
        userId,
        value: newValue,
        operation,
        operand,
    });
};

export const getTree = async (rootId: string) => {
    const nodes = await Node.find({ rootId }).lean();

    type LeanNode = (typeof nodes)[number];
    type TreeNode = LeanNode & { children: TreeNode[] };

    const map: Record<string, TreeNode> = {};
    nodes.forEach(n => (map[n._id.toString()] = { ...n, children: [] }));

    const tree: TreeNode[] = [];

    nodes.forEach(n => {
        const nodeId = n._id.toString();
        const parentId = n.parentId?.toString();

        if (n.parentId) {
            map[parentId!]?.children.push(map[nodeId]);
        } else {
            tree.push(map[nodeId]);
        }
    });

    return tree;
};