import React, { useState } from "react";

const TimeSlotSelector = () => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [submittedTimeSlot, setSubmittedTimeSlot] = useState("");

  const timeSlots = [
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 1:00 PM",
    "1:00 PM - 2:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM",
  ];

  const handleTimeSlotChange = (e) => {
    setSelectedTimeSlot(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedTimeSlot(selectedTimeSlot);
    try {
      console.log("Submitted Time Slot:", selectedTimeSlot);
    } catch (err) {
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
              <option key={index} value={slot}>
                {slot}
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
