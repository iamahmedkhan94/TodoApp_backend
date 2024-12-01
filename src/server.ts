import dotenv from "dotenv";
import connectDB from "./config/db";
import app from "./app";

dotenv.config();

// Connect to MongoDB
connectDB();

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));