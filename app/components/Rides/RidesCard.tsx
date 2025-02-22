"use client";

// Assets
import profileDefault from "@assets/profile-default.png";

// Utils
import { formatDate } from "app/helpers/FormatDate";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { TravelTypes } from "app/helpers/TravelTypes";

// Components
import LoaderLine from "@components/LoaderLine/LoaderLine";
import { Image } from "@components/Global/Image";
import { RatingStar } from "@assets/RatingStar"; // adjust the path as needed

// Types
import { Doc } from "convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";

// import UsersDummy from "app/dummyUsers.json";

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

  // Dummy lookup
  // const user = UsersDummy.find((user) => user._id === ride.rideOwnerId);

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
    <div
      onClick={handleSubmit}
      className={`
        transition-transform hover:shadow-lg relative mx-auto my-8 cursor-pointer rounded-2xl bg-white 
        px-8 py-4 shadow-card duration-200 ease-out hover:-translate-y-2 hover:shadow-cardHover
        ${rideExpired ? "pointer-events-none" : ""}
        w-[98%] md:w-4/5 lg:w-full
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
        <div className="flex items-center gap-4">
          <Image src={profileDefault} alt="profile" />
          <h3 className="text-[1.3rem] font-medium">{name}</h3>
          <div className="flex items-center gap-[0.3rem]">
            <p className="text-base font-medium">{rating}</p>
            {/* Render a single star with fill based on the rating */}
            <RatingStar rating={rating} starId={ride.rideOwnerId} />
          </div>
          <p className="flex-1 text-right text-base font-medium">
            {price.toFixed(2)} €
          </p>
        </div>

        {/* Details Section */}
        <div className="flex flex-col justify-center gap-2 py-4">
          <div className="flex flex-row gap-4">
            <p className="text-[1.1rem] font-medium">{formatDate(date)}</p>
            <p className="text-[1.1rem] font-medium">
              {time} {timeType}
            </p>
          </div>
          <div className="flex flex-row items-center gap-4">
            <p className="text-[1.1rem] font-medium capitalize">{from}</p>
            <LoaderLine />
            <p className="text-[1.1rem] font-medium capitalize">{to}</p>
          </div>
        </div>

        {/* Extra Details Section */}
        <div className="flex items-center justify-around">
          <p className="text-base font-medium">{vehicleBrand}</p>
          <div className="flex flex-row items-center gap-[0.8rem]">
            {/* Allowed Icons */}
            {allowedIcons.map((icon, index) => (
              <Image
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
                  src={icon.img}
                  alt={`${icon.alt} not allowed`}
                  title={`${icon.alt} not allowed`}
                  className="opacity-50"
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
