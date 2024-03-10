const express = require("express");
const { Room } = require("../mongoose");
const router = express.Router();
const { fetchuser } = require("./../middlware/fetchuser");
router.get("/", fetchuser, async (req, res) => {
  const usermode = req.usermode;
  const userid = req.users._id;
  if (usermode === "Patient") {
    const room_collection = await Room();
    const room_data = await room_collection.find({
      userid: userid,
    });
    res.send(room_data);
  } else {
    const room_collection = await Room();
    const room_data = await room_collection.find();
    res.send(room_data);
  }
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
    if (!roomdata) {
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
router.put("/", async (req, res) => {
  try {
    const update = await (
      await Room()
    ).updateOne(
      { _id: req.body._id },
      {
        $set: req.body,
      }
    );
    console.log(update);
    if (update["acknowledged"]) {
      res.status(201).json("Room Succesfully Updated");
    } else {
      res.status(201).json("Not Updated Try After Some time");
    }
  } catch (e) {
    res.status(401).json("Server Issue");
  }
});
router.delete("/", async (req, res) => {
  try {
    const deleteData = await (await Room()).deleteOne(req.body);
    if (deleteData["deletedCount"] != 0) {
      res.status(200).json("Deleted Successfully!");
    } else {
      res.status(449).json("something went wrong");
    }
  } catch (e) {
    console.log("error in deleting data==>", e);
  }
});
module.exports = router;
