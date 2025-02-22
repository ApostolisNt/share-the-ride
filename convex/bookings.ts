// convex/bookings.ts
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { BOOKING_STATUS } from "app/consts/general";

export const bookRide = mutation({
  args: {
    rideId: v.id("rides"),
    clientId: v.id("users"),
  },
  handler: async (ctx, { rideId, clientId }) => {
    // Check if a booking already exists.
    const existingBooking = await ctx.db
      .query("bookings")
      .filter((q) => q.eq(q.field("rideId"), rideId))
      .filter((q) => q.eq(q.field("userId"), clientId))
      .first();
    if (existingBooking) {
      throw new Error("Client already booked this ride");
    }

    // Get the ride details.
    const ride = await ctx.db.get(rideId);
    if (!ride) {
      throw new Error("Ride not found");
    }

    // Count accepted bookings.
    const acceptedBookings = await ctx.db
      .query("bookings")
      .filter((q) => q.eq(q.field("rideId"), rideId))
      .filter((q) => q.eq(q.field("status"), "accepted"))
      .collect();

    if (acceptedBookings.length >= ride.availableSeats) {
      throw new Error("Ride fully booked");
    }

    // Create a new booking (initially pending).
    await ctx.db.insert("bookings", {
      rideId,
      userId: clientId,
      seatsRequested: 1, // adjust as needed
      status: "pending",
      bookingDate: new Date().toISOString(),
      paymentIntentId: undefined,
      amount: ride.price,
    });

    return { success: true };
  },
});

/** Query to get bookings for a specific ride, enriched with user info. */
export const getBookingByRide = query({
  args: { rideId: v.id("rides") },
  handler: async (ctx, { rideId }) => {
    const bookings = await ctx.db
      .query("bookings")
      .withIndex("byRide", (q) => q.eq("rideId", rideId))
      .collect();

    if (bookings.length === 0) return [];

    const userIds = Array.from(new Set(bookings.map((b) => b.userId)));
    const users = await ctx.db
      .query("users")
      .filter((q) =>
        q.or(...userIds.map((userId) => q.eq(q.field("_id"), userId))),
      )
      .collect();

    const userMap = new Map();
    for (const user of users) {
      userMap.set(user._id, user);
    }
    const enrichedBookings = bookings.map((booking) => ({
      ...booking,
      userName: userMap.get(booking.userId)?.name || "Unknown",
      userEmail: userMap.get(booking.userId)?.email || "Unknown",
    }));
    return enrichedBookings;
  },
});

/** Query to get bookings for a specific user, enriched with ride info. */
export const getBookingByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    const bookings = await ctx.db
      .query("bookings")
      .withIndex("byUser", (q) => q.eq("userId", userId))
      .collect();
    if (bookings.length === 0) return [];
    const rideIds = Array.from(new Set(bookings.map((b) => b.rideId)));
    const rides = await ctx.db
      .query("rides")
      .filter((q) =>
        q.or(...rideIds.map((rideId) => q.eq(q.field("_id"), rideId))),
      )
      .collect();
    const rideMap = new Map();
    for (const ride of rides) {
      rideMap.set(ride._id, ride);
    }
    const enrichedBookings = bookings.map((booking) => ({
      ...booking,
      rideFrom: rideMap.get(booking.rideId)?.from || "Unknown",
      rideTo: rideMap.get(booking.rideId)?.to || "Unknown",
      rideDate: rideMap.get(booking.rideId)?.date || "Unknown",
    }));
    return enrichedBookings;
  },
});

/** Mutation to update a booking’s status.
 *  If a booking is rejected, trigger cashback logic.
 */
export const updateBookingStatus = mutation({
  args: {
    rideId: v.id("rides"),
    clientId: v.id("users"),
    status: v.union(
      v.literal("pending"),
      v.literal("accepted"),
      v.literal("rejected"),
    ),
  },
  handler: async (ctx, { rideId, clientId, status }) => {
    const booking = await ctx.db
      .query("bookings")
      .filter((q) => q.eq(q.field("rideId"), rideId))
      .filter((q) => q.eq(q.field("userId"), clientId))
      .first();

    if (!booking) {
      console.log(`Booking not found for ride ${rideId} and user ${clientId}`);
      return { success: false };
    }

    await ctx.db.patch(booking._id, { status });

    if (status === BOOKING_STATUS.REJECTED) {
      // Trigger cashback logic here.
      console.log(`Processing cashback for user ${clientId} on ride ${rideId}`);
      // For example: update the user's wallet balance or call an external refund API.
    }

    return { success: true };
  },
});
