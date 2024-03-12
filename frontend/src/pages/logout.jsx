import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LogoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = () => {
      // Clear token from localStorage
      localStorage.removeItem("token");

      // Remove Authorization header from axios defaults
      delete axios.defaults.headers.common["Authorization"];

      // Navigate to login page
      navigate("/");
    };

    logout();
  }, []);

  return <div>Logging out...</div>;
}
