import { Link, useNavigate } from "react-router-dom";
import { useState ,useEffect} from "react";
import useUserProfile from "./Initialpage";
import axios from "axios";



const DoctorCard = ({ doctor }) => {
  
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <img src={doctor.photo} alt={doctor.name} className="w-full h-40 object-cover rounded-md mb-4" />
      <h3 className="text-xl font-semibold mb-2">{doctor.name}</h3>
      <div className="flex items-center mb-2">
        <span className="text-gray-600 mr-2">Rating:</span>
        <span className="text-gray-800">{doctor.rating} stars</span>
      </div>
      <div className="flex items-center mb-2">
        <span className="text-gray-600 mr-2">Experience:</span>
        <span className="text-gray-800">{doctor.experience}</span>
      </div>
      <div className="flex items-center mb-2">
        <span className="text-gray-600 mr-2">Phone:</span>
        <span className="text-gray-800">{doctor.phoneNumber}</span>
      </div>
      <Link to="/appointment" className="block bg-red-500  px-4 py-2 rounded-md hover:bg-emerald-600"
        onClick={()=>{
          console.log(doctor._id)
        }}
      >
        Book Appointment
      </Link>
    </div>
  );
};

export const CardiologistPage = () => {
  const navigate=useNavigate();
  const { user, loading } = useUserProfile();
  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    const getDoctors = async () => {
      try {
        const doctorData = await axios.get("http://localhost:5000/api/");
        console.log(doctorData.data);
        setDoctors(doctorData.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };
    getDoctors();
  }, []);

  console.log(doctors);
 
  
  // if (!user) {
  //   return navigate("/")
  // }

  if (loading) {
    return <div>Loading...</div>;
  }


  const cardiologistDoctors = doctors.filter(doctor => doctor.specialization === 'Cardiologist');
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-semibold mb-4">Cardiologist Doctors</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {cardiologistDoctors.map((doctor, index) => (
          <DoctorCard key={index} doctor={doctor} />
        ))}
      </div>
    </div>
  );
};


