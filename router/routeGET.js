const express = require("express");
const routes = express.Router();
const EmpSchema = require("../Model/EmpSchema");
const creatError = require("../utils/errorHandelling");
const { verifyUser } = require("../utils/verifyToken");
const {
  getAllUserController,
  singleUserController,
  createUserController,
  updateUserController,
  deleteUserController,
} = require("../controller/empController");
const { login, register } = require("../controller/authController");
//Get all users
routes.get("/GET/users", verifyUser, getAllUserController);

routes.get("/GET/users/:ID", verifyUser, singleUserController);

routes.post("/POST/users", verifyUser, createUserController);

routes.put("/PUT/users/:ID", verifyUser, updateUserController);

routes.delete("/DELETE/users/:ID", verifyUser, deleteUserController);

routes.post("/auth/login", login);

routes.post("/auth/register", register);

module.exports = { routes };
