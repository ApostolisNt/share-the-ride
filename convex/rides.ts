import { RideWithBookings } from "app/types/types";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { RIDE_STATUS } from "app/consts/general";
import { RideStatusEnum } from "./schema";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const activeRides = await ctx.db
      .query("rides")
      .withIndex("byStatus", (q) => q.eq("status", RIDE_STATUS.ACTIVE))
      .collect();

    const sortActiveRidesBasedOnDate = activeRides.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    // const expiredRidesAtTheEnd = sortActiveRidesBasedOnDate.filter((ride) => {
    //   return new Date(ride.date).getTime() < new Date().getTime();
    // });

    // const activeRidesAtTheTop = sortActiveRidesBasedOnDate.filter((ride) => {
    //   return new Date(ride.date).getTime() >= new Date().getTime();
    // });

    // const sortActiveRidesBasedOnDated =
    //   activeRidesAtTheTop.concat(expiredRidesAtTheEnd);

    return sortActiveRidesBasedOnDate;
  },
});

export const createRide = mutation({
  args: {
    rideId: v.string(), // Business key for the ride (e.g., a UUID)
    ownerUserId: v.string(),
    from: v.string(),
    to: v.string(),
    date: v.string(),
    time: v.string(),
    price: v.number(),
    availableSeats: v.number(),
    description: v.string(),
    status: RideStatusEnum,
  },
  handler: async (
    ctx,
    {
      rideId,
      ownerUserId,
      from,
      to,
      date,
      time,
      price,
      availableSeats,
      description,
      status,
    },
  ) => {
    // Insert a new ride record into the rides table using business keys.
    await ctx.db.insert("rides", {
      rideId,
      ownerUserId,
      from,
      to,
      date,
      time,
      price,
      availableSeats,
      description,
      status,
    });
    return { success: true };
  },
});

export const getUserSingleRide = query({
  args: { rideId: v.string() },
  handler: async (ctx, { rideId }) => {
    const ride = await ctx.db
      .query("rides")
      .filter((q) => q.eq(q.field("rideId"), rideId))
      .first();

    if (!ride) {
      console.log("Ride not found");
      return null;
    }

    // Use the business key from the ride record to get its owner.
    const rideOwner = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), ride.ownerUserId))
      .first();

    if (!rideOwner) {
      console.log("Ride owner not found");
      return null;
    }

    return { ride, user: rideOwner };
  },
});

/** Get rides that are either completed or inactive. */
export const getCompletedRides = query({
  args: {},
  handler: async (ctx) => {
    const completedRides = await ctx.db
      .query("rides")
      .withIndex("byStatus", (q) => q.eq("status", RIDE_STATUS.COMPLETED))
      .collect();
    const inactiveRides = await ctx.db
      .query("rides")
      .withIndex("byStatus", (q) => q.eq("status", RIDE_STATUS.INACTIVE))
      .collect();

    // Merge the two result sets (avoid duplicates if any)
    const ridesMap = new Map();
    completedRides.concat(inactiveRides).forEach((ride) => {
      ridesMap.set(ride.rideId, ride);
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
      .withIndex("byStatus", (q) => q.eq("status", RIDE_STATUS.ACTIVE))
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
      .withIndex("byStatus", (q) => q.eq("status", RIDE_STATUS.ACTIVE))
      .collect();
    if (rides.length === 0) return [];

    // Get all bookings for these rides.
    const rideIds = rides.map((ride) => ride.rideId);
    const bookings = await ctx.db
      .query("bookings")
      .filter((q) => q.or(...rideIds.map((id) => q.eq(q.field("rideId"), id))))
      .collect();

    // Enrich each booking with the corresponding user’s data.
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

    // Group bookings by rideId.
    const bookingsByRide = new Map();
    for (const booking of enrichedBookings) {
      if (!bookingsByRide.has(booking.rideId)) {
        bookingsByRide.set(booking.rideId, []);
      }
      bookingsByRide.get(booking.rideId).push(booking);
    }
    // Attach bookings to each ride.
    const ridesWithBookings: RideWithBookings[] = rides.map((ride) => ({
      ride,
      bookings: bookingsByRide.get(ride.rideId) || [],
    }));

    return ridesWithBookings;
  },
});

/** Mutation to update a ride’s status. */
export const updateRideStatus = mutation({
  args: {
    rideId: v.string(),
    status: RideStatusEnum,
  },
  handler: async (ctx, { rideId, status }) => {
    // Query for the ride using the business key.
    const ride = await ctx.db
      .query("rides")
      .filter((q) => q.eq(q.field("rideId"), rideId))
      .first();
    if (!ride) {
      throw new Error("Ride not found");
    }
    await ctx.db.patch(ride._id, { status });
    return { success: true };
  },
});
