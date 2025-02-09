// RatingStar.tsx
import React from "react";

type RatingStarProps = {
  rating: number;
  starId?: string;
};

export const RatingStar = ({ rating, starId = "default" }: RatingStarProps) => {
  const fillPercentage = `${(rating / 5) * 100}%`;

  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id={`starGradient-${starId}`}
          x1="0"
          y1="0"
          x2="1"
          y2="0"
        >
          <stop offset={fillPercentage} stopColor="#FBBF24" />
          <stop offset={fillPercentage} stopColor="#D1D5DB" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#starGradient-${starId})`}
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 
           9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
      />
    </svg>
  );
};
