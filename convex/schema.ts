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

export const closureTypeEnum = v.union(
  v.literal("closed"),
  v.literal("completed"),
);

export const ReportStatusEnum = v.union(
  v.literal("pending"),
  v.literal("resolved"),
  v.literal("rejected"),
);

export default defineSchema({
  rides: defineTable({
    rideId: v.string(),
    ownerUserId: v.string(),
    from: v.string(),
    to: v.string(),
    startLocationCoords: v.optional(v.array(v.number())),
    endLocationCoords: v.optional(v.array(v.number())),
    date: v.string(),
    time: v.string(),
    price: v.number(),
    seats: v.number(),
    seatsBooked: v.number(),
    description: v.string(),
    status: RideStatusEnum,
    closureType: v.optional(closureTypeEnum),
    closeReason: v.optional(v.string()),
    disputed: v.optional(v.boolean()),
    penaltyAmount: v.optional(v.number()),
  })
    .index("byFrom", ["from"])
    .index("byTo", ["to"])
    .index("byDate", ["date"])
    .index("byStatus", ["status"])
    .index("byOwner", ["ownerUserId"]),

  bookings: defineTable({
    bookingId: v.string(),
    rideId: v.string(),
    userId: v.string(),
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
    .index("byBookingDate", ["bookingDate"]),

  users: defineTable({
    userId: v.string(),
    name: v.string(),
    email: v.string(),
    profileImage: v.optional(v.string()),
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
    points: v.optional(v.number()),
    aboutMe: v.optional(v.string()),
    penaltyNumbers: v.optional(v.number()),
    isPetFriendly: v.boolean(),
  })
    .index("byEmail", ["email"])
    .index("byUserId", ["userId"]),

  pointsTransactions: defineTable({
    transactionId: v.string(),
    userId: v.string(),
    rideId: v.string(),
    points: v.number(),
    transactionDate: v.string(),
    description: v.string(),
  }).index("byUser", ["userId"]),

  reportedIssues: defineTable({
    reportId: v.string(),
    rideId: v.string(),
    reporterUserId: v.string(),
    reporterRole: v.union(v.literal("driver"), v.literal("passenger")),
    description: v.string(),
    issueType: v.string(),
    status: ReportStatusEnum,
  })
    .index("byRide", ["rideId"])
    .index("byReporter", ["reporterUserId"]),
});
