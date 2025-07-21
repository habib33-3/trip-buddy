import useGetStats from "@/hooks/stats/useGetStats";

import ErrorComponent from "@/shared/ErrorComponent";
import Loader from "@/shared/Loader";

import Globe from "./components/Globe";

const GlobePage = () => {
  const { stats, status } = useGetStats();

  if (status === "pending") return <Loader />;
  if (status === "error")
    return (
      <ErrorComponent message="Something went wrong while fetching stats" />
    );
  if (!stats) return null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-10">
      <h1 className="mb-6 text-3xl font-semibold text-white md:text-4xl">
        Explore Your Travel Map
      </h1>
      <Globe cities={stats.cities} />
    </div>
  );
};

export default GlobePage;
