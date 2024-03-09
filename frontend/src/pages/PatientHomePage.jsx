import { Link } from "react-router-dom";

export default function PatientHomePage() {
  // Dummy data for the user's name and photo
  const userName = "John Doe";
  const userPhoto = "https://via.placeholder.com/40";

  return (
    <div>
      <div className="bg-emerald-900 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="text-white text-lg font-semibold">Doctor App</Link>
          <div className="flex items-center">
            <img src={userPhoto} alt="User" className="w-8 h-8 rounded-full mr-2" />
            <div className="text-white">{userName}</div>
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
