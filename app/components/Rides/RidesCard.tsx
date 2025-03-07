"use client";

// Utils
import { formatDate } from "app/helpers/FormatDate";
import { useParams, useRouter } from "next/navigation";

// Components
import LoaderLine from "@components/LoaderLine/LoaderLine";
import { Image } from "@components/Global/Image";
import { RatingStar } from "@assets/RatingStar";

// Types
import { Doc } from "convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { getTravelIcons } from "app/helpers/TravelTypes";
import { CalendarRange } from "lucide-react";
import { seatsBookedStyle } from "app/consts/general";
import profileDefault from "@assets/profile-default.png";
import { RideExpired } from "app/helpers/RideExpired";

const RidesCard = ({ ride }: { ride: Doc<"rides"> }) => {
  const router = useRouter();
  const { locale } = useParams();
  const { from, to, date, time, price, seatsBooked, seats } = ride;
  const userData = useQuery(api.users.getUserById, {
    userId: ride.ownerUserId,
  });

  const {
    allowed = [],
    notAllowed = [],
    rating = 0,
    driverInfo: { vehicleBrand } = {},
    name = "",
    profileImage,
    isPetFriendly,
  } = userData ?? {};

  const timeSlice = time.slice(0, 2);
  const timeType =
    parseInt(timeSlice, 10) >= 0 && parseInt(timeSlice, 10) < 12 ? "AM" : "PM";

  const { allowedIcons, notAllowedIcons } = getTravelIcons({
    allowed,
    notAllowed,
  });

  const handleSubmit = () => {
    router.push(`/${locale}/rides/${ride.rideId}`);
  };

  const rideExpired = RideExpired(date);
  const seatsBookedClass = seatsBookedStyle(seatsBooked, seats);

  return (
    <div
      onClick={handleSubmit}
      className={`
        hover:shadow-lg relative mx-auto w-[95%] cursor-pointer rounded-2xl bg-white px-4 
        py-4 shadow-card transition-transform duration-200 ease-out hover:-translate-y-2 hover:shadow-cardHover
        ${rideExpired ? "pointer-events-none" : ""}
        w-full
      `}
    >
      <div className={`${rideExpired ? "opacity-70" : ""}`}>
        {/* User Section */}
        <div className="shadow flex items-center gap-4 rounded-lg bg-white">
          <div className="flex-shrink-0">
            <Image
              src={profileImage ?? profileDefault}
              width={80}
              height={80}
              alt="Profile"
              className="h-20 w-20 rounded-full object-cover"
            />
          </div>
          <div className="w-full">
            {/* Labels */}
            <div className="flex flex-col gap-2 sm:flex-row">
              {isPetFriendly && (
                <span className="inline-block w-fit rounded-md border border-purple-500 bg-purple-200 px-2 text-xs text-purple-500 sm:text-sm">
                  Pet Friendly
                </span>
              )}
              {rideExpired && (
                <span className="inline-block w-fit rounded-md border border-red-500 bg-red-200 px-2 text-xs text-red-500 sm:text-sm">
                  Ride Has Expired
                </span>
              )}
            </div>

            <div className="mt-1 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <h3 className="text-lg font-medium">{name}</h3>
              <div className="flex items-center gap-1">
                <p className="text-base font-medium">{rating}</p>
                <RatingStar rating={rating} starId={ride.ownerUserId} />
                <p className="ml-3 whitespace-nowrap text-base font-medium">
                  {price.toFixed(2)} €
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="flex flex-col justify-between gap-2 py-4">
          <div className="flex w-full flex-row gap-4">
            <div className="flex w-full flex-row items-center gap-4">
              <p className="text-sm font-medium lg:text-lg">
                {formatDate(date)}
              </p>
              <p className="text-sm font-medium lg:text-lg">
                {time} {timeType}
              </p>
            </div>
            <div className="flex w-full flex-row items-center justify-end gap-1">
              <CalendarRange className="w-4 sm:w-5" color="black" />
              <p
                className={`text-base font-semibold sm:text-lg ${seatsBookedClass}`}
              >
                {seatsBooked}/{seats}
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center gap-4">
            <p className="text-base font-medium capitalize lg:text-lg">
              {from}
            </p>
            <LoaderLine />
            <p className="text-base font-medium capitalize lg:text-lg">{to}</p>
          </div>
        </div>

        {/* Extra Details Section */}
        <div className="flex items-center justify-around">
          <p className="text-sm font-medium md:text-base">{vehicleBrand}</p>
          <div className="flex flex-row items-center gap-2">
            {/* Allowed Icons */}
            {allowedIcons.map((icon, index) => (
              <Image
                className="w-5 object-contain md:w-6"
                key={index}
                src={icon.img}
                alt={`${icon.alt} allowed`}
                title={`${icon.alt} allowed`}
              />
            ))}
            {/* Not Allowed Icons */}
            {notAllowedIcons.map((icon, index) => (
              <div
                key={index}
                className="relative inline-block after:absolute after:left-0 after:top-1/2 after:h-[2px] after:w-full after:-translate-y-1/2 after:rotate-45 after:bg-black after:opacity-50 after:content-['']"
              >
                <Image
                  className="w-5 object-contain opacity-50 md:w-6"
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
  );
};

export default RidesCard;
