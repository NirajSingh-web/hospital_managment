const { getHospitalDepartment } = require("../mongoose");
const router = require("express").Router();
router.get("/", async (req, res) => {
  try {
    const Departmentdata = await (await getHospitalDepartment()).find();
    res.send(Departmentdata);
  } catch (e) {
    console.log(e.message);
  }
});
module.exports = router;
