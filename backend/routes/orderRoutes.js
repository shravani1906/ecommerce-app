const express = require("express");
const router = express.Router();

const { createOrder, getMyOrders } = require("../controllers/orderController");
const protect = require("../middleware/authMiddleware");

// CREATE ORDER
router.post("/", protect, createOrder);

// GET LOGGED-IN USER ORDERS
router.get("/myorders", protect, getMyOrders);

module.exports = router;
