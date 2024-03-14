import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import useUserProfile from "../../DoctorsPage/Initialpage";

const DoctorForm = () => {
  const navigate=useNavigate();
    const { user, loading } = useUserProfile();

  if (!user) {
     navigate("/")
  }

  if (loading) {
     <div>Loading...</div>;
  }
  const [doctorDetails, setDoctorDetails] = useState({
    name: "",
    email: "",
    specialization: "Physician", // Changed to empty string initially
    experience: "",
    description: "",
  });

  const handleChange = (e) => {
    setDoctorDetails({
      ...doctorDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(doctorDetails);
    const {name,email,specialization,experience,description}=doctorDetails;
    console.log(name);
    console.log(email)
    console.log(experience)
    console.log(description)
    console.log(specialization)
    try{
      const response=await axios.post("http://localhost:5000/api/add",{
      name:name,
      email:email,
      specialization:specialization,
      experience:experience,
      description:description
    })
      console.log(response.data);
    }
    
  catch(err){
    console.log(err);
  }

}

  return (
    <div className="max-w-md mx-auto py-8">
      <h2 className="text-3xl font-bold mb-4 text-center">
        Doctor Registration
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={doctorDetails.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={doctorDetails.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label htmlFor="specialization" className="block mb-1">
            Specialization
          </label>
          <select
            id="specialization"
            name="specialization"
            value={doctorDetails.specialization}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="Physician">Physician</option>
            <option value="Cardiologist">Cardiologist</option>
            <option value="Dentist">Dentist</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Pediatrician">Pediatrician</option>
          </select>
        </div>
        <div>
          <label htmlFor="experience" className="block mb-1">
            Experience
          </label>
          <input
            type="text"
            id="experience"
            name="experience"
            value={doctorDetails.experience}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={doctorDetails.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DoctorForm;
