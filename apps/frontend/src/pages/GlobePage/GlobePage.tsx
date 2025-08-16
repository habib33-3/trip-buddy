import { Suspense, lazy } from "react";

import useGetStats from "@/hooks/stats/useGetStats";

import ErrorComponent from "@/shared/ErrorComponent";
import Loader from "@/shared/Loader";

import CountryStats from "./components/CountryStats";
import TripStats from "./components/TripStats";

const Globe = lazy(async () => import("./components/Globe"));

const GlobePage = () => {
  const { stats, status } = useGetStats();

  if (status === "pending") return <Loader />;
  if (status === "error" || !stats)
    return (
      <ErrorComponent message="Something went wrong while fetching stats" />
    );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-10 text-white">
      <div className="mx-auto max-w-screen-xl space-y-10">
        <h1 className="text-center text-3xl font-semibold md:text-4xl">
          Explore Your Travel Map
        </h1>

        {/* Responsive layout: stacked on mobile, tablet split 3:6:3 */}
        <div className="flex flex-col md:flex-row md:gap-6 lg:gap-10">
          {/* Left column - Trip Stats */}
          <div className="mb-6 w-full md:mb-0 md:w-1/4">
            <TripStats stats={stats} />
          </div>

          {/* Center column - Globe */}
          <div className="mb-6 flex w-full justify-center md:mb-0 md:w-1/2">
            <Suspense fallback={<Loader />}>
              <Globe cities={stats.cities} />
            </Suspense>
          </div>

          {/* Right column - Country Stats */}
          <div className="w-full md:w-1/4">
            <CountryStats stats={stats} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobePage;
