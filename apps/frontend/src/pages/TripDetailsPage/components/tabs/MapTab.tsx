import { Suspense, lazy } from "react";

import { Loader } from "lucide-react";

const Map = lazy(async () => import("@/shared/Map"));

const MapTab = () => {
  return (
    <div className="relative h-64 w-full overflow-hidden rounded-lg shadow-inner sm:h-80 md:h-[500px]">
      <Suspense
        fallback={
          <div className="flex h-full w-full items-center justify-center">
            <Loader className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        }
      >
        <Map zoom={6} />
      </Suspense>
    </div>
  );
};

export default MapTab;
