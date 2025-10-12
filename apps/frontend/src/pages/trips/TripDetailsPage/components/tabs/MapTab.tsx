import { Suspense, lazy } from "react";

import LoadingComponent from "@/shared/LoadingComponent";

const Map = lazy(async () => import("@/shared/Map"));

const MapTab = () => {
  return (
    <div className="relative h-64 w-full overflow-hidden rounded-lg shadow-inner sm:h-80 md:h-[500px]">
      <Suspense fallback={<LoadingComponent />}>
        <Map zoom={6} />
      </Suspense>
    </div>
  );
};

export default MapTab;
