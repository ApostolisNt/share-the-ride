"use client";

import LoaderLine from "@components/LoaderLine/LoaderLine";
import "./SingleRideCard.scss";
import profileDefault from "@assets/profile-default.png";
import { MdOutlineMail } from "react-icons/md";
import clsx from "clsx";
import { Image } from "./../Global/Image";
import BookNowButton from "./BookNowButton";
import { Ride, User } from "app/types/types";
import { getTravelIcons } from "app/helpers/TravelTypes";

type SingleRideCardProps = {
  singleData: { ride: Ride; user: User };
};

const SingleRideCard = ({ singleData }: SingleRideCardProps) => {
  const {
    rideId: RideUniqueId,
    date,
    from,
    to,
    description,
    price,
  } = singleData.ride;

  const {
    vehicleBrand,
    driverInfo,
    userId: UserUniqueId,
    allowed,
    notAllowed,
    name,
    email,
  } = singleData.user;

  const { yearsOfExperience, language } = driverInfo ?? {};
  const { allowedIcons, notAllowedIcons } = getTravelIcons({
    allowed,
    notAllowed,
  });

  return (
    <>
      <div
        className={clsx(
          "single-ride-container mx-auto my-8 flex w-2/5 flex-col items-center rounded-lg p-4 md:w-full lg:w-2/3",
          "shadow-card transition-shadow-transform duration-200 ease-out hover:shadow-cardHover",
        )}
      >
        <div>
          <h2 className="text-2xl font-semibold">{date}</h2>
        </div>
        <div className="singleRide_destination flex items-center gap-4 text-base font-semibold uppercase">
          <p>From: {from}</p>
          <LoaderLine />
          <p>To: {to}</p>
        </div>
        <div className="single-ride-description">
          <p>{description}</p>
        </div>
        <div>
          <p className="single-ride-price">Per person: {price?.toFixed(2)} €</p>
        </div>
        <div className="single-ride-driver-info flex gap-8">
          <p>Driver Experience: {yearsOfExperience} years</p>
          <p>Languages: {language}</p>
        </div>
        <div className="single-ride-driver-profile flex w-full items-center justify-between">
          <Image src={profileDefault} alt="profile" />
          <div>
            <h3 className="ml-4 text-base font-medium">{name}</h3>
            <p className="ml-4 text-sm font-medium text-slate-500">
              {vehicleBrand}
            </p>
          </div>
          <div className="single-ride-contact flex flex-1 justify-end gap-4">
            {/* <a href={`tel:${contact.phone}`} target="_blank">
              <MdLocalPhone size={26} />
            </a> */}
            <a href={`mailto:${email}`} target="_blank">
              <MdOutlineMail size={26} />
            </a>
          </div>
        </div>
        <div>
          {/* allowed */}
          <div className="flex flex-row gap-4">
            {allowedIcons.map((icon, index) => (
              <Image
                className="w-8 object-contain"
                key={index}
                src={icon.img}
                alt={`${icon.alt} allowed`}
                title={`${icon.alt} allowed`}
              />
            ))}
            {/* notAllowed */}
            {notAllowedIcons.map((icon, index) => (
              <div key={index} className="notAllowed relative inline-block">
                <Image
                  className="w-8 object-contain opacity-50"
                  key={index}
                  src={icon.img}
                  alt={`${icon.alt} not allowed`}
                  title={`${icon.alt} not allowed`}
                />
              </div>
            ))}
          </div>
        </div>
        <BookNowButton rideId={RideUniqueId} clientId={UserUniqueId} />
      </div>
    </>
  );
};

export default SingleRideCard;
