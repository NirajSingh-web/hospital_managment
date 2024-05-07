import { React, useEffect, useState } from "react";
import { logodark } from "../../../assets";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
const PaymentInvoice = () => {
  const [paymentlist, setpaymentlist] = useState("");
  const [patientlist, setpatientlist] = useState("");
  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem("user"));
    if (userdata) {
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
      fetch("http://localhost:4000/patient", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": userdata.token,
          "user-mode": userdata.usermode,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setpatientlist(data);
        });
    }
  }, []);
  const downloadPDF = (index) => {
    const input = document.getElementById(`pdf-content${index}`);
    html2canvas(input).then((canvas) => {
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 210, 297); // Adjust width and height as needed
      pdf.save("download.pdf");
    });
  };
  // const handleOnprint = (index) => {
  //   const input = document.getElementById(`pdf-content${index}`).innerHTML;
  //   // const newWindow = window.open("", "_blank");
  //   window.document.write("<html><head><title>Print</title>");
  //   // newWindow.document.write(
  //   //   '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"></head><body class="p-4">'
  //   // );
  //   window.document.write(input);
  //   window.document.write("</body></html>");
  //   window.print();
  // };
  return (
    <div
      className={`sm:m-0 max-sm:p-2 ${
        paymentlist.length === 0 ? "bg-[hsl(208,35%,13%)] h-[81.8vh]" : "xl:m-5"
      }`}
    >
      {(paymentlist.length && patientlist.length) != 0 ? (
        <div className="bg-[hsl(0,0%,100%)] p-3">
          <h1 className="text-[rgb(229,116,152)] h4 border-b border-spacing-3 pb-2">
            Payment List
          </h1>
          {paymentlist.map((e, index) => (
            <div key={index} id={`pdf-content${index + 1}`}>
              <div className="xl:flex justify-between ">
                <div>
                  <div>
                    <img src={logodark} alt="not found" />
                  </div>
                  <div className="xl:w-[40%] max-sm:w-[100%] xl:mt-4 max-sm:mt-1">
                    <h1 className="h6">Street Adress</h1>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Commodi magnam, est ab, hic sunt corrupti rem distinctio
                      nesciunt fugiat tempora ullam itaque laborum! Doloremque
                      non perferendis obcaecati atque in vitae.
                    </p>
                  </div>
                </div>
                <div>
                  <div>
                    <h1 className="h3">INVOICE</h1>
                  </div>
                  <p className="xl:mt-4 max-sm:mt-1">
                    Invoice # [123] Date: Nov 16, 2018
                  </p>
                </div>
              </div>
              <div>
                <h1 className="h6 text-red-600">Patient Details</h1>
                <div className="flex justify-between flex-wrap">
                  <div className="xl:w-[40%] max-sm:w-[100%]">
                    <div className="flex gap-[5px]">
                      <h1 className="h6">Name</h1>
                      <span>:-</span>
                      <p>{patientlist[index].Name}</p>
                    </div>
                    <div className="flex gap-[5px]">
                      <h1 className="h6">Age</h1>
                      <span>:-</span>
                      <p>{patientlist[index].age}</p>
                    </div>
                    <div className="flex gap-[5px]">
                      <h1 className="h6"> Address</h1>
                      <span>:-</span>
                      <p>{patientlist[index].address}</p>
                    </div>
                    <div className="flex gap-[5px]">
                      <h1 className="h6">Phone</h1>
                      <span>:-</span>
                      <p>{patientlist[index].phone}</p>
                    </div>
                  </div>
                  <div className="w-[40%] max-sm:w-[100%]">
                    <div className="flex gap-[5px]">
                      <h1 className="h6">Patient ID</h1>
                      <span>:-</span>
                      <p>{e.PatientID}</p>
                    </div>
                    <div className="flex gap-[5px]">
                      <h1 className="h6">Payment ID</h1>
                      <span>:-</span>
                      <p>{e.PaymentID}</p>
                    </div>
                    <div className="flex gap-[5px]">
                      <h1 className="h6">Payment Type</h1>
                      <span>:-</span>
                      <p>{e.payment.type}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <h1 className="h6 text-red-500">Services</h1>
                <div className="overflow-x-scroll no-scrollbar">
                  <table className="table table-bordered text-center table-striped">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th> Service</th>
                        <th>Discount</th>
                        <th> Unit Cost</th>
                        <th>Advance Paid</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{e.Services[0]["Servicename"]}</td>
                        <td>${e.payment["discount"] / 80}</td>
                        <td>${Number(e.Services[0]["Cost"]) / 80}</td>
                        <td>${e.payment["advancePaid"] / 80}</td>
                        <td>
                          $
                          {(Number(e.Services[0]["Cost"]) -
                            e.payment["discount"] +
                            e.payment["advancePaid"]) /
                            80}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div className="flex justify-between">
                      <h6 className="h6">Note:</h6>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quisquam, accusamus aliquam harum laboriosam dolores
                        quis architecto illum. Porro, veniam veritatis ut
                        similique atque provident obcaecati aut vero quibusdam
                        eaque illo.
                      </p>
                    </div>
                    <div>
                      <h6 className="h6">Signature</h6>
                      <p></p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center gap-3 mt-2">
                  <button
                    className="btn btn-outline-secondary rounded-none"
                    onClick={() => handleOnprint(index + 1)}
                  >
                    <i className="fa fa-print text-danger me-1"></i> print
                  </button>
                  <button
                    className="btn btn-outline-secondary rounded-none"
                    onClick={() => downloadPDF(index + 1)}
                  >
                    <i className="fa fa-file-pdf-o text-danger me-1"></i> PDF
                  </button>
                </div>
              </div>
            </div>
          ))}
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
export default PaymentInvoice;
