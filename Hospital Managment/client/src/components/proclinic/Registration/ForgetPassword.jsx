import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import App from "../Firebase";
import Loader from "../loader/Loader";
const auth = getAuth(App);
const ForgetPassword = () => {
  const [password, setPassword] = useState("");
  const [Username, setUsername] = useState("");
  const [passwordVissibillity, setPasswordVisibility] = useState("password");
  const [usermode, setusermode] = useState("");
  const [loader, setloader] = useState(false);
  const [phone, setphone] = useState("");
  const [token, settoken] = useState("");
  const [userfoundstatus, setuserfoundstatus] = useState("");
  const [verifyphonebtn, setverifyphonebtn] = useState("");
  const [phoneOTP, setphoneOTP] = useState("");
  const [verifyphonestatus, setverifyphonestatus] = useState("Otp Status");
  const Navigate = useNavigate();
  const [Alert, setalert] = useState("");
  useEffect(() => {
    setTimeout(() => {
      setalert("");
    }, 3000);
  }, [Alert && Alert["AlertData"]]);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (user["token"]) {
        Navigate("/");
      }
    }
  });
  // firebase phonenumber otp verification
  const configure = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
      size: "invisible",
    });
  };
  const verifyphone = (e) => {
    configure();
    const phoneNumber = "+91" + phone;
    const appVerifier = window.recaptchaVerifier;
    const auth = getAuth(App);
    setverifyphonestatus("Sending...");
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setverifyphonebtn(false);
        setverifyphonestatus("Otp send");
      })
      .catch((error) => {
        alert("Otp not send Refresh the page");
        setverifyphonestatus("Cancelled");
      });
  };
  const phoneotpverify = (e) => {
    e.preventDefault();
    if (phoneOTP != "") {
      return window.confirmationResult
        .confirm(phoneOTP)
        .then((result) => {
          console.log(result.user);
          setverifyphonestatus("Verified");
          return result.user;
        })
        .catch((error) => {
          alert("wrong otp entered");
        });
    } else {
      alert("enter otp");
    }
  };
  const verifyuserName = async () => {
    if (usermode === "Patient") {
      verifypatientusername();
    } else {
      verifydoctorusername();
    }
  };
  const verifypatientusername = async () => {
    const userdata = {
      username: Username,
    };
    setloader(true);
    const response = await fetch(
      "http://localhost:4000/user/patient/verify/username",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userdata),
      }
    );
    const res = await response.json();
    if (res.token) {
      settoken(res.token);
      setuserfoundstatus("Verified");
      setloader(false);
    } else {
      setalert({ AlertType: "danger", AlertData: res });
      setloader(false);
    }
  };
  const verifydoctorusername = async () => {
    const userdata = {
      username: Username,
    };
    setloader(true);
    const response = await fetch(
      "http://localhost:4000/user/doctor/verify/username",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userdata),
      }
    );
    const res = await response.json();
    if (res.token) {
      settoken(res.token);
      setuserfoundstatus("Verified");
      setloader(false);
    } else {
      setalert({ AlertType: "danger", AlertData: res });
      setloader(false);
    }
  };
  const HandleonUpdate = async (e) => {
    e.preventDefault();

    if (usermode === "Patient") {
      updatepatientuser();
    } else {
      updatedoctoruser();
    }
  };
  const updatepatientuser = async () => {
    const userdata = {
      password: password,
    };
    setloader(true);
    const response = await fetch(
      "http://localhost:4000/user/patient/reset/password",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify(userdata),
      }
    );
    const res_data = await response.json();
    if (res_data != "invalid Token") {
      setusermode(false);
      setloader(false);
      setalert({ AlertType: "success", AlertData: res_data });
      setPassword("");
      setUsername("");
      setphone("");
      setverifyphonestatus("");
      setuserfoundstatus("");
    } else {
      setloader(false);
      setalert({ AlertType: "danger", AlertData: res_data });
      setPassword("");
      setUsername("");
    }
  };
  const updatedoctoruser = async () => {
    const userdata = {
      password: password,
    };
    setloader(true);
    const response = await fetch(
      "http://localhost:4000/user/doctor/reset/password",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify(userdata),
      }
    );
    const res_data = await response.json();
    if (res_data != "invalid Token") {
      setusermode(false);
      setloader(false);
      setalert({ AlertType: "success", AlertData: res_data });
      setPassword("");
      setUsername("");
      setphone("");
      setverifyphonestatus("");
      setuserfoundstatus("");
    } else {
      setloader(false);
      setalert({ AlertType: "danger", AlertData: res_data });
      setPassword("");
      setUsername("");
    }
  };
  return (
    <>
      {Alert["AlertData"] && (
        <div className="relative bottom-4">
          <div
            className={`alert alert-${Alert["AlertType"]} alert-dismissible  z-20 absolute top-[-50px]  transition-all w-full`}
          >
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
            ></button>
            <p>
              <strong>
                {Alert["AlertType"].slice(0, 1).toUpperCase() +
                  Alert["AlertType"].slice(1, Alert["AlertType"].length)}
              </strong>
              <span className="ps-2">{Alert["AlertData"]}</span>
            </p>
          </div>
        </div>
      )}
      <div className="m-5 flex justify-center">
        <div className="bg-[hsl(0,0%,100%)] p-3 max-sm:w-[100%] xl:w-[40%] relative">
          <div>
            <h1 className="text-[rgb(229,116,152)] h4 border-b border-spacing-2 pb-3 flex justify-center">
              Update
            </h1>
            <div>
              <form action="" onSubmit={HandleonUpdate}>
                <div id="sign-in-button"></div>
                <div className="mt-3">
                  <select
                    name="Select User Type"
                    id=""
                    className="form-select leading-6  bg-[rgb(240,240,240)] "
                    value={usermode}
                    onChange={(e) => setusermode(e.target.value)}
                  >
                    <option value={""} selected disabled hidden>
                      Select User Type
                    </option>
                    <option defaultValue={"Doctor"}>Doctor</option>
                    <option defaultValue={"Patient"}>Patient</option>
                  </select>
                </div>
                {usermode && (
                  <div>
                    <div className="mt-4 relative">
                      <input
                        type="text"
                        className="form-control bg-[rgb(240,240,240)] leading-8"
                        value={Username}
                        placeholder="Username"
                        disabled={userfoundstatus && true}
                        onChange={(e) => {
                          setUsername(e.target.value);
                        }}
                        required
                      ></input>
                      {userfoundstatus && (
                        <span
                          className={`absolute right-3 top-3 cursor-pointer  font-semibold  text-primary`}
                        >
                          {userfoundstatus}
                        </span>
                      )}
                    </div>
                    {userfoundstatus ? null : (
                      <div className="bg-primary flex justify-center items-center rounded-sm ">
                        <button
                          onClick={verifyuserName}
                          className="btn btn-primary hover:bg-[rgb(13,110,253)] border-none leading-8"
                          type="button"
                        >
                          Verify
                        </button>
                      </div>
                    )}
                    {userfoundstatus && (
                      <div>
                        <div className="mt-4 relative">
                          <input
                            type="number"
                            className="form-control bg-[rgb(240,240,240)] leading-8"
                            value={phone}
                            placeholder="Phone"
                            disabled={
                              verifyphonestatus === "Verified" ? true : null
                            }
                            onChange={(e) => {
                              setphone(e.target.value);
                              setverifyphonebtn(e.target.value);
                            }}
                          ></input>
                          {/* otp status  */}
                          <span
                            className={`absolute right-3 top-3 cursor-pointer  font-semibold  ${
                              verifyphonestatus === "Otp send"
                                ? "text-blue-700"
                                : null || verifyphonestatus === "Sending..."
                                ? "text-yellow-400"
                                : null || verifyphonestatus === "Cancelled"
                                ? "text-danger"
                                : "text-green-600"
                            }`}
                          >
                            {verifyphonestatus}
                          </span>
                          {/* resend otp  */}
                          {verifyphonestatus === "Otp send" ? (
                            <div className="relative">
                              <button
                                className="text-primary absolute right-0"
                                onClick={verifyphone}
                                type="button"
                              >
                                Resend
                              </button>
                            </div>
                          ) : null}
                        </div>
                        {/* verify number  */}
                        {verifyphonebtn.length === 10 && (
                          <div className="bg-primary flex justify-center items-center rounded-sm ">
                            <button
                              onClick={verifyphone}
                              className="btn btn-primary hover:bg-[rgb(13,110,253)] border-none leading-8"
                              type="button"
                            >
                              Get otp
                            </button>
                          </div>
                        )}
                        {/* verifyphoneotp */}
                        {verifyphonestatus === "Otp send" ? (
                          <div>
                            <div className="mt-6">
                              <input
                                type="number"
                                className="form-control bg-[rgb(240,240,240)] leading-8"
                                value={phoneOTP}
                                placeholder="Otp"
                                onChange={(e) => {
                                  setphoneOTP(e.target.value);
                                }}
                              ></input>
                            </div>
                            <div className="bg-primary flex justify-center items-center">
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={phoneotpverify}
                              >
                                Verify Otp
                              </button>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    )}
                    {verifyphonestatus === "Verified" && (
                      <>
                        <div className="mt-4 relative flex">
                          <input
                            type={passwordVissibillity}
                            className="form-control leading-8 bg-[hsl(0,0%,94%)]
          "
                            value={password}
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                            required
                            placeholder="Password"
                          />
                          <span
                            className="absolute right-3 top-3 cursor-pointer"
                            onClick={() =>
                              passwordVissibillity === "password"
                                ? setPasswordVisibility("text")
                                : setPasswordVisibility("password")
                            }
                          >
                            <i className="fa fa-eye"></i>
                            <span
                              className={`absolute right-[5px] top-[-0.5px]   ${
                                passwordVissibillity === "text"
                                  ? "hidden"
                                  : "block"
                              } `}
                            >
                              /
                            </span>
                          </span>
                        </div>
                        <div className="flex  mt-2">
                          <input type="checkbox" className="form-check-input" />
                          <span className="ms-2">Rembember</span>
                        </div>
                        <div className="bg-[rgb(229,116,152)] mt-3 flex justify-center items-center rounded-sm text-white :bg-[rgb(229,116,152)]  leading-10 ">
                          <input
                            type="submit"
                            value="Update"
                            className="font-bold "
                          />
                        </div>
                      </>
                    )}
                    <div className="flex justify-center mt-3">
                      <p>
                        New User,
                        <span>
                          <span
                            className="text-primary cursor-pointer"
                            onClick={() => Navigate("/SignUp")}
                          >
                            Sign Up
                          </span>
                          Here
                        </span>
                      </p>
                    </div>
                  </div>
                )}
              </form>
            </div>
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

export default ForgetPassword;
