import e from "express";
import { getComments, InsertComment } from "../controllers/commentController.js";

const router = e.Router();

router.post("/", InsertComment);
router.get("/:postId", getComments);

export default router;