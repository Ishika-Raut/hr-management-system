import express from "express";
import adminRouter from "./src/routers/adminRoutes.js";
import authRouter from "./src/routers/authRouter.js";


const app = express();

console.log("Express app created");

// Middleware
app.use(express.json());

app.use("/api/admin", adminRouter);
app.use("/api/user", authRouter);

export default app;