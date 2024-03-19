import doctors from "../models/doctorModels.js";
import appointmentImport from "../models/appointmentModels.js";
const { Doctor, Slot, DateSchedule } = doctors;
const { Appointment, Feedback } = appointmentImport;

function createDate(date) {
  return new DateSchedule({
    date: date,
    slots: [
      new Slot({
        time: "09:00:00",
        isBooked: false,
      }),
      new Slot({
        time: "12:00:00",
        isBooked: false,
      }),
      new Slot({
        time: "15:00:00",
        isBooked: false,
      }),
    ],
  });
}

const controllers = {
  getAllDoctors: (req, res) => {
    Doctor.find()
      .then((doctors) => {
        res.json(doctors);
      })
      .catch((err) => {
        res.status(400).json(`Error : ${err}`);
      });
  },
 
  addDoctor: (req, res) => {
    const name = req.body.name; // Required.. can't be undefined
    const email = req.body.email;
    // const name = req.body.name;
    const experience = req.body.experience;
    const specialization = req.body.specialization;
    const description=req.body.description;
    // const feesPerSession = req.body.feesPerSession;

    const newDoctor = new Doctor({
      name,
      email,
      experience,
      specialization,
      description
    });

    newDoctor
      .save()
      .then(() => {
        
        res.json(newDoctor);
        console.log(`${newDoctor} added!`)
      })
      .catch((err) => {
        res.status(400).json(`Error : ${err}`);
        console.log(err);
      });
  },

  updateDoctor: (req, res) => {
    // Implementation for updating a doctor
    const name = req.body.name; // Required.. can't be undefined

    Doctor.findOne({ name: name }).then((doctor) => {
      if (doctor) {
        // doctor.username = req.body.username;
        doctor.description = req.body.description;
        doctor.specialization = req.body.specialization;
        doctor.experience=req.body.experience;
        // doctor.feesPerSession = req.body.feesPerSession;

        doctor
          .save()
          .then(() => {
            res.json("Doctor updated");
            // console.log(`${doctor} updated!`)
          })
          .catch((err) => {
            res.status(400).json(`Error : ${err}`);
            // console.log(err);
          });
      }
    });
  },

 
  getSlots: async (req, res) => {
    // Implementation for getting slots available for a date
    try {
      const id = req.body.doctorId; // Doctor's id
      const date = req.body.date; // Date to book

      const doctor = await Doctor.findOne({ _id: id });

      // Doctor not found
      if (doctor === null) {
         return res.json({message:"Doctor not found in the database!"})
      }
      
      // Doctor found
      // Find the date
      let count = 0;
      for (const i of doctor.dates) {
        if (i.date === date) {
          return res.status(200).json(i);
        }
        count++;
      }

      const oldLength = count;

      // Add new slots if date not found in the db
      const dateSchedule = createDate(date);
      const updatedDoctor = await Doctor.findOneAndUpdate(
        { _id: doctor._id },
        { $push: { dates: dateSchedule } },
        { new: true }
      );

      if (updatedDoctor) {
        return res.status(200).json(updatedDoctor.dates[oldLength]);
      } else {
        const err = { err: "an error occurred!" };
        throw err;
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        message: err,
      });
    }
  },

  bookSlot: (req, res) => {
    // Implementation for booking a slot
    // const patientId = req.body.googleId; // Patient's google id
    const patientName = req.body.patientName; // Patient's name
    const doctorId = req.body.doctorId; // Doctor's id 606460d2e0dd28cc76d9b0f3
    const slotId = req.body.slotId; // Id of that particular slot
    const dateId = req.body.dateId; // Id of that particular date
    const meetLink = "";

    Doctor.findOne({ _id: doctorId }).then((doctor) => {
      const date = doctor.dates.id(dateId);
      const slot = date.slots.id(slotId);
      console.log("slot ", slot);
      slot.isBooked = true;
      doctor
        .save()
        .then(() => {
          // Create an entry in the appointment database
          const newAppointment = new Appointment({
            doctorId,
            dateId,
            slotId,
            patientId,
            date: date.date,
            slotTime: slot.time,
            doctorName: doctor.name,
            doctorEmail: doctor.email,
            patientName: patientName,
            googleMeetLink: meetLink,
            feedback: new Feedback(),
          });

          console.log(newAppointment);

          newAppointment
            .save()
            .then((appointment) => {
              return res.status(200).json(appointment);
            })
            .catch((err) => {
              console.log(err);
              res.status(400).json(err);
            });
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json({
            message: `An error occurred : ${err}`,
          });
        });
    });
  },

  getAppointments: async (req, res) => {
  try {
    const doctorId = req.body.doctorId;
    const appointments = await Appointment.find({
      doctorId: doctorId,
    });
    // res.status(200).json(appointments);
    const sortedAppointments = appointments.sort((a, b) => {
      return (
        Date.parse(b.date + "T" + b.slotTime) -
        Date.parse(a.date + "T" + a.slotTime)
      );
    });

    res.status(200).json(sortedAppointments);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
  },

  getAppointmentById: async (req, res) => {
    // Implementation for getting an appointment by ID
    try {
      const appointmentId = req.params.id;
      const appointment = await Appointment.findOne({
        _id: appointmentId,
      });

      res.status(200).json(appointment);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  getTodaysAppointments: async (req, res) => {
    // Implementation for getting today's appointments of a doctor
    try {
      const date = new Date();
      let currDate = date.getFullYear().toString();
      const month = date.getMonth() + 1;
      const day = date.getDate();

      currDate += month < 10 ? "-0" + month.toString() : "-" + month.toString();
      currDate += day < 10 ? "-0" + day.toString() : "-" + day.toString();
       console.log("currDate",currDate);
      const doctorId = req.body.doctorId;

      const appointments = await Appointment.find({
        doctorId: doctorId,
        date: currDate,
      });

      const sortedAppointments = appointments.sort((a, b) => {
        return (
          Date.parse(a.date + "T" + a.slotTime) -
          Date.parse(b.date + "T" + b.slotTime)
        );
      });

      res.status(200).json(sortedAppointments);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  requestedAppointment: async (req, res) => {
    try {
      const { patientName, date, timeSlot,doctorId } = req.body;
      // const doctorId = req.params.doctorId;
      // console.log(doctorId);
      // Find the doctor by ID
      const doctor = await Doctor.findById(doctorId);
      if (!doctor) {
        return res.status(404).json({ error: 'Doctor not found' });
      }

      // Create a new requested appointment
      doctor.requestedAppointment.push({ patientName, date, timeSlot });
      await doctor.save();

      res.status(201).json({ message: 'Requested appointment created successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
acceptedAppointment: async (req, res) => {
    try {
      const { patientName, date, timeSlot,doctorId } = req.body;
      // const doctorId = req.params.doctorId;
      // console.log(doctorId);
      // Find the doctor by ID
      const doctor = await Doctor.findById(doctorId);
      if (!doctor) {
        return res.status(404).json({ error: 'Doctor not found' });
      }

      // Create a new requested appointment
      doctor.acceptedAppointment.push({ patientName, date, timeSlot });
      await doctor.save();

      res.status(201).json({ data: {
        patientName:patientName,
        date:date,
        timeSlot:timeSlot
      } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getRequestedAppointments: async(req,res)=>{
    try {
      const {doctorId}=req.query;
      //  const doctorId="65f1fa27d91fc58416e36a9c"
      // console.log(doctorId);
      console.log(doctorId);
      // const doctorId = req.params.doctorId;

      // Find the doctor by ID
      const doctor = await Doctor.findById(doctorId);
      if (!doctor) {
        return res.status(404).json({ error: 'Doctor not found' });
      }

      // Get the requested appointments for the doctor
      const requestedAppointments = doctor.requestedAppointment;

      res.status(200).json(requestedAppointments);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  getAcceptedAppointments: async(req,res)=>{
    try {
      const {doctorId}=req.query;
      
      //  const doctorId="65f1fa27d91fc58416e36a9c"
      // console.log(doctorId);
      console.log(doctorId);
      // const doctorId = req.params.doctorId;

      // Find the doctor by ID
      const doctor = await Doctor.findById(doctorId);
      if (!doctor) {
        return res.status(404).json({ error: 'Doctor not found' });
      }

      // Get the requested appointments for the doctor
      const acceptedAppointments = doctor.acceptedAppointment;

      res.status(200).json(acceptedAppointments);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },




  getPreviousAppointments: async (req, res) => {
    // Implementation for getting previous appointments of a doctor
    try {
      const doctorId = req.body.doctorId;

      const appointments = await Appointment.find({ doctorId: doctorId });

      // Get current dateTime
      const date = new Date();
      let currDateTime = date.getFullYear().toString();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();

      currDateTime +=
        month < 10 ? "-0" + month.toString() : "-" + month.toString();
      currDateTime += day < 10 ? "-0" + day.toString() : "-" + day.toString();
      currDateTime +=
        hour < 10 ? "T0" + hour.toString() : "T" + hour.toString();
      currDateTime +=
        minutes < 10 ? ":0" + minutes.toString() : ":" + minutes.toString();
      currDateTime +=
        seconds < 10 ? ":0" + seconds.toString() : ":" + seconds.toString();

      const filteredAppointments = appointments.filter((appointment) => {
        return (
          Date.parse(currDateTime) >=
          Date.parse(appointment.date + "T" + appointment.slotTime)
        );
      });

      const sortedAppointments = filteredAppointments.sort((a, b) => {
        return (
          Date.parse(b.date + "T" + b.slotTime) -
          Date.parse(a.date + "T" + a.slotTime)
        );
      });

      res.status(200).json(sortedAppointments);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },
};

export default controllers;