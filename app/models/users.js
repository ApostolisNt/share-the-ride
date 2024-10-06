import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { signUpUserSchema } from "data/schemas/users";

const userSchemaDef = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: Number,
    vehicleBrand: String,
    allowed: [String],
    notAllowed: [String],
    contact: {
      phone: { type: String, required: true },
      email: { type: String, required: true },
    },
    password: { type: String, required: true },
    driverInfo: {
      yearsOfExperience: Number,
      drivingLicense: String,
      language: String,
    },
    userStatus: { type: String, default: "client" },
  },
  { timestamps: true },
);

// Zod validation before saving
userSchemaDef.pre("save", async function (next) {
  // This should match the Zod validation structure, ensuring fields are available
  const validation = signUpUserSchema.safeParse({
    name: this.name,
    email: this.contact.email,
    phone: this.contact.phone,
    password: this.password,
  });

  if (!validation.success) {
    return next(
      new Error(
        "Validation failed: " + JSON.stringify(validation.error.errors),
      ),
    );
  }

  // Hash the password before saving if it's new or modified
  if (this.isModified("password") || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  next();
});

const Users = mongoose.models.Users || mongoose.model("Users", userSchemaDef);

export default Users;
