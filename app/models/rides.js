import mongoose, { Schema } from "mongoose";
import { rideFormSchema } from "../../data/schemas/rides";

// Define mongoose schema
const ridesSchema = new Schema(
  {
    rideOwnerId: { type: String, required: true },
    rideStatus: {
      type: String,
      enum: ["active", "inactive", "completed"],
      default: "active",
    },
    from: String,
    to: String,
    date: String,
    time: String,
    ridePrice: Number,
    availableSeats: Number,
    description: String,
    bookings: {
      type: [
        {
          clientId: String,
          status: { type: String, enum: ["pending", "accepted", "rejected"] },
          bookingDate: String,
        },
      ],
      default: [],
      required: false,
    },
  },
  { timestamps: true },
);

// Apply Zod validation before saving
ridesSchema.pre("save", function (next) {
  const validation = rideFormSchema.safeParse(this);
  if (!validation.success) {
    return next(new Error("Validation failed: " + validation.error.message));
  }
  next();
});

const Rides = mongoose.models.Rides || mongoose.model("Rides", ridesSchema);

export default Rides;
