import express from "express";
import { savePatientRequest,acceptPatientRequest,saveDoctorDetails } from "../Controller/doctorController.js";
const router = express.Router();
router.post("/saveDoctorDetails", saveDoctorDetails);
router.post("/sendPatientDetail", savePatientRequest);
router.post("/requestAccept", acceptPatientRequest);
export default router;
