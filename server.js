import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./src/configs/dbConfig.js";
import { createSuperAdmin } from "./src/utils/superAdmin.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Create Super Admin if not exists
await createSuperAdmin();

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});