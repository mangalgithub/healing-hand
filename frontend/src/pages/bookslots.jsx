import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import useUserProfile from "../../DoctorsPage/Initialpage";
const TimeSlotSelector = () => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [submittedTimeSlot, setSubmittedTimeSlot] = useState("");
   const { state } = useLocation();
   const { doctorId } = useParams();
   console.log(doctorId);
    const { date, slots } = state || {};
     const { user, loading } = useUserProfile();
     console.log("user",user);
    console.log("slots",slots);
  const timeSlots = slots.slots;
  console.log("timeslot",timeSlots);
  const handleTimeSlotChange = (e) => {
    setSelectedTimeSlot(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setSubmittedTimeSlot(selectedTimeSlot);
      try {
      const response = await axios.post("http://localhost:5000/api/sendNotification", {
        patientName: user.name,
        date: date,
        timeSlot: selectedTimeSlot,
      });
      console.log(response.data.data); // Log the response from the backend

      console.log("Submitted Time Slot:", selectedTimeSlot);
    } catch (err) {
      console.log(err);
    }

    try{
      const response= await axios.post("http://localhost:5000/api/requestedAppointments",{
        patientName:user.name,
        date:date,
        timeSlot:selectedTimeSlot,
        doctorId:doctorId
      });

      console.log(response);
      
    }catch(err){
      console.log(err);
    }

  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Select a Time Slot</h2>
        <form onSubmit={handleSubmit}>
          <select
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 mt-2 w-full"
            value={selectedTimeSlot}
            onChange={handleTimeSlotChange}
          >
            <option value="">Select Time Slot</option>
            {timeSlots.map((slot, index) => (
              <option key={index} value={slot.time}>
                {slot.time}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 cursor-pointer hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
        {submittedTimeSlot && (
          <p className="text-gray-500 mt-2">
            Submitted Time Slot: {submittedTimeSlot}
          </p>
        )}
      </div>
    </div>
  );
};

export default TimeSlotSelector;
