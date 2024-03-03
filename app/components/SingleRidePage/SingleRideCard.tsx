import React from "react";

const SingleRideCard = ({ singleUserData }: any) => {
  const {
    id,
    destination,
    from,
    date,
    time,
    seats,
    price,
    luggage,
    description,
  } = singleUserData[0];
  return (
    <div className="single_ride_container">
      <div className="singleRide_destination">{from}</div>
    </div>
  );
};

export default SingleRideCard;
