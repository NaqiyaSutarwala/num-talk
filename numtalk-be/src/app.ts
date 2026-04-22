// src/app.ts
import express from "express";
import cors from "cors";

import authRoutes from "./modules/auth/auth.routes";
import treeRoutes from "./modules/tree/tree.routes";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

app.use((req, res, next) => {
    console.log(`📡 [REQ] ${req.method} ${req.url}`);
    next();
});

app.use(cors({
    origin: ["http://localhost:5173", "https://num-talk-fe.onrender.com"],
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tree", treeRoutes);

app.use(errorHandler);

export default app;