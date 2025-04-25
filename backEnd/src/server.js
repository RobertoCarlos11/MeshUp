import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js" 
import categoryRoutes from "./routes/categoryRoutes.js" 
import modelRoutes from "./routes/3DModelRoutes.js" 
import postRoutes from "./routes/PostRoutes.js" 
import commentRoutes from "./routes/commentRoutes.js" 
import likeRoutes from "./routes/likeRoutes.js"
import notificationRoutes from "./routes/notificationRoutes.js";
import collectionRoutes from "./routes/collectionRoutes.js";
import historyRoutes  from "./routes/historyRoutes.js";
import cors from "cors";
import {syncDB, sequelize} from "./models/index.js"
import {createDummyData} from "./postDeploy/dummyData.js"
import reportRoutes from "./routes/reportsRoutes.js"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/3DModel", modelRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/like", likeRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/collection", collectionRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/History", historyRoutes);
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
