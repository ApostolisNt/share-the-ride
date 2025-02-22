import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const RideStatusEnum = v.union(
  v.literal("active"),
  v.literal("inactive"),
  v.literal("completed"),
);

export const BookingStatusEnum = v.union(
  v.literal("pending"),
  v.literal("accepted"),
  v.literal("rejected"),
);

export default defineSchema({
  rides: defineTable({
    rideOwnerId: v.id("users"),
    from: v.string(),
    to: v.string(),
    date: v.string(),
    time: v.string(),
    price: v.number(),
    availableSeats: v.number(),
    description: v.string(),
    status: RideStatusEnum,
  })
    .index("byRideOwner", ["rideOwnerId"])
    .index("byFrom", ["from"])
    .index("byTo", ["to"])
    .index("byDate", ["date"])
    .index("byStatus", ["status"]),

  bookings: defineTable({
    rideId: v.id("rides"),
    userId: v.id("users"),
    seatsRequested: v.number(),
    status: BookingStatusEnum,
    bookingDate: v.string(),
    paymentIntentId: v.optional(v.string()),
    amount: v.optional(v.number()),
  })
    .index("byRide", ["rideId"])
    .index("byUser", ["userId"])
    .index("byUserRide", ["userId", "rideId"])
    .index("byStatus", ["status"])
    .index("byPaymentIntentId", ["paymentIntentId"])
    .index("byBookingDate", ["bookingDate"]),

  users: defineTable({
    userId: v.string(),
    name: v.string(),
    email: v.string(),
    role: v.optional(v.union(v.literal("driver"), v.literal("passenger"))),
    stripeConnectedId: v.optional(v.string()),
    rating: v.optional(v.number()),
    vehicleBrand: v.optional(v.string()),
    driverInfo: v.optional(
      v.object({
        yearsOfExperience: v.optional(v.number()),
        drivingLicense: v.optional(v.string()),
        language: v.optional(v.string()),
      }),
    ),
    allowed: v.optional(v.array(v.string())),
    notAllowed: v.optional(v.array(v.string())),
  })
    .index("byEmail", ["email"])
    .index("byUserId", ["userId"]),
});
