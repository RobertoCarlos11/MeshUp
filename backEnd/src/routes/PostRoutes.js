import express from "express";
import { InsertPost,GetAllPosts,getPost } from "../controllers/postController.js";

const router = express.Router();

router.post("/", InsertPost);
router.get("/posts/:CategoryId", GetAllPosts);
router.get("/:postId", getPost);

export default router;