import React from "react";
import { Outlet, Navigate } from "react-router-dom";
const Private = () => {
  const auth = JSON.parse(localStorage.getItem("user"));
  return auth && auth["token"] ? <Outlet /> : <Navigate to={"/Login"} />;
};
const Private_Com_for_Doc_Ad = () => {
  const auth = JSON.parse(localStorage.getItem("user"));
  return auth && auth["usertype"] != "Patient" ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} />
  );
};
const Private_Com_for_Admin = () => {
  const auth = JSON.parse(localStorage.getItem("user"));
  return auth && auth["usertype"] === "Admin" ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} />
  );
};
export default Private;
export { Private_Com_for_Admin, Private_Com_for_Doc_Ad };
