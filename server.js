import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./src/configs/dbConfig.js";
import { createAdmin } from "./src/utils/admin.js";
//dotenv.config() synchronously parses and reads environment variables from .env file 
//and sets each key/value is in process.env.
dotenv.config();

// include environment variables
const PORT = process.env.PORT || 5000;



// Create Admin if not exists
await createAdmin();

//create http (development) server and starts server listen
app.listen(PORT, () => {

  // Connect Database 
  connectDB();
  console.log(`Server running on PORT ${PORT}`);
});