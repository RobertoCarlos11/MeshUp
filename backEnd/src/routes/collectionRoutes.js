import e from "express";
import {
    InsertCollection,
    InsertCollectionElement,
    getCollections,
    deleteCollection
} from "../controllers/collectionController.js";

const router = e.Router();

router.post("/", InsertCollection);
router.post("/:collectionId/:postId", InsertCollectionElement);
router.get("/:email", getCollections);
router.put("/:collectionId", deleteCollection);

export default router;