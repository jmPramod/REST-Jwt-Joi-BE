const jwt = require("jsonwebtoken");
const creatError = require("./errorHandelling");
let UserModel = require("../Model/UserModel");

const verifyUser = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(creatError(401, "You are not authorized!!"));
  }
  await UserModel.findOne({ _id: token.id });
  let a = jwt.verify(token, process.env.JWT_SECRET);

  if (a) {
    next();
  }
};

module.exports = { verifyUser };
