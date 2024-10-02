import { z } from "zod";

// Booking status enum
export const bookingStatusEnum = z.enum(["pending", "accepted", "rejected"]);
export const rideStatusEnum = z.enum(["active", "inactive", "completed"]);

export const rideFormSchema = z.object({
  rideOwnerId: z.string().nonempty(),
  from: z.string().nonempty(),
  to: z.string().nonempty(),
  date: z.string().nonempty(),
  time: z.string().nonempty(),
  availableSeats: z.number().optional(),
  ridePrice: z.number().optional(),
  description: z.string().nonempty(),
});

export const rideSchema = z.object({
  _id: z.string(),
  rideOwnerId: z.string().nonempty(),
  from: z.string().nonempty(),
  to: z.string().nonempty(),
  date: z.string().nonempty(),
  time: z.string().nonempty(),
  availableSeats: z.number(),
  ridePrice: z.number(),
  description: z.string().nonempty(),
  rideStatus: rideStatusEnum,
  bookings: z
    .array(
      z.object({
        clientId: z.string().nonempty(),
        status: bookingStatusEnum,
        bookingDate: z.string().nonempty(),
        userName: z.string().optional(),
        userEmail: z.string().email().optional(),
      }),
    )
    .optional(),
});

// Ride schema inference type
export type Ride = z.infer<typeof rideSchema>;
export type rideStatusEnum = z.infer<typeof rideStatusEnum>;
export type bookingStatusEnum = z.infer<typeof bookingStatusEnum>;
