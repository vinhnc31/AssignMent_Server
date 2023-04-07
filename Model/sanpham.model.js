const mongoose = require("mongoose");

const SanphamSchema = new mongoose.Schema(
  {
    ten: {
      type: String,
    },
    gia: {
      type: Number,
    },
    mota: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const newSanpham = mongoose.model("sanphams", SanphamSchema);
module.exports = newSanpham;
