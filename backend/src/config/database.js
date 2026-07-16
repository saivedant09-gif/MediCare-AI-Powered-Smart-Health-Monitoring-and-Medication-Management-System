const mongoose = require("mongoose");

/**
 * Establishes a connection to MongoDB using the MONGO_URI environment
 * variable. Exits the process on failure so the app never runs against a
 * broken DB connection.
 */
const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error("MONGO_URI is not defined in environment variables.");
    process.exit(1);
  }

  try {
    mongoose.set("strictQuery", true);

    const conn = await mongoose.connect(uri);

    console.log(`MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);

    mongoose.connection.on("error", (err) => {
      console.error(`MongoDB connection error: ${err.message}`);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB disconnected.");
    });
  } catch (error) {
    console.error(`Failed to connect to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
