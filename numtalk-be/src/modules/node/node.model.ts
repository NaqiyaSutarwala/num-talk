
import mongoose from "mongoose";

const nodeSchema = new mongoose.Schema(
    {
        parentId: { type: mongoose.Schema.Types.ObjectId, default: null },
        rootId: { type: mongoose.Schema.Types.ObjectId, required: true },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        value: { type: Number, required: true },
        operation: { type: String },
        operand: { type: Number },
    },
    { timestamps: true }
);

export default mongoose.model("Node", nodeSchema);