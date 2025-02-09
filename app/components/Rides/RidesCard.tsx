"use client";

// Assets
import profileDefault from "@assets/profile-default.png";

//Styles
import "./RidesCard.scss";

//Utils
import { formatDate } from "app/helpers/FormatDate";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { TravelTypes } from "app/helpers/TravelTypes";

//Components
import LoaderLine from "@components/LoaderLine/LoaderLine";
import { Image } from "@components/Global/Image";

//Types
import { Doc } from "convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";

type Icons = {
  drink: string;
  music: string;
  pets: string;
  smoke: string;
  twoPersons: string;
  threePersons: string;
};

const RidesCard = ({ ride }: { ride: Doc<"rides"> }) => {
  const router = useRouter();
  const locale = useLocale();
  const { from, to, date, time, price } = ride;
  const user = useQuery(api.users.getUserById, { userId: ride.rideOwnerId });

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

  const handleSubmit = () => {
    router.push(`/${locale}/rides/${ride._id}`);
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
          <div className="ride_card_expired absolute left-1/2 top-1/2 z-10 rounded-md border-2 border-solid border-red-600 bg-white p-2 font-semibold uppercase text-red-600">
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
            <p className="ride_card_price">{price.toFixed(2)} €</p>
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
