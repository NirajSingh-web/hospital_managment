const express = require("express");
const { DoctorRegister } = require("../../mongoose");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtsecret = "Changer@&123";
router.get("/", async (req, res) => {
  const Users_data = await (await DoctorRegister()).find().select("-password");
  res.send(Users_data);
});
router.post("/", async (req, res) => {
  try {
    const bcryptprocess = await bcrypt.genSalt(10);
    const passwordbcrypt = await bcrypt.hash(
      req.body["password"],
      bcryptprocess
    );
    const usercollection = await DoctorRegister();
    const specificuserdata = new usercollection({
      Username: req.body["Username"],
      Email: req.body["Email"],
      phone: req.body["phone"],
      Doctordegree: req.body["Doctordegree"],
      password: passwordbcrypt,
    });
    const Users_data = await usercollection.find();
    const checkemail = Users_data.find((x) => x.Email === req.body.Email);
    const checkUsername = Users_data.find(
      (x) => x.Username === req.body.Username
    );
    const checkphone = Users_data.find((x) => x.phone === req.body.phone);
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log(req.body);
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
                res
                  .status(200)
                  .json({ token, msg: "Doctor user succesfully added" });
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
router.put("/", async (req, res) => {
  try {
    const usercollection = await DoctorRegister();
    const update = await usercollection.updateOne(
      { _id: req.body._id },
      {
        $set: req.body,
      }
    );
    console.log(update);
    if (req.body.status === "Approved") {
      if (update["acknowledged"]) {
        res.status(200).json("Approved");
      } else {
        res.status(200).json(" Not Approved try after some time");
      }
    }
    if (req.body.status === "Cancelled") {
      if (update["acknowledged"]) {
        res.status(200).json("Cancelled");
      } else {
        res.status(200).json("Not Cancelled try after some time");
      }
    }
  } catch (e) {
    res.status(401).json("Server Issue");
  }
});
module.exports = router;
