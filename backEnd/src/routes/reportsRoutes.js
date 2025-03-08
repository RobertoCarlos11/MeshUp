import { GetReportOfUser } from "../controllers/reportsController.js";
import e from "express";

const router = e.Router();

router.get("/:Email/:category/:Status/:InitialDate/:FinalDate",GetReportOfUser);

export default router;