const express = require("express");
const { payment, Patient, Doctor } = require("../mongoose");
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
function generatePaymentId() {
  const randomString = generateRandomString(6); // Generate a random alphanumeric string
  return `PAY${randomString}`.toUpperCase();
}
router.get("/", fetchuser, async (req, res) => {
  try {
    const usermode = req.usermode;
    const userid = req.users._id;
    if (usermode === "Patient") {
      const result = payment();
      const payment_Collection = await result;
      const payment_data = await payment_Collection.find({
        userid: userid,
      });
      res.send(payment_data);
    } else {
      const result = payment();
      const payment_Collection = await result;
      const payment_data = await payment_Collection.find();
      res.send(payment_data);
    }
  } catch (e) {
    console.log(e.message);
    res.status(404).json("Server not found");
  }
});
router.post("/", fetchuser, async (req, res) => {
  console.log(req.body)
  try {
    const patient_data = await (
      await Patient()
    ).find({ PatientID: req.body.PatientID });
    const doctordata = await (
      await Doctor()
    ).findOne({ Doctorid: req.body.Doctorid });
    if (patient_data) {
      if (doctordata) {
        const result = payment();
        const payment_Collection = await result;
        const payment_data = new payment_Collection({
          userid: req.users._id,
          PaymentID: generatePaymentId(),
          ...req.body,
        });
        const save = await payment_data.save();
        console.log(save);
        if (save) {
          res.status(200).json("Payment added successfully");
        } else {
          res.status(404).json("Payment not added");
        }
      } else {
        res
          .status(404)
          .json(
            "Doctor id not available  in our records so  Please check your Patient ID and Try again"
          );
      }
    } else {
      res
        .status(404)
        .json(
          "Patient id not available  in our records so  Please check your Patient ID and Try again"
        );
    }
  } catch (e) {
    res.status(404).json("server not found 404");
    console.log(e.message);
  }
});
router.put("/", async (req, res) => {
  try {
    const usercollection = await payment();
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
    }
    if (req.body.status === "Cancelled") {
      if (update) {
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
