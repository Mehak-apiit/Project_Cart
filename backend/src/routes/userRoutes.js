import express from "express"
import {protect} from "../middleware/authMiddleware.js";
import * as userController from "../controllers/userController.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
const router = express.Router();

// GET ALL USERS
router.get("/",protect,adminOnly,userController.getAllUsers);
// GET USER BY ID
router.get("/:id",protect,adminOnly,userController.getUser);
// UPDATE USER
router.put("/:id",protect,adminOnly,userController.updateUser);
// DELETE USER
router.delete("/:id",protect,adminOnly,userController.deleteUser);
export default router;

