import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("rides").collect();
  },
});

export const getUserSingleRide = query({
  args: { rideId: v.id("rides") },
  handler: async (ctx, { rideId }) => {
    const ride = await ctx.db
      .query("rides")
      .filter((q) => q.eq(q.field("_id"), rideId))
      .first();

    if (!ride) {
      console.log("Ride not found");
      return null;
    }

    const rideOwner = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("_id"), ride.rideOwnerId))
      .first();

    if (!rideOwner) {
      console.log("Ride owner not found");
      return null;
    }

    return { ride: ride, user: rideOwner };
  },
});

/** Get rides that are either completed or inactive. */
export const getCompletedRides = query({
  args: {},
  handler: async (ctx) => {
    const completedRides = await ctx.db
      .query("rides")
      .withIndex("byStatus", (q) => q.eq("status", "completed"))
      .collect();
    const inactiveRides = await ctx.db
      .query("rides")
      .withIndex("byStatus", (q) => q.eq("status", "inactive"))
      .collect();

    // Merge the two result sets (avoid duplicates if any)
    const ridesMap = new Map();
    completedRides.concat(inactiveRides).forEach((ride) => {
      ridesMap.set(ride._id, ride);
    });
    return Array.from(ridesMap.values());
  },
});

/** Get active rides (without bookings). */
export const getActiveRides = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("rides")
      .withIndex("byStatus", (q) => q.eq("status", "active"))
      .collect();
  },
});

/** Get active rides and attach enriched bookings to each ride.
 *  (Each ride will have a `bookings` field containing booking data enriched with user info.)
 */
export const getActiveRidesWithBookings = query({
  args: {},
  handler: async (ctx) => {
    // Get all active rides.
    const rides = await ctx.db
      .query("rides")
      .withIndex("byStatus", (q) => q.eq("status", "active"))
      .collect();
    if (rides.length === 0) return [];

    // Get all bookings for these rides.
    const rideIds = rides.map((ride) => ride._id);
    const bookings = await ctx.db
      .query("bookings")
      .filter((q) =>
        q.or(...rideIds.map((rideId) => q.eq(q.field("rideId"), rideId))),
      )
      .collect();

    // Enrich each booking with the corresponding user’s data.
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

    // Group bookings by rideId.
    const bookingsByRide = new Map();
    for (const booking of enrichedBookings) {
      if (!bookingsByRide.has(booking.rideId)) {
        bookingsByRide.set(booking.rideId, []);
      }
      bookingsByRide.get(booking.rideId).push(booking);
    }
    // Attach bookings to each ride.
    const ridesWithBookings = rides.map((ride) => ({
      ...ride,
      bookings: bookingsByRide.get(ride._id) || [],
    }));
    return ridesWithBookings;
  },
});

/** Mutation to update a ride’s status. */
export const updateRideStatus = mutation({
  args: {
    rideId: v.id("rides"),
    status: v.union(
      v.literal("active"),
      v.literal("inactive"),
      v.literal("completed"),
    ),
  },
  handler: async (ctx, { rideId, status }) => {
    await ctx.db.patch(rideId, { status });
    return { success: true };
  },
});
