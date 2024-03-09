import LoaderLine from "@components/LoaderLine/LoaderLine";
import "./SingleRideCard.scss";
import profileDefault from "@assets/profile-default.png";
import Image from "next/image";


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
    driverInfo,
  } = singleUserData[0];

  const { yearsOfExperience, language } = driverInfo;
  return (
    <div className="single-ride-container mx-auto my-8 flex w-2/5 flex-col items-center lg:w-2/3 md:w-full">
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
      <div className="single-ride-driver-profile flex w-full items-center justify-evenly ">
        <Image src={profileDefault} alt="profile" />
        <h3>{name}</h3>
        <div className="single-ride-contact">
          
        </div>
      </div>
    </div>
  );
};

export default SingleRideCard;
