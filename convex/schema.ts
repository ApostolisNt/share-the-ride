import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const rideStatusEnum = v.union(
  v.literal("active"),
  v.literal("inactive"),
  v.literal("completed"),
);

export const bookingStatusEnum = v.union(
  v.literal("pending"),
  v.literal("accepted"),
  v.literal("rejected"),
);

export default defineSchema({
  rides: defineTable({
    rideOwnerId: v.string(),
    from: v.string(),
    to: v.string(),
    date: v.string(),
    time: v.string(),
    price: v.number(),
    availableSeats: v.number(),
    description: v.string(),
    rideStatus: rideStatusEnum,
  }),

  booking: defineTable({
    id: v.string(),
    rideId: v.id("rides"),
    userId: v.array(v.id("users")),
    status: bookingStatusEnum,
    bookingDate: v.string(),
    paymentIntentId: v.optional(v.string()),
    amount: v.optional(v.number()),
  })
    .index("byRide", ["rideId"])
    .index("byUser", ["userId"])
    .index("byUserRide", ["userId", "rideId"])
    .index("byStatus", ["status"])
    .index("byPaymentIntentId", ["paymentIntentId"]),

  users: defineTable({
    userId: v.string(),
    name: v.string(),
    userStatus: v.optional(v.string()),
    stripeConnectedId: v.optional(v.string()),
    email: v.string(),
    allowed: v.optional(v.array(v.string())),
    notAllowed: v.optional(v.array(v.string())),
    rating: v.optional(v.number()),
    vehicleBrand: v.optional(v.string()),
    driverInfo: v.optional(
      v.object({
        yearsOfExperience: v.optional(v.number()),
        drivingLicense: v.optional(v.string()),
        language: v.optional(v.string()),
      }),
    ),
  })
    .index("byUserId", ["userId"])
    .index("byEmail", ["email"]),
});
