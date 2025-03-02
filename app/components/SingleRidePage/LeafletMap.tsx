import { DEFAULT_COORDS } from "app/consts/general";
import { useLeafletMap } from "app/hooks/useLeafletMap";
import React from "react";

type LeafletMapProps = {
  startLocationCoords?: number[];
  endLocationCoords?: number[];
};

const LeafletMap = ({
  startLocationCoords,
  endLocationCoords,
}: LeafletMapProps) => {
  const hasCoords = !!startLocationCoords && !!endLocationCoords;

  useLeafletMap({
    mapContainerId: "ride-map",
    hasCoords,
    startCoords: startLocationCoords ?? DEFAULT_COORDS.FROM,
    endCoords: endLocationCoords ?? DEFAULT_COORDS.TO,
  });

  return hasCoords ? (
    <div id="ride-map" className="h-56 w-full rounded-md"></div>
  ) : (
    <div className="grid h-56 w-full place-content-center rounded-md bg-gray-200">
      <p className="text-center text-gray-500">
        No map available for this ride
      </p>
    </div>
  );
};

export default LeafletMap;
