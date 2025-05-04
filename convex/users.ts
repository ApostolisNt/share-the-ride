import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Query to fetch a user by their Clerk user ID
export const getUserById = query({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    return await ctx.db
      .query("users")
      .withIndex("byUserId", (q) => q.eq("userId", userId))
      .first();
  },
});

// Mutation to create a new user (idempotent)
export const createUser = mutation({
  args: {
    userId: v.string(),
    name: v.string(),
    email: v.string(),
    profileImage: v.optional(v.string()),
    stripeCustomerId: v.string(),
  },
  handler: async (
    ctx,
    { userId, name, email, profileImage, stripeCustomerId },
  ) => {
    // Idempotency guard: return existing record if present
    const existing = await ctx.db
      .query("users")
      .withIndex("byUserId", (q) => q.eq("userId", userId))
      .first();
    if (existing) return existing._id;

    // Insert only the defined fields, omitting undefined
    const newUserId = await ctx.db.insert("users", {
      userId,
      name,
      email,
      profileImage,
      stripeCustomerId,
      role: "passenger",
      rating: 0,
      allowed: [],
      notAllowed: [],
      points: 0,
      aboutMe:
        "Hello, I'm a dedicated and friendly driver with a passion for safe and enjoyable journeys. With years of experience behind the wheel, I strive to create a comfortable and welcoming environment for every passenger. I believe that every ride is an opportunity to connect with people and share a positive experience on the road. I am constantly refining my skills and staying up-to-date with the latest safety standards to ensure you have the best ride possible. I look forward to meeting you and making your journey memorable!",
      driverInfo: {
        language: "Greek",
        drivingLicense: "No Driving License",
        yearsOfExperience: 0,
        vehicleBrand: "No Vehicle Brand",
      },
      isPetFriendly: false,
    });

    return newUserId;
  },
});

// Mutation to update an existing user's basic info
export const updateUser = mutation({
  args: {
    userId: v.string(),
    name: v.string(),
    email: v.string(),
    profileImage: v.string(),
  },
  handler: async (ctx, { userId, name, email, profileImage }) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("byUserId", (q) => q.eq("userId", userId))
      .first();

    if (!existing) {
      throw new Error("User not found");
    }

    await ctx.db.patch(existing._id, { name, email, profileImage });
    return existing._id;
  },
});

// Query to get full user preferences
export const getUserPreferences = query({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    const user = await ctx.db
      .query("users")
      .withIndex("byUserId", (q) => q.eq("userId", userId))
      .first();
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  },
});

// Mutation to update user preferences/settings
export const updatePreferences = mutation({
  args: {
    userId: v.string(),
    aboutMe: v.string(),
    driverInfo: v.object({
      yearsOfExperience: v.optional(v.number()),
      drivingLicense: v.optional(v.string()),
      language: v.optional(v.string()),
      vehicleBrand: v.optional(v.string()),
    }),
    allowed: v.array(v.string()),
    notAllowed: v.array(v.string()),
    isPetFriendly: v.boolean(),
    bankInfo: v.object({
      iban: v.string(),
      bankName: v.string(),
    }),
  },
  handler: async (
    ctx,
    {
      userId,
      aboutMe,
      driverInfo,
      allowed,
      notAllowed,
      isPetFriendly,
      bankInfo,
    },
  ) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("byUserId", (q) => q.eq("userId", userId))
      .first();

    if (!existing) {
      throw new Error("User not found");
    }

    await ctx.db.patch(existing._id, {
      aboutMe,
      driverInfo,
      allowed,
      notAllowed,
      isPetFriendly,
      bankInfo,
    });
    return { success: true };
  },
});
