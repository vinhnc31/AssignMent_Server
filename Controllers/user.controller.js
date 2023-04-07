const userModel = require("../Model/user.Model");
const bcrypt = require("bcryptjs");
const { mutipleMongoosetoObject } = require("../Util/mongoose.util");
const { MongoosetoObject } = require("../Util/mongoose.util");
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
    bcrypt.hash(req.body.password, 10, (hashedPass) => {
      const user = new userModel({
        email: req.body.email,
        username: req.body.username,
        password: hashedPass,
        image: req.file.path,
      });
      user
        .save()
        .then(() => res.redirect("/user/listuser"))
        .catch(next);
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
    userModel
      .updateOne({ _id: req.params.id }, res.body)
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
