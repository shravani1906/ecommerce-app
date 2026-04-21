require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);

// SOCKET
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://wick-weave-frontend.onrender.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

app.set("io", io);

// MIDDLEWARE
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://wick-weave-frontend.onrender.com",
    ],
    credentials: true,
  }),
);

// STATIC
app.use("/uploads", express.static("uploads"));
// ROUTES (IMPORTANT FIX HERE)
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes")); // ✅ FIXED

// HOME
app.get("/", (req, res) => {
  res.send("Wick & Weave Backend Running ✨");
});

// ERROR HANDLER
app.use(require("./middleware/errorHandler"));

// DB CONNECT
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🟢 MongoDB Connected"))
  .catch((err) => console.log(err));

// SOCKET EVENTS
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// SERVER START
const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`🔥 Server running on http://localhost:${PORT}`),
);
