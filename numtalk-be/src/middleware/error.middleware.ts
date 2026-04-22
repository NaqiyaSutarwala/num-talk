// src/middleware/error.middleware.ts
export const errorHandler = (err: any, req: any, res: any, next: any) => {
    res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
};