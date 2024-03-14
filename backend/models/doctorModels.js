// import mongoose from "mongoose";

// const RequestedPatientSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   mobileNo: { type: String, required: true },
//   email: { type: String, required: true },
//   scheduledTime: { type: String, required: true },
// });
// const doctorSchema = mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     specialization: { type: String, required: true },
//     experience: { type: String, required: true },
//     description: { type: String, required: true },
//     requestedPatients: [RequestedPatientSchema], 
//   },
//   {
//     timestamps: true,
//   }
// );
// const Doctor=mongoose.model("Doctor",doctorSchema);
// export default Doctor;


import mongoose from "mongoose";
const Schema = mongoose.Schema;

const slotSchema = new Schema({
  time: {
    type: String,
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
});

const dateSchedule = new Schema({
  date: {
    type: String,
  },
  slots: [slotSchema],
});

const doctorSchema = new Schema({
  // username: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
  description: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  experience: {
    type: String,
  },
  specialization: {
    type: String,
  },
  dates: [dateSchedule],
});

const Doctor = mongoose.model("Doctor", doctorSchema);
const Slot = mongoose.model("Slot", slotSchema);
const DateSchedule = mongoose.model("DateSchedule", dateSchedule);

export default {
  Doctor,
  Slot,
  DateSchedule,
};