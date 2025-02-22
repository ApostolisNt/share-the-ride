import { GreekCitiesKeys } from "app/consts/cities";
import { Doc } from "convex/_generated/dataModel";

export type SearchParamsType = {
  from: GreekCitiesKeys;
  to: GreekCitiesKeys;
  date: string;
};

// Rides
export type Ride = Doc<"rides">;
export type RideId = Ride["rideId"];

// Rides Status
export type RideStatusEnum = "active" | "inactive" | "completed";

// Users
export type User = Doc<"users">;
export type UserId = User["userId"];

// Bookings
export type Booking = Doc<"bookings">;
export type BookingId = Booking["bookingId"];

// Booking Status
export type BookingStatusEnum = "pending" | "accepted" | "rejected";
export type ModalType = "success" | "error" | "info";
