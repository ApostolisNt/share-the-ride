"use client";

import React from "react";
import clsx from "clsx";

const SingleRideCardSkeleton = () => {
  return (
    <div
      className={clsx(
        "shadow mx-auto my-8 rounded-lg p-6 transition-transform duration-200 ease-out",
        "w-full max-w-6xl bg-white animate-pulse"
      )}
    >
      <div className="grid grid-cols-1 gap-4 pb-8 md:grid-cols-2">
        {/* Left Column: Driver Profile Skeleton */}
        <div className="order-2 flex flex-col gap-4 rounded-lg border bg-gray-50 p-4 md:order-1">
          {/* Top Row: Profile Image Skeleton */}
          <div className="flex items-center justify-between rounded-lg p-4">
            <div className="h-20 w-20 rounded-full bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-12 bg-gray-300 rounded"></div>
            </div>
          </div>
          {/* Bottom Row: Driver Info Skeleton */}
          <div className="flex flex-col gap-4">
            <div>
              <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
              <div className="h-3 w-48 bg-gray-300 rounded"></div>
            </div>
            <div className="flex flex-col gap-2 rounded-lg">
              <div className="h-3 w-20 bg-gray-300 rounded"></div>
              <div className="flex gap-4">
                <div className="h-6 w-6 bg-gray-300 rounded"></div>
                <div className="h-6 w-6 bg-gray-300 rounded"></div>
                <div className="h-6 w-6 bg-gray-300 rounded"></div>
              </div>
              <div className="h-3 w-20 bg-gray-300 rounded"></div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="h-3 w-32 bg-gray-300 rounded"></div>
                <div className="h-3 w-24 bg-gray-300 rounded"></div>
              </div>
            </div>
            <div>
              <div className="h-3 w-40 bg-gray-300 rounded"></div>
            </div>
            <div className="flex justify-end">
              <div className="h-6 w-6 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
        {/* Right Column: Ride Details Skeleton */}
        <div className="order-1 flex flex-col gap-4 bg-gray-50 md:order-2">
          {/* Map Placeholder */}
          <div className="h-48 bg-gray-300 rounded"></div>
          {/* Ride Summary & Button Skeleton */}
          <div className="shadow-sm flex w-full flex-col gap-4 rounded-lg border p-6 md:flex-row md:items-center md:justify-between">
            <div className="flex h-full w-full flex-col gap-3">
              <div className="h-4 w-24 bg-gray-300 rounded"></div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-16 bg-gray-300 rounded"></div>
                <div className="h-3 w-4 bg-gray-300 rounded"></div>
                <div className="h-3 w-16 bg-gray-300 rounded"></div>
              </div>
              <div className="h-3 w-20 bg-gray-300 rounded"></div>
              <div className="flex w-full flex-row items-center gap-1">
                <div className="h-3 w-4 bg-gray-300 rounded"></div>
                <div className="h-3 w-12 bg-gray-300 rounded"></div>
              </div>
            </div>
            <div className="flex h-full w-full flex-col items-center justify-between gap-2">
              <div className="h-3 w-20 bg-gray-300 rounded"></div>
              <div className="h-8 w-32 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Rides Section Skeleton */}
      <div>
        <div className="h-6 w-40 bg-gray-300 rounded mb-4"></div>
        <div className="grid auto-rows-fr grid-cols-1 justify-items-center gap-2 lg:grid-cols-2">
          {[...Array(2)].map((_, idx) => (
            <div
              key={idx}
              className="shadow-lg w-full rounded-lg border border-gray-200 bg-white p-6"
            >
              <div className="mb-4 flex flex-wrap-reverse items-center justify-between gap-2">
                <div className="h-4 w-32 bg-gray-300 rounded"></div>
                <div className="h-4 w-16 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleRideCardSkeleton;
