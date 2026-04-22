import mongoose from "mongoose";
import { ENV } from "./env";

export const connectDB = async () => {
    console.log("🔌 [DB] Attempting connection...");

    if (!ENV.MONGO_URI) {
        console.error("❌ [DB] MONGO_URI is missing");
        throw new Error("MONGO_URI not provided");
    }

    console.log("🌐 [DB] URI:", ENV.MONGO_URI.substring(0, 20) + "...");

    try {
        await mongoose.connect(ENV.MONGO_URI, {
            serverSelectionTimeoutMS: 10000, // fail fast
        });

        console.log("✅ [DB] MongoDB connected successfully");

        mongoose.connection.on("connected", () => {
            console.log("🟢 [DB] Mongoose connected");
        });

        mongoose.connection.on("error", (err) => {
            console.error("🔴 [DB] Mongoose error:", err);
        });

        mongoose.connection.on("disconnected", () => {
            console.warn("🟡 [DB] Mongoose disconnected");
        });

    } catch (error) {
        console.error("❌ [DB] Connection FAILED:", error);
        throw error;
    }
};