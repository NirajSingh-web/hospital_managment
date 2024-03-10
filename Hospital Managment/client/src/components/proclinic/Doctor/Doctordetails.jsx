import { React, useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adddoctor } from "../../../store/doctor/doctorslice";
const DoctorDetails = () => {
  const [doctorlist, setdoctorlist] = useState("");
  const [userauth, setuserauth] = useState("");
  const [loader, setloader] = useState(false);
  const [apihit, setapihit] = useState(false);
  const [Alert, setalert] = useState("");
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem("user"));
    if (userdata) {
      if (userdata["usertype"] != "Patient") {
        setuserauth(true);
      } else {
        setuserauth(false);
      }
    }
    fetch("http://localhost:4000/doctor")
      .then((res) => res.json())
      .then((data) => setdoctorlist(data))
      .catch((e) => console.log(e.message));
  });
  const HandleonEdit = (e) => {
    if (e) {
      dispatch(adddoctor(e));
      Navigate("/Doctor/EditDoctor");
    }
  };
  const Handleondelete = async (e) => {
    if (e) {
      setloader(true);
      const res = await fetch("http://localhost:4000/doctor", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(e),
      });
      const res_data = await res.json();
      if (res_data === "Deleted Successfully!") {
        setloader(false);
        setapihit(true);
        setalert({ AlertType: "success", AlertData: res_data });
      } else {
        setloader(false);
        setapihit(true);
        setalert({ AlertType: "danger", AlertData: res_data });
      }
    }
  };
  const downloadCSV = (e) => {
    const headers = Object.keys(doctorlist[0]);
    const csvContent = [
      headers.join(",") + "\n" + headers.map((key) => e[key]).join(","),
    ];
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const downloadPDF = () => {
    const input = document.getElementById("pdf-content");
    html2canvas(input).then((canvas) => {
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 210, 297); // Adjust width and height as needed
      pdf.save("download.pdf");
    });
  };
  const downloadExcel = (e) => {
    const headings = Object.keys(doctorlist[0]);
    const dataArray = [headings, headings.map((key) => e[key])];
    const ws = XLSX.utils.aoa_to_sheet(dataArray);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const downloadstatus = XLSX.writeFile(wb, "doctorlist.xlsx");
    if (downloadstatus) {
      alert("downlloaded");
    }
  };
  return (
    <div
      className={` ${
        doctorlist.length === 0 ? "bg-[hsl(208,35%,13%)]" : "xl:m-4 max-sm:m-2"
      }`}
    >
      {doctorlist.length != 0 ? (
        <div className="bg-[hsl(0,0%,100%)] p-3">
          <h1 className="text-[rgb(229,116,152)] h4 ">Doctor Details</h1>
          {doctorlist &&
            doctorlist.map((e) => (
              <div className="flex justify-between flex-wrap overflow-hidden border-t border-spacing-3 p-3">
                <div className="card">
                  <div className="card-body">
                    <div>
                      <img
                        src={`/src/upload/file/${e["file"]["filename"]}`}
                        alt=""
                        className="aspect-[2/3] object-cover h-[200px] w-[200px]"
                      />
                    </div>
                    <div>
                      <h1 className="h4">{e.Name}</h1>
                    </div>
                    <div>
                      <p>{e.doctordetail}</p>
                    </div>
                    {userauth && (
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
                    )}
                  </div>
                </div>
                <div className="overflow-x-scroll no-scrollbar">
                  <table
                    className="table table-bordered text-center mt-2  table-striped"
                    id="pdf-content"
                  >
                    <thead>
                      <tr>
                        <th>Specialization</th>
                        <td>{e.specialization}</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>Experience</th>
                        <td>{e.experience}</td>
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
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="flex justify-center h-[81.8vh] items-center">
          <div className="card w-[50%] p-3 text-center bg-[hsl(210,56%,25%)] text-white">
            <p>No Data Available</p>
          </div>
        </div>
      )}
    </div>
  );
};
export default DoctorDetails;
