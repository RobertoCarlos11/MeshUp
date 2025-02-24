import express from "express";
import { InsertPost,GetAllPosts } from "../controllers/postController.js";

const router = express.Router();

router.post("/", InsertPost);
router.get("/", GetAllPosts);
export default router;