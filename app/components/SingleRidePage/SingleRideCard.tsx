import LoaderLine from "@components/LoaderLine/LoaderLine";
import "./SingleRideCard.scss";
import profileDefault from "@assets/profile-default.png";
import Image from "next/image";
import { MdLocalPhone, MdOutlineMail } from "react-icons/md";
import Link from "next/link";
import clsx from "clsx";

const SingleRideCard = ({ singleUserData }: any) => {
  const {
    id,
    from,
    to,
    date,
    name,
    time,
    seats,
    ridePrice,
    luggage,
    description,
    contact,
    driverInfo,
  } = singleUserData[0];

  const { yearsOfExperience, language } = driverInfo;
  return (
    <div
      className={clsx(
        "single-ride-container mx-auto my-8 flex w-2/5 flex-col items-center rounded-lg p-4 lg:w-2/3 md:w-full",
        "shadow-card transition-shadow-transform hover:shadow-cardHover duration-200 ease-out hover:-translate-y-2",
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
        <p className="single-ride-price">
          Per person: {ridePrice.toFixed(2)} €
        </p>
      </div>
      <div className="single-ride-driver-info flex gap-8">
        <p>Driver Experience: {yearsOfExperience} years</p>
        <p>Languages: {language}</p>
      </div>
      <div className="single-ride-driver-profile flex w-full items-center justify-between ">
        <Image src={profileDefault} alt="profile" />
        <h3 className="ml-4 text-base font-medium">{name}</h3>
        <div className="single-ride-contact flex flex-1 justify-end gap-4">
          <a href={`tel:${contact.phone}`} target="_blank">
            <MdLocalPhone size={26} />
          </a>
          <a href={`mailto:${contact.email}`} target="_blank">
            <MdOutlineMail size={26} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default SingleRideCard;
