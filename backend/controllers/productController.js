// backend/controllers/productController.js
const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");

// CREATE PRODUCT
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

    let imageUrls = [];

    if (req.files && req.files.length > 0) {
      console.log(`Uploading ${req.files.length} images...`);

      for (const file of req.files) {
        const result = await cloudinary.uploader
          .upload_stream({ folder: "wick-and-weave" }, (error, result) => {
            if (error) throw error;
            return result;
          })
          .end(file.buffer); // Important for memoryStorage

        imageUrls.push(result.secure_url);
      }
    }

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
      images: imageUrls,
    });

    await product.save();
    console.log("✅ Product created with images:", imageUrls);

    res.status(201).json(product);
  } catch (err) {
    console.error("Create Product Error:", err);
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
        const result = await cloudinary.uploader
          .upload_stream({ folder: "wick-and-weave" }, (error, result) => {
            if (error) throw error;
            return result;
          })
          .end(file.buffer);

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
    console.error("Update Error:", err);
    res.status(500).json({ msg: "Error updating product" });
  }
};

// Other functions (keep as they are)
const getAllProducts = async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
};

const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ msg: "Not found" });
  res.json(product);
};

const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
