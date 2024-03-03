const jwt = require("jsonwebtoken");
const jwtsecret = "Changer@&123";
const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");
  const usermode = req.header("user-mode");
  try {
    if (!token) {
      res.status(401).json("invalid Token");
    }
    if (token) {
      const data = jwt.verify(token, jwtsecret);
      req.users = data;
    }
    if (usermode) {
      req.usermode = usermode;
    }
    next();
  } catch (e) {
    console.log(e.message);
    res.status(401).json("invalid Token");
  }
};
module.exports = { fetchuser };
