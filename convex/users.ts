import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getUserById = query({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    // Query by the business key "userId"
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), userId))
      .first();
    return user;
  },
});

export const updateUser = mutation({
  args: {
    userId: v.string(),
    name: v.string(),
    email: v.string(),
  },
  handler: async (ctx, { userId, name, email }) => {
    // Check if user exists using the business key "userId"
    const existingUser = await ctx.db
      .query("users")
      .withIndex("byUserId", (q) => q.eq("userId", userId))
      .first();

    if (existingUser) {
      // Update existing user.
      await ctx.db.patch(existingUser._id, { name, email });
      return existingUser._id;
    }

    // Create a new user.
    const newUserId = await ctx.db.insert("users", {
      userId,
      name,
      email,
      stripeConnectedId: undefined,
      role: "passenger",
    });

    return newUserId;
  },
});
