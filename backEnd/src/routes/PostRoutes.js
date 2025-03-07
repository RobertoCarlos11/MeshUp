import express from "express";
import { InsertPost,GetAllPosts,getPost,getPostsOfUser, UpdatePost } from "../controllers/postController.js";

const router = express.Router();

router.post("/", InsertPost);
router.get("/posts/:CategoryId", GetAllPosts);
router.get("/:postId", getPost);
router.get("/user/:Email", getPostsOfUser);
router.put("/", UpdatePost);

export default router;