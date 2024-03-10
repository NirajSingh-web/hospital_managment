import { React, useEffect, useState } from "react";
import LineChart from "./LineChart";
import PloatChart from "./ploty";
import PieChart from "./Piechart";
const Dashboard = () => {
  const [Totalpatient, settotalpatient] = useState([]);
  const [Totalappointment, settotalappointment] = useState([]);
  const [doctor, setDoctor] = useState([]);
  const [totalpayment, settotalpayment] = useState(0);
  const userdata = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    const method = {
      method: "GET",
      headers: {
        "auth-token": userdata.token,
      },
    };
    if (userdata) {
      fetch("http://localhost:4000/patient", method)
        .then((res) => res.json())
        .then((data) => settotalpatient(data.length));
      fetch("http://localhost:4000/Appointment", method)
        .then((res) => res.json())
        .then((data) => settotalappointment(data));
      fetch("http://localhost:4000/payment", method)
        .then((res) => res.json())
        .then((data) => gettotalpayment(data));
      fetch("http://localhost:4000/doctor")
        .then((res) => res.json())
        .then((data) => setDoctor(data));
    }
  }, [userdata["token"]]);
  function gettotalpayment(data) {
    let total = 0;
    if (data != "") {
      data.map(({ Services, payment }) => {
        total += payment["advancePaid"];
        Services.map(({ Cost }) => {
          total += Number(Cost);
        });
        total = total - payment["discount"];
      });
      const dollar = total / 80;
      settotalpayment(dollar);
    }
  }
  return (
    <>
      <div
        className={`sm:m-0 max-sm:p-2 ${
          (doctor && doctor.length === 0) ||
          (Totalappointment && Totalappointment.length === 0)
            ? "bg-[hsl(208,35%,13%)] h-[81.8vh]"
            : "xl:m-5"
        }`}
      >
        {(doctor && doctor.length != 0) ||
        (Totalappointment && Totalappointment.length != 0) ? (
          <>
            <div className="flex xl:justify-between flex-wrap justify-center ">
              <div className="flex items-center  xl:w-[330px] h-[130px] w-[100%] border border-spacing-4  flex-wrap justify-around max-sm:mt-4 bg-[rgb(255,255,255)] rounded-sm">
                <div>
                  <span className="text-[rgb(229,116,152)]">
                    <i className="fa fa-user-o text-5xl h-[70px] w-[70px] outline outline-2 outline-[rgb(229,116,152)] rounded-full flex justify-center items-center"></i>
                  </span>
                </div>
                <div>
                  <div className="text-[rgb(229,116,152)]">
                    <h3>Patients</h3>
                    <h1 className="text-4xl mt-1 mb-1">{Totalpatient}</h1>
                  </div>
                  <p>
                    <span>
                      <i className="fa fa-angle-up pe-2"></i>
                    </span>
                    <span>+20% increased</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center  xl:w-[330px] h-[130px] w-[100%] border border-spacing-4  flex-wrap justify-around max-sm:mt-4 bg-[rgb(255,255,255)] rounded-sm">
                <div>
                  <span className="text-[rgb(85,179,122)]">
                    <i className="fa fa-bar-chart text-5xl h-[70px] w-[70px] outline outline-2 outline-text-[rgb(85,179,122)] rounded-full flex justify-center items-center"></i>
                  </span>
                </div>
                <div>
                  <div className="text-[rgb(85,179,122)]">
                    <h3>Appointments</h3>
                    <h1 className="text-4xl mt-1 mb-1">
                      {Totalappointment.length}
                    </h1>
                  </div>
                  <p>
                    <span>
                      <i className="fa fa-angle-down pe-2"></i>
                    </span>
                    <span>-15% decreased</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center  xl:w-[330px] h-[130px] w-[100%] border border-spacing-4  flex-wrap justify-around max-sm:mt-4 bg-[rgb(255,255,255)] rounded-sm">
                <div>
                  <span className="text-[rgb(229,116,152)]">
                    <i className="fa fa-dollar text-5xl h-[70px] w-[70px] outline outline-2 outline-[text-[rgb(229,116,152)] rounded-full flex justify-center items-center"></i>
                  </span>
                </div>
                <div>
                  <div className="text-[rgb(229,116,152)]">
                    <h3>Total Revenue</h3>
                    <h1 className="text-4xl mt-1 mb-1">{totalpayment}</h1>
                  </div>
                  <p>
                    <span>
                      <i className="fa fa-angle-up pe-2"></i>
                    </span>
                    <span>20% increased</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex xl:justify-between flex-wrap justify-center mt-4">
              <div className=" bg-[hsl(0,0%,100%)]   xl:w-[500px] w-[100%] xl:h-auto h-[240px] max-xl:mb-4 rounded-sm ">
                <h1 className="text-[rgb(229,116,152)] border-b border-spacing-3 text-lg p-2 ms-2">
                  Appointments Year by Year
                </h1>
                <div className="p-3">
                  <LineChart />
                </div>
              </div>
              <div className="bg-[hsl(0,0%,100%)] xl:w-[600px] w-[100%] xl:h-auto h-[250px] rounded-sm ">
                <h1 className="text-[rgb(229,116,152)] border-b border-spacing-3 p-2 text-lg ms-2">
                  Patients Year by Year
                </h1>
                <PloatChart />
              </div>
            </div>
            <div className="flex xl:justify-between flex-wrap justify-center mt-4">
              <div className="bg-[hsl(0,0%,100%)] w-full ">
                <h2 className="text-[rgb(229,116,152)] border-b border-spacing-3  p-2 text-lg ps-2">
                  Appointments
                </h2>
                {Totalappointment ? (
                  <div className="overflow-x-scroll no-scrollbar">
                    <table className="table table-bordered text-center mt-2  table-striped">
                      <thead>
                        <tr>
                          <th>Patient Name</th>
                          <th>Doctor</th>
                          <th>Check-Up</th>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Totalappointment.map(
                          (
                            {
                              PatientId,
                              department,
                              doctorname,
                              date,
                              time,
                              status,
                            },
                            index
                          ) =>
                            index < 10 ? (
                              <tr key={index}>
                                <td>{PatientId}</td>
                                <td>{doctorname}</td>
                                <td>{department}</td>
                                <td>{date}</td>
                                <td>{time}</td>
                                <td>
                                  <span
                                    className={`text-white h6 text-[10px] p-1 rounded-sm ${
                                      status === "Cancel"
                                        ? "bg-[rgb(239,110,110)]"
                                        : status === "completed"
                                        ? "bg-[rgb(60,179,113)]"
                                        : "bg-[rgb(255,170,42)]"
                                    }`}
                                  >
                                    {status}
                                  </span>
                                </td>
                              </tr>
                            ) : null
                        )}
                      </tbody>
                    </table>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="flex xl:justify-between flex-wrap justify-center mt-4">
              <div className="bg-[hsl(0,0%,100%)] sm:w-[40%] w-[100%] max-sm:mb-4">
                <h2 className="text-[rgb(229,116,152)] border-b border-spacing-3  p-2 text-lg ps-2">
                  Appointments Status
                </h2>
                <div className="d-flex justify-center items-center">
                  <PieChart />
                </div>
              </div>
              <div className="bg-[hsl(0,0%,100%)] sm:w-[40%] w-[100%] ">
                <h2 className="text-[rgb(229,116,152)] border-b border-spacing-3  p-2 text-lg ps-2">
                  Doctors Availability
                </h2>
                {doctor ? (
                  <div className="overflow-x-scroll no-scrollbar">
                    <table className="table table-bordered text-center mt-2 ">
                      <thead>
                        <tr>
                          <th>Doctor</th>
                          <th>Speciality</th>
                          <th>D-O-B</th>
                        </tr>
                      </thead>
                      <tbody>
                        {doctor.map(
                          ({ username, specialization, dob }, index) =>
                            index < 6 ? (
                              <tr key={index}>
                                <td>{username}</td>
                                <td>{specialization}</td>
                                {/* <td>
                          <span
                            className={`text-white h6 text-[10px] p-1 rounded-sm ${
                              Availability === "Not Available"
                                ? "bg-[rgb(239,110,110)]"
                                : Availability === "Available"
                                ? "bg-[rgb(60,179,113)]"
                                : "bg-[rgb(255,170,42)]"
                            }`}
                          >
                            {Availability}
                          </span> */}
                                {/* </td> */}
                                <td>{dob.slice(0, 10)}</td>
                              </tr>
                            ) : null
                        )}
                      </tbody>
                    </table>
                  </div>
                ) : null}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-center h-[79.5vh] items-center">
              <div className="card w-[50%] p-3 text-center bg-[hsl(210,56%,25%)] text-white">
                <p>No Data Available</p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default Dashboard;
