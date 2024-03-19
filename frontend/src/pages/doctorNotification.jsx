
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";
// import useUserProfile from "../../DoctorsPage/Initialpage";
import useDoctorProfile from "../../DoctorsPage/DoctorInitialpage";
import axios from "axios";
const PatientData = () => {
  const navigate = useNavigate();
  const { user, loading } = useDoctorProfile();
  const [requestedAppointments, setRequestedAppointments] = useState([]);
  const { doctorId } = useParams();
  console.log(doctorId);
  console.log(user);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/getRequestedAppointments", {
          params: {
            doctorId: doctorId
          }
        });
        setRequestedAppointments(response.data);
      } catch (error) {
        console.log("error is ", error);
      }
    };

    fetchData();
  }, [doctorId]);

  const handleAccept = async (patient,index) => {
    const response = await axios.post("http://localhost:5000/api/acceptedAppointments", {
      doctorId: doctorId,
      patientName: patient.patientName,
      date: patient.date,
      timeSlot: patient.timeSlot
    });
    console.log(response);
    const updatedPatients = [...requestedAppointments];
    updatedPatients.splice(index, 1);
    setRequestedAppointments(updatedPatients);
    toast.success("Acceptance request has been accepted");
    
  };

  const handleReject = (index) => {
    const updatedPatients = requestedAppointments.filter((_, i) => i !== index);
    setRequestedAppointments(updatedPatients);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <Toaster/>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Patient Data</h1>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 px-4 py-2">Name</th>
            <th className="border border-gray-200 px-4 py-2">Date</th>
            <th className="border border-gray-200 px-4 py-2">Scheduled Time</th>
            <th className="border border-gray-200 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {requestedAppointments.map((appointment, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              <td className="border border-gray-200 px-4 py-2">
                {appointment.patientName}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {new Date(appointment.date).toLocaleDateString("en-GB")}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {appointment.timeSlot}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                <button
                  className="bg-green-500 text-white px-4 py-2 mr-2 rounded hover:bg-green-600"
                  onClick={() => handleAccept(appointment,index)}
                >
                  Accept
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => handleReject(index)}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default PatientData;
