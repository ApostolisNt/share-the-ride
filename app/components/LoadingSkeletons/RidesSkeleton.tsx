import React from "react";

interface RideCardSkeletonProps {
  count?: number;
}

const RideCardSkeleton = ({ count = 4 }: RideCardSkeletonProps) => {
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className="relative mx-auto h-56 w-full rounded-2xl bg-white px-4 py-4 shadow-card animate-pulse"
        >
          {/* Image Placeholder */}
          <div className="flex items-center gap-4">
            <div className="h-16 w-20 rounded-full bg-gray-300" />
            <div className="flex flex-col gap-2 w-full">
              <div className="h-4 w-1/2 bg-gray-300 rounded" />
              <div className="h-4 w-1/3 bg-gray-300 rounded" />
            </div>
          </div>
          {/* Details Placeholder */}
          <div className="mt-4 space-y-2">
            <div className="h-4 w-3/4 bg-gray-300 rounded" />
            <div className="h-4 w-1/2 bg-gray-300 rounded" />
            <div className="h-4 w-3/4 bg-gray-300 rounded" />
            <div className="h-4 w-3/5 bg-gray-300 rounded" />
          </div>
        </div>
      ))}
      <span className="sr-only">Loading...</span>
      </>
  );
};

export default RideCardSkeleton;
