import { query } from "./_generated/server";
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
