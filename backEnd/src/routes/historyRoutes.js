import { InsertSearch } from "../controllers/historyController.js";
import e from "express";

const router = e.Router();

router.post("/", InsertSearch);

export default router;