const express = require("express");
const route = express.Router();
const userController = require("../Controllers/acrout.controller");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "." + file.originalname.split(".")[1]);
  },
});
const upload = multer({
  storage,
});

route.use(express.json());
route.get("/", userController.indexLogin);
route.get("/signup", userController.indexSignup);
route.post("/signup", upload.single("file"), userController.register);
route.post("/login", userController.login);
route.get("/:token", userController.verify, userController.returnhome);
module.exports = route;
