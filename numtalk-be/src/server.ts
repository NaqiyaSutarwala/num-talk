console.log("🚀 [BOOT] Starting server file...");

process.on("uncaughtException", (err) => {
    console.error("💥 UNCAUGHT EXCEPTION:", err);
});

process.on("unhandledRejection", (err) => {
    console.error("💥 UNHANDLED REJECTION:", err);
});

import app from "./app";
import { connectDB } from "./config/db";
import { ENV } from "./config/env";

(async () => {
    try {
        console.log("📦 [ENV] Raw process.env.PORT:", process.env.PORT);
        console.log("📦 [ENV] ENV object:", {
            PORT: ENV.PORT,
            HAS_MONGO: !!ENV.MONGO_URI,
            HAS_JWT: !!ENV.JWT_SECRET,
        });

        if (!ENV.MONGO_URI) {
            throw new Error("MONGO_URI is missing in ENV");
        }

        console.log("🔌 [BOOT] Connecting to DB...");
        await connectDB();

        console.log("🚀 [BOOT] DB connected, starting server...");

        const PORT = process.env.PORT || ENV.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`🚀 [SERVER] Running on port ${PORT}`);
        });

    } catch (err) {
        console.error("❌ [FATAL] Server startup failed:", err);
        process.exit(1);
    }
})();