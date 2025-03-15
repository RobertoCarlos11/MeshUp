import e from "express";
import {
    InsertCollection,
    InsertCollectionElement,
    getCollections,
    getSavesOfPost,
    getCollectionElements,
    updateCollection,
    deleteCollection,
    deleteElement
} from "../controllers/collectionController.js";

const router = e.Router();

router.post("/", InsertCollection);
router.post("/:collectionId/:postId", InsertCollectionElement);
router.get("/:email", getCollections);
router.get("/saves/:PostId", getSavesOfPost);
router.get("/collection/:collectionId", getCollectionElements);
router.put("/update/:collectionName/:collectionId", updateCollection);
router.put("/:collectionId", deleteCollection);
router.put("/:collectionId/:postId", deleteElement);
export default router;