import React ,{useEffect,useState}from "react";
import { useNavigate, useParams } from "react-router-dom";
import useUserProfile from "../../DoctorsPage/Initialpage";
import controllers from "../../../backend/Controller/doctorController.js";
import axios from "axios";
// import useUserProfile from "../../DoctorsPage/Initialpage";
import useDoctorProfile from "../../DoctorsPage/Initialpage";
function Appointments() {
   const [appointments, setAppointments] = useState([]);
   const { user, loading } = useDoctorProfile();

  if (!user) {
     navigate("/")
  }

  if (loading) {
     <div>Loading...</div>;
  }
  const {doctorId}=useParams();
  console.log(doctorId);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/getAcceptedAppointments", {
          params: {
            doctorId: doctorId
          }
        });
        console.log(response.data)

        const uniqueAppointments = response.data.filter((appointment, index, self) =>
        index === self.findIndex((t) => (
          t.patientName === appointment.patientName
        ))
      );
        setAppointments(uniqueAppointments);
      } catch (error) {
        console.log("error is ", error);
      }
    };

    fetchData();
  }, [doctorId]);


  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-600">
              Appointments
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
              gentrify, subway tile poke farm-to-table. Franzen you probably
              haven't heard of them.
            </p>
          </div>
          <div className="lg:w-2/4 w-full mx-auto overflow-auto">
            <table className="table-auto w-full text-left whitespace-no-wrap">
              <thead>
                <tr>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                    Patient
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Date
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Time
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Google Meet Link
                  </th>
                </tr>
              </thead>
              <tbody>
               
                {appointments.map((appointment) => (
                  <tr key={appointment._id}>
                    
                    <th scope="row">{appointment.patientName}</th>
                    {/* <th scope="row">{appointment.slotTime}</th> */}
                    <th scope="row">{new Date(appointment.date).toLocaleDateString("en-GB")}</th>
                    {/* <th scope="row">{appointment.date}</th> */}
                    <th scope="row">{appointment.timeSlot}</th>
                    <th scope="row">
                      <a href={appointment.googleMeetLink} target="_blank">
                        Join Meet
                      </a>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
export default Appointments;
