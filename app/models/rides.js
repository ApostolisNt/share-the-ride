import mongoose, { Schema } from "mongoose";

const ridesSchema = new Schema(
  {
    from: String,
    to: String,
    date: String,
    time: String,
    ridePrice: Number,
    availableSeats: Number,
    description: String,
  },
  {
    timestamps: true,
  },
);

const Rides = mongoose.models.Rides || mongoose.model("Rides", ridesSchema);

export default Rides;
