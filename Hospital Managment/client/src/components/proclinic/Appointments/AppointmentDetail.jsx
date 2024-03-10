import { React, useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import { addAppointment } from "../../../store/Appointment/Appointmentslice";
const AppointmentDetail = () => {
  const [appointmentlist, setappointmentlist] = useState("");
  const [loader, setloader] = useState(false);
  const [apihit, setapihit] = useState(false);
  const [Alert, setalert] = useState("");
  const dispatch = useDispatch();
  const Navigate = useNavigate();
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
      .then((data) => setappointmentlist(data))
      .catch((e) => console.log(e.message));
    setTimeout(() => {
      setapihit(false);
    }, 1000);
  }, [apihit]);
  const HandleonEdit = (e) => {
    if (e != "") {
      dispatch(addAppointment(e));
      Navigate("/Appointment/EditAppointment");
    }
  };
  const Handleondelete = async (e) => {
    if (e) {
      setloader(true);
      const res = await fetch("http://localhost:4000/appointment", {
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
        setloader(false);
        setapihit(true);
        setalert({ AlertType: "danger", AlertData: res_data });
      }
    }
  };

  const downloadCSV = (e) => {
    const headers = Object.keys(appointmentlist[0]);
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
    const headings = Object.keys(appointmentlist[0]);
    const dataArray = [headings, headings.map((key) => e[key])];
    const ws = XLSX.utils.aoa_to_sheet(dataArray);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const downloadstatus = XLSX.writeFile(wb, "appointment.xlsx");
    if (downloadstatus) {
      alert("downloaded");
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
        className={` ${
          appointmentlist.length === 0
            ? "bg-[hsl(208,35%,13%)]"
            : "xl:m-4 max-sm:m-2"
        }`}
      >
        {appointmentlist.length != 0 ? (
          <div className="bg-[hsl(0,0%,100%)] p-3">
            <h1 className="text-[rgb(229,116,152)] h4 ">Appointment Details</h1>
            <div className="flex justify-between flex-wrap overflow-hidden border-t border-spacing-3 ">
              {appointmentlist.map((e) => (
                <div className="overflow-x-scroll no-scrollbar w-[40%] max-sm:w-[100%]  border-b border-spacing-3 p-3">
                  <table
                    className="table table-bordered  mt-2  table-striped "
                    id="pdf-content"
                  >
                    <thead>
                      <tr>
                        <th>Patient ID</th>
                        <td>{e.PatientID}</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>Department</th>
                        <td>{e.department}</td>
                      </tr>
                      <tr>
                        <th>Doctor Name</th>
                        <td>{e.doctorname}</td>
                      </tr>
                      <tr>
                        <th>Appointment Date</th>
                        <td>{e.Appointment_Date}</td>
                      </tr>
                      <tr>
                        <th>Time Slot</th>
                        <td>{e.time}</td>
                      </tr>
                      <tr>
                        <th>Token</th>
                        <td>{e.Token}</td>
                      </tr>
                      <tr>
                        <th>Problem</th>
                        <td>{e.problem}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="flex justify-center">
                    <button
                      className="btn btn-outline-secondary rounded-none"
                      onClick={() => downloadCSV(e)}
                    >
                      <i className="fa fa-download text-danger me-1"></i> CSV
                    </button>
                    <button className="btn btn-outline-secondary rounded-none">
                      <i className="fa fa-print text-danger me-1"></i> print
                    </button>
                    <button
                      className="btn btn-outline-secondary rounded-none"
                      onClick={() => downloadPDF(e)}
                    >
                      <i className="fa fa-file-pdf-o text-danger me-1"></i> PDF
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
export default AppointmentDetail;
