import { useState, useEffect } from "react";
import axios from "axios";

const useUserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

export default useUserProfile;
