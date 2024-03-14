import React from "react";
import { useNavigate } from "react-router-dom";
import useUserProfile from "../../DoctorsPage/Initialpage";

const PatientData = () => {
  const navigate=useNavigate();
    const { user, loading } = useUserProfile();

  if (!user) {
     navigate("/")
  }

  if (loading) {
     <div>Loading...</div>;
  }
  const patients = [
    {
      name: "John Doe",
      mobileNo: "123-456-7890",
      email: "john@example.com",
      scheduledTime: "2024-03-09 10:00 AM",
    },
    {
      name: "Jane Smith",
      mobileNo: "987-654-3210",
      email: "jane@example.com",
      scheduledTime: "2024-03-10 11:30 AM",
    },
    // Add more patients as needed
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Patient Data</h1>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 px-4 py-2">Name</th>
            <th className="border border-gray-200 px-4 py-2">Mobile No</th>
            <th className="border border-gray-200 px-4 py-2">Email</th>
            <th className="border border-gray-200 px-4 py-2">Scheduled Time</th>
            <th className="border border-gray-200 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              <td className="border border-gray-200 px-4 py-2">
                {patient.name}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {patient.mobileNo}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {patient.email}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {patient.scheduledTime}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                <button className="bg-green-500 text-white px-4 py-2 mr-2 rounded hover:bg-green-600">
                  Accept
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientData;
