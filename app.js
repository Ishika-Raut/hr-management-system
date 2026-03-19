import express from "express";
//import adminRouter from "./src/routers/adminRoutes.js";
import authRouter from "./src/routers/authRouter.js";
import employeeRouter from "./src/routers/employeeRoutes.js";
import leaveRouter from "./src/routers/leaveRoutes.js";
import attendanceRouter from "./src/routers/attendanceRoutes.js";


const app = express();

console.log("Express app created");

// Middleware
//parse body convert json string to js object parsing data coming from <div>
//frontend sends data in string format hence we need to parse it
//app.use(express.urlencoded({extend:true})) //parse form data coming from <form> - form data
app.use(express.json());


app.use("/api/auth", authRouter);
app.use("/api", employeeRouter);
app.use("/api", leaveRouter);
app.use("/api", attendanceRouter);

export default app;