import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from './routes/auth.js'; // adjust path if needed
import todoRoutes from './routes/todo.js';
import authMiddleware from './middleware/auth.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

console.log("MONGO_URI:", MONGO_URI);

// connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });

// simple route
app.get("/", (req, res) => {
  res.send("Todo API is running...");
});

// Routes
app.use('/auth', authRoutes);                     // /auth/register, /auth/login
app.use('/todos', authMiddleware, todoRoutes);  

app.use((req, res) => {
  res.status(404).json({ msg: "Route not found" });
});

