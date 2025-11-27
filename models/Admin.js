const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    role: {
      type: String,
      enum: ["superadmin", "admin"],
      default: "admin",
    }
  },
  { timestamps: true }
);

/**
 * FIXED PASSWORD HASHING (BEST APPROACH)
 * - async function WITHOUT next()
 * - Fully supported by Mongoose
 * - No “next is not a function” error
 */
adminSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const hashed = await bcrypt.hash(this.password, 10);
  this.password = hashed;
});

// Compare password
adminSchema.methods.comparePassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Admin", adminSchema);
