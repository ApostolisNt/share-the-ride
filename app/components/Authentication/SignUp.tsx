"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpFormInputs, signUpSchema } from "data/schemas/authentication";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { SupportedLangCodes } from "data/translations/translations";

export default function SignUp() {
  const router = useRouter();
  const locale = useLocale() as SupportedLangCodes;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInputs>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();

      if (responseData.message && !response.ok) {
        setSubmitError(responseData.message);
        return;
      }

      const userId = responseData.user._id;
      setIsSubmitted(true);
      setTimeout(() => {
        router.push(`/${locale}/dashboard/${userId}`);
      }, 1000);
    } catch (error: any) {
      setSubmitError(error.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="shadow-md w-full max-w-md rounded-lg bg-white p-8">
        <h2 className="mb-6 text-center text-2xl font-bold">Sign Up</h2>

        {isSubmitted ? (
          <p className="text-center text-green-600">Registration successful!</p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                autoComplete="name"
                type="text"
                id="name"
                {...register("name")}
                className={`shadow-sm mt-1 w-full rounded-md border p-2 focus:border-indigo-500 focus:ring-indigo-500 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

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

            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                autoComplete="new-phone"
                type="tel"
                id="phone"
                {...register("phone")}
                className={`shadow-sm mt-1 w-full rounded-md border p-2 focus:border-indigo-500 focus:ring-indigo-500 ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                autoComplete="new-password"
                type="password"
                id="password"
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

            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                autoComplete="new-password"
                type="password"
                id="confirmPassword"
                {...register("confirmPassword")}
                className={`shadow-sm mt-1 w-full rounded-md border p-2 focus:border-indigo-500 focus:ring-indigo-500 ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {submitError && (
              <p className="mb-4 text-center text-sm text-red-500">
                {submitError}
              </p>
            )}

            <button
              type="submit"
              className={`shadow-sm w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                isSubmitting ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing up..." : "Sign Up"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
