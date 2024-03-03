const express = require("express");
const { Patient } = require("../mongoose");
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
function generatePatientId() {
  const randomString = generateRandomString(6);
  return `PAT${randomString}`.toUpperCase();
}
router.get("/", fetchuser, async (req, res) => {
  try {
    const usermode = req.usermode;
    const userid = req.users._id;
    if (usermode === "Patient") {
      const patient_data = await (
        await Patient()
      ).find({
        userid: userid,
      });
      res.send(patient_data);
    } else {
      const patient_data = await (await Patient()).find();
      res.send(patient_data);
    }
  } catch (e) {
    console.log(e.message);
  }
});
router.post("/", fetchuser, async (req, res) => {
  try {
    const patient_Collection = await Patient();
    const patient_data = new patient_Collection({
      userid: req.users._id,
      PatientID: generatePatientId(),
      ...req.body,
    });
    const save = await patient_data.save();
    if (save) {
      res.status(200).json("Patient added successfully");
    } else {
      res.status(449).json("Patient not added Retry 449");
    }
    console.log(req.body);
  } catch (e) {
    res.status(404).json("server not found 404");
    console.log(e);
  }
});
router.put("/", async (req, res) => {
  try {
    const usercollection = await Patient();
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
    } else {
      if (update) {
        console.log(update);
        res.status(201).json("Patient Updated Successfully");
      } else {
        res.status(201).json("Not Updated Try After Some time");
      }
    }
  } catch (e) {
    res.status(401).json("Server Issue");
  }
});
router.delete("/", async (req, res) => {
  try {
    const deleteData = await (await Patient()).deleteOne(req.body);
    if (deleteData["deletedCount"] != 0) {
      res.status(200).json("Deleted Successfully!");
    } else {
      res.status(449).json("something went wrong");
    }
  } catch (e) {
    console.log("error in deleting data==>", e);
  }
});
module.exports = router;
