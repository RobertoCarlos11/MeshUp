import e from "express";
import {
    InsertCollection,
    InsertCollectionElement,
    getCollections
} from "../controllers/collectionController.js";

const router = e.Router();

router.post("/", InsertCollection);
router.post("/:collectionId/:postId", InsertCollectionElement);
router.get("/:email", getCollections);

export default router;