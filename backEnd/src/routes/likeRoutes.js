import { GetLikes, InsertLike,UpdateLike } from "../controllers/likeController.js";
import e from "express";

const router = e.Router();

router.get("/:thingLiked/:thingLikedId/:email", GetLikes);
router.post("/", InsertLike);
router.put("/", UpdateLike);

export default router;