import { React, useMemo } from "react";
import { menu, headernav } from "../constant";
import { logodark } from "../assets";
import { fadeIn, staggerContainer } from "../utils/motion";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import "react-vertical-timeline-component/style.min.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { headerdata } from "../store/headertitle/headerslice";
import { useDispatch, useSelector } from "react-redux";
const Header = (probs) => {
  const [isMobile, setIsMobile] = useState(false);
  const [pagetitle, setpagetitle] = useState("Quick Statistics");
  const [pagesubtitle, setpagesubtitle] = useState("");
  const [userbox, setuserbox] = useState(false);
  const [usernotification, setusernotification] = useState(false);
  const [auth, setauth] = useState(false);
  const Navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [Alert, setalert] = useState("");
  // geting page title and pagesubtitle from redux store
  const data = useSelector((state) => state.headerdata);
  // this method is used for assign null value for alert
  useEffect(() => {
    setTimeout(() => {
      setalert("");
    }, 3000);
  }, [Alert && Alert["AlertType"]]);
  // this method  is providing pagtitle and subtitle
  useEffect(() => {
    if (data.pagetitle) {
      setpagetitle(data.pagetitle);
      setpagesubtitle(data.pagesubTitle);
    }
  }, [data]);
  // it is using for get screen resolution
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width:800px)");
    setIsMobile(mediaQuery.matches);
    const handleonchange = (e) => {
      setIsMobile(e.matches);
    };
    mediaQuery.addEventListener("change", handleonchange);
    return () => {
      mediaQuery.removeEventListener("change", handleonchange);
    };
  }, []);
  // through location provide page title and page subtitile
  useEffect(() => {
    if (location.pathname === "/VerifyDoctor") {
      dispatch(
        headerdata({
          pagetitle: "Doctor",
          pagesubTitle: "Pending Data",
        })
      );
    } else if (location.pathname === "/Verifypatient") {
      dispatch(
        headerdata({
          pagetitle: "Patient",
          pagesubTitle: "Pending Data",
        })
      );
    } else if (location.pathname === "/Verifypayment") {
      dispatch(
        headerdata({
          pagetitle: "Payment",
          pagesubTitle: "Pending Data",
        })
      );
    } else if (location.pathname === "/Verifyappointment") {
      dispatch(
        headerdata({
          pagetitle: "Appointment",
          pagesubTitle: "Pending Data",
        })
      );
    }
  }, [location]);
  // here is creating auth
  const userdata = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (userdata === null) {
      setauth(false);
    } else if (userdata["token"]) {
      setauth(userdata);
    }
  }, [userdata ? userdata["token"] : true]);
  // logout function
  const HandleOnLogout = () => {
    setuserbox(false);
    setalert({ AlertType: "success", AlertData: " Succesfully Logged out" });
    localStorage.removeItem("user");
    Navigate("/Login");
  };

  return (
    <>
      <div className={`sticky top-0 z-30 `}>
        <div className={`relative ${isMobile ? "w-[100%]" : "w-full"} `}>
          <div className="sticky z-30 top-0 bg-white">
            <motion.section
              variants={staggerContainer()}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
            >
              <motion.div variants={fadeIn("top", "spring", 1 * 0.5, 10)}>
                <ul className="list-none flex gap-3 me-3 pb-3 pt-3 justify-between items-center">
                  <li className="ms-3">
                    <img
                      src={logodark}
                      alt="logo"
                      className={`${isMobile ? "block" : "hidden"}`}
                    />
                  </li>
                  {menu.map((e) => (
                    <li className="flex gap-3" key={e.id}>
                      <span
                        onClick={probs.event}
                        className={`h-10 w-10 bg-[#f0ecec] flex items-center justify-center rounded-[50%] ${e.color}`}
                      >
                        <i className={`${e.menu_icon} text-[20px]`}></i>
                      </span>
                      <span
                        className={`h-10 w-10 bg-[#c1bbbb] flex items-center justify-center rounded-[50%] cursor-pointer`}
                        // this method is used for requestFullscreen and exit fullscreen
                        onClick={() => {
                          if (document.documentElement.requestFullscreen()) {
                            document.exitFullscreen();
                          } else {
                            document.documentElement.requestFullscreen();
                          }
                        }}
                      >
                        <i className={`${e.zoom_icon} text-[20px]`}></i>
                      </span>
                      {/* if patient user  logged in then hide the notification button.because here is no feature for patient it is only for admin and doctor. through notification bar to navingate verify page  */}
                      {auth &&
                        auth["token"] &&
                        auth["usertype"] != "Patient" && (
                          <div className="relative">
                            <span
                              className={`h-10 w-10 bg-[#c1bbbb] flex items-center justify-center rounded-[50%] cursor-pointer `}
                              onClick={() => {
                                usernotification
                                  ? setusernotification(false)
                                  : setusernotification(true);
                              }}
                            >
                              <i
                                className={`${e.Notification_icon} text-[20px]`}
                              ></i>
                            </span>

                            <div
                              className={`absolute right-[3px] max-sm:right-[-112px]   transition-all rotate-360 mt-[-8px] ${
                                usernotification
                                  ? "w-[270px]"
                                  : "w-0 overflow-hidden"
                              } `}
                            >
                              <div className="flex justify-end max-sm:justify-center xl:me-[8px]">
                                <div className=" h-5 w-5 bg-[hsl(75,2%,34%)] rotate-45 transform origin-bottom-left "></div>
                              </div>
                              <div className="bg-white relative rounded-lg">
                                <div className="bg-[hsl(75,2%,34%)] text-white p-3">
                                  <h1 className="card_header text-lg font-semibold">
                                    Notifications
                                  </h1>
                                </div>

                                <div className=" border-[hsl(0,6%,87%)] border-[2px]">
                                  {/* if admin logged then visible this feature  */}
                                  {auth["usertype"] === "Admin" && (
                                    <div>
                                      <div className="p-3 ">
                                        <i className="fa fa-wheelchair me-2 text-[hsl(214,79%,58%)]"></i>
                                        <span
                                          className="cursor-pointer"
                                          onClick={() => {
                                            Navigate("/Verifypatient");
                                            setusernotification(false);
                                            dispatch(
                                              headerdata({
                                                pagetitle: "Patient",
                                                pagesubTitle: "Pending Data",
                                              })
                                            );
                                          }}
                                        >
                                          New Patient Added
                                        </span>
                                      </div>
                                      <div className="p-3">
                                        <i className="fa fa-dollar me-[15px]  text-[hsl(326,76%,55%)]"></i>
                                        <span
                                          onClick={() => {
                                            Navigate("/Verifypayment");
                                            setusernotification(false);
                                            dispatch(
                                              headerdata({
                                                pagetitle: "Payment",
                                                pagesubTitle: "Pending Data",
                                              })
                                            );
                                          }}
                                          className="cursor-pointer"
                                        >
                                          Patient Payment Done
                                        </span>
                                      </div>
                                      <div className="p-3">
                                        <i className="fa fa-edit me-2  text-[#3f89e9]"></i>
                                        <span
                                          className="cursor-pointer"
                                          onClick={() => {
                                            setusernotification(false);
                                            Navigate("/VerifyDoctor");
                                            dispatch(
                                              headerdata({
                                                pagetitle: "Doctor",
                                                pagesubTitle: "Pending Data",
                                              })
                                            );
                                          }}
                                        >
                                          New Doctor Account Added
                                        </span>
                                      </div>
                                    </div>
                                  )}
                                  {/* if admin and doctor logged then visible this feature  */}
                                  {auth["usertype"] != "Patient" && (
                                    <div className="p-3">
                                      <i className="fa fa-edit me-2  text-[#3f89e9]"></i>
                                      <span
                                        className="cursor-pointer"
                                        onClick={() => {
                                          Navigate("/Verifyappointment");
                                          setusernotification(false);
                                          dispatch(
                                            headerdata({
                                              pagetitle: "Appointment",
                                              pagesubTitle: "Pending Data",
                                            })
                                          );
                                        }}
                                      >
                                        Patient Appointment Booked
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      <div className="relative">
                        <span
                          className={`h-10 w-10 bg-[#c1bbbb] flex items-center justify-center rounded-[50%] `}
                        >
                          <button
                            type="button"
                            className="btn"
                            data-bs-toggle="modal"
                            data-bs-target="#myModal"
                          >
                            <i className={`${e.search_icon} text-[20px]`}></i>
                          </button>
                        </span>
                      </div>
                      {auth && auth["token"] && (
                        <div className="relative">
                          <span
                            className={`h-10 w-10 bg-[#c1bbbb] flex items-center justify-center rounded-[50%] cursor-pointer`}
                            onClick={() => {
                              userbox ? setuserbox(false) : setuserbox(true);
                            }}
                          >
                            <i className={`${e.user_icon} text-[20px]`}></i>
                          </span>

                          <div
                            className={`absolute right-[5px]  transform  mt-[-8px] transition-all ${
                              userbox ? " w-[200px]" : "w-0 overflow-hidden"
                            }`}
                          >
                            <div className="flex justify-end me-[8px]">
                              <div className=" h-5 w-5 bg-[hsl(75,2%,34%)] rotate-45 transform origin-bottom-left "></div>
                            </div>
                            <div className="bg-white relative rounded-lg">
                              <div className="bg-[hsl(75,2%,34%)] text-white p-3">
                                <h1 className="card_header text-lg font-semibold">
                                  {auth && auth.usertype}
                                </h1>
                              </div>
                              <div className=" border-[hsl(0,6%,87%)] border-[2px]">
                                <div
                                  className="p-3 "
                                  onClick={() => {
                                    Navigate("/user/account/detail");
                                    setuserbox(false);
                                    dispatch(
                                      headerdata({
                                        pagetitle: "User",
                                        pagesubTitle: "AccountDetail",
                                      })
                                    );
                                  }}
                                >
                                  <i className="fa fa-gear me-2 text-[hsl(214,79%,58%)]"></i>
                                  <span className="cursor-pointer">
                                    Setting
                                  </span>
                                </div>
                                <div className="p-3">
                                  <i className="fa fa-question-circle me-2  text-[hsl(326,76%,55%)]"></i>
                                  <span>Help</span>
                                </div>
                                <div className="p-3">
                                  <i className="fa fa-sign-out me-2  text-[hsl(214,79%,58%)]"></i>
                                  <span
                                    onClick={HandleOnLogout}
                                    className="cursor-pointer"
                                  >
                                    Logout
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
                {/* this is page title and pagesubtitle section  */}
                {headernav.map((e) => (
                  <div
                    className="bg-[#666666] flex justify-between items-center ps-4 pe-4 pt-2 pb-2 text-white"
                    key={e.id}
                  >
                    <div>
                      <p
                        className={`${
                          isMobile ? "text-sm" : "text-[22px]"
                        } font-bold`}
                      >
                        {pagesubtitle}
                      </p>
                    </div>
                    <div
                      className={`bg-[#C85A95] ps-3 pe-3 pt-2 pb-2 rounded-full ${
                        isMobile ? "hidden" : "block"
                      }`}
                    >
                      <p className={`${isMobile ? "text-sm" : "text-lg"}`}>
                        <i className={`${e.icon}`}></i>
                        <span
                          className={`p-2 ${
                            pagetitle === "Tables" ||
                            pagetitle === "Forms" ||
                            pagetitle === "Sign Up" ||
                            pagetitle === "Login"
                              ? "hidden"
                              : "inline"
                          }`}
                        >
                          {e.space}
                        </span>
                        <span className="">
                          {pagetitle === "Tables" ||
                          pagetitle === "Forms" ||
                          pagetitle === "Sign Up" ||
                          pagetitle === "Login"
                            ? null
                            : pagetitle}
                        </span>
                        <span
                          className={`p-2 ${
                            pagesubtitle != "Quick Statistics"
                              ? "inline"
                              : "hidden"
                          }`}
                        >
                          {e.space}
                        </span>
                        <span>
                          {pagesubtitle != "Quick Statistics" && pagesubtitle}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
                {Alert["AlertData"] != null && (
                  <div
                    className={`alert alert-${
                      Alert["AlertType"]
                    } alert-dismissible absolute z-20  transition-all ${
                      Alert ? "w-full " : "w-0 "
                    }`}
                  >
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="alert"
                    ></button>
                    <strong>{Alert["AlertData"]}</strong>
                  </div>
                )}
              </motion.div>
            </motion.section>
          </div>
        </div>
      </div>
      <div className="modal transition-all" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-black text-white">
              <h4 className="modal-title">Search Patient/Doctor:</h4>
              <button
                type="button"
                className="btn text-white"
                data-bs-dismiss="modal"
              >
                <i className="fa fa-close text-[20px]"></i>
              </button>
            </div>

            <div className="modal-body text-center">
              <div className="border-b border-spacing-2">
                <input
                  type="text"
                  className="form-control outline-none border-none"
                  placeholder="Enter Text Here"
                  id="search"
                />
              </div>
              <div className="mt-3">
                <label htmlFor="search">
                  <button className="btn btn-danger rounded-sm">Search</button>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;
