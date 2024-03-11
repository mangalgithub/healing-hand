import Doctor from "../models/doctorModels.js";
import mongoose from "mongoose";
// Controller function to handle saving patient details in RequestedPatientSchema

const saveDoctorDetails = async (req, res) => {
  try {
    const { name, email, specialization, experience, description } = req.body;

    // Create a new instance of Doctor model
    const newDoctor = new Doctor({
      name,
      email,
      specialization,
      experience,
      description,
    });

    // Save the doctor details to the database
    await newDoctor.save();

    res.status(201).json({ message: "Doctor details saved successfully" });
  } catch (error) {
    console.error("Error saving doctor details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const savePatientRequest = async (req, res) => {
  try {
    // const { doctorId, patientDetails } = req.body;
       const {name,email,mobileNo,time,doctorId}=req.body;
    // Find the doctor by ID
   
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Push the patient details to the acceptedPatients array
    doctor.acceptedPatients.push({
      name: patientDetails.name,
      email: patientDetails.email,
      mobileNo: patientDetails.mobileNo,
      scheduledTime: patientDetails.scheduledTime,
    });

    // Save the doctor with the updated patient details
    await doctor.save();

    res.status(200).json({ message: "Patient request saved successfully" });
  } catch (error) {
    console.error("Error saving patient request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to handle accepting a patient request
const acceptPatientRequest = async (req, res) => {
  try {
    const { doctorId, patientIndex } = req.body;

    // Find the doctor by ID
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Move the patient details from requested to accepted
    const acceptedPatient = doctor.acceptedPatients[patientIndex];

    // Remove the patient details from requested array
    doctor.acceptedPatients.splice(patientIndex, 1);

    // Save the updated doctor with accepted patient
    await doctor.save();

    res
      .status(200)
      .json({
        message: "Patient request accepted successfully",
        acceptedPatient,
      });
  } catch (error) {
    console.error("Error accepting patient request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { savePatientRequest, acceptPatientRequest ,saveDoctorDetails};
