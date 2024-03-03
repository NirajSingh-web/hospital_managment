const express = require("express");
const { Appointment, Patient, Doctor } = require("../mongoose");
const router = express.Router();
const { fetchuser } = require("./../middlware/fetchuser");
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
function generateAppointmentId() {
  const randomString = generateRandomString(6);
  return `AP${randomString}`.toUpperCase();
}
function generateToken() {
  const randomString = generateRandomString(6);
  return `TK${randomString}`.toUpperCase();
}
router.get("/", fetchuser, async (req, res) => {
  try {
    const usermode = req.usermode;
    const userid = req.users._id;
    if (usermode === "Patient") {
      const appointmentdata = await (
        await Appointment()
      ).find({ userid: userid });
      res.send(appointmentdata);
    } else if (usermode === "Doctor") {
      const doctor = await (await Doctor()).findOne({ userid: userid });
      const appointments = await (
        await Appointment()
      ).find({
        Doctorid: doctor["Doctorid"],
      });
      res.send(appointments);
    } else {
      const appointmentdata = await (await Appointment()).find();
      res.send(appointmentdata);
    }
  } catch (e) {
    console.log(e.message);
  }
});
router.post("/", fetchuser, async (req, res) => {
  try {
    const patient_data = await (
      await Patient()
    ).find({ PatientID: req.body.PatientID });

    if (patient_data != "") {
      if (patient_data[0]["status"] === "Completed") {
        const Doctordata = await (
          await Doctor()
        ).findOne({
          Doctorid: req.body.Doctorid,
        });
        if (Doctordata) {
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
          .json(`This patientId Status is ${patient_data[0]["status"]}`);
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
router.put("/", async (req, res) => {
  try {
    const usercollection = await Appointment();
    if (req.body.status) {
      const update = await usercollection.updateOne(
        { _id: req.body._id },
        {
          $set: req.body,
        }
      );
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
      const Doctordata = (await Doctor()).findOne({
        Doctorid: req.body.Doctorid,
      });
      if (Doctordata) {
        const update = await usercollection.updateOne(
          { _id: req.body._id },
          {
            $set: req.body,
          }
        );
        console.log(update);
        if (update) {
          res.status(200).json("Appointment Updated Successfuly");
        } else {
          res.status(200).json("Not Updated try after some time");
        }
      } else {
        res.status(449).json("Enter Correct Doctor id");
      }
    }
  } catch (e) {
    res.status(401).json("Server Issue");
  }
});
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
