import type { Stats } from "@/types/index";

type Props = {
  stats: Stats;
};

const CountryStats = ({ stats }: Props) => {
  const { countries, mostVisitedCountry } = stats;

  return (
    <div className="flex w-full flex-col justify-center gap-4">
      {/* Countries Visited */}
      <div className="w-full rounded-xl bg-slate-700/80 px-4 py-3 shadow-md ring-1 ring-slate-600 md:px-6 md:py-4">
        <p className="text-sm text-slate-300">Countries Visited</p>
        <p className="text-2xl font-bold text-white md:text-3xl">{countries}</p>
      </div>

      {/* Most Visited Country */}
      <div className="w-full rounded-xl bg-slate-700/80 px-4 py-3 shadow-md ring-1 ring-slate-600 md:px-6 md:py-4">
        <p className="text-sm text-slate-300">Most Visited Country</p>
        <div className="mt-3 flex flex-col items-center justify-center gap-3 md:mt-4 lg:flex-row">
          <img
            src={mostVisitedCountry.flag}
            alt={`Flag of ${mostVisitedCountry.name}`}
            className="h-6 w-10 rounded-sm object-cover object-center shadow md:h-8 md:w-12"
            loading="lazy"
          />
          <div className="flex min-w-0 flex-col">
            <p className="truncate text-xl font-bold text-white capitalize md:text-2xl">
              {mostVisitedCountry.name}
            </p>
            <p className="text-sm text-slate-400">
              Visited {mostVisitedCountry.count}{" "}
              {mostVisitedCountry.count === 1 ? "time" : "times"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryStats;
