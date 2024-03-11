import mongoose from "mongoose";

const RequestedPatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobileNo: { type: String, required: true },
  email: { type: String, required: true },
  scheduledTime: { type: String, required: true },
});
const doctorSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    specialization: { type: String, required: true },
    experience: { type: String, required: true },
    description: { type: String, required: true },
    requestedPatients: [RequestedPatientSchema], 
  },
  {
    timestamps: true,
  }
);
const Doctor=mongoose.model("Doctor",doctorSchema);
export default Doctor;
