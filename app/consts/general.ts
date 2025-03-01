export const RIDE_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  COMPLETED: "completed",
} as const;

export const BOOKING_STATUS = {
  PENDING: "pending",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
} as const;

export const MODAL_TYPE = {
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info",
} as const;

export const CLOSURE_TYPE = {
  CLOSED: "closed",
  COMPLETED: "completed",
} as const;

export const REPORT_STATUS = {
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
} as const;

export const DEFAULT_COORDS = {
  FROM: [37.9838, 23.7275],
  TO: [40.6401, 22.9444],
};

export const seatsBookedStyle = (seatsBooked: number, seats: number) => {
  if (seatsBooked === 0) return "text-green-500";
  if (seatsBooked === seats) return "text-red-500";
  if (seatsBooked <= seats - 1) return "text-yellow-500";
};
