import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { medicalRooms } from "../../../constant";
import Loader from "../Loader/Loader";
const EditRoomAllotmment = () => {
  const [RoomNumber, setRoomNumber] = useState("");
  const [RoomType, setRoomType] = useState("");
  const [Patient_Name, setPatient_Name] = useState("");
  const [Allotment_Date, setAllotment_Date] = useState("");
  const [Discharge_Date, setDischarge_Date] = useState("10AM-11AM");
  const [Doctor_Name, setDoctor_Name] = useState("");
  const [_id, setid] = useState("");
  const [Confirm, setconfirm] = useState(false);
  const [loader, setloader] = useState(false);
  const [Alert, setalert] = useState("");
  const roomdata = useSelector((state) => state.Room);
  useEffect(() => {
    if (Object.keys(roomdata).length != 0) {
      setRoomNumber(roomdata.RoomNumber);
      setAllotment_Date(roomdata.Allotment_Date.slice(0, 10));
      setDischarge_Date(roomdata.Discharge_Date.slice(0, 10));
      setPatient_Name(roomdata.Patient_Name);
      setRoomType(roomdata.RoomType);
      setDoctor_Name(roomdata.Doctor_Name);
      setid(roomdata._id);
    }
  }, [roomdata && roomdata["Patient_Name"]]);
  useEffect(() => {
    setTimeout(() => {
      setalert("");
    }, 3000);
  }, [Alert && Alert["AlertData"]]);
  const inputcondition = () => {
    return (
      RoomNumber != "" &&
      RoomType != "" &&
      Patient_Name != "" &&
      Allotment_Date != "" &&
      Discharge_Date != "" &&
      Doctor_Name != ""
    );
  };
  const HandleOnUpdate = async (e) => {
    e.preventDefault();
    let url = "http://localhost:4000/Room";
    let data = {
      _id: _id,
      RoomNumber: Number(RoomNumber),
      RoomType,
      Patient_Name,
      Allotment_Date,
      Discharge_Date,
      Doctor_Name,
    };
    if (inputcondition()) {
      if (Confirm) {
        const userdata = JSON.parse(localStorage.getItem("user"));
        setloader(true);
        let res = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": userdata.token,
          },
          body: JSON.stringify(data),
        });
        let res_data = await res.json();
        if (res_data === "Room Succesfully Updated") {
          setloader(false);
          setalert({ AlertType: "success", AlertData: res_data });
          setRoomNumber("");
          setAllotment_Date("");
          setRoomType("");
          setconfirm(false);
          setPatient_Name("");
          setDoctor_Name("");
          setDischarge_Date("");
        } else {
          setloader(false);
          setalert({ AlertType: "danger", AlertData: res_data });
        }
      } else {
        setalert({
          AlertType: "warning",
          AlertData: "please select  confirm button",
        });
      }
    } else {
      setalert({
        AlertType: "warning",
        AlertData: "please Fill all data",
      });
    }
  };
  return (
    <>
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
              Add Room Allotment
            </h1>
            <form action="" onSubmit={HandleOnUpdate}>
              <div className="row max-sm:block">
                <div className="col">
                  <div className="">
                    <label
                      htmlFor="Room_number"
                      className="form-label font-semibold"
                    >
                      Room Number
                    </label>
                  </div>
                  <div className="w-full">
                    <input
                      type="number"
                      className="form-control w-[100%]"
                      value={RoomNumber}
                      id="Room_number"
                      placeholder="Room Number"
                      onChange={(e) => setRoomNumber(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col max-sm:mt-2">
                  <div>
                    <label
                      htmlFor="Room_Type"
                      className="form-label font-semibold"
                    >
                      Room Type
                    </label>
                  </div>
                  <div>
                    <select
                      name="Department"
                      id="Room_Type"
                      className="form-select"
                      value={RoomType}
                      onChange={(e) => setRoomType(e.target.value)}
                    >
                      <option value="" disabled selected hidden>
                        Choose Room type
                      </option>
                      {medicalRooms.map((e, i) => (
                        <option value={e} key={i}>
                          {e}
                        </option>
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
                      htmlFor="Patient"
                      className="form-label font-semibold"
                    >
                      Patient Name
                    </label>
                  </div>
                  <div>
                    <input
                      type="text"
                      className="form-control w-[100%]"
                      required
                      value={Patient_Name}
                      id="Patient"
                      onChange={(e) => setPatient_Name(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-2 max-sm:block">
                <div className="col max-sm:mt-2">
                  <div>
                    <label
                      htmlFor="Allotment_Date"
                      className="form-label font-semibold"
                    >
                      Allotment Date
                    </label>
                  </div>
                  <div>
                    <input
                      type="date"
                      id="Allotment_Date"
                      placeholder="Token Number"
                      className="form-control"
                      value={Allotment_Date}
                      onChange={(e) => setAllotment_Date(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col max-sm:mt-2">
                  <div>
                    <label
                      htmlFor="Discharge_Date"
                      className="form-label font-semibold"
                    >
                      Discharge Date
                    </label>
                  </div>
                  <div>
                    <input
                      type="date"
                      id="Discharge_Date"
                      placeholder="Token Number"
                      className="form-control"
                      value={Discharge_Date}
                      onChange={(e) => setDischarge_Date(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="Confirm"
                  checked={Confirm}
                  onChange={(e) => setconfirm(e.target.checked)}
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
export default EditRoomAllotmment;
