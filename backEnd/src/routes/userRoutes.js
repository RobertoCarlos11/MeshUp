import express from "express";

import { getAllUsers, userLogIn } from "../controllers/userController.js";

const router = express.Router();

router.get("/",getAllUsers);
router.get("/:user/:password", userLogIn);

export default router;