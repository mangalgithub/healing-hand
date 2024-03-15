import express from "express";
import controllers from "../Controller/doctorController.js";
const router = express.Router();

router.get("/", controllers.getAllDoctors);
// router.get("/:id", controllers.getDoctor);
router.post("/add", controllers.addDoctor);
router.put("/update", controllers.updateDoctor);
router.post("/login", controllers.doctorLogin);
router.post("/get-slots", controllers.getSlots);
router.post("/book-slot", controllers.bookSlot);
router.post("/appointments", controllers.getAppointments);
router.get("/appointment/:id", controllers.getAppointmentById);
router.post("/todays-appointments", controllers.getTodaysAppointments);
router.post("/previous-appointments", controllers.getPreviousAppointments);
export default router;