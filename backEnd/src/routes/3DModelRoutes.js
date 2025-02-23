import express from "express";
import { InsertModel } from "../controllers/3DmodelController.js";
import multer from "multer";

const router = express.Router();
const upload = multer({storage:multer.memoryStorage()});

router.post("/",upload.fields([{name:"model"},{name:"texture"}]), InsertModel);

export default router;