import appointmentModels from "../models/appointmentModels.js";
import doctorModels from "../models/doctorModels.js";
const { Appointment, Feedback } = appointmentModels;
const { Doctor,RequestedAppointment } = doctorModels;

// Controller for adding meet link to an appointment
const AppointmentController = {
  addMeetLink : (req, res) => {
    const meetLink = req.body.meetLink;
    const appointmentId = req.body.appointmentId;

    // Find the appointment by its ID
    Appointment.findOne({ _id: appointmentId }).then((appointment) => {
        if (appointment) {
            // Update the meet link of the appointment
            appointment.googleMeetLink = meetLink;
            console.log(`Received meet link : ${meetLink}`);

            // Save the updated appointment
            appointment.save().then(() => {
                console.log(`Updated the meet link!`);
                res.status(200).json({ message: "Meet link updated!" });
            }).catch((err) => {
                console.log(`Cannot add meet link to the appointment due to ${err}`);
                res.status(400).json({ message: `Cannot add meet link to the appointment due to ${err}` });
            });
        } else {
            // If appointment is not found
            res.status(404).json({ message: "Appointment not found!" });
        }
    }).catch(err => {
        console.log(`Error finding appointment: ${err}`);
        res.status(400).json({ message: `Error finding appointment: ${err}` });
    });
},

// Controller for updating feedback for an appointment
 updateFeedback : (req, res) => {
    const appointmentId = req.body.appointmentId;
    const stars = req.body.stars;
    const title = req.body.title;
    const review = req.body.review;

    // Find the appointment by its ID
    Appointment.findOne({ _id: appointmentId }).then((appointment) => {
        if (appointment) {
            // Update feedback details of the appointment
            appointment.feedback.stars = stars;
            appointment.feedback.title = title;
            appointment.feedback.review = review;
            appointment.feedback.given = true;

            // Save the updated appointment
            appointment.save().then(() => {
                res.status(200).json({ message: `Feedback updated successfully!` });
            }).catch(err => {
                console.log(err);
                res.status(400).json({ message: `Error updating feedback: ${err}` });
            });
        } else {
            // If appointment is not found
            res.status(404).json({ message: "Appointment not found!" });
        }
    }).catch(err => {
        console.log(`Error finding appointment: ${err}`);
        res.status(400).json({ message: `Error finding appointment: ${err}` });
    });
},
 sendNotification:(req,res)=>{
    try {
  const { patientName, date, timeSlot } = req.body;
   console.log("patientName ",patientName);
    console.log("date ",date);
    console.log("timeSlot ",timeSlot);
  const response={
    message:"Notification sent successfully",
    data:{  
        patientName:patientName,
        date:date,
        timeSlot:timeSlot
    }
  
  }
  res.status(200).json(response);
//   res.status(200).json({ message: 'Notification sent successfully' });
} catch (err) {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
}
}
};
export default AppointmentController;
