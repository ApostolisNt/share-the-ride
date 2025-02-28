import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.cron(
  "deactivate expired rides",
  "0 8 1 * *",
  internal.rides.deactivateExpiredRides,
);

export default crons;
