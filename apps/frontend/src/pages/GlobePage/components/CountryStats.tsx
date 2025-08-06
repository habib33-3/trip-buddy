import type { Stats } from "@/types/index";

type Props = {
  stats: Stats;
};

const CountryStats = ({ stats }: Props) => {
  const { countries, mostVisitedCountry } = stats;

  return (
    <div className="flex min-h-3/4 flex-col justify-center gap-4">
      <div className="rounded-xl bg-slate-700/80 px-6 py-4 shadow-md ring-1 ring-slate-600">
        <p className="text-sm text-slate-300">Countries Visited</p>
        <p className="text-2xl font-bold text-white">{countries}</p>
      </div>

      <div className="rounded-xl bg-slate-700/80 px-6 py-4 shadow-md ring-1 ring-slate-600">
        <p className="text-sm text-slate-300">Most Visited Country</p>
        <div className="mt-4 flex items-center gap-4">
          <img
            src={mostVisitedCountry.flag}
            alt={`Flag of ${mostVisitedCountry.name}`}
            className="h-8 w-12 rounded-sm object-cover object-center shadow"
            loading="lazy"
          />
          <div className="flex flex-col">
            <p className="truncate text-2xl font-bold text-white capitalize">
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
