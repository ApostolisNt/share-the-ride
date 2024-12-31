import React from "react";

interface LoadingProps {
  height: number;
  items: number;
}

export default function Loading({ height, items }: LoadingProps) {
  return (
    <div
      role="status"
      className="mx-auto flex w-[45%] animate-pulse flex-col items-center"
    >
      {[...Array(items)].map((_, index) => (
        <div
          key={index}
          className={`mb-3.5 h-${height} w-[90%] rounded-lg bg-gray-200`}
        ></div>
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  );
}
