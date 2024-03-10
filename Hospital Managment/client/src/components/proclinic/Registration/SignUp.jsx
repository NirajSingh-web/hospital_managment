import { React, useEffect, useState } from "react";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import App from "../Firebase";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";
const auth = getAuth(App);
const SignUp = () => {
  const Navigate = useNavigate();
  const [usermode, setusermode] = useState("");
  const [password, setPassword] = useState("");
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Doctordegree, setdoctordegree] = useState("");
  const [Confirm, SetConfirm] = useState(false);
  const [passwordVissibillity, setPasswordVisibility] = useState("password");
  const [loader, setloader] = useState(false);
  const [ConfirmPassword, SetConfirmPassword] = useState("");
  const [phone, setphone] = useState("");
  const [verifyphonebtn, setverifyphonebtn] = useState("");
  const [phoneOTP, setphoneOTP] = useState("");
  const [verifyphonestatus, setverifyphonestatus] = useState("Otp Status");
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
  // form submit process
  const HandleonSubmit = (e) => {
    e.preventDefault();
    if (
      (Email != "",
      phone != "",
      Username != "",
      password != "",
      ConfirmPassword != "")
    ) {
      if (verifyphonestatus === "Verified") {
        if (password.length >= 6)
          if (password === ConfirmPassword) {
            if (Confirm) {
              if (usermode === "Patient") {
                patientSignup();
              } else {
                doctorsignup();
              }
            } else {
              alert("Accept condition");
            }
          } else {
            alert("send the correct confirmation password");
          }
        else {
          alert("password must be at least 6 characters long");
        }
      } else {
        alert("verify phone number and email ");
      }
    } else {
      alert("Fill the Data");
    }
  };
  // this mehod calling in hanlde on submit function
  const patientSignup = async () => {
    const patientuser = {
      Username,
      password,
      Email,
      phone: Number(phone),
    };
    setloader(true);
    const url = "http://localhost:4000/user/signup/patient";
    const result = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patientuser),
    });
    const res_data = await result.json();
    if (res_data) {
      setloader(false);
      if (res_data.msg === "patient user succesfully added") {
        alert(res_data.msg);
        setEmail("");
        setphone("");
        setPassword("");
        SetConfirmPassword("");
        setverifyphonestatus("");
        setUsername("");
        Navigate("/Login");
      } else {
        alert(res_data);
      }
    }
  };
  const doctorsignup = async () => {
    const Doctoruser = {
      Username,
      password,
      Email,
      Doctordegree,
      phone: Number(phone),
    };
    setloader(true);
    const url = "http://localhost:4000/user/signup/doctor";
    const result = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Doctoruser),
    });
    const res_data = await result.json();
    if (res_data) {
      setloader(false);
      if (res_data.msg === "Doctor user succesfully added") {
        alert(res_data.msg);
        setEmail("");
        setphone("");
        setPassword("");
        SetConfirmPassword("");
        setverifyphonestatus("");
        setUsername("");
        Navigate("/Login");
      } else {
        alert(res_data);
      }
    }
  };
  return (
    <>
      <div className="m-5 flex justify-center ">
        <div className="bg-[hsl(0,0%,100%)] p-3 max-sm:w-[100%] xl:w-[40%] relative">
          <div>
            <h1 className="text-[rgb(229,116,152)] h4 border-b border-spacing-2 pb-3 flex justify-center">
              Sign Up
            </h1>
            <div>
              <form action="" onSubmit={HandleonSubmit}>
                <div id="sign-in-button"></div>
                <div className="mt-3">
                  <select
                    name="Select User Type"
                    id=""
                    className="form-select leading-6  bg-[rgb(240,240,240)] "
                    value={usermode}
                    onChange={(e) => setusermode(e.target.value)}
                  >
                    <option value="" disabled selected hidden>
                      Select User Type
                    </option>
                    <option value="Doctor">Doctor</option>
                    <option value="Patient">Patient</option>
                  </select>
                </div>
                {usermode ? (
                  <div>
                    <div className="mt-4 relative">
                      <input
                        type="email"
                        className="form-control bg-[rgb(240,240,240)] leading-8"
                        value={Email}
                        placeholder="Email"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      ></input>
                    </div>
                    {/* phone number  */}
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
                      {verifyphonebtn.length === 10 ? (
                        <div className="bg-primary flex justify-center items-center rounded-sm ">
                          <button
                            onClick={verifyphone}
                            className="btn btn-primary hover:bg-[rgb(13,110,253)] border-none leading-8"
                            type="button"
                          >
                            Get otp
                          </button>
                        </div>
                      ) : null}
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
                    <div className="mt-3">
                      <input
                        type="text"
                        className="form-control bg-[rgb(240,240,240)] leading-8"
                        value={Username}
                        placeholder="Username"
                        onChange={(e) => {
                          setUsername(e.target.value);
                        }}
                      ></input>
                    </div>
                    {usermode === "Doctor" ? (
                      <div className="mt-4 relative">
                        <div className="">
                          <label
                            htmlFor="file"
                            className="absolute right-2 top-[10px]"
                          >
                            Degree*
                          </label>
                        </div>
                        <input
                          id="file"
                          required
                          type="file"
                          className="form-control bg-[rgb(240,240,240)] leading-8"
                          value={Doctordegree}
                          name="upload  your degree"
                          onChange={(e) => {
                            setdoctordegree(e.target.value);
                          }}
                        ></input>
                      </div>
                    ) : null}
                    <div className="mt-3 relative flex">
                      <input
                        type={passwordVissibillity}
                        className="form-control leading-8 bg-[hsl(0,0%,94%)]
                "
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                            passwordVissibillity === "text" ? "hidden" : "block"
                          } `}
                        >
                          /
                        </span>
                      </span>
                    </div>
                    <div className="mt-3 relative flex">
                      <input
                        type="text"
                        className="form-control leading-8 bg-[hsl(0,0%,94%)]
                "
                        value={ConfirmPassword}
                        onChange={(e) => SetConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                      />
                    </div>
                    <div className="flex  mt-2">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={Confirm}
                        onChange={(e) => SetConfirm(e.target.checked)}
                      />
                      <span className="ms-2">
                        I agree to Terms & Conditions
                      </span>
                    </div>
                    <div
                      className="bg-[rgb(229,116,152)] mt-3 flex justify-center items-center rounded-sm text-white :bg-[rgb(229,116,152)] 
               leading-10 "
                    >
                      <input
                        type="submit"
                        value="Sign Up"
                        className="font-bold"
                      />
                    </div>
                    <div className="flex justify-center leading-10">
                      <p>
                        Alredy Sign Up,
                        <span
                          className="text-primary cursor-pointer"
                          onClick={() => Navigate("/Login")}
                        >
                          Login
                        </span>{" "}
                        Here
                      </p>
                    </div>
                  </div>
                ) : null}
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
export default SignUp;
