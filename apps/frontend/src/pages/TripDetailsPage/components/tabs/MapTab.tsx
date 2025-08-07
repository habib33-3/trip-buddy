import { Suspense, lazy } from "react";

import { Loader } from "lucide-react";

const Map = lazy(async () => import("@/shared/Map"));

const MapTab = () => {
  return (
    <div className="h-[500px] w-full rounded-lg shadow-inner">
      <Suspense fallback={<Loader />}>
        <Map zoom={6} />
      </Suspense>
    </div>
  );
};

export default MapTab;
