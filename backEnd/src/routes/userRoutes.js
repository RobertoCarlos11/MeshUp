import express from "express";

import { getAllUsers, userLogIn,userRegister } from "../controllers/userController.js";

const router = express.Router();

router.get("/",getAllUsers);
router.get("/:user/:password", userLogIn);
router.post("/:user/:password/:birthdate/:email", userRegister);

export default router;