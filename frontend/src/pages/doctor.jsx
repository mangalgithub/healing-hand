import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./doctor.css";
import Appointments from "./appointments";
import useDoctorProfile from "../../DoctorsPage/DoctorInitialpage";

function Doctor() {
  const navigate=useNavigate();
    const { user, loading } = useDoctorProfile();
    console.log(user);
   



  if (!user) {
     navigate("/")
  }

  if (loading) {
     <div>Loading...</div>;
  }
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const userName = "John doe"
  const userPhoto = "https://via.placeholder.com/40";

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/");
  };
  const handleToggleClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleModeSwitch = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    console.log("Doctor page loaded");
    const body = document.querySelector("body");

    if (darkMode) {
      body.classList.add("dark");
    } else {
      body.classList.remove("dark");
    }
  }, [darkMode]);
  console.log(user)
  // const doctorId=1;

  const doctorId=user.id;
  console.log(doctorId)
  // console.log(doctorId)
  return (
    <>
        <div className="bg-emerald-900 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="text-white text-lg font-semibold">Doctor App</Link>
          <div className="flex items-center">
            <img src={userPhoto} alt="User" className="w-8 h-8 rounded-full mr-2" />
            <div className="text-white">{userName}</div>
            <button
              onClick={handleLogout}
              className="ml-4 p-2 rounded bg-red-500 text-white"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <link
        href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        rel="stylesheet"
      />
      <div>
        <div>
          <nav className={`sidebar ${sidebarOpen ? "" : "close"}`}>
            <header>
              <div className="image-text">
                <span className="image">
                  <img
                    src="https://t4.ftcdn.net/jpg/04/06/91/91/240_F_406919147_D3WsGjwXj1qmFNrei2ZFvBWwiueRcFmg.jpg"
                    alt="logo"
                  />
                </span>
                <div className="text header-text">
                  <span className="main">Healing</span>
                  <span className="sub">Hand</span>
                </div>
              </div>
              <i
                className="bx bx-chevron-right toggle"
                onClick={handleToggleClick}
              />
            </header>
            <div className="menu-bar">
              <div className="menu">
                <ul className="menu-links">
                  <li className="search-bar">
                    <i className="bx bx-search icons" />
                    <input type="search" placeholder="Search..." />
                  </li>
                  {/* <li className="nav-link">
                    <a href="/doctor">
                      <i className="bx bx-home-alt icons" />
                      <span className="text nav-text">Dashboard</span>
                    </a>
                  </li> */}
                  <li className="nav-link">
                    <Link to={`/doctor/${doctorId}`}>
                    {/* <Link to="/notification"> */}
                      <i className="bx bx-bell icons" />
                      <span className="text nav-text">DashBoard</span>
                    </Link>
                  </li>
                  <li className="nav-link">
                    <Link to={`/notification/${doctorId}`}>
                    {/* <Link to="/notification"> */}
                      <i className="bx bx-bell icons" />
                      <span className="text nav-text">Notifications</span>
                    </Link>
                  </li>

                  <li className="nav-link">
                    <a href="/review">
                      <i className="bx bx-heart icons" />
                      <span className="text nav-text">Reviews</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="bottom-content">
              

                {/* dark mode functionality */}
                <li className="mode" onClick={handleModeSwitch}>
                  <div className="moon-sun">
                    <i
                      className={`bx bx-moon icons ${darkMode ? "moon" : ""}`}
                    />
                    <i
                      className={`bx bx-sun icons ${darkMode ? "" : "sun"}`}
                    />
                  </div>
                  <span className="mode-text text">
                    {darkMode ? "Light Mode" : "Dark Mode"}
                  </span>
                  <div className="toggle-switch">
                    <span className={`switch ${darkMode ? "dark" : ""}`} />
                  </div>
                </li>
              </div>
            </div>
          </nav>
        </div>
        <div>
          <Appointments></Appointments>
        </div>
      </div>
    </>
  );
}

export default Doctor;
