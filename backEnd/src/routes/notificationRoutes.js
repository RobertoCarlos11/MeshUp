import e from "express";
import {getNotificationsOfUser, updateNotification} from "../controllers/notificationController.js";

const router = e.Router();

router.get("/:Email", getNotificationsOfUser);
router.put("/", updateNotification);
export default router;