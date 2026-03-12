import express from "express";


const app = express();

console.log("Express app created");

// Middleware
app.use(express.json());



export default app;