import { React, useEffect, useState } from "react";
import Loader from "../Loader/Loader";
const AddPayement = () => {
  const [PatientID, setPatientID] = useState("");
  const [patient_Name, setPatientName] = useState("");
  const [Department, setDepartment] = useState("");
  const [Doctorid, setDoctor_ID] = useState("");
  const [Admission_Date, setAdmission_Date] = useState("");
  const [Discharge, setDischarge] = useState("");
  const [discount, setdiscount] = useState("");
  const [advancePaid, setAdvancePaid] = useState("");
  const [type, setType] = useState("Cash");
  const [card_check_number, setcard_check_number] = useState("");
  const [Confirm, setconfirm] = useState(false);
  const [loader, setloader] = useState(false);
  const [Services, setServices] = useState([{ Servicename: "", Cost: "" }]);
  const [Departmentlist, Setdepartmentlist] = useState("");
  const [Alert, setalert] = useState("");
  useEffect(() => {
    setTimeout(() => {
      setalert("");
    }, 3000);
  }, [Alert && Alert["AlertData"]]);
  useEffect(() => {
    fetch("http://localhost:4000/hospital/departmentlist")
      .then((res) => res.json())
      .then((data) => Setdepartmentlist(data))
      .catch((err) => console.log(err));
  });
  const setalldata = () => {
    const data = {
      PatientID,
      patient_Name,
      Department,
      Doctorid: Doctorid.toUpperCase(),
      Admission_Date,
      Discharge,
      Services,
      payment: {
        discount: Number(discount),
        type,
        advancePaid: Number(advancePaid),
        card_check_number: Number(card_check_number),
      },
    };
    return data;
  };
  const HandleOnsubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:4000/payment";
    const userdata = JSON.parse(localStorage.getItem("user"));
    if (Confirm) {
      setloader(true);
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": userdata.token,
        },
        body: JSON.stringify(setalldata()),
      });
      const res_data = await res.json();
      if (res_data === "Payment added successfully") {
        setalert({ AlertType: "success", AlertData: res_data });
        setloader(false);
        handleonsubmitsetempty();
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
  };
  const handleonsubmitsetempty = () => {
    setPatientID("");
    setPatientName("");
    setDoctor_ID("");
    setAdmission_Date("");
    setDischarge("");
    setdiscount("");
    setAdvancePaid("");
    setcard_check_number("");
    setServices([{ Servicename: "", Cost: "" }]);
  };
  const handleServiceonchage = (e, i) => {
    const { name, value } = e.target;
    Services[i][name] = value;
    setServices([...Services]);
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
              Add Payment
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
                      required
                      onChange={(e) => setPatientID(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col max-sm:mt-2">
                  <div>
                    <label
                      htmlFor="Patient_Name"
                      className="form-label font-semibold"
                    >
                      Patient Name
                    </label>
                  </div>
                  <div>
                    <input
                      type="text"
                      id="Patient_Name"
                      className="form-control"
                      placeholder="Patient Name"
                      value={patient_Name}
                      required
                      onChange={(e) => setPatientName(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-2 max-sm:block">
                <div className="col">
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
                      value={Department}
                      required
                      onChange={(e) => setDepartment(e.target.value)}
                    >
                      <option value="" disabled selected hidden>
                        Select a Department
                      </option>
                      {Departmentlist &&
                        Departmentlist[0]["medicalDepartments"].map((e, i) => (
                          <option defaultValue={e} key={i}>
                            {e}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="col max-sm:mt-2">
                  <div>
                    <label
                      htmlFor="Doctor_ID"
                      className="form-label font-semibold"
                    >
                      Doctor ID
                    </label>
                  </div>
                  <div>
                    <input
                      type="text"
                      className="form-control w-[100%]"
                      id="Doctor_ID"
                      required
                      value={Doctorid}
                      placeholder="Doctor ID"
                      onChange={(e) => setDoctor_ID(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-2 max-sm:block">
                <div className="col">
                  <div>
                    <label
                      htmlFor="Admission_Date"
                      className="form-label font-semibold"
                    >
                      Admission Date
                    </label>
                  </div>
                  <div>
                    <input
                      type="date"
                      className="form-control w-[100%]"
                      value={Admission_Date}
                      id="Admission_Date"
                      required
                      onChange={(e) => setAdmission_Date(e.target.value)}
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
                      className="form-control w-[100%]"
                      value={Discharge}
                      required
                      id="Discharge_Date"
                      onChange={(e) => setDischarge(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <h1 className="bg-[rgb(226,225,225)] h4 border-b border-spacing-2 p-2 rounded-sm">
                  Services
                </h1>
                {Services.map((value, index) => (
                  <div className="row max-sm:block " key={index}>
                    <div className="col">
                      <div>
                        <label
                          htmlFor="Service_Name"
                          className="form-label font-semibold"
                        >
                          Service Name
                        </label>
                      </div>
                      <div>
                        <input
                          type="text"
                          className="form-control w-[100%]"
                          placeholder="Service Name"
                          name="Servicename"
                          value={value["Servicename"]}
                          id="Service_Name"
                          required
                          onChange={(e) => handleServiceonchage(e, index)}
                        />
                      </div>
                    </div>
                    <div className="col max-sm:mt-2">
                      <div>
                        <label
                          htmlFor="Cost"
                          className="form-label font-semibold"
                        >
                          Cost of Treatment
                        </label>
                      </div>
                      <div>
                        <input
                          type="number"
                          className="form-control w-[100%]"
                          value={value["Cost"]}
                          placeholder="Cost of Treatment"
                          id="Cost"
                          name="Cost"
                          required
                          onChange={(e) => handleServiceonchage(e, index)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <div className="mt-2">
                  <button
                    type="button"
                    className="btn btn-outline-success"
                    onClick={(e) => {
                      setServices([...Services, { Servicename: "", Cost: "" }]);
                    }}
                  >
                    <i className="fa fa-plus me-2"></i>
                    <span>Add Service</span>
                  </button>
                  {Services.length > 1 && (
                    <button
                      className="btn btn-danger ms-2"
                      onClick={(e) => {
                        e.preventDefault();
                        services.pop();
                        alert(
                          "for delete you have to enter some data in any input field because this issue comes from form validation"
                        );
                      }}
                    >
                      <i className="fa fa-trash-o me-2"></i>
                      <span>Delete Service</span>
                    </button>
                  )}
                </div>
              </div>
              <div className="mt-2">
                <h1 className="bg-[rgb(226,225,225)] h4 border-b border-spacing-2 p-2 rounded-sm">
                  Payment
                </h1>
                <div className="row max-sm:block ">
                  <div className="col">
                    <div>
                      <label
                        htmlFor="discount"
                        className="form-label font-semibold"
                      >
                        Discount
                      </label>
                    </div>
                    <div>
                      <input
                        type="number"
                        className="form-control w-[100%]"
                        placeholder="Discount"
                        value={discount}
                        id="discount"
                        onChange={(e) => setdiscount(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col max-sm:mt-2">
                    <div>
                      <label
                        htmlFor="Advance"
                        className="form-label font-semibold"
                      >
                        Advance Paid
                      </label>
                    </div>
                    <div>
                      <input
                        type="number"
                        className="form-control w-[100%]"
                        value={advancePaid}
                        placeholder="Advance paid"
                        id="Advance"
                        required
                        onChange={(e) => setAdvancePaid(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col max-sm:mt-2">
                    <div>
                      <label
                        htmlFor="type"
                        className="form-label font-semibold"
                      >
                        Payment Type
                      </label>
                    </div>
                    <div>
                      <select
                        name=""
                        id="type"
                        className="form-select"
                        onChange={(e) => setType(e.target.value)}
                        value={type}
                      >
                        <option value="Check">Check</option>
                        <option value="Card">Card</option>
                        <option defaultValue="Cash">Cash</option>
                      </select>
                    </div>
                  </div>
                  <div className="col max-sm:mt-2">
                    <div>
                      <label
                        htmlFor="card_check_nu"
                        className="form-label font-semibold"
                      >
                        Card/Check No
                      </label>
                    </div>
                    <div>
                      <input
                        type="number"
                        className="form-control w-[100%]"
                        value={card_check_number}
                        placeholder="Card/Check No"
                        id="card_check_nu"
                        onChange={(e) => setcard_check_number(e.target.value)}
                        disabled={type === "Cash" ? true : false}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="Confirm"
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
                  value={"Submit"}
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
export default AddPayement;
