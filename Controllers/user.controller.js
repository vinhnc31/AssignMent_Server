const userModel = require("../Model/user.Model");
const bcrypt = require("bcryptjs");
const { mutipleMongoosetoObject } = require("../Util/mongoose.util");
const { MongoosetoObject } = require("../Util/mongoose.util");
const mongoose = require("mongoose");
class UserController {
  index(req, res) {
    res.render("adduser");
  }

  show(req, res, next) {
    userModel
      .find({})
      .then((users) => {
        res.render("listuser", {
          users: mutipleMongoosetoObject(users),
        });
      })
      .catch(next);
  }

  add(req, res, next) {
    console.log(req.file);
    console.log(req.body);
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
        user
          .save()
          .then(() => {
            res.redirect("/user/listuser");
          })
          .catch((err) => {
            res.status(500).json({ error: err });
          });
      }
    });
  }

  edit(req, res, next) {
    userModel
      .findById(req.params.id)
      .then((user) => {
        res.render("edituser", {
          user: MongoosetoObject(user),
        });
      })
      .catch(next);
  }
  update(req, res, next) {
    console.log(req.file);
    userModel
      .updateOne(
        { _id: req.params.id },
        {
          email: req.body.email,
          username:  req.body.username,
          password:  req.body.password,
          image: req.file.path,
        }
      )
      .then(() => res.redirect("/user/listuser"))
      .catch(next);
  }
  delete(req, res, next) {
    userModel
      .deleteOne({ _id: req.params.id })
      .then(() => {
        res.redirect("back");
      })
      .catch(next);
  }
}
module.exports = new UserController();
