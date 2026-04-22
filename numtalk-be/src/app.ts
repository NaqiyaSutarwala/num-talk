import express from "express";
import cors from "cors";

import authRoutes from "./modules/auth/auth.routes";
import treeRoutes from "./modules/tree/tree.routes";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    "https://num-talk.netlify.app",
    "https://www.num-talk.netlify.app",
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
            return;
        }

        callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tree", treeRoutes);

app.use(errorHandler);

export default app;