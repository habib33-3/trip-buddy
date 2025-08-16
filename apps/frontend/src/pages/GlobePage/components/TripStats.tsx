import { Calendar1Icon, HourglassIcon } from "lucide-react";
import { IoCheckmarkCircle } from "react-icons/io5";

import type { Stats } from "@/types/index";

type Props = {
  stats: Stats;
};

const TripStats = ({ stats }: Props) => {
  const { completed, inProgress, planned } = stats.tripStatusCounts;

  return (
    <div className="flex flex-col justify-center gap-4 md:gap-6">
      {["Total Trips", "Itineraries"].map((label) => (
        <div
          key={label}
          className="rounded-xl bg-slate-700/80 px-4 py-3 shadow-md ring-1 ring-slate-600 transition-colors duration-300 hover:ring-indigo-500 md:px-6 md:py-4"
        >
          <p className="text-sm text-slate-300">{label}</p>
          <p className="text-2xl font-extrabold tracking-wide text-white md:text-3xl">
            {label === "Total Trips" ? stats.tripsCount : stats.itineraryCount}
          </p>
        </div>
      ))}

      {/* Trip Status */}
      <div className="rounded-xl bg-slate-700/80 px-4 py-3 shadow-md ring-1 ring-slate-600 transition-colors duration-300 hover:ring-indigo-500 md:px-6 md:py-4">
        <p className="mb-2 text-sm font-semibold tracking-wide text-indigo-400 uppercase">
          Trip Status
        </p>
        <ul className="space-y-2 text-base font-medium text-white md:text-lg">
          <li className="flex items-center gap-2 transition-colors hover:text-green-400">
            <IoCheckmarkCircle
              className="text-green-400"
              size={20}
            />
            Completed: <strong>{completed}</strong>
          </li>
          <li className="flex items-center gap-2 transition-colors hover:text-yellow-400">
            <HourglassIcon
              className="text-yellow-400"
              size={20}
            />
            In Progress: <strong>{inProgress}</strong>
          </li>
          <li className="flex items-center gap-2 transition-colors hover:text-blue-400">
            <Calendar1Icon
              className="text-blue-400"
              size={20}
            />
            Planned: <strong>{planned}</strong>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TripStats;
