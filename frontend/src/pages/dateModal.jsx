import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useUserProfile from "../../DoctorsPage/Initialpage";
const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const { doctorId } = useParams();
  const { user, loading } = useUserProfile();
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can handle the submission here, such as sending the selectedDate to the backend
    try {
      const slot = await axios.post("http://localhost:5000/api/get-slots", {
        doctorId: doctorId,
        date: selectedDate,
      });
      console.log(slot.data);
    } catch (err) {
      console.log(err);
    }

    console.log("Submitted Date:", selectedDate);
  };
   console.log(user);
  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit}>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">{doctorId}</h2>
          <h2 className="text-lg font-semibold mb-4">Select a Date</h2>
          <label htmlFor="datePicker" className="text-gray-700">
            Pick a Date:
          </label>
          <input
            type="date"
            id="datePicker"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 mt-2 w-full"
            value={selectedDate}
            onChange={handleDateChange}
          />
          <p className="text-gray-500 mt-2">Selected Date: {selectedDate}</p>
          <input
            type="submit"
            value="Submit"
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 cursor-pointer hover:bg-blue-600"
          />
        </div>
      </form>
    </div>
  );
};

export default DatePicker;
