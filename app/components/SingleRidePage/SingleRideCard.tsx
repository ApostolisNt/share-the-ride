"use client";

import React from "react";
import clsx from "clsx";
import { MdOutlineMail } from "react-icons/md";
import profileDefault from "@assets/profile-default.png";
import { Ride, User } from "app/types/types";
import { getTravelIcons } from "app/helpers/TravelTypes";
import BookNowButton from "./BookNowButton";
import { Image } from "./../Global/Image";
import { RatingStar } from "@assets/RatingStar";

type SingleRideCardProps = {
  singleData: { ride: Ride; user: User };
};

const SingleRideCard = ({ singleData }: SingleRideCardProps) => {
  const {
    ride: { rideId: RideUniqueId, date, from, to, description, price },
  } = singleData;
  const {
    vehicleBrand,
    driverInfo,
    userId: UserUniqueId,
    allowed,
    notAllowed,
    name,
    email,
    rating,
  } = singleData.user;
  const { yearsOfExperience, language } = driverInfo ?? {};
  const { allowedIcons, notAllowedIcons } = getTravelIcons({
    allowed,
    notAllowed,
  });

  return (
    <div
      className={clsx(
        "shadow hover:shadow-lg mx-auto my-8 rounded-lg p-6 transition-transform duration-200 ease-out",
        "w-full max-w-6xl bg-white",
      )}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Left Column: User Profile & Hot Ride Info */}
        <div className="order-2 flex flex-col gap-4 bg-gray-50 p-4 lg:order-1">
          {/* Top Row: Driver Profile */}
          <div className="flex items-center justify-between rounded-lg p-4">
            <Image
              src={profileDefault}
              alt="Driver profile"
              className="h-20 w-20 rounded-full object-cover"
            />
            <div className="flex items-center gap-2">
              <RatingStar rating={rating ?? 0} />
              <span className="text-base font-semibold text-gray-500">
                {rating?.toFixed(1) ?? 0}
              </span>
            </div>
          </div>
          {/* Bottom Row: Driver Info */}
          <div className="flex flex-col gap-4">
            <div className="rounded-lg">
              <p className="text-base font-bold text-black">{name}</p>
              <p className="text-bold text-sm">
                {`Hello, I'm a dedicated and friendly driver with a passion for
                safe and enjoyable journeys. With years of experience behind the
                wheel, I strive to create a comfortable and welcoming
                environment for every passenger. I believe that every ride is an
                opportunity to connect with people and share a positive
                experience on the road. I am constantly refining my skills and
                staying up-to-date with the latest safety standards to ensure
                you have the best ride possible. I look forward to meeting you
                and making your journey memorable!`}
              </p>
            </div>
            <div className="flex flex-col gap-2 rounded-lg">
              <span className="text-sm ">Allowed</span>
              <div className="flex gap-4">
                {allowedIcons.map((icon, index) => (
                  <Image
                    key={index}
                    src={icon.img}
                    alt={`${icon.alt} allowed`}
                    title={`${icon.alt} allowed`}
                    className="w-6 object-contain"
                  />
                ))}
              </div>
              <span className="text-sm ">Not Allowed</span>
              <div className="flex gap-4">
                {notAllowedIcons.map((icon, index) => (
                  <div key={index} className="relative inline-block">
                    <Image
                      src={icon.img}
                      alt={`${icon.alt} not allowed`}
                      title={`${icon.alt} not allowed`}
                      className="w-6 object-contain"
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <p className="text-sm text-gray-700">
                  Driver Experience: {yearsOfExperience}{" "}
                  {yearsOfExperience === 1 ? "year" : "years"}
                </p>
                <p className="text-sm text-gray-700">Languages: {language}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-700">
                Vehicle Brand:{" "}
                <span className="font-semibold">{vehicleBrand}</span>
              </p>
            </div>
            <div className="flex justify-end">
              <a
                href={`mailto:${email}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MdOutlineMail
                  size={28}
                  className="text-gray-600 hover:text-blue-500"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Ride Details */}

        <div className="order-1 flex flex-col gap-4 bg-gray-50 lg:order-2">
          {/* Top Row: City Image */}
          <div className="flex h-56 w-full justify-center rounded-md bg-red-500"></div>
          {/* Bottom Row: Ride Summary & Book Button */}
          <div className="shadow-sm flex w-full flex-col gap-4 rounded-lg border p-6 md:flex-row md:items-center md:justify-between">
            <div className="flex w-full flex-col gap-3">
              <h2 className="text-lg font-semibold text-gray-500">{date}</h2>
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold uppercase">{from}</p>
                <span className="text-sm">→</span>
                <p className="text-sm font-semibold uppercase">{to}</p>
              </div>
              <p className="text-sm">Price: {price.toFixed(2)} € / person</p>
              <p className="text-xs">{description}</p>
            </div>
            <BookNowButton rideId={RideUniqueId} clientId={UserUniqueId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleRideCard;
