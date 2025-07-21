import useGetStats from "@/hooks/stats/useGetStats";

import ErrorComponent from "@/shared/ErrorComponent";
import Loader from "@/shared/Loader";

import CountryStats from "./components/CountryStats";
import Globe from "./components/Globe";
import TripStats from "./components/TripStats";

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
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <TripStats stats={stats} />
          </div>
          <div className="flex items-center justify-center lg:col-span-6">
            <Globe cities={stats.cities} />
          </div>
          <div className="lg:col-span-3">
            <CountryStats stats={stats} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobePage;
