import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js" 
import cors from "cors";
import models from "./config/db.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)); 

models.sync({ force: false })
  .then(() => console.log("Database connected and models synchronized"))
  .catch(err => console.error("Database connection error:", err));