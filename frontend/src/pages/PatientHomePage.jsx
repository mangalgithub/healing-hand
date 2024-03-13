import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function PatientHomePage() {
  const [pic, setPic] = useState("");
  const [name, setName] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const userData = await axios.get("http://localhost:5000/api/getprofile", {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
          }
        });

        setUser(userData.data);
        setPic(userData.data.pic);
        setName(userData.data.name);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user profile:', error.message);
        setLoading(false);
      }
    };

    getUserProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/");
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    return <div>User not found</div>;
  }

  

  return (
    <div>
      <div className="bg-emerald-900 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="text-white text-lg font-semibold">Doctor App</Link>
          <div className="flex items-center">
            <img src={pic} alt="User" className="w-8 h-8 rounded-full mr-2" />
            <div className="text-white">{name}</div>
            <button
              onClick={handleLogout}
              className="ml-4 p-2 rounded bg-red-500 text-white"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-8">Specializations</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <Link to="/cardiologist" className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center justify-center transition duration-300 hover:bg-gray-100">
            <img src="https://media.istockphoto.com/id/874103026/photo/heart-stethoscope.jpg?s=612x612&w=0&k=20&c=tjQ8Y2R-x4LToTYHbGBUZ41AlZQLbHO2ixqXQOzwrUw=" alt="Cardiologist" className="w-full h-32 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold">Cardiologist</h3>
          </Link>
          <Link to="/physician" className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center justify-center transition duration-300 hover:bg-gray-100">
            <img src="https://media.istockphoto.com/id/874103026/photo/heart-stethoscope.jpg?s=612x612&w=0&k=20&c=tjQ8Y2R-x4LToTYHbGBUZ41AlZQLbHO2ixqXQOzwrUw=" alt="Physician" className="w-full h-32 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold">Physician</h3>
          </Link>
          <Link to="/neurologist" className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center justify-center transition duration-300 hover:bg-gray-100">
            <img src="https://media.istockphoto.com/id/874103026/photo/heart-stethoscope.jpg?s=612x612&w=0&k=20&c=tjQ8Y2R-x4LToTYHbGBUZ41AlZQLbHO2ixqXQOzwrUw=" alt="Neurologist" className="w-full h-32 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold">Neurologist</h3>
          </Link>
          <Link to="/dentist" className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center justify-center transition duration-300 hover:bg-gray-100">
            <img src="https://media.istockphoto.com/id/874103026/photo/heart-stethoscope.jpg?s=612x612&w=0&k=20&c=tjQ8Y2R-x4LToTYHbGBUZ41AlZQLbHO2ixqXQOzwrUw=" alt="Dentist" className="w-full h-32 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold">Dentist</h3>
          </Link>
          <Link to="/pediatrician" className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center justify-center transition duration-300 hover:bg-gray-100">
            <img src="https://media.istockphoto.com/id/874103026/photo/heart-stethoscope.jpg?s=612x612&w=0&k=20&c=tjQ8Y2R-x4LToTYHbGBUZ41AlZQLbHO2ixqXQOzwrUw=" alt="Pediatrician" className="w-full h-32 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold">Pediatrician</h3>
          </Link>
        </div>
      </div>
    </div>
  );
}
