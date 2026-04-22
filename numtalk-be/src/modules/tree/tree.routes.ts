import { Router } from "express";
import * as controller from "./tree.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

router.get("/", controller.getRoots);
router.post("/", authMiddleware, controller.createRoot);
router.post("/node", authMiddleware, controller.addNode);
router.get("/:rootId", controller.getTree);

export default router;