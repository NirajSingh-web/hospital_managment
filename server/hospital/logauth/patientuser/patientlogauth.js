const express = require("express");
const { patientRegister } = require("../../mongoose");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { fetchuser } = require("../../middlware/fetchuser");
const jwtsecret = "Changer@&123";
router.get("/", async (req, res) => {
  res.status(200).json("kdd");
  console.log("dnn");
});
router.post("/login", async (req, res) => {
  try {
    if (req.body.Username && req.body.password) {
      const patientusercollection = await patientRegister();
      const patientUserData = await patientusercollection.findOne({
        Username: req.body.Username,
      });
      if (patientUserData) {
        const passwordmaching = await bcrypt.compare(
          req.body.password,
          patientUserData.password
        );
        if (passwordmaching) {
          const token = jwt.sign({ _id: patientUserData._id }, jwtsecret);
          res.status(200).json({ token: token });
        } else {
          res.status(400).json("try with correct details");
        }
      } else {
        res.status(400).json("Invalid Username or Password");
      }
    }
  } catch (e) {
    console.log(e.message);
  }
});
router.post("/getuser", fetchuser, async (req, res) => {
  const userid = req.users._id;
  const data = await (await patientRegister())
    .findOne({ _id: userid })
    .select("-password");
  res.send(data);
});
module.exports = router;
