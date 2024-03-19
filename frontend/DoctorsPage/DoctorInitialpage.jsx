import { useState, useEffect } from "react";
import axios from "axios";
const temp={
  id:"is"
}
const useDoctorProfile = () => {
  const [user, setUser] = useState(temp);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const userData = await axios.get("http://localhost:5000/api/getDoctor", {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
          }
        });
        console.log(userData)
        setUser(userData.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user profile:', error.message);
        setLoading(false);
      }
    };

    getUserProfile();
  }, []);

  return { user, loading };
};

export default useDoctorProfile;
