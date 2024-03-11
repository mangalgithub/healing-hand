import express from 'express';
import { loginUser, registerUser, verifyToken, getUser } from '../Controller/userController.js';
const router=express.Router();
router.post("/register",registerUser);
router.post("/login",loginUser)
router.get("/check",verifyToken);
router.get("/getprofile",getUser);
export default router;