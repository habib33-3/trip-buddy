import type { Stats } from "@/types/index";

type Props = {
  stats: Stats;
};

const CountryStats = ({ stats }: Props) => {
  return (
    <div className="flex min-h-3/4 flex-col justify-center gap-4">
      <div className="rounded-xl bg-slate-700/80 px-6 py-4 shadow-md ring-1 ring-slate-600">
        <p className="text-sm text-slate-300">Countries Visited</p>
        <p className="text-2xl font-bold">{stats.countries}</p>
      </div>

      {stats.mostVisitedCountry ? (
        <div className="rounded-xl bg-slate-700/80 px-6 py-4 shadow-md ring-1 ring-slate-600">
          <p className="text-sm text-slate-300">Most Visited Country</p>
          <p className="text-2xl font-bold capitalize">
            {stats.mostVisitedCountry}
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default CountryStats;
