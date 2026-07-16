const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: [
        "HEALTH_WARNING",
        "CRITICAL_HEALTH_ALERT",
        "MEDICATION_REMINDER",
        "MISSED_MEDICATION",
        "SOS_ALERT",
        "DOCTOR_MESSAGE",
      ],
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    // Optional reference to the related document (HealthRecord, Medication,
    // SOSAlert, etc.) so the frontend can deep-link on click.
    relatedId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    relatedModel: {
      type: String,
      enum: ["HealthRecord", "Medication", "MedicationLog", "SOSAlert", null],
      default: null,
    },
    isRead: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  { timestamps: true }
);

notificationSchema.index({ userId: 1, isRead: 1, createdAt: -1 });

module.exports = mongoose.model("Notification", notificationSchema);
