import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js" 
import categoryRoutes from "./routes/categoryRoutes.js" 
import ModelRoutes from "./routes/3DModelRoutes.js" 
import PostRoutes from "./routes/PostRoutes.js" 
import CommentRoutes from "./routes/commentRoutes.js" 
import likeRoutes from "./routes/likeRoutes.js"
import cors from "cors";
import {syncDB, sequelize} from "./models/index.js"
import {createDummyData} from "./postDeploy/dummyData.js"


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/3DModel", ModelRoutes);
app.use("/api/post", PostRoutes);
app.use("/api/comment", CommentRoutes);
app.use("/api/like", likeRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => 
{
  try{
    await syncDB();
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)); 
  }
  catch(error)
  {
    console.error("Failed to start server",error);
  }
};

startServer();
