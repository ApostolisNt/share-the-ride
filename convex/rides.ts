import { EnrichedBooking, RideWithBookings } from "app/types/types";
import { internalMutation, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { BOOKING_STATUS, CLOSURE_TYPE, RIDE_STATUS } from "app/consts/general";
import { RideStatusEnum } from "./schema";
import { paginationOptsValidator } from "convex/server";

export const getRides = query({
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
    ownerUserId: v.string(),
    from: v.string(),
    to: v.string(),
    startLocationCoords: v.optional(v.array(v.number())),
    endLocationCoords: v.optional(v.array(v.number())),
    date: v.string(),
    time: v.string(),
    price: v.number(),
    seats: v.number(),
    description: v.string(),
    status: RideStatusEnum,
  },
  handler: async (
    ctx,
    {
      ownerUserId,
      from,
      to,
      startLocationCoords,
      endLocationCoords,
      date,
      time,
      price,
      seats,
      description,
      status,
    },
  ) => {
    await ctx.db.insert("rides", {
      rideId: crypto.randomUUID(),
      ownerUserId,
      from,
      to,
      startLocationCoords,
      endLocationCoords,
      date,
      time,
      price,
      seatsBooked: 0,
      description,
      status,
      seats,
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
export const getCompletedRidesWithData = query({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    // 1. Fetch rides with "completed" and "inactive" statuses.
    const completedRides = await ctx.db
      .query("rides")
      .withIndex("byStatus", (q) => q.eq("status", RIDE_STATUS.COMPLETED))
      .collect();
    const inactiveRides = await ctx.db
      .query("rides")
      .withIndex("byStatus", (q) => q.eq("status", RIDE_STATUS.INACTIVE))
      .collect();

    // Merge the two result sets (keyed by rideId to avoid duplicates).
    const ridesMap = new Map();
    completedRides.concat(inactiveRides).forEach((ride) => {
      {
        if (ride.ownerUserId !== userId) {
          return;
        }
        ridesMap.set(ride.rideId, ride);
      }
    });
    const rides = Array.from(ridesMap.values());
    if (rides.length === 0) return [];

    // 2. Extract rideIds for batch queries.
    const rideIds = rides.map((ride) => ride.rideId);

    // 3. Fetch all bookings for these rides.
    const bookings = await ctx.db
      .query("bookings")
      .filter((q) => q.or(...rideIds.map((id) => q.eq(q.field("rideId"), id))))
      .filter((q) => q.eq(q.field("status"), BOOKING_STATUS.ACCEPTED))
      .collect();

    // 4. Fetch points transactions for these rides.
    const pointsTransactions = await ctx.db
      .query("pointsTransactions")
      .filter((q) => q.or(...rideIds.map((id) => q.eq(q.field("rideId"), id))))
      .collect();

    // 5. Enrich bookings with user info.
    let enrichedBookings: EnrichedBooking[] = [];
    const hasAcceptedRides = bookings.some(
      (booking) => booking.status === BOOKING_STATUS.ACCEPTED,
    );

    if (bookings.length > 0 && hasAcceptedRides) {
      const userIds = Array.from(new Set(bookings.map((b) => b.userId)));
      const users = await ctx.db
        .query("users")
        .filter((q) =>
          q.or(...userIds.map((id) => q.eq(q.field("userId"), id))),
        )
        .collect();
      const userMap = new Map();
      for (const user of users) {
        userMap.set(user.userId, user);
      }
      enrichedBookings = bookings.map((booking) => ({
        ...booking,
        userName: userMap.get(booking.userId)?.name || "Unknown",
        userEmail: userMap.get(booking.userId)?.email || "Unknown",
        profileImage: userMap.get(booking.userId)?.profileImage || "",
      }));
    }

    // 6. Group enriched bookings by rideId.
    const bookingsByRide = new Map();
    for (const booking of enrichedBookings) {
      if (!bookingsByRide.has(booking.rideId)) {
        bookingsByRide.set(booking.rideId, []);
      }
      bookingsByRide.get(booking.rideId).push(booking);
    }

    // 7. Group points transactions by rideId.
    // (Assuming one points transaction per ride; adjust if needed.)
    const pointsByRide = new Map();
    for (const pt of pointsTransactions) {
      pointsByRide.set(pt.rideId, pt);
    }

    // 8. Combine data for each ride.
    const ridesWithData = rides.map((ride) => ({
      ride,
      bookings: bookingsByRide.get(ride.rideId) || [],
      pointsEarned: pointsByRide.get(ride.rideId) || { points: 0 },
    }));

    return ridesWithData;
  },
});

export const getLatestCompletedRides = query({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    const rides = await ctx.db
      .query("rides")
      .withIndex("byStatus", (q) => q.eq("status", RIDE_STATUS.COMPLETED))
      .filter((q) => q.eq(q.field("ownerUserId"), userId))
      .collect();

    rides.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    return rides.slice(0, 2);
  },
});

/** Get active rides and attach enriched bookings to each ride.
 *  (Each ride will have a `bookings` field containing booking data enriched with user info.)
 */
export const getActiveRidesWithBookings = query({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    // Get all active rides.
    const rides = await ctx.db
      .query("rides")
      .filter((q) => q.eq(q.field("ownerUserId"), userId))
      .filter((q) => q.eq(q.field("status"), RIDE_STATUS.ACTIVE))
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
      profileImage: userMap.get(booking.userId)?.profileImage || "",
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

    // If setting the ride as completed, award points
    if (status === RIDE_STATUS.COMPLETED) {
      // Check that the ride has at least one booking
      const bookings = await ctx.db
        .query("bookings")
        .filter((q) => q.eq(q.field("rideId"), rideId))
        .collect();

      const hasAcceptedRides = bookings.some(
        (booking) => booking.status === BOOKING_STATUS.ACCEPTED,
      );

      if (bookings.length > 0 && hasAcceptedRides) {
        // TODO: Award points to the ride owner based on bookings and distance between 2 cities.
        // Temporary points calculation based on bookings and ride price.
        const numberOfBookingsAndPrice = bookings.length * ride.price;
        const earnedPoints = numberOfBookingsAndPrice * 0.1;

        // Update the ride owner's aggregated points in the users table.
        const owner = await ctx.db
          .query("users")
          .withIndex("byUserId", (q) => q.eq("userId", ride.ownerUserId))
          .first();

        if (!owner) {
          throw new Error("Ride owner not found");
        }
        const updatedPoints = (owner.points || 0) + earnedPoints;
        await ctx.db.patch(owner._id, { points: updatedPoints });

        // Record the points transaction.
        await ctx.db.insert("pointsTransactions", {
          transactionId: crypto.randomUUID(),
          userId: ride.ownerUserId,
          rideId: ride.rideId,
          points: earnedPoints,
          transactionDate: new Date().toISOString(),
          description: `Awarded ${earnedPoints} points for ride ${ride.from} - ${ride.to} ( ${ride.rideId} )`,
        });
        console.log(
          `Awarded ${earnedPoints} points to user ${ride.ownerUserId}`,
        );
      }
    }

    // Finally, update the ride status
    await ctx.db.patch(ride._id, { status });
    return { success: true };
  },
});

export const deactivateExpiredRides = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = new Date();
    const activeRides = await ctx.db
      .query("rides")
      .filter((q) => q.eq(q.field("status"), RIDE_STATUS.ACTIVE))
      .collect();

    for (const ride of activeRides) {
      if (new Date(ride.date).getTime() < now.getTime()) {
        await ctx.db.patch(ride._id, { status: RIDE_STATUS.INACTIVE });
      }
    }
  },
});

