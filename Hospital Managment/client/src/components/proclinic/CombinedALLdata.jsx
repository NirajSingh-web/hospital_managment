import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { fadeIn, staggerContainer } from "../../utils/motion";
import { motion } from "framer-motion";
import Private, {
  Private_Com_for_Admin,
  Private_Com_for_Doc_Ad,
} from "./private/Private";
import Loader from "./loader/Loader";
// dashboard
const Dashboard = lazy(() => import("./dashboard/Dashboard"));
// all patient component
const Addpatient = lazy(() => import("./patients/Addpatient"));
const EditPatient = lazy(() => import("./patients/EditPatient"));
const Allpatient = lazy(() => import("./patients/Allpatient"));
const PatientDetail = lazy(() => import("./patients/PatientDetail"));
// All Doctor Component
const AddDoctor = lazy(() => import("./Doctor/AddDoctor"));
const AllDoctor = lazy(() => import("./Doctor/AllDoctor"));
const EditDoctor = lazy(() => import("./Doctor/EditDoctor"));
const DoctorDetails = lazy(() => import("./Doctor/Doctordetails"));
// All Appointment Component
const AddAppointments = lazy(() => import("./Appointments/AddAppointments"));
const AllAppointments = lazy(() => import("./Appointments/AllAppointments"));
const EditAppointment = lazy(() => import("./Appointments/EditAppointments"));
const AppointmentDetail = lazy(() =>
  import("./Appointments/AppointmentDetail")
);
// All payment Component
const AddPayement = lazy(() => import("./payments/AddPayment"));
const AllPayment = lazy(() => import("./payments/AllPayment"));
const PaymentInvoice = lazy(() => import("./payments/PaymentInvoice"));
// Verify all component
const Verifypatient = lazy(() => import("./patients/Verifypatient"));
const Verifyappointment = lazy(() =>
  import("./Appointments/Verifyappointment")
);
const Verifypayment = lazy(() => import("./payments/VerifyPayment"));
const VerifyDoctor = lazy(() => import("./Doctor/VerifyDoctor"));
// All Room Component
const AddRoom = lazy(() => import("./RoomAllotments/AddRoomAllotment"));
const EditRoomAllotmment = lazy(() =>
  import("./RoomAllotments/EditRoomAlllotment")
);
const AllRooms = lazy(() => import("./RoomAllotments/AllRooms"));
// Account user Component
const Accountdetails = lazy(() => import("./useraccount/accountdetails"));
const SignUp = lazy(() => import("./Registration/SignUp"));
const Login = lazy(() => import("./Registration/Login"));
const ForgetPassword = lazy(() => import("./Registration/ForgetPassword"));
// others Component
const MorrisChart = lazy(() => import("./Chart/Morris"));
const Tables = lazy(() => import("./tables/Tables"));
const Pricing = lazy(() => import("./Otherpages/Pricing"));
const Invoice = lazy(() => import("./Otherpages/Invoice"));
const Faq = lazy(() => import("./Otherpages/Faq"));
const BlankPage = lazy(() => import("./Otherpages/BlankPage"));
const File_404 = lazy(() => import("./Otherpages/404"));
const Themify = lazy(() => import("./Icons/Themify"));
const FontAwesome = lazy(() => import("./Icons/FontAwesome"));
const Forms = lazy(() => import("./Form/Forms"));
const FloatChart = lazy(() => import("./Chart/Flot"));
const CombinedAlldata = () => {
  return (
    <motion.section
      variants={staggerContainer()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      <motion.div variants={fadeIn("top", "spring", 1 * 0.5, 10)}>
        <Routes>
          <Route element={<Private />}>
            <>
              {/* dashboard */}
              <Route
                path="/"
                element={
                  <Suspense fallback={<Loader />}>
                    <Dashboard />
                  </Suspense>
                }
              />
              {/* all patient component */}
              <Route
                path="/Patient/Addpatient"
                element={
                  <Suspense fallback={<Loader />}>
                    <Addpatient />
                  </Suspense>
                }
              />
              <Route
                path="/Patient/EditPatient"
                element={
                  <Suspense fallback={<Loader />}>
                    <EditPatient />{" "}
                  </Suspense>
                }
              />
              <Route
                path="/Patient/Allpatient"
                element={
                  <Suspense fallback={<Loader />}>
                    <Allpatient />
                  </Suspense>
                }
              />
              <Route
                path="/Patient/PatientDetail"
                element={
                  <Suspense fallback={<Loader />}>
                    <PatientDetail />
                  </Suspense>
                }
              />
              {/* All Doctor Component */}
              {/* it is private when admin and Doctor logged in then only
              accessable. */}
              <Route element={<Private_Com_for_Doc_Ad />}>
                <Route
                  path="/Doctor/AddDoctor"
                  element={
                    <Suspense fallback={<Loader />}>
                      <AddDoctor />{" "}
                    </Suspense>
                  }
                />
                <Route
                  path="/Doctor/EditDoctor"
                  element={
                    <Suspense fallback={<Loader />}>
                      <EditDoctor />
                    </Suspense>
                  }
                />
                {/* verify component another one  for doctor and admin login verification*/}
                <Route
                  path="/Verifyappointment"
                  exact
                  element={
                    <Suspense fallback={<Loader />}>
                      <Verifyappointment />
                    </Suspense>
                  }
                />
              </Route>
              <Route
                path="/Doctor/AllDoctors"
                element={
                  <Suspense fallback={<Loader />}>
                    <AllDoctor />
                  </Suspense>
                }
              />
              <Route
                path="/Doctor/DoctorDetail"
                element={
                  <Suspense fallback={<Loader />}>
                    <DoctorDetails />
                  </Suspense>
                }
              />
              {/* All Appointment Component */}
              <Route
                path="/Appointment/AddAppointment"
                element={
                  <Suspense fallback={<Loader />}>
                    <AddAppointments />
                  </Suspense>
                }
              />
              <Route
                path="/Appointment/AllAppointment"
                element={
                  <Suspense fallback={<Loader />}>
                    <AllAppointments />
                  </Suspense>
                }
              />
              <Route
                path="/Appointment/AppointmentDetail"
                element={
                  <Suspense fallback={<Loader />}>
                    <AppointmentDetail />{" "}
                  </Suspense>
                }
              />
              <Route
                path="/Appointment/EditAppointment"
                element={
                  <Suspense fallback={<Loader />}>
                    <EditAppointment />
                  </Suspense>
                }
              />
              {/* All payment Component */}
              <Route
                path="/Payment/AddPayment"
                element={
                  <Suspense fallback={<Loader />}>
                    <AddPayement />
                  </Suspense>
                }
              />
              <Route
                path="/Payment/AllPayment"
                element={
                  <Suspense fallback={<Loader />}>
                    <AllPayment />
                  </Suspense>
                }
              />
              <Route
                path="/Payment/Paymentinvoice"
                element={
                  <Suspense fallback={<Loader />}>
                    <PaymentInvoice />
                  </Suspense>
                }
              />
              {/* All Room Component */}
              <Route
                path="/Room/AddRoom"
                element={
                  <Suspense fallback={<Loader />}>
                    <AddRoom />
                  </Suspense>
                }
              />
              <Route
                path="/Room/AllRoom"
                element={
                  <Suspense fallback={<Loader />}>
                    <AllRooms />
                  </Suspense>
                }
              />
              <Route
                path="/Room/EditRoomAlllotment"
                element={
                  <Suspense fallback={<Loader />}>
                    <EditRoomAllotmment />{" "}
                  </Suspense>
                }
              />
              {/* Account user Component */}
              <Route
                path="/user/account/detail"
                element={
                  <Suspense fallback={<Loader />}>
                    <Accountdetails />
                  </Suspense>
                }
              />
              {/* others Component  */}
              <Route
                path="/Tables"
                element={
                  <Suspense fallback={<Loader />}>
                    <Tables />{" "}
                  </Suspense>
                }
              />
              <Route path="/FloatChart" element={<FloatChart />} />
              <Route
                path="/MorrisChart"
                element={
                  <Suspense fallback={<Loader />}>
                    <MorrisChart />
                  </Suspense>
                }
              />
              <Route
                path="/Form"
                element={
                  <Suspense fallback={<Loader />}>
                    <Forms />
                  </Suspense>
                }
              />
              <Route
                path="/FontAwesome"
                element={
                  <Suspense fallback={<Loader />}>
                    <FontAwesome />
                  </Suspense>
                }
              />
              <Route
                path="/Themify"
                element={
                  <Suspense fallback={<Loader />}>
                    <Themify />
                  </Suspense>
                }
              />
              <Route
                path="/404"
                element={
                  <Suspense fallback={<Loader />}>
                    <File_404 />
                  </Suspense>
                }
              />
              <Route
                path="/BlankPage"
                element={
                  <Suspense fallback={<Loader />}>
                    <BlankPage />
                  </Suspense>
                }
              />
              <Route
                path="/Faq"
                element={
                  <Suspense fallback={<Loader />}>
                    <Faq />
                  </Suspense>
                }
              />
              <Route
                path="/Invoice"
                element={
                  <Suspense fallback={<Loader />}>
                    <Invoice />
                  </Suspense>
                }
              />
              <Route
                path="/Pricing"
                element={
                  <Suspense fallback={<Loader />}>
                    <Pricing />
                  </Suspense>
                }
              />
              {/* Verify all component except one  */}
              {/* it is private when admin logged then accepable otherwise redirect to login page */}
              <Route element={<Private_Com_for_Admin />}>
                <Route
                  path="/VerifyDoctor"
                  element={
                    <Suspense fallback={<Loader />}>
                      <VerifyDoctor />
                    </Suspense>
                  }
                />
                <Route
                  path="/Verifypatient"
                  element={
                    <Suspense fallback={<Loader />}>
                      <Verifypatient />
                    </Suspense>
                  }
                />
                <Route
                  path="/Verifypayment"
                  element={
                    <Suspense fallback={<Loader />}>
                      <Verifypayment />
                    </Suspense>
                  }
                />
              </Route>
            </>
          </Route>
          <Route
            path="/Login"
            element={
              <Suspense fallback={<Loader />}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="/SignUp"
            element={
              <Suspense fallback={<Loader />}>
                <SignUp />
              </Suspense>
            }
          />
          <Route
            path="/forgot/password"
            element={
              <Suspense fallback={<Loader />}>
                <ForgetPassword />
              </Suspense>
            }
          />
        </Routes>
      </motion.div>
    </motion.section>
  );
};
export default CombinedAlldata;
