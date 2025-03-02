import { GreekCitiesKeys } from "app/consts/cities";
import { Doc } from "convex/_generated/dataModel";
import { z } from "zod";

export type SearchParamsType = {
  from: GreekCitiesKeys;
  to: GreekCitiesKeys;
  date: string;
};

// Rides
export type Ride = Doc<"rides">;
export type RideId = Ride["rideId"];
export type CreateRideSchema = Omit<Ride, "rideId">;

// Validate Form
export const rideFormSchema = z.object({
  ownerUserId: z.string(),
  from: z.string().nonempty("From is required."),
  to: z.string().nonempty("To is required."),
  startLocationCoords: z.array(z.number()).optional(),
  endLocationCoords: z.array(z.number()).optional(),
  date: z.string().min(1, { message: "Date is required." }),
  time: z.string().min(1, { message: "Time is required." }),
  seats: z
    .number()
    .min(1, { message: "At least one seat is required." }),
  price: z.number().min(1, { message: "Price must be greater than 0." }),
  description: z.string().min(1, { message: "Description is required." }),
  status: z.enum(["active", "inactive", "completed"]),
});

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

export type RideWithBookings = {
  ride: Ride;
  bookings: Array<
    Booking & { userName: string; userEmail: string; profileImage?: string }
  >;
};

export type RideWithBookingsAndPoints = {
  ride: Ride;
  bookings: Array<
    Booking & { userName: string; userEmail: string; profileImage?: string }
  >;
  pointsEarned: { points: number };
};
