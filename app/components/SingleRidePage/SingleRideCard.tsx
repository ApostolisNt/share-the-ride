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
import { CalendarRange } from "lucide-react";
import { availableSeatsStyle, RIDE_STATUS } from "app/consts/general";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import LeafletMap from "./LeafletMap";

type SingleRideCardProps = {
  singleData: { ride: Ride; user: User };
};

const SingleRideCard = ({ singleData }: SingleRideCardProps) => {
  const {
    ride: {
      rideId: RideUniqueId,
      date,
      from,
      to,
      description,
      price,
      availableSeats,
      seats,
      ownerUserId,
      startLocationCoords,
      endLocationCoords,
    },
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
    aboutMe,
    profileImage,
  } = singleData.user;
  const completedRides = useQuery(api.rides.getLatestCompletedRides, {
    userId: ownerUserId,
  });
  const { yearsOfExperience, language } = driverInfo ?? {};
  const { allowedIcons, notAllowedIcons } = getTravelIcons({
    allowed,
    notAllowed,
  });
  const availableSeatsClass = availableSeatsStyle(availableSeats, seats);

  return (
    <div
      className={clsx(
        "shadow hover:shadow-lg mx-auto my-8 rounded-lg p-6 transition-transform duration-200 ease-out",
        "w-full max-w-6xl bg-white",
      )}
    >
      <div className="grid grid-cols-1 gap-4 pb-8 md:grid-cols-2">
        {/* Left Column: User Profile & Hot Ride Info */}
        <div className="order-2 flex flex-col gap-4 rounded-lg border bg-gray-50 p-4 md:order-1">
          {/* Top Row: Driver Profile */}
          <div className="flex items-center justify-between rounded-lg p-4">
            <Image
              src={profileImage ?? profileDefault}
              width={80}
              height={80}
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
              <p className="text-bold text-sm">{aboutMe}</p>
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

        <div className="order-1 flex flex-col gap-4 bg-gray-50 md:order-2">
          {/* Top Row: City Image */}
          <LeafletMap
            startLocationCoords={startLocationCoords}
            endLocationCoords={endLocationCoords}
          />

          {/* Bottom Row: Ride Summary & Book Button */}
          <div className="shadow-sm flex w-full flex-col gap-4 rounded-lg border p-6 md:flex-row md:items-center md:justify-between">
            <div className="flex h-full w-full flex-col gap-3">
              <h2 className="text-lg font-semibold text-gray-500">{date}</h2>
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold uppercase">{from}</p>
                <span className="text-sm">→</span>
                <p className="text-sm font-semibold uppercase">{to}</p>
              </div>
              <p className="text-sm">Price: {price.toFixed(2)} € / person</p>
              <div className="flex w-full flex-row items-center gap-1">
                <CalendarRange className="w-4" color="black" />
                <p className={`text-base font-semibold ${availableSeatsClass}`}>
                  {availableSeats}/{seats}
                </p>
              </div>
            </div>
            <div className="flex h-full w-full flex-col items-center justify-between gap-2">
              <p className="text-center text-xs">{description}</p>
              <BookNowButton rideId={RideUniqueId} clientId={UserUniqueId} />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="pb-4 text-lg font-bold text-gray-600">
          Latest Rides from {name}
        </h2>
        <div className="grid auto-rows-fr grid-cols-1 justify-items-center gap-2 lg:grid-cols-2">
          {completedRides?.map((item: Ride) => (
            <div
              className="shadow-lg w-full rounded-lg border border-gray-200 bg-white p-6"
              key={item.rideId}
            >
              <div className="mb-4 flex flex-wrap-reverse items-center justify-between gap-2">
                <h3 className="text-base font-bold text-gray-700 md:text-lg">
                  <span className="uppercase">{item.from}</span> -{" "}
                  <span className="uppercase">{item.to}</span>
                  <div>
                    <span className="text-sm uppercase text-gray-600">
                      {item.date}
                    </span>
                  </div>
                </h3>
                <div className="flex flex-row gap-2 sm:flex-col">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${
                      item.status === RIDE_STATUS.COMPLETED
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleRideCard;
