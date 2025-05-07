"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateRideSchema, rideFormSchema } from "app/types/types";
import { DEFAULT_COORDS, RIDE_STATUS } from "app/consts/general";
import CityAutocomplete from "./city-autocompleted";

type CreateRideFormProps = {
  onSubmitForm: (data: CreateRideSchema) => void;
};

const CreateRideForm = ({ onSubmitForm }: CreateRideFormProps) => {
  const today = new Date().toISOString().split("T")[0];
  const {
    control,
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateRideSchema>({
    resolver: zodResolver(rideFormSchema),
    defaultValues: {
      ownerUserId: "",
      from: "",
      to: "",
      startLocationCoords: DEFAULT_COORDS.FROM,
      endLocationCoords: DEFAULT_COORDS.TO,
      date: "",
      time: "",
      seats: 0,
      price: 0,
      description: "",
      status: RIDE_STATUS.ACTIVE,
    },
  });

  const [fromValue, toValue, dateValue, timeValue, seats, price, description] =
    watch(["from", "to", "date", "time", "seats", "price", "description"]);

  // Check if all required fields have valid values.
  const isFormFilled =
    fromValue &&
    toValue &&
    dateValue &&
    timeValue &&
    Number(seats) > 0 &&
    Number(price) > 0 &&
    description.trim().length > 0;

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
      {/* From / To with autocomplete */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            From
          </label>
          <Controller
            control={control}
            name="from"
            render={({ field: { onChange, value } }) => (
              <CityAutocomplete
                value={value}
                onChange={onChange}
                placeholder="Origin"
                required
              />
            )}
          />

          {errors.from && (
            <p className="mt-1 text-xs text-red-500">{errors.from.message}</p>
          )}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            To
          </label>
          <Controller
            control={control}
            name="to"
            render={({ field: { onChange, value } }) => (
              <CityAutocomplete
                value={value}
                onChange={onChange}
                placeholder="Destination"
                required
              />
            )}
          />

          {errors.to && (
            <p className="mt-1 text-xs text-red-500">{errors.to.message}</p>
          )}
        </div>
      </div>

      {/* Date / Time */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            {...register("date")}
            type="date"
            min={today}
            className="input w-full rounded border border-gray-300 px-3 py-2 focus:ring-blue-300"
          />
          {errors.date && (
            <p className="mt-1 text-xs text-red-500">{errors.date.message}</p>
          )}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Time
          </label>
          <input
            {...register("time")}
            type="time"
            className="input w-full rounded border border-gray-300 px-3 py-2 focus:ring-blue-300"
          />
          {errors.time && (
            <p className="mt-1 text-xs text-red-500">{errors.time.message}</p>
          )}
        </div>
      </div>

      {/* Seats / Price */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Seats
          </label>
          <input
            {...register("seats", { valueAsNumber: true })}
            type="number"
            placeholder="Seats"
            className="input w-full rounded border border-gray-300 px-3 py-2 focus:ring-blue-300"
          />
          {errors.seats && (
            <p className="mt-1 text-xs text-red-500">{errors.seats.message}</p>
          )}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            {...register("price", { valueAsNumber: true })}
            type="number"
            placeholder="Price"
            className="input w-full rounded border border-gray-300 px-3 py-2 focus:ring-blue-300"
          />
          {errors.price && (
            <p className="mt-1 text-xs text-red-500">{errors.price.message}</p>
          )}
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          {...register("description")}
          placeholder="Enter a description..."
          className="input w-full rounded border border-gray-300 px-3 py-2 focus:ring-blue-300"
          rows={4}
        />
        {errors.description && (
          <p className="mt-1 text-xs text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className={`mx-auto block w-fit rounded px-6 py-3 font-semibold transition-colors duration-300 ease-in-out ${
          isFormFilled
            ? "bg-blue-500 text-white"
            : "border-2 border-blue-300 bg-blue-200 text-blue-400"
        }`}
      >
        Share the Ride
      </button>
    </form>
  );
};

export default CreateRideForm;
