const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false, // never return password by default
    },
    role: {
      type: String,
      enum: ["patient", "doctor", "caregiver"],
      required: [true, "Role is required"],
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    profileImage: {
      type: String,
      default: "",
    },
    // For a patient: the doctor assigned to them.
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    // For a patient: the caregiver linked to them.
    caregiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    // For a doctor: patients assigned to them.
    patients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isDemoUser: {
      type: Boolean,
      default: false,
    },
    // Per-patient alert thresholds, configurable by the doctor.
    alertThresholds: {
      systolicWarning: { type: Number, default: 140 },
      systolicCritical: { type: Number, default: 180 },
      diastolicWarning: { type: Number, default: 90 },
      diastolicCritical: { type: Number, default: 120 },
      glucoseWarning: { type: Number, default: 140 },
      glucoseCritical: { type: Number, default: 180 },
      heartRateLow: { type: Number, default: 50 },
      heartRateHigh: { type: Number, default: 120 },
    },
  },
  { timestamps: true }
);

// Hash password before saving, only if it was modified.
userSchema.pre("save", async function hashPassword(next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Instance method to compare a plaintext password against the stored hash.
userSchema.methods.comparePassword = async function comparePassword(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Never leak the password hash even if the document is serialized directly.
userSchema.methods.toJSON = function toJSON() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model("User", userSchema);
