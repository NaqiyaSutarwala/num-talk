import * as service from "./tree.service";
import { asyncHandler } from "../../utils/asyncHandler";
import { Request, Response } from "express";
import { ApiError } from "../../utils/ApiError";

type AuthenticatedRequest = Request & { user: { id: string } };

export const getRoots = asyncHandler(async (_req: Request, res: Response) => {
    const roots = await service.getRoots();
    res.json(roots);
});

export const createRoot = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const node = await service.createRoot(req.body.value, req.user.id);
    res.json(node);
});

export const addNode = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const node = await service.addNode(
        req.body.parentId,
        req.body.operation,
        req.body.operand,
        req.user.id
    );
    res.json(node);
});

export const getTree = asyncHandler(async (req: Request, res: Response) => {
    const { rootId } = req.params;
    if (!rootId || Array.isArray(rootId)) {
        throw new ApiError(400, "Invalid rootId");
    }

    const tree = await service.getTree(rootId);
    res.json(tree);
});