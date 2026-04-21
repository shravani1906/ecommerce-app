const Order = require("../models/Order");

// CREATE ORDER
const createOrder = async (req, res) => {
  try {
    const { items, totalAmount, shippingAddress } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ msg: "No items in order" });
    }

    if (!shippingAddress || !shippingAddress.address) {
      return res.status(400).json({ msg: "Shipping address required" });
    }

    const order = new Order({
      user: req.user.id,
      items,
      totalAmount,
      shippingAddress,
      status: "Processing",
    });

    await order.save();

    const io = req.app.get("io");
    if (io) io.emit("newOrder", order);

    res.status(201).json(order);
  } catch (err) {
    console.error("ORDER CREATE ERROR:", err);
    res.status(500).json({ msg: "Error creating order" });
  }
};

// GET MY ORDERS
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (err) {
    console.error("FETCH ORDERS ERROR:", err);
    res.status(500).json({ msg: "Error fetching orders" });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
};
