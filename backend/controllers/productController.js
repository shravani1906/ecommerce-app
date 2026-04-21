const Product = require("../models/Product");

// ================= CREATE =================
const createProduct = async (req, res) => {
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

    if (!title || !description || !price) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    // ✅ OPTIONAL IMAGE UPLOAD (NO CLOUDINARY)
    let imageUrls = [];

    if (req.files && req.files.length > 0) {
      imageUrls = req.files.map((file) => `/uploads/${file.filename}`);
    }

    const product = new Product({
      title,
      description,
      price: Number(price),
      category,
      stock: Number(stock) || 0,
      scent,
      burnTime,
      yarnType,
      dimensions,
      images: imageUrls,
    });

    await product.save();

    res.status(201).json(product);
  } catch (err) {
    console.error("CREATE ERROR:", err);
    res.status(500).json({ msg: "Server error adding product" });
  }
};

// ================= GET ALL =================
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// ================= GET ONE =================
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Not found" });

    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// ================= UPDATE =================
const updateProduct = async (req, res) => {
  try {
    const updates = req.body;

    if (req.files && req.files.length > 0) {
      updates.images = req.files.map((file) => `/uploads/${file.filename}`);
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });

    res.json(product);
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({ msg: "Server error updating product" });
  }
};

// ================= DELETE =================
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error deleting product" });
  }
};

// ================= STOCK =================
const updateStock = async (req, res) => {
  try {
    const { stock } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { stock: Number(stock) },
      { new: true },
    );

    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: "Server error updating stock" });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  updateStock,
};
