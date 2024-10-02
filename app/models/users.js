import { userSchema } from "data/schemas/users";
import mongoose from "mongoose";

// Define mongoose schema
const userSchemaDef = new mongoose.Schema(
  {
    name: String,
    rating: Number,
    vehicleBrand: String,
    allowed: [String],
    notAllowed: [String],
    contact: {
      phone: String,
      email: String,
    },
    driverInfo: {
      yearsOfExperience: Number,
      drivingLicense: String,
      language: String,
    },
    userStatus: String,
  },
  { timestamps: true },
);

// Apply Zod validation before saving
userSchemaDef.pre("save", function (next) {
  const validation = userSchema.safeParse(this);
  if (!validation.success) {
    return next(new Error("Validation failed: " + validation.error.message));
  }
  next();
});

const Users = mongoose.models.Users || mongoose.model("Users", userSchemaDef);

export default Users;
