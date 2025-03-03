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
    profileImage: v.string(),
  },
  handler: async (ctx, { userId, name, email, profileImage }) => {
    // Check if user exists using the business key "userId"
    const existingUser = await ctx.db
      .query("users")
      .withIndex("byUserId", (q) => q.eq("userId", userId))
      .first();

    if (existingUser) {
      // Update existing user.
      await ctx.db.patch(existingUser._id, { name, email, profileImage });
      return existingUser._id;
    }

    // Create a new user.
    const newUserId = await ctx.db.insert("users", {
      userId,
      name,
      email,
      profileImage,
      stripeConnectedId: undefined,
      role: "passenger",
      vehicleBrand: "No Vehicle Brand",
      rating: 0,
      allowed: [],
      notAllowed: [],
      points: 0,
      aboutMe:
        "Hello, I'm a dedicated and friendly driver with a passion for safe and enjoyable journeys. With years of experience behind the wheel, I strive to create a comfortable and welcoming environment for every passenger. I believe that every ride is an opportunity to connect with people and share a positive experience on the road. I am constantly refining my skills and staying up-to-date with the latest safety standards to ensure you have the best ride possible. I look forward to meeting you and making your journey memorable!",
      driverInfo: {
        language: "Greek",
        drivingLicense: "",
        yearsOfExperience: 0,
      },
      isPetFriendly: false,
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
    return user;
  },
});

export const updatePreferences = mutation({
  args: {
    userId: v.string(),
    aboutMe: v.string(),
    driverInfo: v.object({
      yearsOfExperience: v.optional(v.number()),
      drivingLicense: v.optional(v.string()),
      language: v.optional(v.string()),
    }),
    allowed: v.array(v.string()),
    notAllowed: v.array(v.string()),
    isPetFriendly: v.boolean(),
    bankInfo: v.object({
      iban: v.string(),
      bankName: v.string(),
    }),
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
