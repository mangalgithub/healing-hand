import { Link, useNavigate } from "react-router-dom";
import useUserProfile from "./Initialpage";
import axios from "axios";
import { useState ,useEffect} from "react";
  const DoctorCard = ({ doctor }) => {
    return (
      <div className="bg-white shadow-lg rounded-lg p-4">
        <img src="https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg" alt="https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg" className="w-full h-40 object-cover rounded-md mb-4" />
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
        <Link to={`/dateModal/${doctor._id}` }className="block bg-red-500  px-4 py-2 rounded-md hover:bg-emerald-600">
        Book Appointment
      </Link>
      </div>
    );
  };
  
  export const PhysicianPage = () => {
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
  if (!user) {
    return navigate("/")
  }
  const PhysicianDoctors = doctors.filter(doctor => doctor.specialization === 'Physician');
    return (
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-4">Physician Doctors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {PhysicianDoctors.map((doctor, index) => (
            <DoctorCard key={index} doctor={doctor} />
          ))}
        </div>
      </div>
    );
  };
  