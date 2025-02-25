"use client";

// Assets
import profileDefault from "@assets/profile-default.png";

// Utils
import { formatDate } from "app/helpers/FormatDate";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

// Components
import LoaderLine from "@components/LoaderLine/LoaderLine";
import { Image } from "@components/Global/Image";
import { RatingStar } from "@assets/RatingStar"; // adjust the path as needed

// Types
import { Doc } from "convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { getTravelIcons } from "app/helpers/TravelTypes";
import { CalendarRange } from "lucide-react";
import { availableSeatsStyle } from "app/consts/general";

const RidesCard = ({ ride }: { ride: Doc<"rides"> }) => {
  const router = useRouter();
  const locale = useLocale();
  const { from, to, date, time, price, availableSeats, seats } = ride;
  const user = useQuery(api.users.getUserById, { userId: ride.ownerUserId });

  const {
    allowed = [],
    notAllowed = [],
    rating = 0,
    vehicleBrand = "",
    name = "",
  } = user ?? {};

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

  const currentDate = new Date().toISOString().slice(0, 10);
  const rideExpired = date < currentDate;

  const availableSeatsClass = availableSeatsStyle(availableSeats, seats);

  return (
    <div
      onClick={handleSubmit}
      className={`
        hover:shadow-lg relative mx-auto my-4 w-[95%] cursor-pointer rounded-2xl bg-white px-4 
        py-4 shadow-card transition-transform duration-200 ease-out hover:-translate-y-2 hover:shadow-cardHover md:my-8
        ${rideExpired ? "pointer-events-none" : ""}
        w-full
      `}
    >
      {rideExpired && (
        <div
          className="
            absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform rounded-md 
            border-2 border-solid border-red-600 bg-white p-2 font-semibold uppercase text-red-600
          "
        >
          This ride has expired
        </div>
      )}
      <div className={`${rideExpired ? "opacity-50" : ""}`}>
        {/* User Section */}
        <div className="flex flex-wrap items-center gap-4">
          <Image src={profileDefault} alt="profile" />
          <h3 className="text-lg font-medium md:text-xl">{name}</h3>
          <div className="flex items-center gap-[0.3rem]">
            <p className="text-base font-medium">{rating}</p>
            {/* Render a single star with fill based on the rating */}
            <RatingStar rating={rating} starId={ride.ownerUserId} />
          </div>
          <p className="flex-1 text-right text-base font-medium">
            {price.toFixed(2)} €
          </p>
        </div>

        {/* Details Section */}
        <div className="flex flex-col justify-between gap-2 py-4">
          <div className="flex w-full flex-row gap-4">
            <div className="flex w-full flex-row items-center gap-4">
              <p className="text-base font-medium md:text-lg">
                {formatDate(date)}
              </p>
              <p className="text-base font-medium md:text-lg">
                {time} {timeType}
              </p>
            </div>
            <div className="flex w-full flex-row items-center justify-end gap-1">
              <CalendarRange className="w-5" color="black" />
              <p className={`text-lg font-semibold ${availableSeatsClass}`}>
                {availableSeats}/{seats}
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center gap-4">
            <p className="text-base font-medium capitalize md:text-lg">
              {from}
            </p>
            <LoaderLine />
            <p className="text-base font-medium capitalize md:text-lg">{to}</p>
          </div>
        </div>

        {/* Extra Details Section */}
        <div className="flex items-center justify-around">
          <p className="text-base font-medium">{vehicleBrand}</p>
          <div className="flex flex-row items-center gap-2">
            {/* Allowed Icons */}
            {allowedIcons.map((icon, index) => (
              <Image
                className="w-6 object-contain"
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
                  className="w-6 object-contain opacity-50"
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
