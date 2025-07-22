import { Calendar1Icon, HourglassIcon } from "lucide-react";
import { IoCheckmarkCircle } from "react-icons/io5";

import type { Stats } from "@/types/index";

type Props = {
  stats: Stats;
};

const TripStats = ({ stats }: Props) => {
  const { completed, inProgress, planned } = stats.tripStatusCounts;

  return (
    <div className="flex h-3/4 flex-col justify-center gap-6">
      <div className="rounded-xl bg-slate-700/80 px-8 py-5 shadow-md ring-1 ring-slate-600 transition-colors duration-300 hover:ring-indigo-500">
        <p className="text-sm text-slate-300">Total Trips</p>
        <p className="text-3xl font-extrabold tracking-wide text-white">
          {stats.tripsCount}
        </p>
      </div>

      <div className="rounded-xl bg-slate-700/80 px-8 py-5 shadow-md ring-1 ring-slate-600 transition-colors duration-300 hover:ring-indigo-500">
        <p className="text-sm text-slate-300">Itineraries</p>
        <p className="text-3xl font-extrabold tracking-wide text-white">
          {stats.itineraryCount}
        </p>
      </div>

      <div className="rounded-xl bg-slate-700/80 px-8 py-5 shadow-md ring-1 ring-slate-600 transition-colors duration-300 hover:ring-indigo-500">
        <p className="mb-3 text-sm font-semibold tracking-wide text-indigo-400 uppercase">
          Trip Status
        </p>
        <ul className="space-y-3 text-lg font-medium text-white">
          <li className="flex cursor-default items-center gap-3 transition-colors hover:text-green-400">
            <IoCheckmarkCircle className="mr-2 inline size-5 flex-shrink-0 text-green-400" />
            Completed: <strong>{completed}</strong>
          </li>
          <li className="flex cursor-default items-center gap-3 transition-colors hover:text-yellow-400">
            <HourglassIcon className="mr-2 inline size-5 flex-shrink-0 text-yellow-400" />
            In Progress: <strong>{inProgress}</strong>
          </li>
          <li className="flex cursor-default items-center gap-3 transition-colors hover:text-blue-400">
            <Calendar1Icon className="mr-2 inline size-5 flex-shrink-0 text-blue-400" />
            Planned: <strong>{planned}</strong>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TripStats;
