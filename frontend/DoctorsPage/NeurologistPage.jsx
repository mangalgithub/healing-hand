import { Link, useNavigate } from "react-router-dom";
import useUserProfile from "./Initialpage";
import {useEffect,useState} from "react"
import axios from "axios";
const NeurologistDoctors = [
    {
      name: "Dr. William Taylor",
      rating: 4.6,
      experience: "11 years",
      phoneNumber: "+1987654321",
      photo: "https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg",
    },
    {
      name: "Dr. Lily Moore",
      rating: 4.3,
      experience: "8 years",
      phoneNumber: "+1346798521",
      photo: "https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg",
    },
    {
      name: "Dr. Benjamin Hall",
      rating: 4.8,
      experience: "14 years",
      phoneNumber: "+1456789234",
      photo: "https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg",
    },
    {
      name: "Dr. Olivia Wright",
      rating: 4.5,
      experience: "10 years",
      phoneNumber: "+1567890123",
      photo: "https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg",
    },
    {
      name: "Dr. Ethan Parker",
      rating: 4.7,
      experience: "13 years",
      phoneNumber: "+1122334455",
      photo: "https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg",
    },
  ];


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
        <Link to="/appointment" className="block  bg-red-500 px-4 py-2 rounded-md hover:bg-emerald-600">
          Book Appointment
        </Link>
      </div>
    );
  };
  
  export const NeurologistPage = () => {
    const navigate=useNavigate();
    const { user, loading } = useUserProfile();

  if (!user) {
     navigate("/")
  }
  if(loading){
    <div>Loading</div>
  }
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
  if (loading) {
    return <div>Loading...</div>;
  }
  console.log(doctors)
  const NeurologistDoctors = doctors.filter(doctor => doctor.specialization === 'Neurologist');
    return (
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-4">Neurologist Doctors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {NeurologistDoctors.map((doctor, index) => (
            <DoctorCard key={index} doctor={doctor} />
          ))}
        </div>
      </div>
    );
  };
  