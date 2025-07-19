import { memo } from "react";

import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import type { Itinerary } from "@/types/index";

type Props = {
  locations: Itinerary[];
};

const Map = memo(({ locations }: Props) => {
  if (locations.length === 0) {
    return (
      <div className="h-full min-h-[400px] w-full flex-1 border border-red-200">
        <p className="text-center text-gray-500">No locations available</p>
      </div>
    );
  }

  const center =
    locations.length > 0
      ? [locations[0].latitude, locations[0].longitude]
      : [0, 0];

  return (
    <div className="h-full min-h-[400px] w-full flex-1 border border-red-200">
      <MapContainer
        center={center as [number, number]}
        zoom={6}
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
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={
              [location.latitude, location.longitude] as [number, number]
            }
          >
            <Popup>{location.formattedAddress}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
});
Map.displayName = "Map";

export default Map;
