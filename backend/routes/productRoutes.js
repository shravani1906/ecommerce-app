const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/upload"); // ← Memory storage

/* GET ALL PRODUCTS */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

/* GET SINGLE PRODUCT */
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

/* CREATE PRODUCT */
router.post("/", auth, upload.array("images", 5), async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      category,
      stock,
      scent,
      burnTime,
      yarnType,
      dimensions,
    } = req.body;

    const product = new Product({
      title,
      description,
      price: Number(price),
      category,
      stock: Number(stock) || 10,
      scent,
      burnTime,
      yarnType,
      dimensions,
      seller: req.user.id,
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error creating product" });
  }
});

/* UPDATE PRODUCT */
router.put("/:id", auth, upload.array("images", 5), async (req, res) => {
  try {
    const updateData = { ...req.body };

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error updating product" });
  }
});

/* DELETE PRODUCT */
router.delete("/:id", auth, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting product" });
  }
});

module.exports = router;
