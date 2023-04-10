const express = require("express");
const route = express.Router();
const userController = require('../Controllers/user.controller')
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() + "." + file.originalname.split(".")[1]
    );
  },
});
const upload = multer({
  storage,
});
route.get('/adduser',userController.index);
route.get('/listuser',userController.show);
route.get('/:id/edit',userController.edit);
route.post("/adduser",upload.single('file'),userController.add);
route.put('/:id',upload.single('file'),userController.update);
route.delete("/:id",userController.delete);
module.exports = route;