"use client";

import "./CreateRide.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const rideFormSchema = z.object({
  from: z.string().nonempty(),
  to: z.string().nonempty(),
  date: z.string().nonempty(),
  time: z.string().nonempty(),
  availableSeats: z.number().optional(),
  ridePrice: z.number().optional(),
  description: z.string().nonempty(),
});

const CreateRide = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(rideFormSchema),
    defaultValues: {
      from: "",
      to: "",
      date: "",
      time: "",
      availableSeats: 0,
      ridePrice: 0,
      description: "",
    },
  });

  // Generate today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  const onSubmit = async (data: any) => {
    try {
      const res = await fetch("http://localhost:3000/api/rides", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    }

    //navigate
    router.push("/rides");
  };

  return (
    <div className="mx-auto my-8 flex w-full flex-col items-center">
      <h3 className="text-base font-semibold uppercase">Create a ride</h3>
      <form
        className="my-8 flex w-[45%] flex-col gap-4 lg:w-2/3 sm:w-[95%]"
        onSubmit={handleSubmit(onSubmit)}
      >
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
            <input
              {...register("date")}
              type="date"
              min={today}
              className="input w-full"
            />
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
            <label htmlFor="availableSeats">Seats</label>
            <input
              {...register("availableSeats", { valueAsNumber: true })}
              type="number"
              placeholder="availableSeats"
              className="input w-full"
            />
            {errors.availableSeats && <p>{errors.availableSeats.message}</p>}
          </div>
          <div>
            <label htmlFor="ridePrice">Price</label>
            <input
              {...register("ridePrice", { valueAsNumber: true })}
              type="number"
              placeholder="Price"
              className="input w-full"
            />
            {errors.ridePrice && <p>{errors.ridePrice.message}</p>}
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="description">Description</label>
          <textarea
            {...register("description")}
            placeholder="Description"
            className="input"
          />
        </div>
        {errors.description && <p>{errors.description.message}</p>}

        <button
          type="submit"
          className="btn transition-colors mx-auto w-1/4 rounded-sm border-2 border-slate-400 px-4 py-2 text-slate-600 duration-300 ease-in-out hover:bg-slate-400 hover:text-white"
        >
          Share the ride
        </button>
      </form>
    </div>
  );
};

export default CreateRide;
