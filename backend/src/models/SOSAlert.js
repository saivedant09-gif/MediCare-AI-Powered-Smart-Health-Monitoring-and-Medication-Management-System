const mongoose = require("mongoose");

const sosAlertSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    caregiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    // Snapshot of the patient's most recent health reading at the moment
    // the SOS button was pressed, so responders have context even if
    // later readings change.
    healthSnapshot: {
      systolic: { type: Number, default: null },
      diastolic: { type: Number, default: null },
      glucose: { type: Number, default: null },
      heartRate: { type: Number, default: null },
      recordedAt: { type: Date, default: null },
    },
    status: {
      type: String,
      enum: ["ACTIVE", "ACKNOWLEDGED", "RESOLVED"],
      default: "ACTIVE",
      index: true,
    },
    acknowledgedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    acknowledgedAt: {
      type: Date,
      default: null,
    },
    resolvedAt: {
      type: Date,
      default: null,
    },
    notes: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

sosAlertSchema.index({ patientId: 1, createdAt: -1 });

module.exports = mongoose.model("SOSAlert", sosAlertSchema);
