import SingleRideCard from "./SingleRideCard";
import dummyData from "@components/Rides/dummyRides.json";

type SingleRidePageProps = {
  id: string;
};

const SingleRidePage = ({ id }: SingleRidePageProps) => {
  const userData = dummyData;
  const singleUserData = userData
    .map((ride) => ride)
    .filter((item) => item.id === id);

  return (
    <section className="single_ride_section">
      <SingleRideCard singleUserData={singleUserData} />
    </section>
  );
};

export default SingleRidePage;
