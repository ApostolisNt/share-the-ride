"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormInputs, loginSchema } from "data/schemas/authentication";
import { useState } from "react";
import { SupportedLangCodes } from "data/translations/translations";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const locale = useLocale() as SupportedLangCodes;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await res.json();

      if (response.message && !res.ok) {
        setSubmitError(response.message);
        return;
      }

      const userId = response.user.id;
      router.push(`/${locale}/dashboard/${userId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full">
      <div className="shadow-md w-full max-w-md rounded-lg bg-white p-8">
        <h2 className="mb-6 text-center text-2xl font-bold">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              autoComplete="email"
              type="email"
              id="email"
              {...register("email")}
              className={`shadow-sm mt-1 w-full rounded-md border p-2 focus:border-indigo-500 focus:ring-indigo-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password")}
              className={`shadow-sm mt-1 w-full rounded-md border p-2 focus:border-indigo-500 focus:ring-indigo-500 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
          {submitError && (
            <p className="text-center text-red-500">{submitError}</p>
          )}
          <button
            type="submit"
            className="shadow-sm w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
