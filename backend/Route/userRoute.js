import express from 'express';
import { loginUser, registerUser, getUser, getPreviousAppointments, upcomingAppointment } from '../Controller/userController.js';
const router=express.Router();
router.post("/register",registerUser);
router.post("/login",loginUser)
router.get("/getprofile",getUser);
router.post("/previous-appointments",getPreviousAppointments);
router.post("/upcoming-appointments",upcomingAppointment);
export default router;