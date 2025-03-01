import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { REPORT_STATUS } from "app/consts/general";

export const reportRideIssue = mutation({
  args: {
    rideId: v.string(),
    reporterUserId: v.string(),
    reportMessage: v.string(),
  },
  handler: async (ctx, { rideId, reporterUserId, reportMessage }) => {
    const ride = await ctx.db
      .query("rides")
      .filter((q) => q.eq(q.field("rideId"), rideId))
      .first();

    if (!ride) throw new Error("Ride not found");

    await ctx.db.patch(ride._id, { disputed: true });

    await ctx.db.insert("reportedIssues", {
      reportId: crypto.randomUUID(),
      rideId,
      reporterUserId,
      reporterRole: "passenger",
      description: reportMessage,
      issueType: "rideCompletionDispute",
      status: REPORT_STATUS.PENDING,
    });

    return { success: true };
  },
});
