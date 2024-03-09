import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/home";
import Doctor from "./pages/doctor";
import ProfilePage from "./pages/profile";
import PatientData from "./pages/doctorNotification";
import Review from "./pages/doctorReview";
import {  CardiologistPage } from "../DoctorsPage/CardiologistPage";
import PatientHomePage from "./pages/PatientHomePage";
import {  PhysicianPage } from "../DoctorsPage/PhysicianPage";
import { DentistPage } from "../DoctorsPage/DentistPage";
import { NeurologistPage } from "../DoctorsPage/NeurologistPage";
import { PediatricianPage } from "../DoctorsPage/PediatricianPage";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login></Login>
    },
    {
      path:"/signup",
      element:<Signup></Signup>
    },
    {
      path:"/home",
      element:<Home></Home>
    },
    {

      path:"/doctor",
      element:<Doctor></Doctor>
    },
    {
      path:"/profile",
      element:<ProfilePage></ProfilePage>
    },
    {
      path:"/notification",
      element:<PatientData></PatientData>
    },
    {
      path:"/review",
      element:<Review></Review>
    },{
      path:"/patient",
      element:<PatientHomePage></PatientHomePage>
    }
    ,
    {
      path:"/cardiologist",
      element:<CardiologistPage></CardiologistPage>
    }
    ,
    {
      path:"/physician",
      element:<PhysicianPage></PhysicianPage>
    }
    ,
    {
      path:"/dentist",
      element:<DentistPage></DentistPage>
    }
    ,
    {
      path:"/neurologist",
      element:<NeurologistPage></NeurologistPage>
    }
    ,
    {
      path:"/pediatrician",
      element:<PediatricianPage></PediatricianPage>

    }
  ]);
  return (
    <>
     <RouterProvider router={router} />
    </>
  );
}

export default App;