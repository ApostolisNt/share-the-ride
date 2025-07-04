import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const replaceOldIds = mutation(async (ctx) => {
  const oldOwner = "jh75y4m9qj0cmphecbqk2gx90n7a1jvb";
  const newOwner = "user_2sJ7Os2KmZoK7Mvc6Vcp9QRfkpy";

  // Query for rides that have the specified old owner.
  const ridesToUpdate = await ctx.db
    .query("rides")
    .filter((q) => q.eq(q.field("ownerUserId"), oldOwner))
    .collect();

  let updatedCount = 0;
  // Iterate through the rides and update the ownerUserId.
  for (const ride of ridesToUpdate) {
    await ctx.db.patch(ride._id, { ownerUserId: newOwner });
    updatedCount++;
  }

  return { success: true, updatedCount };
});

export const deleteAvailableSeatsColumn = mutation(async ({ db }) => {
  // Query all ride documents.
  const rides = await db.query("rides").collect();

  // For each ride, patch it to remove the availableSeats field.
  for (const ride of rides) {
    await db.patch(ride._id, { seatsBooked: 0 });
  }
});


export const updateOwnerId = mutation({
  args: {
    oldOwnerId: v.string(),
    newOwnerId: v.string(),
  },
  handler: async (ctx, { oldOwnerId, newOwnerId }) => {
    // Fetch all rides with the old owner
    const rides = await ctx.db
      .query("pointsTransactions")
      .withIndex("byUserId", (q) => q.eq("userId", oldOwnerId))
      .collect();

    // Update each ride to the new owner
    let updatedCount = 0;
    for (const ride of rides) {
      await ctx.db.patch(ride._id, { userId: newOwnerId });
      updatedCount++;
    }

    return { updated: updatedCount };
  },
});