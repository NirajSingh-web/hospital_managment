const express = require("express");
const { DoctorRegister } = require("../../mongoose");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtsecret = "Changer@&123";
const { fetchuser } = require("./../../middlware/fetchuser");
router.post("/login", async (req, res) => {
  if (req.body.Username && req.body.password) {
    const Doctorusercollection = await DoctorRegister();
    const DoctorUserData = await Doctorusercollection.findOne({
      Username: req.body.Username,
    });
    if (DoctorUserData) {
      const passwordmatching = await bcrypt.compare(
        req.body.password,
        DoctorUserData.password
      );
      if (passwordmatching) {
        let token = jwt.sign({ _id: DoctorUserData._id }, jwtsecret);
        res.status(200).json({ token: token });
      } else {
        res.status(401).json("try with right crendentials");
      }
    } else {
      res.status(401).json("no record found  You have to create account");
    }
  }
});
router.post("/getuser", fetchuser, async (req, res) => {
  const userid = req.users._id;
  const DoctorUserData = await (await DoctorRegister())
    .findOne({ _id: userid })
    .select("-password");
  if (DoctorUserData) {
    const status = DoctorUserData["status"];
    if (status === "Approved") {
      res.send({ msg: "logged In", DoctorUserData });
    } else {
      res.status(403).json(`Your Account status is ${status}`);
    }
  }
});
module.exports = router;
