import { React, useEffect, useState } from "react";
const AllPayment = () => {
  const [paymentlist, setpaymentlist] = useState("");
  const [filtereddata, setfiltereddata] = useState();
  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem("user"));
    fetch("http://localhost:4000/payment", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": userdata.token,
        "user-mode": userdata.usermode,
      },
    })
      .then((res) => res.json())
      .then((data) => setpaymentlist(data));
  }, []);
  const handleonsearch = (e) => {
    const searchText = e.target.value;
    if (searchText != "") {
      const data = paymentlist.filter(
        (e) =>
          e["PatientID"]
            .trim()
            .toLowerCase()
            .includes(searchText.trim().toLowerCase()) ||
          e["PaymentID"]
            .trim()
            .toLowerCase()
            .includes(searchText.trim().toLowerCase()) ||
          e["Doctorid"]
            .trim()
            .toLowerCase()
            .includes(searchText.trim().toLowerCase())
      );
      setfiltereddata(data);
    } else {
      setfiltereddata("");
    }
  };
  return (
    <div
      className={`sm:m-0 max-sm:p-2 ${
        paymentlist.length === 0 ? "bg-[hsl(208,35%,13%)] h-[81.8vh]" : "xl:m-5"
      }`}
    >
      {paymentlist.length != 0 ? (
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
            <table className="table table-bordered text-center mt-2  table-striped">
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" />
                  </th>
                  <th>Patient Name</th>
                  <th>Doctor Name</th>
                  <th>Service Name</th>
                  <th>Charges</th>
                  <th>Discount</th>
                  <th>status</th>
                </tr>
              </thead>
              <tbody>
                {(filtereddata ? filtereddata : paymentlist).map(
                  (
                    {
                      service,
                      cost,
                      payment,
                      patient_Name,
                      Doctor_Name,
                      status,
                    },
                    index
                  ) =>
                    index < 10 ? (
                      <tr key={index}>
                        <td>
                          <input type="checkbox" className="form-check-input" />
                        </td>
                        <td>{patient_Name}</td>
                        <td>{Doctor_Name}</td>
                        <td>{null}</td>
                        <td>{null}</td>
                        <td>{payment["discount"]}</td>
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
        </div>
      ) : (
        <div className="flex justify-center h-[80vh] items-center">
          <div className="card w-[50%] p-3 text-center bg-[hsl(210,56%,25%)]  text-white">
            <p>No Data Available</p>
          </div>
        </div>
      )}
    </div>
  );
};
export default AllPayment;
