import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
// You can import your booking status constants or use literals directly.
import { BOOKING_STATUS } from "app/consts/general";

export const bookRide = mutation({
  args: {
    rideId: v.string(), // now using business key
    clientUserId: v.string(), // business key for the user
  },
  handler: async (ctx, { rideId, clientUserId }) => {
    // Check if a booking already exists.
    const existingBooking = await ctx.db
      .query("bookings")
      .filter((q) => q.eq(q.field("rideId"), rideId))
      .filter((q) => q.eq(q.field("userId"), clientUserId))
      .first();
    if (existingBooking) {
      throw new Error("Client already booked this ride");
    }

    // Get the ride details using the business key.
    const ride = await ctx.db
      .query("rides")
      .filter((q) => q.eq(q.field("rideId"), rideId))
      .first();

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
      bookingId: crypto.randomUUID(), // Replace with your unique ID generator
      rideId,
      userId: clientUserId,
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
  args: { rideId: v.string() },
  handler: async (ctx, { rideId }) => {
    const bookings = await ctx.db
      .query("bookings")
      .withIndex("byRide", (q) => q.eq("rideId", rideId))
      .collect();

    if (bookings.length === 0) return [];

    const userIds = Array.from(new Set(bookings.map((b) => b.userId)));
    const users = await ctx.db
      .query("users")
      .filter((q) => q.or(...userIds.map((id) => q.eq(q.field("userId"), id))))
      .collect();

    const userMap = new Map();
    for (const user of users) {
      userMap.set(user.userId, user);
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
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    const bookings = await ctx.db
      .query("bookings")
      .withIndex("byUser", (q) => q.eq("userId", userId))
      .collect();
    if (bookings.length === 0) return [];

    const rideIds = Array.from(new Set(bookings.map((b) => b.rideId)));
    const rides = await ctx.db
      .query("rides")
      .filter((q) => q.or(...rideIds.map((id) => q.eq(q.field("rideId"), id))))
      .collect();
    const rideMap = new Map();
    for (const ride of rides) {
      rideMap.set(ride.rideId, ride);
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
    rideId: v.string(),
    clientUserId: v.string(),
    status: v.union(
      v.literal("pending"),
      v.literal("accepted"),
      v.literal("rejected"),
    ),
  },
  handler: async (ctx, { rideId, clientUserId, status }) => {
    const booking = await ctx.db
      .query("bookings")
      .filter((q) => q.eq(q.field("rideId"), rideId))
      .filter((q) => q.eq(q.field("userId"), clientUserId))
      .first();

    if (!booking) {
      console.log(
        `Booking not found for ride ${rideId} and user ${clientUserId}`,
      );
      return { success: false };
    }

    await ctx.db.patch(booking._id, { status });

    if (status === BOOKING_STATUS.REJECTED) {
      // Trigger cashback logic here.
      console.log(
        `Processing cashback for user ${clientUserId} on ride ${rideId}`,
      );
      // For example: update the user's wallet balance or call an external refund API.
    }

    return { success: true };
  },
});
