import { React, useEffect } from "react";
import { useState } from "react";
import Loader from "../Loader/Loader";
const Addpatient = () => {
  const [Name, setName] = useState("");
  const [Dob, SetDob] = useState("");
  const [Age, setAge] = useState("");
  const [Phone, SetPhone] = useState("");
  const [Email, SetEmail] = useState("");
  const [Gender, setGender] = useState("Male");
  const [Address, SetAddress] = useState("");
  const [file, SetFile] = useState(null);
  const [loader, setloader] = useState(false);
  const [confirm, setconfirm] = useState(false);
  const [Alert, setalert] = useState("");
  useEffect(() => {
    setTimeout(() => {
      setalert("");
    }, 3000);
  }, [Alert]);
  const CollectFormdata = () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("Name", Name);
    formData.append("dob", Dob);
    formData.append("age", Number(Age));
    formData.append("gender", Gender);
    formData.append("address", Address);
    formData.append("phone", Number(Phone));
    formData.append("email", Email);
    return formData;
  };
  const HandleOnsubmit = async (e) => {
    e.preventDefault();
    const userdata = JSON.parse(localStorage.getItem("user"));
    if (confirm) {
      setloader(true);
      let res = await fetch("http://localhost:4000/patient", {
        method: "POST",
        headers: {
          "auth-token": userdata.token,
        },
        body: CollectFormdata(),
      });
      let res_data = await res.json();
      if (res_data === "Patient added successfully") {
        setloader(false);
        setalert({ AlertType: "success", AlertData: res_data });
        setAge("");
        setGender("Male");
        setName("");
        SetAddress("");
        SetPhone("");
        // SetFile("");
        SetDob("");
        SetEmail("");
      } else {
        setloader(false);
        setalert({ AlertType: "danger", AlertData: res_data });
      }
    } else {
      setalert({ AlertType: "warning", AlertData: "Please Confirm" });
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
      <div className="xl:m-5 sm:m-0 relative">
        <div className="bg-[hsl(0,0%,100%)] p-3">
          <div>
            <h1 className="text-[rgb(229,116,152)] h4">Add Patient</h1>
            <form action="" onSubmit={HandleOnsubmit}>
              <div className="row max-sm:block">
                <div className="col">
                  <div className="">
                    <label htmlFor="Name" className="form-label font-semibold">
                      Patient Name
                    </label>
                  </div>
                  <div className="w-full">
                    <input
                      type="text"
                      className="form-control w-[100%]"
                      value={Name}
                      id="Name"
                      placeholder="Name"
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col max-sm:mt-2">
                  <div>
                    <label htmlFor="D-O-B" className="form-label font-semibold">
                      Date Of Birth
                    </label>
                  </div>
                  <div>
                    <input
                      type="date"
                      className="form-control w-[100%]"
                      id="D-O-B"
                      value={Dob}
                      placeholder="D-O-B"
                      onChange={(e) => SetDob(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row max-sm:block  mt-2">
                <div className="col">
                  <div>
                    <label htmlFor="Age" className="form-label font-semibold">
                      Age
                    </label>
                  </div>
                  <div>
                    <input
                      type="text"
                      className="form-control w-[100%]"
                      id="Age"
                      value={Age}
                      placeholder="Age"
                      onChange={(e) => setAge(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col max-sm:mt-2">
                  <div>
                    <label htmlFor="Phone" className="form-label font-semibold">
                      Phone
                    </label>
                  </div>
                  <div>
                    <input
                      type="number"
                      className="form-control w-[100%]"
                      required
                      value={Phone}
                      id="Phone"
                      placeholder="Phone"
                      onChange={(e) => SetPhone(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-2 max-sm:block">
                <div className="col max-sm:block">
                  <div>
                    <label htmlFor="Email" className="form-label font-semibold">
                      Email
                    </label>
                  </div>
                  <div>
                    <input
                      type="email"
                      className="form-control"
                      id="Email"
                      value={Email}
                      placeholder="Email"
                      onChange={(e) => SetEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col max-sm:mt-2">
                  <div>
                    <label
                      htmlFor="Gender"
                      className="form-label font-semibold"
                    >
                      Gender
                    </label>
                  </div>
                  <div>
                    <select
                      name="Gender"
                      id="Gender"
                      className="form-select"
                      value={Gender}
                      onChange={(e) => setGender(e.target.value)}
                      required
                    >
                      <option value="male" defaultValue={"male"}>
                        Male
                      </option>
                      <option value="female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <label htmlFor="Address" className="form-label font-semibold">
                  Address
                </label>
                <textarea
                  name=""
                  id="Address"
                  cols="30"
                  rows="10"
                  className="form-control h-[100px]"
                  placeholder="Address"
                  value={Address}
                  onChange={(e) => SetAddress(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="mt-2">
                <div>
                  <label htmlFor="File" className="form-label font-semibold">
                    File
                  </label>
                </div>
                <div>
                  <input
                    type="file"
                    className="form-control"
                    id="File"
                    required
                    onChange={(e) => {
                      SetFile(e.target.files[0]);
                    }}
                  />
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
                  required
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
export default Addpatient;
