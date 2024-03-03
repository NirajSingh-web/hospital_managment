const express = require("express");
const router = express.Router();
router.post("/", async (req, res) => {
  if (req.body.Username && req.body.password) {
    let check = () => {
      return (
        req.body.Username === "Changer" && req.body.password === "Changer@123"
      );
    };
    console.log(check());
    if (check()) {
      res.status(200).json("Admin mode logged In");
    } else {
      res
        .status(401)
        .json("no record found  You have to contact to administrator");
    }
  }
});
module.exports=router;
