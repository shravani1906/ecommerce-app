// backend/controllers/productController.js
const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");

// CREATE PRODUCT
const createProduct = async (req, res) => {
  try {
    let imageUrls = [];

    // Upload to Cloudinary
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload_stream(
          { folder: "wick-and-weave" },
          (error, result) => {
            if (error) throw error;
            imageUrls.push(result.secure_url);
          },
        );

        // Pipe buffer to stream
        result.stream(result.buffer).pipe(result);
      }
    }

    const product = new Product({
      ...req.body,
      price: Number(req.body.price),
      stock: Number(req.body.stock) || 10,
      images: imageUrls,
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error("Create Error:", err);
    res.status(500).json({ msg: "Error creating product" });
  }
};

// UPDATE PRODUCT
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });

    let imageUrls = product.images || [];

    if (req.files && req.files.length > 0) {
      imageUrls = [];
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.buffer, {
          folder: "wick-and-weave",
        });
        imageUrls.push(result.secure_url);
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body, images: imageUrls },
      { new: true },
    );

    res.json(updatedProduct);
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ msg: "Error updating product" });
  }
};

// GET ALL
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// GET ONE
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// DELETE
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// UPDATE STOCK
const updateStock = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { stock: Number(req.body.stock) },
      { new: true },
    );
    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  updateStock,
};
