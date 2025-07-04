import { Image } from "@components/Global/Image";
import { RIDE_STATUS } from "app/consts/general";
import { RideWithBookingsAndPoints } from "app/types/types";
import profileDefault from "@assets/profile-default.png";

type RidesCompletedProps = {
  completedRides: RideWithBookingsAndPoints[] | undefined;
};

const RidesCompleted = ({ completedRides }: RidesCompletedProps) => {
  if (completedRides === undefined) {
    return <p>Loading completed rides...</p>;
  }

  if (completedRides.length === 0) {
    return (
      <p className="text-center text-gray-600">No completed rides found.</p>
    );
  }

  return (
    <div className="grid auto-rows-fr grid-cols-1 justify-items-center gap-2 lg:grid-cols-2">
      {completedRides.map((item: RideWithBookingsAndPoints) => (
        <RideWithBookings key={item.ride.rideId} data={item} />
      ))}
    </div>
  );
};

export default RidesCompleted;

type RideProps = {
  data: RideWithBookingsAndPoints;
};

const RideWithBookings = ({ data }: RideProps) => {
  const { ride, pointsEarned, bookings } = data;

  if (!data) {
    return <p>Loading completed rides...</p>;
  }

  return (
    <div
      className="shadow-lg w-full rounded-lg border border-gray-200 bg-white p-6"
      key={ride.rideId}
    >
      <div className="mb-4 flex flex-wrap-reverse items-center justify-between gap-2">
        <h3 className="text-base font-bold text-gray-700 md:text-lg">
          <span className="uppercase">{ride.from}</span> -{" "}
          <span className="uppercase">{ride.to}</span>
          <div>
            <span className="text-sm uppercase text-gray-600">{ride.date}</span>
          </div>
        </h3>
        <div className="flex flex-row gap-2 sm:flex-col">
          <span
            className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${
              ride.status === RIDE_STATUS.COMPLETED
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {ride.status}
          </span>
          {pointsEarned.points > 0 && (
            <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-600">
              {`+${pointsEarned.points} Points`}
            </span>
          )}
        </div>
      </div>
      <h4 className="mb-2 text-base font-medium text-gray-700">
        Travel Buddies
      </h4>
      {bookings?.length > 0 ? (
        <ul className="pl-2 text-sm font-medium text-gray-600">
          {bookings?.map((booking, index) => (
            <div
              className="my-2 flex flex-row items-center gap-2 text-left"
              key={index}
            >
              <Image
                src={booking.profileImage ?? profileDefault}
                width={40}
                height={40}
                alt="Driver profile"
                className="h-8 w-8 rounded-full object-cover"
              />
              <div>
                <p>Client Name: {booking.userName}</p>
                <p>Email: {booking.userEmail}</p>
              </div>
            </div>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No bookings for this ride.</p>
      )}
    </div>
  );
};
