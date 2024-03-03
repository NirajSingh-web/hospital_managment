const express = require("express");
const { Room } = require("../mongoose");
const router = express.Router();
const { fetchuser } = require("./../middlware/fetchuser");
router.get("/", async (req, res) => {
  const room_collection = await Room();
  const room_data = await room_collection.find();
  res.send(room_data);
});
router.post("/", fetchuser, async (req, res) => {
  try {
    const result = Room();
    const room_collection = await result;
    const roomdata = await room_collection.findOne({
      RoomNumber: req.body.RoomNumber,
      RoomType: req.body.RoomType,
      $or: [
        {
          Allotment_Date: {
            $gte: req.body.Allotment_Date,
            $lt: req.body.Discharge_Date,
          },
          Discharge_Date: {
            $gt: req.body.Allotment_Date,
            $lte: req.body.Discharge_Date,
          },
        },
        {
          Allotment_Date: { $lte: req.body.Allotment_Date },
          Discharge_Date: { $gte: req.body.Discharge_Date },
        },
        {
          Allotment_Date: { $lte: req.body.Allotment_Date },
          Discharge_Date: {
            $gte: req.body.Allotment_Date,
            $lt: req.body.Discharge_Date,
          },
        },
        {
          Allotment_Date: {
            $gt: req.body.Allotment_Date,
            $lt: req.body.Discharge_Date,
          },
          Discharge_Date: { $gte: req.body.Discharge_Date },
        },
      ],
    });
    if (roomdata.length === 0) {
      const room_data = await room_collection({
        userid: req.users._id,
        ...req.body,
      });
      const room_save = await room_data.save();
      if (room_save) {
        res.status(200).json("Room Succesfully Added");
      } else {
        res.status(200).json("Room not Added");
      }
    } else {
      res.status(401).json("Room is not available for this  date.");
    }
  } catch (e) {
    console.log(e);
    res.status(404).json("server not found 404");
  }
});
module.exports = router;
