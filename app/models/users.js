import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
  },
);

const Users = mongoose.models.Users || mongoose.model("Users", userSchema);

export default Users;
