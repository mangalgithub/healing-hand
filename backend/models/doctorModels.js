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
 const requestedAppointment = new Schema({
       patientName: {
         type: String,
         required: true,
       },
       date: {
         type: Date,
         required: true,
       },
       timeSlot: {
         type: String,
         required: true,
       },
 });
 const acceptedAppointment = new Schema({
  patientName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  timeSlot: {
    type: String,
    required: true,
  },
});
const doctorSchema = new Schema({
  // username: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
  description: {
    type: String
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
  password: {
    type: String,
    required: true,
  },
  pic: {
    type: String,
    // default: "https://res.cloudinary.com/dkxk3h6aa/image/upload/v1625070974/doctorProfilePic_lqzv5p.png",
  },
  role:{
    type:String,
    default:"doctor"
  },
  dates: [dateSchedule],
  requestedAppointment:[requestedAppointment],
  acceptedAppointment:[acceptedAppointment]
});

const Doctor = mongoose.model("Doctor", doctorSchema);
const Slot = mongoose.model("Slot", slotSchema);
const DateSchedule = mongoose.model("DateSchedule", dateSchedule);
const RequestedAppointment=mongoose.model("RequestedAppointment",requestedAppointment);
const AcceptedAppointment=mongoose.model("AcceptedAppointment",acceptedAppointment);
export default {
  Doctor,
  Slot,
  DateSchedule,
  RequestedAppointment,
  AcceptedAppointment
};