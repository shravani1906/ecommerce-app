const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  category: {
    type: String,
    enum: ["candles", "crochet"],
    required: true,
  },

  subCategory: { type: String, default: "" },

  images: [{ type: String }],

  stock: { type: Number, default: 10, min: 0 },

  scent: { type: String, default: "" },
  burnTime: { type: String, default: "" },
  yarnType: { type: String, default: "" },
  dimensions: { type: String, default: "" },

  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
