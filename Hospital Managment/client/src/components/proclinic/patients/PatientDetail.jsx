import { React, useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import { Editpatient } from "../../../store/PatientSlice/PatientSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
const PatientDetail = () => {
  const [patientlist, setpatientlist] = useState("");
  const [paymentlist, setpaymentlist] = useState("");
  const [loader, setloader] = useState(false);
  const [apihit, setapihit] = useState(false);
  const [Alert, setalert] = useState("");
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
    }
    setTimeout(() => {
      setapihit(false);
    },1000);
  }, [apihit]);
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
  const HandleonEdit = (e) => {
    if (e != "") {
      dispatch(Editpatient(e));
      Navigate("/Patient/EditPatient");
    } else {
      setalert({ AlertType: "warning", AlertData: "Please select a row" });
    }
  };
  const Handleondelete = async (e) => {
    if (e) {
      setloader(true);
      const res = await fetch("http://localhost:4000/patient", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(e),
      });
      const res_data = await res.json();
      if (res_data === "Deleted Successfully!") {
        setloader(false);
        setalert({ AlertType: "success", AlertData: res_data });
        setapihit(true);
      } else {
        setapihit(true);
        setloader(false);
        setalert({ AlertType: "danger", AlertData: res_data });
      }
    } else {
      setalert({ AlertType: "warning", AlertData: "Please select a row" });
    }
  };
  const downloadCSV = (e) => {
    const headers = Object.keys(patientlist[0]);
    const csvContent = [
      headers.join(",") + "\n" + headers.map((key) => e[key]).join(","),
    ];
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "appointment.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const downloadPDF = () => {
    const input = document.getElementById("pdf-content");
    html2canvas(input).then((canvas) => {
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 210, 297); // Adjust width and height as needed
      pdf.save("appointment.pdf");
    });
  };
  const downloadExcel = (e) => {
    const headings = Object.keys(patientlist[0]);
    const dataArray = [headings, headings.map((key) => e[key])];
    const ws = XLSX.utils.aoa_to_sheet(dataArray);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const downloadstatus = XLSX.writeFile(wb, "appointment.xlsx");
    if (downloadstatus) {
      alert("downloaded");
    }
  };
  const downloadPaymentCSV = () => {
    const data = paymentlist;
    const csvContent = convertToCSV(data);
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "payment.csv");
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
  const downloadPaymentPDF = () => {
    const input = document.getElementById("pdf-content-payment");
    html2canvas(input).then((canvas) => {
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 210, 297); // Adjust width and height as needed
      pdf.save("payment.pdf");
    });
  };
  const downloadPaymentExcel = () => {
    const headings = Object.keys(paymentlist[0]);
    const dataArray = [
      headings,
      ...paymentlist.map((item) =>
        headings.map((key) =>
          typeof item[key] === Number ? toString(item[key]) : item[key]
        )
      ),
    ];
    const ws = XLSX.utils.aoa_to_sheet(dataArray);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const downloadstatus = XLSX.writeFile(wb, "payment.xlsx");
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
        className={`${
          patientlist.length === 0
            ? "bg-[hsl(208,35%,13%)]"
            : "xl:m-4 max-sm:m-2"
        }`}
      >
        {patientlist.length != 0 ? (
          <div>
            <div className="bg-[hsl(0,0%,100%)] p-3 ">
              <h1 className="text-[rgb(229,116,152)] h4 border-b border-spacing-3 pb-2">
                Patient Details
              </h1>
              <div className="flex justify-between flex-wrap">
                {patientlist &&
                  patientlist.map((e) => (
                    <div className="overflow-x-scroll no-scrollbar mt-2 mb-2">
                      <table
                        className="table table-bordered text-center mt-2  table-striped"
                        id="pdf-content"
                      >
                        <thead>
                          <tr>
                            <th>Patient Name</th>
                            <td>{e.Name}</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th>Date Of Birth</th>
                            <td>{e.dob.slice(0, 10)}</td>
                          </tr>
                          <tr>
                            <th>Gender</th>
                            <td>{e.gender}</td>
                          </tr>
                          <tr>
                            <th>Address</th>
                            <td>{e.address}</td>
                          </tr>
                          <tr>
                            <th>Phone</th>
                            <td>{e.phone}</td>
                          </tr>
                          <tr>
                            <th>Email</th>
                            <td>{e.email}</td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="flex justify-center">
                        <button
                          className="btn btn-outline-secondary rounded-none"
                          onClick={() => downloadCSV(e)}
                        >
                          <i className="fa fa-download text-danger me-1"></i>{" "}
                          CSV
                        </button>
                        <button className="btn btn-outline-secondary rounded-none">
                          <i className="fa fa-print text-danger me-1"></i> print
                        </button>
                        <button
                          className="btn btn-outline-secondary rounded-none"
                          onClick={() => downloadPDF(e)}
                        >
                          <i className="fa fa-file-pdf-o text-danger me-1"></i>{" "}
                          PDF
                        </button>
                        <button
                          className="btn btn-outline-secondary rounded-none"
                          onClick={() => downloadExcel(e)}
                        >
                          <i className="fa fa-file-excel-o text-danger me-1"></i>{" "}
                          EXCEL
                        </button>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <button
                          className="btn btn-outline-secondary rounded-sm bg-danger-25"
                          onClick={() => HandleonEdit(e)}
                        >
                          {" "}
                          <i className="fa fa-edit me-1"></i>Edit
                        </button>
                        <button
                          className="btn btn-danger rounded-sm"
                          onClick={() => Handleondelete(e)}
                        >
                          <i className="fa fa-trash-o me-1"></i> Delete
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="bg-[hsl(0,0%,100%)] p-3 mt-4">
              <h1 className="text-[rgb(229,116,152)] h4 border-b border-spacing-3 pb-2">
                Patient Payment Transactions
              </h1>
              <div className="overflow-x-scroll no-scrollbar">
                <table
                  className="table table-bordered text-center mt-2  table-striped"
                  id="pdf-content-payment"
                >
                  <thead>
                    <tr>
                      <th>Patient Id</th>
                      <th>Doctorid</th>
                      <th>Discount</th>
                      <th>Cost</th>
                      <th>Time</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentlist &&
                      paymentlist.map((e, index) => (
                        <tr key={index}>
                          <td>{e.PatientID}</td>
                          <td>{e.Doctorid}</td>
                          <td>
                            {(
                              (e["payment"]["discount"] * 100) /
                              (e["payment"]["advancePaid"] +
                                e["Services"].map((e) => Number(e["Cost"])))
                            )
                              .toString()
                              .slice(0, 4) + "%"}
                          </td>
                          <td>
                            {e["payment"]["advancePaid"] +
                              e["Services"].map((e) => Number(e["Cost"])) -
                              e["payment"]["discount"]}
                          </td>
                          <td>
                            {`${new Date(e.createdAt).getHours()}:${new Date(
                              e.createdAt
                            ).getMinutes()}`}
                          </td>
                          <td>
                            <span
                              className={`text-white h6 text-[10px] p-1 rounded-sm ${
                                e.status === "Cancel"
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
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-center" onClick={downloadPaymentCSV}>
                <button className="btn btn-outline-secondary rounded-none">
                  {" "}
                  <i className="fa fa-download text-danger me-1"></i> CSV
                </button>
                <button className="btn btn-outline-secondary rounded-none">
                  <i className="fa fa-print text-danger me-1"></i> print
                </button>
                <button
                  className="btn btn-outline-secondary rounded-none"
                  onClick={downloadPaymentPDF}
                >
                  <i className="fa fa-file-pdf-o text-danger me-1"></i> PDF
                </button>
                <button
                  className="btn btn-outline-secondary rounded-none"
                  onClick={downloadPaymentExcel}
                >
                  <i className="fa fa-file-excel-o text-danger me-1"></i> EXCEL
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center h-[81.8vh] items-center">
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
export default PatientDetail;
