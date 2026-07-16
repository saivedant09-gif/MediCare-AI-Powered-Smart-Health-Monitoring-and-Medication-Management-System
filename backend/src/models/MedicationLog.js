const mongoose = require("mongoose");

const medicationLogSchema = new mongoose.Schema(
  {
    medicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medication",
      required: true,
      index: true,
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    // The exact scheduled datetime this log entry corresponds to
    // (medicineTimes[i] combined with the calendar date).
    scheduledTime: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "TAKEN", "MISSED", "SKIPPED"],
      default: "PENDING",
      index: true,
    },
    takenAt: {
      type: Date,
      default: null,
    },
    // Set when a MISSED alert has already been generated for this dose,
    // so the background job doesn't notify the caregiver twice.
    alertSent: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// One log entry per medication per scheduled time.
medicationLogSchema.index({ medicationId: 1, scheduledTime: 1 }, { unique: true });
medicationLogSchema.index({ patientId: 1, scheduledTime: -1 });

module.exports = mongoose.model("MedicationLog", medicationLogSchema);
