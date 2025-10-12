import { memo } from "react";

import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import useGetPlacesByTrip from "@/hooks/place/useGetPlacesByTrip";

import ErrorComponent from "./ErrorComponent";
import LoadingComponent from "./LoadingComponent";

type MapProps = {
  center?: [number, number];
  zoom?: number;
};

const Map = memo(({ center, zoom = 3 }: MapProps) => {
  const { locations, status } = useGetPlacesByTrip();

  if (status === "pending") {
    return (
      <div className="flex h-full items-center justify-center gap-2 text-gray-500">
        <LoadingComponent />
        <span className="text-sm">Loading map...</span>
      </div>
    );
  }

  if (status === "error" || !locations) {
    return (
      <ErrorComponent message="Something went wrong while fetching locations." />
    );
  }

  if (locations.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 bg-gray-700 p-6">
        <p className="text-lg font-medium text-gray-200">
          No locations available
        </p>
        <p className="text-sm text-gray-300">
          Try adding some places to view them here.
        </p>
      </div>
    );
  }

  const validLocations = locations.filter(
    (l) => Number.isFinite(l.lat) && Number.isFinite(l.lng)
  );

  const hasLocations = validLocations.length > 0;
  const first = validLocations[0];
  const mapCenter = center ?? [first.lat, first.lng];

  return (
    <div className="h-full min-h-[400px] w-full flex-1 overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-lg">
      {!hasLocations && locations.length > 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-2 bg-gray-700 p-6">
          <p className="text-lg font-medium text-gray-200">
            No locations available
          </p>
          <p className="text-sm text-gray-300">
            Try adding some places to view them here.
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
          {validLocations.map((location) => (
            <Marker
              key={location.id}
              position={[location.lat, location.lng] as [number, number]}
              title={location.formattedAddress}
            >
              <Popup>
                <span className="text-sm font-medium">
                  {location.formattedAddress}
                </span>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
});

Map.displayName = "Map";

export default Map;
