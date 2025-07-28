import Map from "@/shared/Map";

const MapTab = () => {
  return (
    <div className="h-[500px] w-full rounded-lg shadow-inner">
      <Map zoom={6} />
    </div>
  );
};

export default MapTab;
