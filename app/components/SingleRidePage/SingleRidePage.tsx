import SingleRideCard from "./SingleRideCard";
import dummyRides from "../../dummyRides.json";
import dummyUser from "../../dummyUser.json";

type SingleRidePageProps = {
  id: string;
};

const SingleRidePage = ({ id }: SingleRidePageProps) => {
  const ridesData = dummyRides;
  const userData = dummyUser;
  const single = ridesData.map((ride) => {
    const user = userData.filter((user) => user.id === ride.id);
    return { ...ride, ...user[0] };
  });

  const singleData = single
    .map((ride) => ride)
    .filter((item) => item.id === id);

  return (
    <section className="single_ride_section">
      <SingleRideCard singleData={singleData} />
    </section>
  );
};

export default SingleRidePage;
