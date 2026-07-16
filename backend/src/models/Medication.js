const mongoose = require("mongoose");

const medicationSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    medicineName: {
      type: String,
      required: [true, "Medicine name is required"],
      trim: true,
    },
    dosage: {
      type: String,
      required: [true, "Dosage is required"], // e.g. "500 mg"
      trim: true,
    },
    frequency: {
      type: String, // e.g. "Twice daily", "Once daily"
      required: true,
      trim: true,
    },
    // Daily reminder times, stored as "HH:mm" 24-hour strings, e.g. ["08:00", "20:00"]
    medicineTimes: {
      type: [String],
      required: true,
      validate: {
        validator: (arr) => arr.length > 0,
        message: "At least one medicine time is required",
      },
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      default: null, // null = ongoing / no defined end date
    },
    instructions: {
      type: String,
      trim: true,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

medicationSchema.index({ patientId: 1, isActive: 1 });

module.exports = mongoose.model("Medication", medicationSchema);
