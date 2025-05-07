export const RideExpired = (date: string) => {
  const currentDate = new Date().toISOString().slice(0, 10);
  const rideExpired = date < currentDate;

  return rideExpired;
};
