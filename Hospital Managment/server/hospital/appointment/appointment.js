const express = require("express");
const { Appointment, Patient, Doctor } = require("../mongoose");
const router = express.Router();
const { fetchuser } = require("./../middlware/fetchuser");
// generate random string
function generateRandomString(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
// generate AppointmentId
function generateAppointmentId() {
  const randomString = generateRandomString(6);
  return `AP${randomString}`.toUpperCase();
}
// generateToken
function generateToken() {
  const randomString = generateRandomString(6);
  return `TK${randomString}`.toUpperCase();
}
// get method using  express to send data from database to client side
router.get("/", fetchuser, async (req, res) => {
  try {
    const usermode = req.usermode;
    const userid = req.users._id;
    // when user is patient then  show all appointment of this user
    if (usermode === "Patient") {
      const appointmentdata = await (
        await Appointment()
      ).find({ userid: userid });
      res.send(appointmentdata);
    } else if (usermode === "Doctor") {
      // when user is doctor then  show all appointment of this user else show all appointment
      const doctor = await (await Doctor()).findOne({ userid: userid });
      const appointments = await (
        await Appointment()
      ).find({
        Doctorid: doctor["Doctorid"],
      });
      res.send(appointments);
    } else {
      // when user is Admin then  show all appointment
      const appointmentdata = await (await Appointment()).find();
      res.send(appointmentdata);
    }
  } catch (e) {
    console.log(e.message);
  }
});
router.post("/", fetchuser, async (req, res) => {
  console.log(req.body);
  try {
    // find patient data from patient model
    const patient_data = await (
      await Patient()
    ).findOne({ PatientID: req.body.PatientID });
    if (patient_data != null) {
      // find status of patient form
      if (patient_data["status"] === "Completed") {
        // find doctor exiting or not  from doctor model
        const Doctordata = await (
          await Doctor()
        ).findOne({
          Doctorid: req.body.Doctorid,
        });
        if (Doctordata) {
          // after this process  we will save the data in database
          const Appointment_Collection = await Appointment();
          const appointmentdata = new Appointment_Collection({
            userid: req.users._id,
            AppointmentId: generateAppointmentId(),
            Token: generateToken(),
            ...req.body,
          });
          const save = await appointmentdata.save();
          if (save) {
            res.status(200).json("Appointment added Successfuly");
          } else {
            res.status(449).json("Appointment not  added retry");
          }
        } else {
          res.status(449).json("Enter Correct Doctor id");
        }
      } else {
        res
          .status(404)
          .json(`This patientId Status is ${patient_data["status"]}`);
      }
    } else {
      res
        .status(404)
        .json(
          "Patient id not available  in our records so  Please check your Patient ID and Try again"
        );
    }
  } catch (e) {
    console.log(e);
    res.status(404).json("server not found 404");
  }
});
// update appointment  by Id
router.put("/", async (req, res) => {
  try {
    const usercollection = await Appointment();
    // this is using for verify appointment details
    if (req.body.status) {
      const update = await usercollection.updateOne(
        { _id: req.body._id },
        {
          $set: req.body,
        }
      );
      // here admin and doctor can change the status of any appontments from pending to accepted or rejected
      if (req.body.status === "Completed") {
        if (update) {
          res.status(200).json("Approved");
        } else {
          res.status(200).json(" Not Approved try after some time");
        }
      } else if (req.body.status === "Cancelled") {
        if (update) {
          res.status(200).json("Cancelled");
        } else {
          res.status(200).json("Not Cancelled try after some time");
        }
      }
    } else {
      // it is using for where user can edit user appoinment  details only he/she can able to do this action and status will be pending
      const patient_data = await (
        await Patient()
      ).findOne({ PatientID: req.body.PatientID });
      const Doctordata = (await Doctor()).findOne({
        Doctorid: req.body.Doctorid,
      });
      if (patient_data) {
        if (Doctordata) {
          const update = await usercollection.updateOne(
            { _id: req.body._id },
            {
              $set: { ...req.body, status: "Pending" },
            }
          );
          if (update) {
            res.status(200).json("Appointment Updated Successfuly");
          } else {
            res.status(200).json("Not Updated try after some time");
          }
        } else {
          res.status(449).json("Enter Correct Doctor id");
        }
      } else {
        res.status(449).json("Enter Correct Patient id");
      }
    }
  } catch (e) {
    res.status(401).json("Server Issue");
  }
});
// for delete appointmentdata from database
router.delete("/", async (req, res) => {
  const deleteData = await (
    await Appointment()
  ).deleteOne({ _id: req.body._id });
  console.log(req.body);
  if (deleteData["deletedCount"] != 0) {
    res.status(200).json("Deleted Successfully!");
  } else {
    res.status(449).json("something went wrong");
  }
});
module.exports = router;
