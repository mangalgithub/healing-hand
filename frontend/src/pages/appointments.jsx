import React from "react";

function Appointments() {
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
                    Time
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Contact Number
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Email
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-3">Patient1</td>
                  <td className="px-4 py-3">2:00pm</td>
                  <td className="px-4 py-3">1234490</td>
                  <td className="px-4 py-3">mnlajf</td>
                </tr>
                <tr>
                  <td className="border-t-2 border-gray-200 px-4 py-3">
                    Patient2
                  </td>
                  <td className="border-t-2 border-gray-200 px-4 py-3">
                    3:00pm
                  </td>
                  <td className="border-t-2 border-gray-200 px-4 py-3">
                    1234490
                  </td>
                  <td className="border-t-2 border-gray-200 px-4 py-3">
                    magjal
                  </td>
                </tr>
                <tr>
                  <td className="border-t-2 border-gray-200 px-4 py-3">
                    Patient3
                  </td>
                  <td className="border-t-2 border-gray-200 px-4 py-3">
                    4:00pm
                  </td>
                  <td className="border-t-2 border-gray-200 px-4 py-3">
                    1234490
                  </td>
                  <td className="border-t-2 border-gray-200 px-4 py-3">
                    magjal
                  </td>
                </tr>
                <tr>
                  <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3">
                    Patient4
                  </td>
                  <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3">
                    5:00pm
                  </td>
                  <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3">
                    1234490
                  </td>
                  <td className="border-t-2 border-gray-200 px-4 py-3">
                    magjal
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
export default Appointments;
