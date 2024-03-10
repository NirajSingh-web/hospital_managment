import { React, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getdata } from "../../../store/Room/Roomslice";
import Loader from "../Loader/Loader";
const AllRooms = () => {
  const [Roomlist, setRoomlist] = useState("");
  const [filtereddata, setfiltereddata] = useState();
  const [Id, setid] = useState("");
  const [loader, setloader] = useState(false);
  const [Roomdata, SetroomData] = useState("");
  const [Alert, setalert] = useState("");
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      setalert("");
    }, 3000);
  }, [Alert && Alert["AlertData"]]);
  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem("user"));
    fetch("http://localhost:4000/room", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": userdata.token,
        "user-mode": userdata.usermode,
      },
    })
      .then((res) => res.json())
      .then((data) => setRoomlist(data));
  });
  const handleonsearch = (e) => {
    const searchText = e.target.value;
    if (searchText != "") {
      const data = Roomlist.filter(
        (e) =>
          e["Patient_Name"]
            .trim()
            .toLowerCase()
            .includes(searchText.trim().toLowerCase()) ||
          e["RoomNumber"]
            .toString()
            .trim()
            .toLowerCase()
            .includes(searchText.trim().toLowerCase()) ||
          e["Doctor_Name"]
            .trim()
            .toLowerCase()
            .includes(searchText.trim().toLowerCase())
      );
      setfiltereddata(data);
    } else {
      setfiltereddata("");
    }
  };
  const HandleonSelect = (e, i) => {
    setid(e._id);
    if (e) {
      SetroomData(e);
    } else {
      setalert({ AlertType: "warning", AlertData: "Please select a row" });
    }
  };
  const HandleonEdit = () => {
    if (Roomdata) {
      dispatch(getdata(Roomdata));
      Navigate("/Room/EditRoomAlllotment");
    } else {
      setalert({ AlertType: "warning", AlertData: "Please select a row" });
    }
  };
  const Handleondelete = async () => {
    if (Roomdata) {
      setloader(true);
      const res = await fetch("http://localhost:4000/room", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Roomdata),
      });
      const res_data = await res.json();
      if (res_data === "Deleted Successfully!") {
        setloader(false);
        setalert({ AlertType: "success", AlertData: res_data });
        setdoctordata("");
        setid("");
        setcheck(false);
        
      } else {
        setloader(false);
        setalert({ AlertType: "danger", AlertData: res_data });
      }
    } else {
      setalert({ AlertType: "warning", AlertData: "Please select a row" });
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
      <div
        className={`sm:m-0 max-sm:p-2 ${
          Roomlist.length === 0 ? "bg-[hsl(208,35%,13%)] h-[81.8vh]" : "xl:m-5"
        }`}
      >
        {Roomlist.length != 0 ? (
          <div className="bg-[hsl(0,0%,100%)] p-3">
            <h1 className="text-[rgb(229,116,152)] h4 border-b border-spacing-3 pb-2">
              Payment List
            </h1>
            <div className="flex justify-between h-[50px]">
              <div className="flex items-center gap-2">
                <label htmlFor="">Show</label>
                <select name="" id="" className="form-select">
                  <option value="">10</option>
                  <option value="">25</option>
                  <option value="">50</option>
                  <option value="">100</option>
                </select>
                <span>Entries</span>
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="">Search</label>
                <input
                  type="search"
                  className="form-control"
                  onChange={handleonsearch}
                />
              </div>
            </div>
            <div className="overflow-x-scroll no-scrollbar">
              <table className="table table-bordered text-center mt-2 table-striped">
                <thead>
                  <tr>
                    <th>
                      <input type="checkbox" />
                    </th>
                    <th>RoomNumber</th>
                    <th>RoomType</th>
                    <th>Patient Name</th>
                    <th>Allotment Date</th>
                    <th>Discharge Date</th>
                    <th>Doctor Name</th>
                  </tr>
                </thead>
                <tbody>
                  {(filtereddata ? filtereddata : Roomlist).map((e, index) =>
                    index < 10 ? (
                      <tr key={index}>
                        <td>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            disabled={
                              Id ? (Id === e._id ? false : true) : false
                            }
                            onChange={(i) => {
                              i.target.checked
                                ? HandleonSelect(e, index)
                                : (setid(""), SetroomData(""));
                            }}
                          />
                        </td>
                        <td>{e.RoomNumber}</td>
                        <td>{e.RoomType}</td>
                        <td>{e.Patient_Name}</td>
                        <td>{e.Allotment_Date.slice(0, 10)}</td>
                        <td>{e.Discharge_Date.slice(0, 10)}</td>
                        <td>{e.Doctor_Name}</td>
                      </tr>
                    ) : null
                  )}
                </tbody>
              </table>
              {Array.isArray(filtereddata) ? (
                filtereddata.length < 1 ? (
                  <div className="flex justify-center p-3 bg-[rgb(243,244,245)]  font-bold mb-3 ">
                    <div className="bg-[rgb(255,255,255)] btn  cursor-default btn-outline-none text-lg font-medium">
                      No More data found
                    </div>
                  </div>
                ) : null
              ) : null}
            </div>
            <div className="flex justify-between">
              <div>
                <span>Showing 1 to 10 of 12 entries</span>
              </div>
            </div>
            <div className="flex justify-center">
              <button className="btn btn-outline-secondary rounded-none">
                {" "}
                <i className="fa fa-download text-danger me-1"></i> CSV
              </button>
              <button className="btn btn-outline-secondary rounded-none">
                <i className="fa fa-print text-danger me-1"></i> print
              </button>
              <button className="btn btn-outline-secondary rounded-none">
                <i className="fa fa-file-pdf-o text-danger me-1"></i> PDF
              </button>
              <button className="btn btn-outline-secondary rounded-none">
                <i className="fa fa-file-excel-o text-danger me-1"></i> EXCEL
              </button>
            </div>
            <div className="flex gap-2">
              <button
                className="btn btn-danger rounded-sm"
                onClick={Handleondelete}
              >
                <i className="fa fa-trash-o me-1"></i> Delete
              </button>
              <button
                className="btn btn-outline-secondary rounded-sm bg-danger-25"
                onClick={HandleonEdit}
              >
                {" "}
                <i className="fa fa-edit me-1"></i>Edit
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center h-[80vh] items-center">
            <div className="card w-[50%] p-3 text-center bg-[hsl(210,56%,25%)]  text-white">
              <p>No Data Available</p>
            </div>
          </div>
        )}
      </div>
      {loader && (
        <div className={`absolute w-full top-0 z-50 right-0`}>
          <Loader />
        </div>
      )}
    </>
  );
};
export default AllRooms;
