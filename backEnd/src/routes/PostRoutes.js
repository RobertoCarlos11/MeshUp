import express from "express";
import { InsertPost } from "../controllers/postController.js";

const router = express.Router();

router.post("/", InsertPost);

export default router;