import express from "express";
import multer from "multer";
import { 
    getAllUsers,
    userLogIn,
    getUser,
    userRegister,
    userUpdate,
    getUserPhoto
} from "../controllers/userController.js";

const router = express.Router();
const upload = multer({storage:multer.memoryStorage()});

router.get("/",getAllUsers);
router.get("/:Email", getUser);
router.get("/login/:user/:password", userLogIn);
router.post("/", userRegister);
router.put("/",upload.fields([{name:"Profile_Picture"}]), userUpdate);
router.get("/photo/:Email", getUserPhoto);

export default router;