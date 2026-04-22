process.on("uncaughtException", (err) => {
    console.error("UNCAUGHT EXCEPTION:", err);
});

process.on("unhandledRejection", (err) => {
    console.error("UNHANDLED REJECTION:", err);
});

import app from "./app";
import { connectDB } from "./config/db";
import { ENV } from "./config/env";

(async () => {
    await connectDB();
    app.listen(ENV.PORT, () =>
        console.log(`Server running on ${ENV.PORT}`)
    );
})();