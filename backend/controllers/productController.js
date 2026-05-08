const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");

// CREATE PRODUCT
const createProduct = async (req, res) => {
  try {
    let imageUrls = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "wickandweave",
        });
        imageUrls.push(result.secure_url);
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
    console.error(err);
    res.status(500).json({ msg: "Error creating product" });
  }
};

// UPDATE PRODUCT
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });

    let imageUrls = product.images;

    if (req.files && req.files.length > 0) {
      imageUrls = [];
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "wickandweave",
        });
        imageUrls.push(result.secure_url);
      }
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body, images: imageUrls },
      { new: true },
    );

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error updating product" });
  }
};

// Other functions (keep as they are)
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

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
