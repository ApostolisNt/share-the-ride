"use client";

import { LatLngTuple } from "leaflet";
import { useEffect } from "react";

type LeafletMapProps = {
  mapContainerId: string;
  hasCoords: boolean;
  startCoords: number[];
  endCoords: number[];
};

export const useLeafletMap = ({
  mapContainerId,
  hasCoords,
  startCoords,
  endCoords,
}: LeafletMapProps) => {
  useEffect(() => {
    if (!hasCoords) return;

    if (typeof window === "undefined") return;

    const leafletCssId = "leaflet-css";
    if (!document.getElementById(leafletCssId)) {
      const link = document.createElement("link");
      link.id = leafletCssId;
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.7.1/dist/leaflet.css";
      document.head.appendChild(link);
    }

    (async () => {
      const L = (await import("leaflet")).default;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
      });

      const mapContainerElem = document.getElementById(mapContainerId);
      if (!mapContainerElem) return;

      const map = L.map(mapContainerId, {
        zoomControl: true,
        attributionControl: false,
      }).setView(startCoords as LatLngTuple, 10);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 21,
        attribution: "© OpenStreetMap",
      }).addTo(map);

      const marker1 = L.marker(startCoords as LatLngTuple).addTo(map);
      const marker2 = L.marker(endCoords as LatLngTuple).addTo(map);

      const group = L.featureGroup([marker1, marker2]);
      map.fitBounds(group.getBounds(), { padding: [30, 30] });

      return () => {
        map.remove();
      };
    })();
  }, [mapContainerId, startCoords, endCoords, hasCoords]);
};
