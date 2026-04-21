const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();

const sampleProducts = [
  // 🕯️ CANDLES
  {
    title: "Lavender Dream Soy Candle",
    description: "Calming lavender essential oil in natural soy wax.",
    price: 449,
    category: "candles",
    stock: 15,
    images: ["https://via.placeholder.com/400x400?text=Lavender+Candle"],
  },
  {
    title: "Vanilla Bliss Candle",
    description: "Sweet vanilla fragrance for a cozy vibe.",
    price: 399,
    category: "candles",
    stock: 20,
    images: ["https://via.placeholder.com/400x400?text=Vanilla+Candle"],
  },
  {
    title: "Rose Garden Candle",
    description: "Fresh blooming roses scent.",
    price: 499,
    category: "candles",
    stock: 10,
    images: ["https://via.placeholder.com/400x400?text=Rose+Candle"],
  },
  {
    title: "Ocean Breeze Candle",
    description: "Refreshing sea-inspired fragrance.",
    price: 459,
    category: "candles",
    stock: 8,
    images: ["https://via.placeholder.com/400x400?text=Ocean+Candle"],
  },

  // 🧶 CROCHET
  {
    title: "Amigurumi Teddy Bear",
    description: "Cute handmade crochet teddy.",
    price: 699,
    category: "crochet",
    stock: 12,
    images: ["https://via.placeholder.com/400x400?text=Teddy+Bear"],
  },
  {
    title: "Crochet Sunflower Pot",
    description: "Decorative sunflower crochet piece.",
    price: 499,
    category: "crochet",
    stock: 9,
    images: ["https://via.placeholder.com/400x400?text=Sunflower"],
  },
  {
    title: "Crochet Tote Bag",
    description: "Stylish handmade tote bag.",
    price: 799,
    category: "crochet",
    stock: 7,
    images: ["https://via.placeholder.com/400x400?text=Tote+Bag"],
  },
  {
    title: "Crochet Keychains Set",
    description: "Cute mini crochet keychains.",
    price: 299,
    category: "crochet",
    stock: 25,
    images: ["https://via.placeholder.com/400x400?text=Keychains"],
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Product.deleteMany({});
    const inserted = await Product.insertMany(sampleProducts);

    console.log(`🌟 Seeded ${inserted.length} products`);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
