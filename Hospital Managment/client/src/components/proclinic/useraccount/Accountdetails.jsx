import React, { useEffect, useState } from "react";
const Accountdetails = () => {
  const [userimgUrl, setuserimgurl] = useState("");
  const [Availablityselect, setAvailablityselect] = useState(false);
  const [Availability, setAvailablity] = useState();
  const [auth, setauth] = useState(false);
  const [userdata, seUserData] = useState("");
  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem("user"));
    if (userdata != null) {
      if (userdata["token"]) {
        setauth(userdata);
      }
    }
  }, []);
  useEffect(() => {
    if (auth.usertype === "Patient") {
      fetch("http://localhost:4000/user/signup/patient", {
        method: "GET",
        headers: { "auth-token": auth.token },
      })
        .then((res) => res.json())
        .then((data) => seUserData(data));
    } else if (auth.usertype === "Doctor") {
      fetch("http://localhost:4000/user/signup/doctor", {
        method: "GET",
        headers: { "auth-token": auth.token, "user-mode": auth.usertype },
      })
        .then((res) => res.json())
        .then((data) => seUserData(data));
    }
  });
  const handleOnAvailablity = async () => {
    const data = {
      userid: userdata._id,
      Availability: Availability,
    };
    const res = await fetch("http://localhost:4000/Doctor", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const res_data = await res.json();
    if (res_data === "Availiblity Updated Successfully") {
      alert(res_data);
      setAvailablityselect(false);
    } else {
      alert(res_data);
    }
  };
  return (
    <div className=" relative">
      <div
        className={` w-[100%] flex items-center justify-center flex-col bg-[hsl(208,35%,13%)] h-[81.8vh] `}
      >
        <div className="card bg-[hsl(210,56%,25%)] w-[50%] max-sm:w-[80%] text-white shadow-2xl  shadow-[#3f5c79] transition-all hover:shadow-[hsla(210,56%,25%,1)]">
          <div className="card-header w-full flex justify-center">
            <h1 className=" h3">Account Details</h1>
          </div>
          <div className="body  mt-3 flex justify-center mb-3">
            <div className="w-[60%]">
              <div className="flex justify-center mt-3 mb-3">
                <div className="relative">
                  <label htmlFor="user-img">
                    <span
                      className={`h-20 w-20 bg-[#c1bbbb] flex items-center justify-center rounded-[50%] cursor-pointer`}
                    >
                      <i className="fa fa-user text-[40px]"></i>
                    </span>
                  </label>
                  {userimgUrl && (
                    <div className="mt-2">
                      <label htmlFor="user-img" className="btn btn-danger">
                        upload
                      </label>
                    </div>
                  )}
                  <input
                    type="file"
                    className="hidden"
                    id="user-img"
                    onChange={(e) => {
                      setuserimgurl(e.target.files[0]);
                    }}
                  />
                  {userimgUrl && (
                    <div className="absolute top-0">
                      <a href={userimgUrl && URL.createObjectURL(userimgUrl)}>
                        <img
                          src={userimgUrl && URL.createObjectURL(userimgUrl)}
                          className="h-20 w-20 rounded-[50%]  aspect-square object-cover"
                        />
                      </a>
                    </div>
                  )}
                </div>
              </div>
              {auth["usertype"] === "Doctor" && (
                <div className=" mt-2 border-b pb-2 border-spacing-3">
                  <div className="flex justify-between">
                    <div className="font-bold text-lg">Availablity</div>
                    <div>
                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          Availablityselect
                            ? setAvailablityselect(false)
                            : setAvailablityselect(true)
                        }
                      >
                        Set
                      </button>
                    </div>
                  </div>
                  {Availablityselect && (
                    <div className="mt-2">
                      <select
                        name=""
                        id=""
                        onChange={(e) => setAvailablity(e.target.value)}
                        className="form-select"
                      >
                        <option value="" selected disabled hidden>
                          Choose Availablity
                        </option>
                        <option value="Available">Available</option>
                        <option value="Not Available">Not Available</option>
                        <option value="on Leave">On Leave</option>
                      </select>
                      <div className="flex justify-end mt-2">
                        <button
                          className="btn btn-primary"
                          onClick={handleOnAvailablity}
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {console.log(userdata)}
              <div className="flex justify-between mt-2 border-b pb-2 border-spacing-3">
                <div className="font-bold text-lg">UserName</div>
                <div>{userdata["Username"]}</div>
              </div>
              <div className="flex justify-between mt-2 border-b pb-2 border-spacing-3">
                <div className="font-bold text-lg">Phone Number</div>
                <div>{userdata["phone"]}</div>
              </div>
              <div className="flex justify-between mt-2 border-b pb-2 border-spacing-3">
                <div className="font-bold text-lg">Email id</div>
                <div>{userdata["Email"]}</div>
              </div>
            </div>
          </div>
          <div className="card-footer flex justify-end">
            <button className="btn btn-primary">Edit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accountdetails;
