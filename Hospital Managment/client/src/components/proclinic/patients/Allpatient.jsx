import { React, useEffect, useState } from "react";
import { Editpatient } from "../../../store/PatientSlice/PatientSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import Loader from "../Loader/Loader";
const Allpatient = () => {
  const [patientlist, setpatientlist] = useState("");
  const [Id, setid] = useState("");
  const [patientdata, setpatientdata] = useState("");
  const [check, setcheck] = useState(false);
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
    const data = JSON.parse(localStorage.getItem("user"));
    if (data) {
      fetch("http://localhost:4000/patient", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": data.token,
          "user-mode": data.usermode,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setpatientlist(data);
        });
      setTimeout(() => {
        setcheck(false);
      }, 1000);
    }
  }, [check]);
  const handleonsearch = (e) => {
    const searchText = e.target.value;
    if (searchText != "") {
      const data = patientlist.filter(
        (e) =>
          e["Name"]
            .trim()
            .toLowerCase()
            .includes(searchText.trim().toLowerCase()) ||
          e["email"]
            .trim()
            .toLowerCase()
            .includes(searchText.trim().toLowerCase()) ||
          e["gender"]
            .trim()
            .toLowerCase()
            .includes(searchText.trim().toLowerCase()) ||
          e["phone"].toString().includes(searchText)
      );
      setfiltereddata(data);
    } else {
      setfiltereddata("");
    }
  };
  const HandleonSelect = (e, i) => {
    setid(e._id);
    if (e) {
      setpatientdata(e);
    } else {
      setalert({ AlertType: "warning", AlertData: "Please select a row" });
    }
  };
  const HandleonEdit = () => {
    if (patientdata != "") {
      dispatch(Editpatient(patientdata));
      Navigate("/Patient/EditPatient");
    } else {
      setalert({ AlertType: "warning", AlertData: "Please select a row" });
    }
  };
  const Handleondelete = async () => {
    if (patientdata) {
      setloader(true);
      const res = await fetch("http://localhost:4000/patient", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patientdata),
      });
      const res_data = await res.json();
      if (res_data === "Deleted Successfully!") {
        setloader(false);
        setalert({ AlertType: "success", AlertData: res_data });
        setpatientdata("");
        setid("");
        setcheck(true);
      } else {
        setloader(false);
        setalert({ AlertType: "danger", AlertData: res_data });
        setcheck(false);
      }
    } else {
      setalert({ AlertType: "warning", AlertData: "Please select a row" });
    }
  };
  const downloadCSV = () => {
    const data = patientlist;
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
    const headings = Object.keys(patientlist[0]);
    const dataArray = [
      headings,
      ...patientlist.map((item) =>
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
          patientlist.length > 0 ? "xl:m-5" : "bg-[hsl(208,35%,13%)] h-[81.8vh]"
        }`}
      >
        {patientlist.length > 0 ? (
          <div className="bg-[hsl(0,0%,100%)] p-3">
            <h1 className="text-[rgb(229,116,152)] h4 border-b border-spacing-3 pb-2">
              Patients List
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
                  placeholder="Search"
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
                      <input type="checkbox" disabled />
                    </th>
                    <th>PatientID</th>
                    <th>Patient Name</th>
                    <th>Age</th>
                    <th>Phone</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {(filtereddata ? filtereddata : patientlist).map(
                    (e, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            disabled={
                              Id ? (Id === e._id ? false : true) : false
                            }
                            onChange={(i) => {
                              setcheck(i.target.checked);
                              i.target.checked
                                ? HandleonSelect(e, index)
                                : (setid(""), setpatientdata(""));
                            }}
                          />
                        </td>
                        <td>{e.PatientID}</td>
                        <td>{e.Name}</td>
                        <td>{e.age}</td>
                        <td>{e.phone}</td>
                        <td>
                          <span
                            className={`text-white h6 text-[10px] p-1 rounded-sm ${
                              e.status === "Cancelled"
                                ? "bg-[rgb(239,110,110)]"
                                : e.status === "Completed"
                                ? "bg-[rgb(60,179,113)]"
                                : "bg-[rgb(255,170,42)]"
                            }`}
                          >
                            {e.status}
                          </span>
                        </td>
                      </tr>
                    )
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
              <button className="btn btn-outline-secondary rounded-none">
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
export default Allpatient;
