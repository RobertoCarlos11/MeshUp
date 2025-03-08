import e from "express";
import {
    InsertCollection,
    InsertCollectionElement,
    getCollections,
    deleteCollection,
    getSavesOfPost
} from "../controllers/collectionController.js";

const router = e.Router();

router.post("/", InsertCollection);
router.post("/:collectionId/:postId", InsertCollectionElement);
router.get("/:email", getCollections);
router.put("/:collectionId", deleteCollection);
router.get("/saves/:PostId", getSavesOfPost);
export default router;