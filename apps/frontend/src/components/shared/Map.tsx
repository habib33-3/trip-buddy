import { memo } from "react";

import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import useGetPlacesByTrip from "@/hooks/place/useGetPlacesByTrip";

import ErrorComponent from "./ErrorComponent";
import Loader from "./Loader";

type MapProps = {
  center?: [number, number];
  zoom?: number;
};

const Map = memo(({ center, zoom = 3 }: MapProps) => {
  const { locations, status } = useGetPlacesByTrip();

  if (status === "pending") return <Loader />;

  if (status === "error" || !locations)
    return (
      <ErrorComponent message="Something went wrong while fetching locations" />
    );

  const hasLocations = locations.length > 0;

  const first = locations.find(
    (l) => Number.isFinite(l.lat) && Number.isFinite(l.lng)
  );

  const mapCenter = center ?? (first ? [first.lat, first.lng] : [0, 0]);

  return (
    <div className="h-full min-h-[400px] w-full flex-1 rounded-2xl border border-gray-200 bg-white shadow-sm">
      {!hasLocations ? (
        <div className="flex h-full items-center justify-center p-4">
          <p className="text-center text-lg text-gray-500">
            No locations available
          </p>
        </div>
      ) : (
        <MapContainer
          center={mapCenter}
          zoom={zoom}
          minZoom={2}
          maxZoom={18}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
          preferCanvas
          worldCopyJump
          zoomControl
          doubleClickZoom={false}
          markerZoomAnimation={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {locations
            .filter((l) => Number.isFinite(l.lat) && Number.isFinite(l.lng))
            .map((location) => (
              <Marker
                key={location.id}
                position={[location.lat, location.lng] as [number, number]}
              >
                <Popup>{location.formattedAddress}</Popup>
              </Marker>
            ))}
        </MapContainer>
      )}
    </div>
  );
});

Map.displayName = "Map";

export default Map;
