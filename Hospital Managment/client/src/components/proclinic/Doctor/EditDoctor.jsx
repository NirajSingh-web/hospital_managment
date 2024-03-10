import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";
const EditDoctor = () => {
  const [Name, setName] = useState("");
  const [Specialization, setspecialization] = useState("");
  const [Experience, setexperience] = useState("");
  const [Dob, SetDob] = useState("");
  const [Age, setAge] = useState("");
  const [Phone, SetPhone] = useState("");
  const [Email, SetEmail] = useState("");
  const [Gender, setGender] = useState("Male");
  const [Address, SetAddress] = useState("");
  const [File, SetFile] = useState("");
  const [Doctordetail, Setdoctordetail] = useState("");
  const [confirm, setconfirm] = useState(false);
  const [loader, setloader] = useState(false);
  const [_id, setid] = useState("");
  const [Alert, setalert] = useState("");
  const doctordata = useSelector((state) => {
    return state.doctordata;
  });
  useEffect(() => {
    setTimeout(
      () => {
        setalert("");
      },
      Alert && Alert["AlertData"].length > 40 ? 6000 : 3000
    );
  }, [Alert && Alert["AlertData"]]);
  useEffect(() => {
    if (Object.keys(doctordata).length != 0) {
      setid(doctordata["_id"]);
      setAge(doctordata["age"]);
      setGender(doctordata["gender"]);
      setName(doctordata["Name"]);
      setexperience(doctordata["experience"]);
      setspecialization(doctordata["specialization"]);
      SetAddress(doctordata["address"]);
      Setdoctordetail(doctordata["doctordetail"]);
      SetDob(doctordata["dob"].slice(0, 10));
      SetEmail(doctordata["email"]);
      SetPhone(doctordata["phone"]);
    }
  }, [doctordata]);
  const CollectFormdata = () => {
    const formData = new FormData();
    formData.append("file", File);
    formData.append("Name", Name);
    formData.append("dob", Dob);
    formData.append("age", Number(Age));
    formData.append("gender", Gender);
    formData.append("address", Address);
    formData.append("phone", Number(Phone));
    formData.append("email", Email);
    formData.append("experience", Number(Experience));
    formData.append("specialization", Specialization);
    formData.append("doctordetail", Doctordetail);
    return formData;
  };
  const inputcondition = () => {
    return (
      Name != "" &&
      Object.keys(File).length != 0 &&
      Dob != "" &&
      Age != "" &&
      Gender != "" &&
      Address != "" &&
      Phone != "" &&
      Email != "" &&
      Experience != "" &&
      Specialization != "" &&
      Doctordetail != ""
    );
  };
  const handleonupdate = async (e) => {
    e.preventDefault();
    if (Object.keys(doctordata).length != 0) {
      if (inputcondition()) {
        if (confirm) {
          setloader(true);
          let res = await fetch("http://localhost:4000/Doctor", {
            method: "PUT",
            body: CollectFormdata(),
          });
          let res_data = await res.json();
          if (res_data === "Doctor Updated Successfully") {
            setloader(false);
            setalert({ AlertType: "success", AlertData: res_data });
            setAge("");
            setGender("");
            setName("");
            setexperience("");
            setspecialization("");
            SetAddress("");
            Setdoctordetail("");
            SetEmail("");
            SetPhone("");
            SetDob("");
            setconfirm(false);
          } else {
            setloader(false);
            setalert({ AlertType: "danger", AlertData: res_data });
          }
        } else {
          setalert({ AlertType: "warning", AlertData: "Please Confirm" });
        }
      } else {
        setalert({
          AlertType: "warning",
          AlertData: "Please Fill the all data",
        });
      }
    } else {
      setalert({
        AlertType: "danger",
        AlertData:
          "Can't Update Manually! for update  please click on edit button. in All Doctor section",
      });
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
      <div className="xl:m-5 sm:m-0 ">
        <div className="bg-[hsl(0,0%,100%)] p-3 relative">
          <div>
            <h1 className="text-[rgb(229,116,152)] h4">Edit Doctor</h1>
            <form action="" onSubmit={handleonupdate}>
              <div className="row max-sm:block">
                <div className="col">
                  <div className="">
                    <label htmlFor="Name" className="form-label font-semibold">
                      Doctor Name
                    </label>
                  </div>
                  <div className="w-full">
                    <input
                      type="text"
                      className="form-control w-[100%]"
                      id="Name"
                      placeholder="Name"
                      value={Name}
                      onChange={(e) => setName(e.target.value)}
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
                      placeholder="D-O-B"
                      value={Dob}
                      onChange={(e) => SetDob(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row max-sm:block mt-2">
                <div className="col">
                  <div>
                    <label
                      htmlFor="Specialization"
                      className="form-label font-semibold"
                    >
                      Specialization
                    </label>
                  </div>
                  <div>
                    <input
                      type="text"
                      className="form-control w-[100%]"
                      id="Specialization"
                      placeholder="Specialization"
                      value={Specialization}
                      onChange={(e) => setspecialization(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col max-sm:mt-2">
                  <div>
                    <label
                      htmlFor="Experience"
                      className="form-label font-semibold"
                    >
                      Experience
                    </label>
                  </div>
                  <div>
                    <input
                      type="number"
                      className="form-control w-[100%]"
                      id="Experience"
                      placeholder="Experience"
                      value={Experience}
                      onChange={(e) => setexperience(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row max-sm:block mt-2">
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
                      placeholder="Age"
                      value={Age}
                      onChange={(e) => setAge(e.target.value)}
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
                      id="Phone"
                      placeholder="Phone"
                      value={Phone}
                      onChange={(e) => SetPhone(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row max-sm:block mt-2">
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
                      placeholder="Email"
                      value={Email}
                      onChange={(e) => SetEmail(e.target.value)}
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
                      name=""
                      id="Gender"
                      className="form-select"
                      value={Gender}
                      onChange={(e) => {
                        setGender(e.target.value);
                      }}
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
              <div className="mt-2 flex row max-sm:block">
                <div className="col">
                  <label
                    htmlFor="Doctor Details"
                    className="form-label font-semibold"
                  >
                    Doctor Details
                  </label>
                  <textarea
                    name=""
                    id="Doctor_Details"
                    cols="30"
                    rows="10"
                    className="form-control h-[100px]"
                    placeholder="Doctor Details"
                    value={Doctordetail}
                    onChange={(e) => Setdoctordetail(e.target.value)}
                  ></textarea>
                </div>
                <div className="max-sm:mt-2 col">
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
                  ></textarea>
                </div>
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
                    onChange={(e) => SetFile(e.target.files[0])}
                  />
                </div>
              </div>
              <div className="mt-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="Confirm"
                  value={confirm}
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
export default EditDoctor;
