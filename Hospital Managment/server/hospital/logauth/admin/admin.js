const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { fetchuser } = require("../../middlware/fetchuser");
const { Admin } = require("../../mongoose");
const e = require("express");
const jwtsecret = "Changer@&123";
router.post("/login", async (req, res) => {
  try {
    if (req.body.Username) {
      const admin = await (await Admin()).findOne({ Username: req.body.Username });

      const passwordmaching = await bcrypt.compare(
        req.body.password,
        admin.password
      );
      if (passwordmaching) {
        const token = jwt.sign({ _id: admin["_id"] }, jwtsecret);
        res.status(200).json({ msg: true, token: token });
      } else {
        res.status(401).json("Enter Correct crendentials");
      }
    } else {
      res.status(500).send("Please provide username and password");
    }
  } catch (e) {
    res.status(500).send("Internal server issue");
  }
});
router.post("/get/user", fetchuser, async (req, res) => {
  try {
    if (req.users._id) {
      const userid = req.users._id;
      const Admindata = await (await Admin())
        .findOne({ _id: userid })
        .select("-password");
      if (Admindata) {
        res.status(200).json({ msg: true });
      }
    }
  } catch (e) {
    res.status(500).send("Internal server issue");
  }
});
module.exports = router;
