import { Link } from "react-router";

import { Hand } from "lucide-react";

import { useAuthStore } from "@/stores/useAuthStore";

import { Button } from "@/ui/button";

import CreateTripModal from "./components/CreateTripModal";
import RecentTrip from "./components/RecentTrip";

const TripsPage = () => {
  const { user } = useAuthStore();

  return (
    <section className="mx-auto mt-10 min-h-screen max-w-7xl rounded-2xl bg-slate-800 px-4 py-6 sm:p-6">
      <div className="flex w-full justify-end">
        <CreateTripModal />
      </div>

      <div className="mt-8 rounded-xl bg-gradient-to-br from-blue-900/30 via-slate-800 to-purple-800/40 px-6 py-8 shadow-lg">
        <div className="flex items-center gap-5">
          <div className="flex size-16 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-transform hover:scale-105">
            <Hand className="size-8 animate-pulse" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">
              Hello,{" "}
              <span className="text-blue-400">{user?.name ?? "Guest"}</span>
            </h2>
            <p className="mt-1 text-sm text-gray-300">
              Welcome back! Let&apos;s plan your next adventure.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 rounded-xl bg-slate-600 px-6 py-8 shadow-md">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold text-white">Upcoming Trips</h2>
          <Button
            asChild
            variant="outline"
          >
            <Link to="/trips/history">View all</Link>
          </Button>
        </div>

        <RecentTrip />
      </div>
    </section>
  );
};

export default TripsPage;
