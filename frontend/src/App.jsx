import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/home";
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
    }
  ]);
  return (
    <>
     <RouterProvider router={router} />
    </>
  );
}

export default App;