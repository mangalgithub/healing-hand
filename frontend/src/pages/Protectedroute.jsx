import { connectStorageEmulator } from 'firebase/storage';
import { useEffect, useState } from 'react';
import axios from 'axios';
function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const token=localStorage.getItem('token');
        const userData = await axios.get("http://localhost:5000/api/getprofile",{
          headers:{
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
          }

        });
        
        setUser(userData.data);
        console.log(user)
      } catch (error) {
        console.error('Error fetching user profile:', error.message);
      } finally {
        setLoading(false);
      }
    };

    getUserProfile();
  }, []);


  

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
      {/* Display other user info */}
     
    </div>
  );
}

export default UserProfile;
