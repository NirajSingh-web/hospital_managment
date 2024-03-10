const express = require("express");
const { patientRegister } = require("../../mongoose");
const { fetchuser } = require("./../../middlware/fetchuser");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtsecret = "Changer@&123";
router.get("/", fetchuser, async (req, res) => {
  if (req.users) {
    const userid = req.users._id;
    const Users_data = await (await patientRegister())
      .findOne({ _id: userid })
      .select("-password");
    res.send(Users_data);
  }
});
router.post("/", async (req, res) => {
  try {
    const bcryptprocess = await bcrypt.genSalt(10);
    const passwordbcrypt = await bcrypt.hash(req.body.password, bcryptprocess);
    const usercollection = await patientRegister();
    const specificuserdata = new usercollection({
      Username: req.body.Username,
      password: passwordbcrypt,
      Email: req.body.Email,
      phone: req.body.phone,
    });
    const Users_data = await usercollection.find();
    const checkemail = Users_data.find((x) => x.Email === req.body.Email);
    const checkUsername = Users_data.find(
      (x) => x.Username === req.body.Username
    );
    const checkphone = Users_data.find((x) => x.phone === req.body.phone);
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!checkUsername) {
      if (!checkemail) {
        if (!checkphone) {
          if (emailRegex.test(req.body.Email)) {
            if (emailRegex.test(req.body.Username)) {
              res.status(409).json("Username must be Special Characters");
            } else {
              const Users_res = await specificuserdata.save();
              const data = {
                users: {
                  id: Users_res._id,
                },
              };
              const token = jwt.sign(data, jwtsecret);
              if (Users_res) {
                res.status(200).json({
                  token: token,
                  msg: "patient user succesfully added",
                });
              }
            }
          } else {
            res.status(409).json("please enter a valid email id");
          }
        } else {
          res.status(409).json("PhoneNumber already exists!");
        }
      } else {
        res.status(409).json("Emailid already exists!");
      }
    } else {
      res.status(409).json("Username already exists!");
    }
  } catch (e) {
    res.status(404).json("Internal server issue");
  }
});
module.exports = router;
