import { React, useEffect, useState } from "react";
import Loader from "../Loader/Loader";
const AddAppointments = () => {
  const [PatientID, setPatientID] = useState("");
  const [Department, setDepartment] = useState("Neuro");
  const [Doctor_Name, setDoctor_Name] = useState("");
  const [Appointment_Date, setAppointment_Date] = useState("");
  const [Time, setTime] = useState("10AM-11AM");
  const [Doctorid, setdoctorId] = useState("");
  const [Problem, SetProblem] = useState("");
  const [Confirm, setconfirm] = useState(false);
  const [formSubmissions, setFormSubmissions] = useState({});
  const [Departmentlist, Setdepartmentlist] = useState("");
  const [loader, setloader] = useState(false);
  const [Alert, setalert] = useState("");
  // this method is providing value null for Alert 
  useEffect(() => {
    setTimeout(() => {
      setalert("");
    }, 3000);
  }, [Alert]);
  // get all departmentlist  through api 
  useEffect(() => {
    fetch("http://localhost:4000/hospital/departmentlist")
      .then((res) => res.json())
      .then((data) => Setdepartmentlist(data))
      .catch((err) => console.log(err));
  }, []);
  // because through doctor name i can find data from database so we are using this function  for get particular appointment data
  function FormatDoctorName() {
    const DoctorName = Doctor_Name;
    const NewDoctorName = DoctorName.replace(/\s+/g, " ").trim();
    if (NewDoctorName.includes(" ")) {
      let Spaceposition = 0;
      for (let i = 0; i < NewDoctorName.length; i++) {
        if (NewDoctorName[i] != " ") {
          Spaceposition++;
        } else {
          break;
        }
      }
      const formatdoctorName =
        NewDoctorName.slice(0, 1).toUpperCase() +
        NewDoctorName.slice(1, Spaceposition) +
        " " +
        NewDoctorName.slice(
          Spaceposition + 1,
          Spaceposition + 2
        ).toUpperCase() +
        NewDoctorName.slice(Spaceposition + 2, NewDoctorName.length);
      return formatdoctorName;
    } else {
      console.log(DoctorName.length);
      const formatdoctorName =
        NewDoctorName.slice(0, 1).toUpperCase() +
        NewDoctorName.slice(1, NewDoctorName.length);
      return formatdoctorName;
    }
  }
  // using post method on form submit 
  const HandleOnsubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:4000/Appointment";
    const data = {
      PatientID: PatientID,
      department: Department,
      doctorname: FormatDoctorName(),
      Doctorid: Doctorid.toUpperCase(),
      Appointment_Date: Appointment_Date,
      time: Time,
      problem: Problem,
    };
    const user = JSON.parse(localStorage.getItem("user"));
    if (Confirm) {
      setloader(true);
      let res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": user.token,
        },
        body: JSON.stringify(data),
      });
      let res_data = await res.json();
      if (res_data === "Appointment added Successfuly") {
        setloader(false);
        setalert({ AlertType: "success", AlertData: res_data });
        setAppointment_Date("");
        setDoctor_Name("");
        setPatientID("");
        setToken("");
        SetProblem("");
        setconfirm(false);
      } else {
        setloader(false);
        setalert({ AlertType: "danger", AlertData: res_data });
      }
    } else {
      setalert({ AlertType: "warning", AlertData: "Please Confirm" });
    }
    // this is basically using for count  formSubmissions day by day 
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Adding 1 to get 1-based month index
    const currentYear = currentDate.getFullYear();
    const monthYearKey = `${monthNames[currentMonth]}-${currentYear}`;
    setFormSubmissions((prevCounts) => ({
      ...prevCounts,
      [monthYearKey]: (prevCounts[monthYearKey] || 0) + 1,
    }));
  };
  return (
    <>
    {/* alert section  */}
      {Alert["AlertData"] && (
        <div className="relative max-sm:top-0 top-[-20px] z-20 ">
          <div className="">
            <div className="fixed w-full">
              <div
                className={`alert alert-${Alert["AlertType"]}   transition-all w-full`}
              >
                <p>
                  <strong>
                    {Alert["AlertType"].slice(0, 1).toUpperCase() +
                      Alert["AlertType"].slice(1, Alert["AlertType"].length)}
                  </strong>
                  <span className="ps-2">{Alert["AlertData"]}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* appointment form section  */}
      <div className="xl:m-5 sm:m-0">
        <div className="bg-[hsl(0,0%,100%)] p-3 relative">
          <div>
            <h1 className="text-[rgb(229,116,152)] h4 border-b border-spacing-2 pb-2">
              Add Appointment
            </h1>
            <form action="" onSubmit={HandleOnsubmit}>
              <div className="row max-sm:block">
                <div className="col">
                  <div className="">
                    <label
                      htmlFor="PatientID"
                      className="form-label font-semibold"
                    >
                      Patient ID
                    </label>
                  </div>
                  <div className="w-full">
                    <input
                      type="text"
                      className="form-control w-[100%]"
                      value={PatientID}
                      id="PatientID"
                      placeholder="PatientID"
                      onChange={(e) => setPatientID(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col max-sm:mt-2">
                  <div>
                    <label
                      htmlFor="Department"
                      className="form-label font-semibold"
                    >
                      Department
                    </label>
                  </div>
                  <div>
                    <select
                      name="Department"
                      id="Department"
                      className="form-select"
                      onChange={(e) => setDepartment(e.target.value)}
                      required
                    >
                      <option value="" disabled selected hidden>
                        Select a Department
                      </option>
                      {Departmentlist &&
                        Departmentlist[0]["medicalDepartments"].map((e) => (
                          <option defaultValue={e}>{e}</option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="row mt-2 max-sm:block">
                <div className="col">
                  <div>
                    <label
                      htmlFor="Doctor_Name"
                      className="form-label font-semibold"
                    >
                      Doctor Name
                    </label>
                  </div>
                  <div>
                    <input
                      type="text"
                      className="form-control w-[100%]"
                      id="Doctor_Name"
                      value={Doctor_Name}
                      placeholder="Doctor Name"
                      onChange={(e) => setDoctor_Name(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col max-sm:mt-2">
                  <div>
                    <label
                      htmlFor="Appointment_Date"
                      className="form-label font-semibold"
                    >
                      Appointment Date
                    </label>
                  </div>
                  <div>
                    <input
                      type="date"
                      className="form-control w-[100%]"
                      required
                      value={Appointment_Date}
                      id="Appointment_Date"
                      onChange={(e) => setAppointment_Date(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-2 max-sm:block">
                <div className="col max-sm:block">
                  <div>
                    <label htmlFor="Time" className="form-label font-semibold">
                      Time Slot
                    </label>
                  </div>
                  <div>
                    <select
                      required
                      id="Time"
                      className="form-select"
                      onChange={(e) => setTime(e.target.value)}
                    >
                      <option defaultValue={Time}>10AM-11AM</option>
                      <option>11AM-12pm</option>
                      <option>12PM-01PM</option>
                      <option>2PM-3PM</option>
                      <option>3PM-4PM</option>
                      <option>4PM-5PM</option>
                      <option>6PM-7PM</option>
                      <option>7PM-8PM</option>
                      <option>8PM-9PM</option>
                    </select>
                  </div>
                </div>
                <div className="col max-sm:mt-2">
                  <div>
                    <label
                      htmlFor="DoctorID"
                      className="form-label font-semibold"
                    >
                      DoctorID
                    </label>
                  </div>
                  <div>
                    <input
                      type="text"
                      id="DoctorID"
                      placeholder="DoctorID"
                      className="form-control"
                      value={Doctorid}
                      onChange={(e) => setdoctorId(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <label htmlFor="Problem" className="form-label font-semibold">
                  Problem
                </label>
                <textarea
                  name=""
                  id="Problem"
                  cols="30"
                  rows="10"
                  className="form-control h-[100px]"
                  placeholder="Problem"
                  value={Problem}
                  onChange={(e) => SetProblem(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="mt-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="Confirm"
                  onChange={(e) => setconfirm(e.target.checked)}
                  checked={Confirm}
                />
                <label htmlFor="Confirm" className="ms-2">
                  Please Confirm
                </label>
              </div>
              <div className="mt-2">
                <input
                  type="submit"
                  className="btn btn-danger bg-danger"
                  required
                  value={"Submit"}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* loader section  */}
      {loader && (
        <div className={`absolute w-full top-0 z-50 right-0`}>
          <Loader />
        </div>
      )}
    </>
  );
};
{
  /* {loader && (
            <div className={`absolute top-[43%] left-[42%]  `}>
              <div class="spinner-border text-primary border-[7px] w-[80px] h-[80px]"></div>
            </div>
          )} */
}
export default AddAppointments;
