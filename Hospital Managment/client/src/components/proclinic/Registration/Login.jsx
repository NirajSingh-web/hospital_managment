import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";
const Login = () => {
  const [password, setPassword] = useState("");
  const [Username, setUsername] = useState("");
  const [passwordVissibillity, setPasswordVisibility] = useState("password");
  const [usermode, setusermode] = useState("");
  const [loader, setloader] = useState(false);
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
  const HandleonSubmit = async (e) => {
    e.preventDefault();
    if (usermode) {
      if (Username != "" && password != "") {
        if (usermode === "Patient") {
          patientlogin();
        } else if (usermode === "Doctor") {
          doctorlogin();
        } else {
          adminlogin();
        }
      } else {
        alert("fill the data");
      }
    } else {
      alert("Choose User Type");
    }
  };
  const patientlogin = async () => {
    const userdata = {
      password,
      Username,
    };
    setloader(true);
    const response = await fetch("http://localhost:4000/patientauth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userdata),
    });
    const res = await response.json();
    if (res.token) {
      getpatientuser(res.token);
    } else {
      setalert({ AlertType: "danger", AlertData: res });
      setloader(false);
    }
  };
  const getpatientuser = async (token) => {
    const response = await fetch("http://localhost:4000/patientauth/getuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    const res_data = await response.json();
    if (res_data != "invalid Token") {
      setloader(false);
      setalert({ AlertType: "success", AlertData: "logged in" });
      localStorage.setItem(
        "user",
        JSON.stringify({
          token: token,
          usertype: usermode,
        })
      );
      if (Alert["AlertData"] === null) {
        Navigate("/");
      }
    } else {
      setloader(false);
      setalert({ AlertType: "danger", AlertData: res_data });
      setPassword("");
      setUsername("");
    }
  };
  const doctorlogin = async () => {
    const userdata = {
      password,
      Username,
    };
    setloader(true);
    const response = await fetch("http://localhost:4000/doctorauth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userdata),
    });
    const res_data = await response.json();
    console.log(res_data);
    if (res_data.token) {
      getdoctoruser(res_data.token);
    } else {
      setalert({ AlertType: "danger", AlertData: res_data });
      setloader(false);
    }
  };
  const getdoctoruser = async (token) => {
    const response = await fetch("http://localhost:4000/doctorauth/getuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    const res_data = await response.json();
    console.log(res_data);
    if (res_data != "invalid Token") {
      if (res_data.msg) {
        setloader(false);
        localStorage.setItem(
          "user",
          JSON.stringify({
            token: token,
            usertype: usermode,
          })
        );
        Navigate("/");
      } else {
        setloader(false);
        setalert({ AlertType: "danger", AlertData: res_data });
      }
    } else {
      setloader(false);
      setalert({ AlertType: "danger", AlertData: res_data });
      setPassword("");
      setUsername("");
    }
  };
  const adminlogin = async () => {
    const userdata = {
      password,
      Username,
    };
    setloader(true);
    const response = await fetch("http://localhost:4000/Adminauth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userdata),
    });
    const res_data = await response.json();
    if (res_data.token) {
      getadminuser(res_data.token);
    } else {
      setalert({ AlertType: "danger", AlertData: res_data });
      setloader(false);
    }
  };
  const getadminuser = async (token) => {
    const response = await fetch("http://localhost:4000/Adminauth/get/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    const res_data = await response.json();
    if (res_data != "invalid Token") {
      if (res_data.msg) {
        setloader(false);
        localStorage.setItem(
          "user",
          JSON.stringify({
            token: token,
            usertype: usermode,
          })
        );
        Navigate("/");
      } else {
        setloader(false);
        setalert({ AlertType: "danger", AlertData: res_data });
      }
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
        <div className="relative">
          <div
            className={`alert alert-${Alert["AlertType"]} alert-dismissible  z-20 absolute top-[-50px] transition-all w-full`}
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
          <h1 className="text-[rgb(229,116,152)] h4 border-b border-spacing-2 pb-3 flex justify-center">
            Login
          </h1>
          <div>
            <form action="" onSubmit={HandleonSubmit}>
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
                  <option defaultValue={"Admin"}>Admin</option>
                  <option defaultValue={"Doctor"}>Doctor</option>
                  <option defaultValue={"Patient"}>Patient</option>
                </select>
              </div>
              {usermode ? (
                <div>
                  <div className="mt-4">
                    <input
                      type="text"
                      className="form-control bg-[rgb(240,240,240)] leading-8"
                      value={Username}
                      placeholder="Username"
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                      required
                    ></input>
                  </div>
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
                          passwordVissibillity === "text" ? "hidden" : "block"
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
                  <div className="bg-[rgb(229,116,152)] mt-3 flex justify-center items-center rounded-sm text-white hover:bg-[rgb(229,116,152)]  leading-10 ">
                    <input type="submit" value="Login" className="font-bold " />
                  </div>
                  <div className="flex justify-between leading-10">
                    <div>
                      <span
                        onClick={() => Navigate("/forgot/password")}
                        className="text-primary cursor-pointer"
                      >
                        forgot password?
                      </span>
                    </div>
                    <div className="flex flex-wrap">
                      <span>New User, </span>
                      <div>
                        <span
                          className="text-primary cursor-pointer"
                          onClick={() => Navigate("/SignUp")}
                        >
                          Sign Up
                        </span>{" "}
                        Here
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
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
export default Login;
