const express = require("express");
const { Doctor } = require("../mongoose");
const router = express.Router();
const { fetchuser } = require("./../middlware/fetchuser");
const upload = require("../middlware/upload");
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
function generateDoctorId() {
  const randomString = generateRandomString(6);
  return `DR${randomString}`.toUpperCase();
}
router.get("/", async (req, res) => {
  try {
    const Doctor_Collection = await Doctor();
    const doctor = await Doctor_Collection.find();
    res.send(doctor);
  } catch (e) {
    console.log("internal server issue");
  }
});
router.post("/", [fetchuser, upload.single("file")], async (req, res) => {
  try {
    const Doctor_Collection = await Doctor();
    const getdoctordata = await Doctor_Collection.findOne({
      userid: req.users._id,
    });
    if (!getdoctordata) {
      const doctor = new Doctor_Collection({
        userid: req.users._id,
        Doctorid: generateDoctorId(),
        file: req.file,
        ...req.body,
      });
      const save = await doctor.save();
      if (save) {
        res.status(200).json("Doctor added Successfully");
      } else {
        res.status(449).json("Doctor  not added retry");
      }
    } else {
      res.status(449).json("Account already Created");
    }
  } catch (e) {
    console.log(e.message);
    res.status(404).json("server not found 404");
  }
});
router.put("/", upload.single("file"), async (req, res) => {
  try {
    const usercollection = await Doctor();
    if (req.body.Availability) {
      const update = await usercollection.updateOne(
        {
          userid: req.body.userid,
        },
        {
          $set: req.body,
        }
      );
      if (update) {
        console.log(update);
        res.status(201).json("Availiblity Updated Successfully");
      } else {
        res.status(201).json("Not Updated Try After Some time");
      }
    } else {
      let data;
      console.log(req.body);
      if (req.file) {
        data = { ...req.body, file: req.file };
      } else {
        data = req.body;
      }
      const update = await usercollection.updateOne(
        { _id: req.body._id },
        {
          $set: data,
        }
      );
      if (update) {
        console.log(update);
        res.status(201).json("Doctor Updated Successfully");
      } else {
        res.status(201).json("Not Updated Try After Some time");
      }
    }
  } catch (e) {
    res.status(401).json("Server Issue");
  }
});
router.delete("/", async (req, res) => {
  const deleteData = await (await Doctor()).deleteOne({ _id: req.body._id });
  console.log(deleteData);
  if (deleteData["deletedCount"] != 0) {
    res.status(200).json("Deleted Successfully!");
  } else {
    res.status(449).json("something went wrong");
  }
});
module.exports = router;
