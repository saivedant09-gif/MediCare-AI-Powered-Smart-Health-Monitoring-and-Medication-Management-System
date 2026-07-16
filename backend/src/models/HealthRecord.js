const mongoose = require("mongoose");

const healthRecordSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    // Present when the reading came from an ESP32 device; absent for
    // manually-entered readings.
    deviceId: {
      type: String,
      default: null,
    },
    systolic: {
      type: Number,
      required: true,
      min: 40,
      max: 300,
    },
    diastolic: {
      type: Number,
      required: true,
      min: 20,
      max: 200,
    },
    glucose: {
      type: Number,
      required: true,
      min: 20,
      max: 700,
    },
    heartRate: {
      type: Number,
      required: true,
      min: 20,
      max: 250,
    },
    // Computed by the AI/health-status utility at write time so the
    // dashboard and history table can filter/display without recomputing.
    healthStatus: {
      type: String,
      enum: ["NORMAL", "WARNING", "CRITICAL"],
      required: true,
      default: "NORMAL",
    },
    // Which specific vital(s) triggered a non-normal status, e.g. ["systolic", "glucose"]
    flags: [{ type: String }],
    source: {
      type: String,
      enum: ["IOT_DEVICE", "MANUAL_ENTRY", "SIMULATION"],
      default: "MANUAL_ENTRY",
    },
    timestamp: {
      type: Date,
      required: true,
      default: Date.now,
      index: true,
    },
  },
  { timestamps: true }
);

// Common query pattern: latest readings for a patient, newest first.
healthRecordSchema.index({ patientId: 1, timestamp: -1 });

module.exports = mongoose.model("HealthRecord", healthRecordSchema);
