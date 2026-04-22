// src/app.ts
import express from "express";
import cors from "cors";

import authRoutes from "./modules/auth/auth.routes";
import treeRoutes from "./modules/tree/tree.routes";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tree", treeRoutes);

app.use(errorHandler);

export default app;