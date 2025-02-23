import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getUserById = query({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
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

export const getUserPreferences = query({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), userId))
      .first();
    if (!user) {
      throw new Error("User not found");
    }
    return { allowed: user.allowed ?? [], notAllowed: user.notAllowed ?? [] };
  },
});

export const updatePreferences = mutation({
  args: {
    userId: v.string(),
    allowed: v.array(v.string()),
    notAllowed: v.array(v.string()),
  },
  handler: async (ctx, { userId, allowed, notAllowed }) => {
    const user = await ctx.db
      .query("users")
      .withIndex("byUserId", (q) => q.eq("userId", userId))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    await ctx.db.patch(user._id, { allowed, notAllowed });
    return { success: true };
  },
});
