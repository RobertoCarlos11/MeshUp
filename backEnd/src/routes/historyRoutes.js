import { DeleteHistory, GetSearchHistory, InsertSearch } from "../controllers/historyController.js";
import e from "express";

const router = e.Router();

router.post("/", InsertSearch);
router.get("/:Email",GetSearchHistory);
router.put("/", DeleteHistory);

export default router;