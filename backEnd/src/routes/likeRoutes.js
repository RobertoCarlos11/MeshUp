import { GetLikes } from "../controllers/likeController.js";
import e from "express";

const router = e.Router();

router.get("/:thingLiked/:thingLikedId", GetLikes);

export default router;