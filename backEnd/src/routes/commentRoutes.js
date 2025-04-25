import e from "express";
import { getComments, InsertComment,updateComment } from "../controllers/commentController.js";

const router = e.Router();

router.post("/", InsertComment);
router.get("/:postId", getComments);
router.put("/", updateComment);

export default router;