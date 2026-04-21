// middleware/errorHandler.js (FIXED FULL FILE)

const errorHandler = (err, req, res, next) => {
  console.error("❌ GLOBAL ERROR:", err);

  if (res.headersSent) {
    return next(err);
  }

  // Multer errors (file upload issues)
  if (err?.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      msg: "File too large. Max size allowed is 5MB",
    });
  }

  if (err?.message === "Only images are allowed") {
    return res.status(400).json({
      msg: "Only image files are allowed (jpg, png, jpeg, webp)",
    });
  }

  return res.status(err?.status || 500).json({
    msg: err?.message || "Internal Server Error",
  });
};

module.exports = errorHandler;
