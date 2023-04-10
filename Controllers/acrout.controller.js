const userModel = require("../Model/user.Model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const validator = require("email-validator");
class Signupcontroller {
  indexLogin(req, res) {
    res.render("login", { layout: "index" });
  }
  indexSignup(req, res) {
    res.render("signup", { layout: "index" });
  }
  register(req, res, next) {
    // console.log(req.file)
    bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
      console.log(req.body);
      if (err) {
        return res.status(500).json({ error: err });
      } else {
        const user = new userModel({
          _id: new mongoose.Types.ObjectId(),
          email: req.body.email,
          username: req.body.username,
          password: hashedPass,
          image: req.file.path,
        });
        if (validator.validate("test@email.com")) {
          user
          .save()
          .then(() => {
            res.redirect("/");
          })
          .catch((err) => {
            res.status(500).json({ error: err });
          });
        } else {
          console.log("email sai dinh dang")
        }   
      }
    });
  }
 login(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    userModel
      .findOne({email: username, password: password})
      .then((user) => {
        if (user) {
          bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
              res.status(550).json({ error: err });
            }
            if (result) {
              let token = jwt.sign(
                { username: userModel.username },
                "verySecretValue",
                { expiresIn: "1h" }
              );
              res.json({
                message: "Login Successfull",
                token,
              });
            } else {
              res.json({
                message: "password do not matched!",
              });
            }
          });
        } else {
          res.json({
            message: " do not matched!",
          });
        }
      });
    }
  }
module.exports = new Signupcontroller();
