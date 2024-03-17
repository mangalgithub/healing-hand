import express from "express";
import AppointmentController from "../Controller/appointmentController.js";
const router = express.Router();

router.post("/addMeetLink", AppointmentController.addMeetLink);
router.post("/updateFeedback", AppointmentController.updateFeedback);
router.post("/sendNotification", AppointmentController.sendNotification);
export default router;

