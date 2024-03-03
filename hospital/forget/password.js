const router = require("express").Router();
const { fetchuser } = require("../middlware/fetchuser");
const { patientRegister, DoctorRegister } = require("../mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtsecret = "Changer@&123";
router.post("/patient/verify/username", async (req, res) => {
  const username = req.body.username;
  if (username) {
    const userdata = await (
      await patientRegister()
    ).findOne({ Username: username });
    console.log(userdata);
    if (userdata) {
      const token = jwt.sign({ _id: userdata._id }, jwtsecret);
      res.status(200).json({ token: token });
    } else {
      res.status(404).json("user not found");
    }
  } else {
    res.status(404).json("Username is required");
  }
});
router.put("/patient/reset/password", fetchuser, async (req, res) => {
  const userid = req.users._id;
  if (req.body.password) {
    const bcryptprocess = await bcrypt.genSalt(10);
    const passwordbcrypt = await bcrypt.hash(req.body.password, bcryptprocess);
    const userdata = await (
      await patientRegister()
    ).updateOne({ _id: userid }, { $set: { password: passwordbcrypt } });
    if (userdata["acknowledged"]) {
      res.status(200).json("Password has been reseted successfully");
    } else {
      res.status(200).json("try after some time");
    }
  }
});
router.post("/doctor/verify/username", async (req, res) => {
  const username = req.body.username;
  if (username) {
    const userdata = await (
      await DoctorRegister()
    ).findOne({ Username: username });
    console.log(userdata);
    if (userdata) {
      const token = jwt.sign({ _id: userdata._id }, jwtsecret);
      res.status(200).json({ token: token });
    } else {
      res.status(404).json("user not found");
    }
  } else {
    res.status(404).json("Username is required");
  }
});
router.put("/doctor/reset/password", fetchuser, async (req, res) => {
  const userid = req.users._id;
  if (req.body.password) {
    const bcryptprocess = await bcrypt.genSalt(10);
    const passwordbcrypt = await bcrypt.hash(req.body.password, bcryptprocess);
    const userdata = await (
      await DoctorRegister()
    ).updateOne({ _id: userid }, { $set: { password: passwordbcrypt } });
    console.log(userdata);
    if (userdata["acknowledged"]) {
      res.status(200).json("Password has been reseted successfully");
    } else {
      res.status(200).json("try after some time");
    }
  }
});
module.exports = router;
