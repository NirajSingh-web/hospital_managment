import { React, useEffect, useState } from "react";
const PaymentInvoice = () => {
  const [paymentlist, setpaymentlist] = useState("");
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
          <div className="flex justify-between">
            <div>
              <img src="" alt="not found" />
            </div>
            <div>
              <h1 className="h3">INVOICE</h1>
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <div className="w-[40%]">
              <h1 className="h6">Street Adress</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
                magnam, est ab, hic sunt corrupti rem distinctio nesciunt fugiat
                tempora ullam itaque laborum! Doloremque non perferendis
                obcaecati atque in vitae.
              </p>
            </div>
            <div>
              <p>Invoice # [123] Date: Nov 16, 2018</p>
            </div>
          </div>
          <div>
            <h1 className="h6 text-red-600">Patient Details</h1>
            <div className="flex justify-between">
              <div className="w-[40%]">
                <div>
                  <h1>Name</h1>
                </div>
                <div>
                  <h1>Age</h1>
                </div>
                <div>
                  <h1> Address</h1>
                </div>
                <div>
                  <h1>Phone</h1>
                </div>
              </div>
              <div className="w-[40%]">
                <div>
                  <h1>Patient ID</h1>
                </div>
                <div>
                  <h1>Payment Type</h1>
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
                  {paymentlist.map(
                    ({ Services, payment }, index) =>
                      index < 10 && (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{Services[0]["Servicename"]}</td>
                          <td>${payment["discount"] / 80}</td>
                          <td>${Number(Services[0]["Cost"]) / 80}</td>
                          <td>${payment["advancePaid"] / 80}</td>
                          <td>
                            $
                            {(Number(Services[0]["Cost"]) -
                              payment["discount"] +
                              payment["advancePaid"]) /
                              80}
                          </td>
                        </tr>
                      )
                  )}
                </tbody>
              </table>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="flex justify-between">
                  <h6 className="h6">Note:</h6>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, accusamus aliquam harum laboriosam dolores quis
                    architecto illum. Porro, veniam veritatis ut similique atque
                    provident obcaecati aut vero quibusdam eaque illo.
                  </p>
                </div>
                <div>
                  <h6 className="h6">Signature</h6>
                  <p></p>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-3 mt-2">
              <button className="btn btn-outline-secondary rounded-none">
                <i className="fa fa-print text-danger me-1"></i> print
              </button>
              <button className="btn btn-outline-secondary rounded-none">
                <i className="fa fa-file-pdf-o text-danger me-1"></i> PDF
              </button>
            </div>
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
export default PaymentInvoice;
