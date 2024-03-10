"use client";

import profileDefault from "@assets/profile-default.png";
import "./RidesCard.scss";
import Image from "next/image";
import { formatDate } from "app/helpers/FomatDate";
import { TravelTypes } from "app/helpers/TravelTypes";
import { useRouter } from "next/navigation";
import LoaderLine from "@components/LoaderLine/LoaderLine";

const RidesCard = ({ ride }: any) => {
  const {
    id,
    name,
    from,
    to,
    date,
    time,
    rating,
    ridePrice,
    allowed,
    notAllowed,
    vehicleBrand,
  } = ride;
  const router = useRouter();
  const fillPercentage = `${(rating / 5) * 100}%`;
  const timeSlice = time.slice(0, 2);
  const timeType = timeSlice >= 0 && timeSlice < 12 ? "AM" : "PM";
  const { allowedIcons, notAllowedIcons } = TravelTypes({
    allowed,
    notAllowed,
  });

  const handleSubmit = () => {
    router.push(`/rides/${id}`);
  };

  return (
    <div
      className="ride_card shadow-card transition-shadow-transform duration-200 ease-out hover:-translate-y-2 hover:shadow-cardHover"
      onClick={handleSubmit}
    >
      <div className="ride_card_user">
        <Image src={profileDefault} alt="profile" />
        <h3>{name}</h3>
        <div className="ride_card_rating">
          <p>{rating}</p>
          <div className="star-container">
            <div className="star-fill" style={{ width: fillPercentage }}></div>
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
  );
};

export default RidesCard;
