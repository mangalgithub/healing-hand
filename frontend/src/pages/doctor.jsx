// import React,{useEffect,useState} from 'react';
// import './doctor.css';
// function Doctor(){
    
//     useEffect(() => {
//     const body = document.querySelector("body"),
//        sidebar = document.querySelector(".sidebar"),
//       toggle = document.querySelector(".toggle"),
//       modeSwitch = document.querySelector(".toggle-switch"),
//       modeText = document.querySelector(".mode-text"),
//       searchBtn = document.querySelector(".search-bar");

//     modeSwitch.addEventListener("click", () => {
//       body.classList.toggle("dark");
//       //   document.querySelector(".mode-text").innertext=""

//       if (body.classList.contains("dark")) {
//         modeText.innerText = " Light Mode ";
//       } else modeText.innerText = " Dark Mode ";
//     });

//     toggle.addEventListener("click", () => {
//       sidebar.classList.toggle("close");
//     });

//     searchBtn.addEventListener("click", () => {
//       sidebar.classList.remove("close");
//     });
//     }, []);
//     return (
//       <>
//         <link
//           href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
//           rel="stylesheet"
//         />
//         <nav className="sidebar">
//           <header>
//             <div className="image-text">
//               <span className="image">
//                 <img
//                   src="https://t4.ftcdn.net/jpg/04/06/91/91/240_F_406919147_D3WsGjwXj1qmFNrei2ZFvBWwiueRcFmg.jpg"
//                   alt="logo"
//                 />
//               </span>
//               <div className="text header-text">
//                 <span className="main">Sidebar</span>
//                 <span className="sub">Component</span>
//               </div>
//             </div>
//             <i className="bx bx-chevron-right toggle" />
//           </header>
//           <div className="menu-bar">
//             <div className="menu">
//               <ul className="menu-links">
//                 <li className="search-bar">
//                   <i className="bx bx-search icons" />
//                   <input type="search" placeholder="Search..." />
//                 </li>
//                 <li className="nav-link">
//                   <a href="#">
//                     <i className="bx bx-home-alt icons" />
//                     <span className="text nav-text">Dashboard</span>
//                   </a>
//                 </li>
//                 <li className="nav-link">
//                   <a href="#">
//                     <i className="bx bx-bar-chart-alt-2 icons" />
//                     <span className="text nav-text">Revenue</span>
//                   </a>
//                 </li>
//                 <li className="nav-link">
//                   <a href="#">
//                     <i className="bx bx-bell icons" />
//                     <span className="text nav-text">Notifications</span>
//                   </a>
//                 </li>
//                 <li className="nav-link">
//                   <a href="#">
//                     <i className="bx bx-pie-chart-alt icons" />
//                     <span className="text nav-text">Analytics</span>
//                   </a>
//                 </li>
//                 <li className="nav-link">
//                   <a href="#">
//                     <i className="bx bx-heart icons" />
//                     <span className="text nav-text">Likes</span>
//                   </a>
//                 </li>
//                 <li className="nav-link">
//                   <a href="#">
//                     <i className="bx bx-wallet-alt icons" />
//                     <span className="text nav-text">Wallets</span>
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <div className="bottom-content">
//               <li className="nav-link">
//                 <a href="#">
//                   <i className="bx bx-log-out icons" />
//                   <span className="text nav-text">Log Out</span>
//                 </a>
//               </li>
//               <li className="mode">
//                 <div className="moon-sun">
//                   <i className="bx bx-moon icons moon" />
//                   <i className="bx bx-sun icons sun" />
//                 </div>
//                 <span className="mode-text text">Dark Mode</span>
//                 <div className="toggle-switch">
//                   <span className="switch" />
//                 </div>
//               </li>
//             </div>
//           </div>
//         </nav>
//       </>
//     );
// }
// export default Doctor;



import React, { useState,useEffect } from "react";
import "./doctor.css";
import ProfilePage from "./profile";
import Appointments from "./appointments";
function Doctor() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  

  const handleToggleClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSearchClick = () => {
    setSidebarOpen(false);
  };
  const handleModeSwitch = () => {
    setDarkMode(!darkMode);
  };
 useEffect(() => {
   const body = document.querySelector("body");

   if (darkMode) {
     body.classList.add("dark");
   } else {
     body.classList.remove("dark");
   }
 }, [darkMode]);

 
  return (
    <>
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
                  <li className="search-bar" onClick={handleSearchClick}>
                    <i className="bx bx-search icons" />
                    <input type="search" placeholder="Search..." />
                  </li>
                  <li className="nav-link">
                    <a href="/doctor">
                      <i className="bx bx-home-alt icons" />
                      <span className="text nav-text">Dashboard</span>
                    </a>
                  </li>
                  <li className="nav-link">
                    <a href="/notification">
                      <i className="bx bx-bell icons" />
                      <span className="text nav-text">Notifications</span>
                    </a>
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
                <li className="nav-link">
                  <a href="#">
                    <i className="bx bx-log-out icons" />
                    <span className="text nav-text">Log Out</span>
                  </a>
                </li>

                {/* dark mode functionality */}
                <li className="mode" onClick={handleModeSwitch}>
                  <div className="moon-sun">
                    <i
                      className={`bx bx-moon icons ${darkMode ? "moon" : ""}`}
                    />
                    <i className={`bx bx-sun icons ${darkMode ? "" : "sun"}`} />
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
