require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const connectDB = require("./src/config/database");
const { notFound, errorHandler } = require("./src/middleware/errorMiddleware");

// Routes are added progressively as each feature phase is built.
// const authRoutes = require("./src/routes/authRoutes");
// const healthRoutes = require("./src/routes/healthRoutes");
// const medicationRoutes = require("./src/routes/medicationRoutes");
// const notificationRoutes = require("./src/routes/notificationRoutes");
// const sosRoutes = require("./src/routes/sosRoutes");
// const iotRoutes = require("./src/routes/iotRoutes");

const app = express();

// --- Core middleware ---
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "test") {
  app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
}

// --- Rate limiting ---
const limiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests, please try again later." },
});
app.use("/api", limiter);

// --- Health check (useful for Render/Railway/Docker healthchecks) ---
app.get("/api/health-check", (req, res) => {
  res.status(200).json({ success: true, message: "MediCare backend is running." });
});

// --- Feature routes (uncommented as each phase lands) ---
// app.use("/api/auth", authRoutes);
// app.use("/api/health", healthRoutes);
// app.use("/api/medications", medicationRoutes);
// app.use("/api/notifications", notificationRoutes);
// app.use("/api/sos", sosRoutes);
// app.use("/api/iot", iotRoutes);

// --- Error handling (must be last) ---
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`MediCare backend listening on port ${PORT} [${process.env.NODE_ENV || "development"}]`);
  });
};

start();

module.exports = app;
