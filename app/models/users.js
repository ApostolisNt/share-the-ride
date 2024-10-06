import mongoose from "mongoose";
import bcrypt from "bcrypt";
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
      yearsOfExperience: { type: Number, default: 0 },
      drivingLicense: { type: String, default: "" },
      language: { type: String, default: "" },
    },
    userStatus: { type: String, default: "client" },
  },
  { timestamps: true },
);

// Zod validation and password hashing before saving
userSchemaDef.pre("save", async function (next) {
  console.log("Running Zod validation on user data...");

  // This should match the Zod validation structure, ensuring fields are available
  const validation = signUpUserSchema.safeParse({
    name: this.name,
    email: this.contact.email,
    phone: this.contact.phone,
    password: this.password,
  });

  if (!validation.success) {
    console.error("Zod validation failed:", validation.error.errors);
    return next(
      new Error(
        "Validation failed: " + JSON.stringify(validation.error.errors),
      ),
    );
  }

  console.log("Zod validation successful. Proceeding with password hashing...");

  // Hash the password before saving if it's new or modified
  if (this.isModified("password") || this.isNew) {
    console.log("Hashing password for user:", this.email);
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log("Password hashed:", this.password);
  } else {
    console.log("Password not modified. Skipping hashing.");
  }

  next();
});

const Users = mongoose.models.Users || mongoose.model("Users", userSchemaDef);

export default Users;
