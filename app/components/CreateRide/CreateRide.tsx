"use client";

import "./CreateRide.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const rideFormSchema = z.object({
  username: z.string().nonempty(),
  from: z.string().nonempty(),
  to: z.string().nonempty(),
  date: z.string().nonempty(),
  time: z.string().nonempty(),
  seats: z.number().optional(),
  price: z.number().optional(),
  description: z.string().nonempty(),
});

const CreateRide = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(rideFormSchema),
    defaultValues: {
      username: "",
      from: "",
      to: "",
      date: "",
      time: "",
      seats: 0,
      price: 0,
      description: "",
    },
  });

  const onSubmit = (data: z.infer<typeof rideFormSchema>) => {
    console.log(data);
  };

  return (
    <div className="mx-auto my-8 flex w-full flex-col items-center">
      <h3>Create a ride</h3>
      <form
        className="my-8 flex w-[45%] flex-col gap-4 lg:w-2/3 sm:w-[95%]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col">
          <label htmlFor="username">Username</label>
          <input
            {...register("username")}
            placeholder="Username"
            className="input"
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>

        <div className="field-split">
          <div>
            <label htmlFor="from">From</label>
            <input
              {...register("from")}
              placeholder="From"
              className="input w-full"
            />
            {errors.from && <p>{errors.from.message}</p>}
          </div>
          <div>
            <label htmlFor="to">To</label>
            <input
              {...register("to")}
              placeholder="To"
              className="input w-full"
            />
            {errors.to && <p>{errors.to.message}</p>}
          </div>
        </div>

        <div className="field-split">
          <div>
            <label htmlFor="date">Date</label>
            <input {...register("date")} type="date" className="input w-full" />
            {errors.date && <p>{errors.date.message}</p>}
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input {...register("time")} type="time" className="input w-full" />
            {errors.time && <p>{errors.time.message}</p>}
          </div>
        </div>

        <div className="field-split">
          <div>
            <label htmlFor="seats">Seats</label>
            <input
              {...register("seats")}
              type="number"
              placeholder="Seats"
              className="input w-full"
            />
            {errors.seats && <p>{errors.seats.message}</p>}
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <input
              {...register("price")}
              type="number"
              placeholder="Price"
              className="input w-full"
            />
            {errors.price && <p>{errors.price.message}</p>}
          </div>
        </div>

        <label htmlFor="description">Description</label>
        <textarea
          {...register("description")}
          placeholder="Description"
          className="input"
        />
        {errors.description && <p>{errors.description.message}</p>}

        <button
          type="submit"
          className="btn transition-colors mx-auto w-1/3 rounded-sm border-2 border-slate-400 px-4 py-2 text-slate-600 duration-300 ease-in-out hover:bg-slate-400 hover:text-white"
        >
          Share the ride
        </button>
      </form>
    </div>
  );
};

export default CreateRide;
