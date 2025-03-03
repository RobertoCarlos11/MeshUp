import express from "express";
import multer from "multer";
import { getAllUsers, getUser, userLogIn,userRegister,userUpdate } from "../controllers/userController.js";

const router = express.Router();
const upload = multer({storage:multer.memoryStorage()});

router.get("/",getAllUsers);
router.get("/:Email", getUser);
router.get("/:user/:password", userLogIn);
router.post("/", userRegister);
router.put("/",upload.fields([{name:"Profile_Picture"}]), userUpdate);


export default router;