import { Link } from "react-router-dom";
const DentistDoctors = [
    {
      name: "Dr. Samantha Johnson",
      rating: 4.4,
      experience: "9 years",
      phoneNumber: "+1122334455",
      photo: "https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg",
    },
    {
      name: "Dr. Noah Garcia",
      rating: 4.1,
      experience: "7 years",
      phoneNumber: "+1654327890",
      photo: "https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg",
    },
    {
      name: "Dr. Abigail Martinez",
      rating: 4.9,
      experience: "15 years",
      phoneNumber: "+1987654321",
      photo: "https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg",
    },
    {
      name: "Dr. Elijah Lopez",
      rating: 4.2,
      experience: "8 years",
      phoneNumber: "+1456789234",
      photo: "https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg",
    },
    {
      name: "Dr. Ava Thompson",
      rating: 4.7,
      experience: "12 years",
      phoneNumber: "+1567890123",
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
  
  export const DentistPage = () => {
    return (
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-4">Physician Doctors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {DentistDoctors.map((doctor, index) => (
            <DoctorCard key={index} doctor={doctor} />
          ))}
        </div>
      </div>
    );
  };
  