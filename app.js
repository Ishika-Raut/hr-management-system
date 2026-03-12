import express from "express";
import adminRouter from "./src/routers/adminRoutes.js";


const app = express();

console.log("Express app created");

// Middleware
app.use(express.json());

app.use("/api/admin", adminRouter);


export default app;