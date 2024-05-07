import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";
const EditAppointment = () => {
  const [PatientID, setPatientID] = useState("");
  const [Department, setDepartment] = useState("Neuro");
  const [Doctor_Name, setDoctor_Name] = useState("");
  const [Appointment_Date, setAppointment_Date] = useState("");
  const [Time, setTime] = useState("10AM-11AM");
  const [Token, setToken] = useState("");
  const [Problem, SetProblem] = useState("");
  const [_id, setid] = useState("");
  const [Confirm, setconfirm] = useState(false);
  const [Doctorid, setdoctorId] = useState("");
  // const [formSubmissions, setFormSubmissions] = useState({});
  const [loader, setloader] = useState(false);
  const [Alert, setalert] = useState("");
  // get particular data for edit from redux store 
  const appointmentdata = useSelector((state) => {
    return state.appointmentdata;
  });
//  provide alert value 
  useEffect(() => {
    setTimeout(
      () => {
        setalert("");
      },
      Alert && Alert["AlertData"].length > 40 ? 6000 : 3000
    );
  }, [Alert && Alert["AlertData"]]);
  // provide value to input element for edit
  useEffect(() => {
    if (Object.keys(appointmentdata).length != 0) {
      setid(appointmentdata["_id"]);
      setAppointment_Date(appointmentdata["Appointment_Date"]);
      setDepartment(appointmentdata["department"]);
      setDoctor_Name(appointmentdata["doctorname"]);
      setPatientID(appointmentdata["PatientID"]);
      setTime(appointmentdata["time"]);
      SetProblem(appointmentdata["problem"]);
      setdoctorId(appointmentdata["Doctorid"]);
    }
  }, [appointmentdata]);
  // after edit the data then update the data through this method 
  const HandleOnUpdate = async (e) => {
    e.preventDefault();
    const url = "http://localhost:4000/Appointment";
    const data = {
      _id: _id,
      PatientId: PatientID,
      department: Department,
      doctorname: Doctor_Name,
      date: Appointment_Date,
      time: Time,
      problem: Problem,
      Doctorid: Doctorid,
    };
    const user = JSON.parse(localStorage.getItem("user"));
    if (Object.keys(appointmentdata).length != 0) {
      if (Confirm) {
        setloader(true);
        let res = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": user.token,
          },
          body: JSON.stringify(data),
        });
        let res_data = await res.json();
        if (res_data === "Appointment Updated Successfuly") {
          setalert({ AlertType: "success", AlertData: res_data });
          setloader(false);
          setAppointment_Date("");
          setDoctor_Name("");
          setPatientID("");
          setToken("");
          SetProblem("");
          setconfirm(false);
        } else {
          setalert({ AlertType: "danger", AlertData: res_data });
          setloader(false);
        }
      } else {
        setalert({ AlertType: "warning", AlertData: "Please Confirm" });
      }
    } else {
      setalert({
        AlertType: "danger",
        AlertData:
          "Can't Update Manually! for update  please click on edit button. in All appointment section",
      });
    }
  };
  return (
    <>
    {/* alert component  */}
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
      
      <div className="xl:m-5 sm:m-0 ">
        <div className="bg-[hsl(0,0%,100%)] p-3 relative">
          <div>
            <h1 className="text-[rgb(229,116,152)] h4 border-b border-spacing-2 pb-2">
              Edit Appointment
            </h1>
            <form action="" onSubmit={HandleOnUpdate}>
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
                    >
                      <option value="Neuro" defaultValue={Department}>
                        Neuro
                      </option>
                      <option value="Ortho">Ortho</option>
                      <option value="General">General</option>
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
                      htmlFor="Doctorid"
                      className="form-label font-semibold"
                    >
                      Doctor Id
                    </label>
                  </div>
                  <div>
                    <input
                      type="text"
                      id="Doctorid"
                      placeholder="Doctor Id"
                      className="form-control"
                      value={Doctorid}
                      onChange={(e) => setdoctorId(e.target.value)}
                    />
                    {console.log(Doctorid)}
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
                  value={"Update"}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      {loader && (
        <div className={`absolute w-full top-0 z-50 right-0`}>
          <Loader />
        </div>
      )}
    </>
  );
};
export default EditAppointment;
