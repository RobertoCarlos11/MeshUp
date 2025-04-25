import e from "express";
import { GetAllCategories } from "../controllers/categoryController.js";


const router = e.Router();

router.get("/",GetAllCategories);

export default router;