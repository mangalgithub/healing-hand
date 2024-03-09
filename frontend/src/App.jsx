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
    }
  ]);
  return (
    <>
     <RouterProvider router={router} />
    </>
  );
}

export default App;