export const closeRide = mutation({
  args: {
    rideId: v.string(),
    closeReason: v.string(),
  },
  handler: async (ctx, { rideId, closeReason }) => {
    const ride = await ctx.db
      .query("rides")
      .filter((q) => q.eq(q.field("rideId"), rideId))
      .first();

    if (!ride) {
      throw new Error("Ride not found");
    }

    // Check if there are any accepted bookings.
    const bookings = await ctx.db
      .query("bookings")
      .filter((q) => q.eq(q.field("rideId"), rideId))
      .collect();

    const hasAcceptedBookings = bookings.some(
      (booking) => booking.status === "accepted",
    );

    // Is 2 days before the ride date
    const twoDaysBeforeRide = new Date(ride.date);
    twoDaysBeforeRide.setDate(twoDaysBeforeRide.getDate() - 2);

    if (hasAcceptedBookings) {
      // If there are accepted bookings, close the ride with a penalty.
      // Update the ride document.
      await ctx.db.patch(ride._id, {
        status: RIDE_STATUS.INACTIVE,
        closureType: CLOSURE_TYPE.CLOSED,
        closeReason,
        disputed: false,
        penaltyAmount: 5,
      });

      // Query for the ride owner in the users table.
      const owner = await ctx.db
        .query("users")
        .filter((q) => q.eq(q.field("userId"), ride.ownerUserId))
        .first();

      if (owner) {
        const newPenaltyNumbers = (owner.penaltyNumbers || 0) + 1;
        await ctx.db.patch(owner._id, { penaltyNumbers: newPenaltyNumbers });
      }

      return { success: true };
    }

    await ctx.db.patch(ride._id, {
      status: RIDE_STATUS.INACTIVE,
      closureType: CLOSURE_TYPE.CLOSED,
      closeReason,
      disputed: false,
    });

    return { success: true };
  },
});

