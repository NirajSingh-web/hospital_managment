const { getDoctorSpecialistdata } = require("../mongoose");

const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const specialistdata = await (await getDoctorSpecialistdata()).find();
    res.send(specialistdata);
  } catch (e) {
    console.log(e.message);
  }
});
module.exports = router;
