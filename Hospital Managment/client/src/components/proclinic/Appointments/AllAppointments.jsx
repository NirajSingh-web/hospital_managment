import { React, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addAppointment } from "../../../store/Appointment/Appointmentslice";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import Loader from "../Loader/Loader";
const AllAppointments = () => {
  const [appointmentlist, setappointmentlist] = useState("");
  const [Id, setid] = useState("");
  const [appointmentdata, setappointmentdata] = useState("");
  const [filtereddata, setfiltereddata] = useState();
  const [Alert, setalert] = useState("");
  const [loader, setloader] = useState(false);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      setalert("");
    }, 3000);
  }, [Alert && Alert["AlertData"]]);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    fetch("http://localhost:4000/appointment", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": user.token,
        "user-mode": user.usermode,
      },
    })
      .then((res) => res.json())
      .then((data) => setappointmentlist(data));
  });
  const handleonsearch = (e) => {
    const searchText = e.target.value;
    if (searchText != "") {
      const data = appointmentlist.filter(
        (e) =>
          e["AppointmentId"]
            .toLowerCase()
            .includes(searchText.trim().toLowerCase()) ||
          e["PatientID"]
            .trim()
            .toLowerCase()
            .includes(searchText.trim().toLowerCase()) ||
          e["department"]
            .trim()
            .toLowerCase()
            .includes(searchText.trim().toLowerCase()) ||
          e["doctorname"]
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
  const HandleonSelect = (e, i) => {
    setid(e._id);
    if (e) {
      setappointmentdata(e);
    } else {
      setalert({ AlertType: "warning", AlertData: "Please select a row" });
    }
  };
  const HandleonEdit = () => {
    if (appointmentdata != "") {
      dispatch(addAppointment(appointmentdata));
      Navigate("/Appointment/EditAppointment");
    } else {
      setalert({ AlertType: "warning", AlertData: "Please select a row" });
    }
  };
  const Handleondelete = async () => {
    if (appointmentdata) {
      setloader(true);
      const res = await fetch("http://localhost:4000/appointment", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentdata),
      });
      const res_data = await res.json();
      if (res_data === "Deleted Successfully!") {
        setloader(false);
        setalert({ AlertType: "success", AlertData: res_data });
        setappointmentdata("");
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
  const downloadCSV = () => {
    const data = appointmentlist;
    const csvContent = convertToCSV(data);
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const convertToCSV = (data) => {
    const headers = Object.keys(data[0]);
    const rows = data.map((obj) => headers.map((header) => obj[header]));
    const csvArray = [headers.join(","), ...rows.map((row) => row.join(","))];
    return csvArray.join("\n");
  };
  const downloadPDF = () => {
    const input = document.getElementById("pdf-content");
    html2canvas(input).then((canvas) => {
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 210, 297); // Adjust width and height as needed
      pdf.save("download.pdf");
    });
  };
  const downloadExcel = () => {
    const headings = Object.keys(appointmentlist[0]);
    const dataArray = [
      headings,
      ...appointmentlist.map((item) =>
        headings.map((key) =>
          typeof item[key] === Number ? toString(item[key]) : item[key]
        )
      ),
    ];
    const ws = XLSX.utils.aoa_to_sheet(dataArray);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const downloadstatus = XLSX.writeFile(wb, "doctorlist.xlsx");
  };
  const handleonprint = () => {
    // const input = document.getElementById("pdf-content");
    // document.body.innerHTML = JSON.stringify(input.outerHTML);
    // window.print();
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
          appointmentlist.length === 0
            ? "bg-[hsl(208,35%,13%)] h-[81.8vh]"
            : "xl:m-5"
        }`}
      >
        {appointmentlist.length != 0 ? (
          <div className="bg-[hsl(0,0%,100%)] p-3">
            <h1 className="text-[rgb(229,116,152)] h4 border-b border-spacing-3 pb-2">
              Appointment List
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
              <table
                className="table table-bordered text-center mt-2  table-striped"
                id="pdf-content"
              >
                <thead>
                  <tr>
                    <th>
                      <input type="checkbox" />
                    </th>
                    <th>Appointment ID</th>
                    <th>Patient ID</th>
                    <th>Token Number</th>
                    <th>Doctor Name</th>
                    <th>Problem</th>
                    <th>status</th>
                  </tr>
                </thead>
                <tbody>
                  {(filtereddata ? filtereddata : appointmentlist).map(
                    (e, index) =>
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
                                  : (setid(""), setappointmentdata(""));
                              }}
                            />
                          </td>
                          <td>{e.AppointmentId}</td>
                          <td>{e.PatientID}</td>
                          <td>{e.Token}</td>
                          <td>{e.doctorname}</td>
                          <td>{e.problem}</td>
                          <td>
                            <span
                              className={`text-white h6 text-[10px] p-1 rounded-sm ${
                                e.status === "Cancelled"
                                  ? "bg-[rgb(255,86,86)]"
                                  : e.status === "Completed"
                                  ? "bg-[rgb(60,179,113)]"
                                  : "bg-[rgb(255,170,42)]"
                              }`}
                            >
                              {e.status}
                            </span>
                          </td>
                        </tr>
                      ) : null
                  )}
                </tbody>
              </table>
              {Array.isArray(filtereddata) && filtereddata.length < 1 && (
                <div className="flex justify-center p-3 bg-[rgb(243,244,245)]  font-bold mb-3 ">
                  <div className="bg-[rgb(255,255,255)] btn  cursor-default btn-outline-none text-lg font-medium">
                    No More data found
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-between">
              <div>
                <span>Showing 1 to 10 of 12 entries</span>
              </div>
              <div>
                <ul className="pagination">
                  <li className="page-item">
                    <a className="page-link" href="/">
                      Previous
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="/">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="/">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="/">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="/">
                      Next
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className="btn btn-outline-secondary rounded-none"
                onClick={downloadCSV}
              >
                {" "}
                <i className="fa fa-download text-danger me-1"></i> CSV
              </button>
              <button
                className="btn btn-outline-secondary rounded-none"
                onClick={handleonprint}
              >
                <i className="fa fa-print text-danger me-1"></i> print
              </button>
              <button
                className="btn btn-outline-secondary rounded-none"
                onClick={downloadPDF}
              >
                <i className="fa fa-file-pdf-o text-danger me-1"></i> PDF
              </button>
              <button
                className="btn btn-outline-secondary rounded-none"
                onClick={downloadExcel}
              >
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
            <div className="card w-[50%] p-3 text-center bg-[hsl(210,56%,25%)] text-white">
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
export default AllAppointments;
