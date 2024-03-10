import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
const Verifypayment = () => {
  const [pendingdata, setpendingdata] = useState("");
  const [patient_Name, setpatientName] = useState();
  const [Id, setid] = useState("");
  const [department, setdepartment] = useState("");
  const [Doctor_Name, setDoctorName] = useState("");
  const [loader, setloader] = useState(false);
  const [Alert, setalert] = useState("");
  const [apihit, setApihit] = useState(false);
  const [SubmitDatelist, SetSubmitDatelist] = useState("");
  const [Datefiltereddata, setDateFiltereddata] = useState("");
  const [searchfiltereddata, setsearchfiltereddata] = useState("");
  console.log(pendingdata);
  useEffect(() => {
    setTimeout(() => {
      setalert("");
    }, 3000);
  }, [Alert && Alert["AlertData"]]);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    fetch("http://localhost:4000/payment", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": data.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const getpendingdata = data.filter((e) =>
          e["status"].includes("Pending")
        );
        setpendingdata(getpendingdata);
      })
      .catch((e) => {
        console.log("server is not running");
      });
  }, [apihit]);
  const currentDate = () => {
    const Datemethod = new Date();
    const year = Datemethod.getFullYear();
    let month = Datemethod.getMonth() + 1;
    let Day = Datemethod.getDate();
    Day < 10 ? (Day = "0" + Day) : (Day = Day);
    month < 10 ? (month = "0" + month) : (month = month);
    const currentDate = `${Day}-${month}-${year}`;
    return currentDate;
  };
  useEffect(() => {
    pendingdata &&
      pendingdata.forEach((element) => {
        const DateExtracted = element["createdAt"]
          .slice(0, 10)
          .split("-")
          .reverse()
          .join("-");
        const Submitdate =
          currentDate() === DateExtracted
            ? "Today Payment List"
            : DateExtracted;
        SubmitDatelist.indexOf(Submitdate) == -1 &&
          SetSubmitDatelist([...SubmitDatelist, Submitdate]);
      });
  });
  const handleonchange = (e) => {
    const filtereddata = pendingdata.filter((i) =>
      i["createdAt"]
        .slice(0, 10)
        .split("-")
        .reverse()
        .join("-")
        .includes(
          e.target.value === "Today Payment List"
            ? currentDate()
            : e.target.value
        )
    );
    if (e.target.value) {
      setDateFiltereddata(filtereddata);
    } else {
      setDateFiltereddata("");
    }
  };
  const handleonsearch = (s) => {
    const searchfiltereddata = (
      Datefiltereddata ? Datefiltereddata : pendingdata
    ).filter(
      (e) =>
        e["PatientID"]
          .trim()
          .toLowerCase()
          .includes(s.target.value.trim().toLowerCase()) ||
        e["PaymentID"]
          .trim()
          .toLowerCase()
          .includes(s.target.value.trim().toLowerCase()) ||
        e["Doctorid"]
          .trim()
          .toLowerCase()
          .includes(s.target.value.trim().toLowerCase())
    );
    if (s.target.value) {
      setsearchfiltereddata(searchfiltereddata);
    } else {
      setsearchfiltereddata("");
    }
  };
  const HandleonPreview = (e) => {
    console.log(e.status);
    if (Id === e["_id"]) {
      setid("");
    } else {
      setid(e["_id"]);
    }
    setdepartment(e["Department"]);
    setpatientName(e["patient_Name"]);
    setDoctorName(e["Doctor_Name"]);
  };
  const Handleonapproval = async (e) => {
    const updatedata = {
      _id: e["_id"],
      status: "Completed",
    };
    let confirmation = window.confirm("Are you sure approve this?");
    if (confirmation) {
      setloader(true);
      const res = await fetch("http://localhost:4000/payment", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedata),
      });
      const data = await res.json();
      if (data === "Approved") {
        setalert({ AlertType: "success", AlertData: data });
        setloader(false);
        setApihit(true);
      } else {
        setalert({ AlertType: "danger", AlertData: data });
        setloader(false);
      }
    }
  };
  const HandleonCancelled = async (e) => {
    console.log("ek");
    const updatedata = {
      _id: e["_id"],
      status: "Cancelled",
    };
    let confirmation = window.confirm("Are you sure approve this?");
    if (confirmation) {
      setloader(true);
      const res = await fetch("http://localhost:4000/payment", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedata),
      });
      const data = await res.json();
      if (data === "Cancelled") {
        setalert({ AlertType: "danger", AlertData: data });
        setloader(false);
        setApihit(true);
      } else {
        setalert({ AlertType: "danger", AlertData: data });
        setloader(false);
      }
    }
  };
  return (
    <>
      {Alert["AlertData"] && (
        <div className="relative  z-20 ">
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
      <div className=" relative">
        <div
          className={`h-[81.8vh] w-[100%]  bg-[hsl(208,35%,13%)]  no-scrollbar overflow-y-scroll relative`}
        >
          {pendingdata ? (
            <>
              <div className=" sticky top-0 z-10 ">
                <div className="p-3 flex justify-between   z-20 text-white bg-[hsl(210,56%,25%)]">
                  <div className="flex items-center gap-2">
                    <label htmlFor="" className="w-full">
                      Show Entries
                    </label>
                    <select
                      name=""
                      id=""
                      className="form-select appearance-none text-white bg-[hsl(208,35%,13%)]  border-0 w-full"
                      onChange={handleonchange}
                    >
                      <option value="">All Payment List</option>
                      {SubmitDatelist &&
                        SubmitDatelist.map((e, i) => (
                          <option value={e} key={i}>
                            {e}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <label htmlFor="">Search</label>
                    <input
                      type="search"
                      className="form-control text-white placeholder:text-white bg-[hsl(208,35%,13%)] focus:bg-[hsl(208,35%,13%)]  border-0 focus:border-blue-500 "
                      onChange={handleonsearch}
                      placeholder="Search"
                    />
                  </div>
                </div>
              </div>
              <div
                className="border-[2.5px] border-slate-700 xl:m-10 max-sm:m-3  max-sm:p-2 xl:p-5 flex flex-col items-center rounded-sm bg-[#16314b]
               "
              >
                {(searchfiltereddata
                  ? searchfiltereddata
                  : Datefiltereddata
                  ? Datefiltereddata
                  : pendingdata
                ).map((e, index) =>
                  searchfiltereddata || Datefiltereddata || pendingdata ? (
                    <div
                      className={`card w-[50%] max-sm:w-full bg-[hsl(210,56%,25%)] text-white ${index<0&&"mt-3"}`}
              
                      key={index}
                    >
                      <div>
                        <div className="card-header p-3">
                          <div>
                            <p>
                              <span className="font-bold">
                                {e.patient_Name}
                              </span>{" "}
                              <span>registered details verify it </span>
                            </p>
                          </div>
                          <div
                            className="flex justify-end mt-2
                    "
                          >
                            <button
                              className=" btn btn-secondary bg-[hsl(208,35%,13%)] text-white"
                              onClick={() => {
                                HandleonPreview(e, index);
                              }}
                            >
                              Preview
                            </button>
                          </div>
                        </div>

                        <div
                          className={`transition-all ${
                            Id === e["_id"]
                              ? "w-[100%]"
                              : "w-0 h-0 overflow-hidden"
                          }`}
                          key={index}
                        >
                          <div className="w-[100%] card-body">
                            <div className="flex justify-between border-b border-spacing-7 pb-3 pe-3 ps-3 ">
                              <span className="font-bold">Patient Name</span>
                              <span>{patient_Name}</span>
                            </div>
                            <div className="flex justify-between border-b border-spacing-7 p-3">
                              <span className="font-bold">Doctor</span>
                              <span>{Doctor_Name}</span>
                            </div>
                            <div className="flex justify-between border-b border-spacing-7 p-3">
                              <span className="font-bold">Department</span>
                              <span>{department}</span>
                            </div>
                          </div>
                          <div className="mt-3 card-footer flex justify-between">
                            <div>
                              <button
                                onClick={() => Handleonapproval(e)}
                                className="btn btn-primary"
                              >
                                Approve
                              </button>
                            </div>
                            <div>
                              <button
                                onClick={() => HandleonCancelled(e)}
                                className="btn btn-danger"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    index < 1 && (
                      <div className="flex justify-center h-[80vh] items-center">
                        <div className="card w-[100%] p-3 text-center bg-[hsl(210,56%,25%)] text-white">
                          <p>No Pending Data Available</p>
                        </div>
                      </div>
                    )
                  )
                )}
                {Array.isArray(searchfiltereddata) &&
                  searchfiltereddata.length === 0 && (
                    <div className="flex justify-center">
                      <div className="card w-[100%] p-3 text-center bg-[hsl(210,56%,25%)] text-white">
                        <p>No Record Found</p>
                      </div>
                    </div>
                  )}
              </div>
            </>
          ) : (
            <div className="flex justify-center h-[80vh] items-center">
              <div className="card w-[100%] p-3 text-center bg-[hsl(210,56%,25%)]  text-white">
                <p>No Data Available</p>
              </div>
            </div>
          )}
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
export default Verifypayment;
