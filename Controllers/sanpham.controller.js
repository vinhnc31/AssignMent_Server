const Sanpham = require("../Model/sanpham.model");
const { mutipleMongoosetoObject } = require("../Util/mongoose.util");
const { MongoosetoObject } = require("../Util/mongoose.util");
class SanphamController {
  index(req, res) {
    res.render("addsanpham", {
      title: "Add Sản Phẩm",
    });
  }
  show(req, res, next) {
    Sanpham.find({}).then((sanphams) =>
      res.render("listsanpham", {
        sanphams: mutipleMongoosetoObject(sanphams),
      })
    );
  }
  add(req, res, next) {
    const sanpham = new Sanpham(req.body);
    sanpham
      .save()
      .then(
        () => alert("Thêm Thành Công"),
        res.redirect("/sanpham/listsanpham")
      )
      .catch(next);
  }
  edit(req, res, next) {
    Sanpham.findById(req.params.id)
      .then((sanphams) => {
        res.render("editsanpham", {
          sanphams: MongoosetoObject(sanphams),
        });
      })
      .catch(next);
  }
  update(req, res, next) {
    Sanpham.updateOne({ _id: req.params.id }, req.body)
      .then(() => {
        res.redirect("/sanpham/listsanpham");
      })
      .catch(next);
  }
  delete(req, res, next) {
    Sanpham.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
}
module.exports = new SanphamController();
