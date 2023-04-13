const userModel = require("../Model/user.Model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const validator = require("email-validator");
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
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
          console.log("email sai dinh dang");
        }
      }
    });
  }
  login(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    userModel
      .findOne({
        username: username,
      })

      .then((data) => {
        if (data) {
          console.log(password, data.password);
          bcrypt.compare(password, data.password).then((user) => {
            console.log(user);
            if (user) {
              var token = jwt.sign({ _id: data._id }, "mk");
              console.log(token)
              setCookie('token',data.token,1)
            } else {
              return res.json("sai password");
            }
          });
        } else {
          return res.json("that bai");
        }
      })
      .catch((err) => {
        res.status(500).json("loi sv");
      });
  }
  verify(req, res, next) {
    try {
      var token = req.params.token;
      var kq = jwt.verify(token, "mk");
      if (kq) {
        next();
      }
    } catch (error) {
      console.log(error);
      return res.json("ban can phai login");
    }
  }
  returnhome(req, res, next) {
    res.redirect("home");
  }
}
module.exports = new Signupcontroller();