export const getFilteredRides = query({
  args: {
    from: v.optional(v.string()),
    to: v.optional(v.string()),
    date: v.optional(v.string()),
    priceMin: v.optional(v.number()),
    priceMax: v.optional(v.number()),
    allowed: v.optional(v.array(v.string())),
    petFriendly: v.optional(v.boolean()),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    let ridesQuery = ctx.db
      .query("rides")
      .filter((q) => q.eq(q.field("status"), RIDE_STATUS.ACTIVE));

    if (args.from) {
      ridesQuery = ridesQuery.filter((q) => q.eq(q.field("from"), args.from));
    }
    if (args.to) {
      ridesQuery = ridesQuery.filter((q) => q.eq(q.field("to"), args.to));
    }
    if (args.date) {
      ridesQuery = ridesQuery.filter((q) => q.eq(q.field("date"), args.date));
    }
    if (args.priceMin !== undefined) {
      const minPrice = args.priceMin;
      ridesQuery = ridesQuery.filter((q) => q.gte(q.field("price"), minPrice));
    }
    if (args.priceMax !== undefined) {
      const maxPrice = args.priceMax;
      ridesQuery = ridesQuery.filter((q) => q.lte(q.field("price"), maxPrice));
    }

    // Paginate using Convex's built-in paginate helper.
    const pagination = await ridesQuery.paginate(args.paginationOpts);
    const paginatedRides = pagination.page;

    let filteredRides = paginatedRides;
    if (args.allowed || args.petFriendly !== undefined) {
      const ownerIds = Array.from(
        new Set(paginatedRides.map((ride) => ride.ownerUserId)),
      );
      const users = await ctx.db
        .query("users")
        .filter((q) =>
          q.or(...ownerIds.map((id) => q.eq(q.field("userId"), id))),
        )
        .collect();

      const userMap = new Map();
      for (const user of users) {
        userMap.set(user.userId, user);
      }

      filteredRides = paginatedRides.filter((ride) => {
        const user = userMap.get(ride.ownerUserId);
        if (!user) return false;
        if (args.allowed) {
          if (
            !user.allowed ||
            !args.allowed.every((icon) => user.allowed.includes(icon))
          ) {
            return false;
          }
        }
        if (args.petFriendly !== undefined) {
          if (user.isPetFriendly !== args.petFriendly) {
            return false;
          }
        }
        return true;
      });
    }

    return {
      page: filteredRides,
      isDone: pagination.isDone,
      continueCursor: pagination.continueCursor,
    };
  },
});
