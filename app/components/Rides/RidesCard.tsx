"use client";

import profileDefault from "@assets/profile-default.png";
import "./RidesCard.scss";
import Image from "next/image";
import { formatDate } from "app/helpers/FomatDate";
import { TravelTypes } from "app/helpers/TravelTypes";
import { useRouter } from "next/navigation";
import LoaderLine from "@components/LoaderLine/LoaderLine";
import { Ride, User } from "./Rides";

type Icons = {
  drink: String;
  music: String;
  pets: String;
  smoke: String;
  twoPersons: String;
  threePersons: String;
};

const RidesCard = ({ ride, users }: { ride: Ride; users: User[] }) => {
  const router = useRouter();
  const { _id, userId, from, to, date, time, ridePrice } = ride;

  
  const user = users.find(
    (user: User) => user._id === userId,
  );

  const {
    allowed = [],
    notAllowed = [],
    rating = 0,
    vehicleBrand = "",
    name = "",
  } = user ?? {};

  const fillPercentage = `${(rating / 5) * 100}%`;
  const timeSlice = time.slice(0, 2);
  const timeType =
    parseInt(timeSlice, 10) >= 0 && parseInt(timeSlice, 10) < 12 ? "AM" : "PM";

  const { allowedIcons, notAllowedIcons } = TravelTypes({
    allowed: allowed as Array<keyof Icons>,
    notAllowed: notAllowed as Array<keyof Icons>,
  });

  //TODO: Go to ride id
  const handleSubmit = () => {
    router.push(`/rides/${userId}`);
  };

  const currentDate = new Date().toISOString().slice(0, 10);
  const rideExpired = date < currentDate;

  return (
    <>
      <div
        className={`ride_card shadow-card transition-shadow-transform duration-200 ease-out hover:-translate-y-2 hover:shadow-cardHover ${rideExpired && "pointer-events-none"}`}
        onClick={handleSubmit}
      >
        {rideExpired && (
          <div className="ride_card_expired absolute left-1/2 top-1/2 rounded-md border-2 border-solid border-red-600 p-2 font-semibold uppercase text-red-600">
            This ride has expire
          </div>
        )}
        <div className={`content ${rideExpired ? "opacity-50" : ""}`}>
          <div className="ride_card_user">
            <Image src={profileDefault} alt="profile" />
            <h3>{name}</h3>
            <div className="ride_card_rating">
              <p>{rating}</p>
              <div className="star-container">
                <div
                  className="star-fill"
                  style={{ width: fillPercentage }}
                ></div>
              </div>
            </div>
            <p className="ride_card_price">{ridePrice.toFixed(2)} €</p>
          </div>
          <div className="ride_card_details">
            <div className="ride_card_date">
              <p>{formatDate(date)}</p>
              <p>
                {time} {timeType}
              </p>
            </div>
            <div className="ride_card_destination">
              <p className="ride_card_from">{from}</p>
              <LoaderLine />
              <p className="ride_card_to">{to}</p>
            </div>
          </div>
          <div className="ride_card_extra_details">
            <p className="ride_card_vehicle">{vehicleBrand}</p>
            {/* allowed */}
            <div className="ride_card_icons">
              {allowedIcons.map((icon, index) => (
                <Image
                  key={index}
                  src={icon.img}
                  alt={`${icon.alt} allowed`}
                  title={`${icon.alt} allowed`}
                />
              ))}
              {/* notAllowed */}
              {notAllowedIcons.map((icon, index) => (
                <div key={index} className="notAllowed">
                  <Image
                    key={index}
                    src={icon.img}
                    alt={`${icon.alt} not allowed`}
                    title={`${icon.alt} not allowed`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RidesCard;
