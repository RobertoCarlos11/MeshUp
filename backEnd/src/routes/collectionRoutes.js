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
router.post("/element/", InsertCollectionElement);
router.get("/:email", getCollections);
router.get("/saves/:PostId", getSavesOfPost);
router.get("/collection/:collectionId", getCollectionElements);
router.put("/update/", updateCollection);
router.delete("/delete/:collectionId", deleteCollection);
router.delete("/deleteElement/:collectionId/:postId", deleteElement);
export default router;