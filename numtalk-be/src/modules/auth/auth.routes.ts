// auth.routes.ts
import { Request, Response, Router } from "express";
import * as service from "./auth.service";
import { asyncHandler } from "../../utils/asyncHandler";

const router = Router();

router.post("/register", asyncHandler(async (req: Request, res: Response) => {
    const user = await service.register(req.body.username, req.body.password);
    res.json(user);
}));

router.post("/login", asyncHandler(async (req: Request, res: Response) => {
    const data = await service.login(req.body.username, req.body.password);
    res.json(data);
}));

export default router;