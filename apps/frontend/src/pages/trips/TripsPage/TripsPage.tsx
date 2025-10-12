import { Link } from "react-router";

import { Hand } from "lucide-react";

import { useAuthStore } from "@/stores/useAuthStore";

import { Button } from "@/ui/button";

import CreateTripModal from "./components/CreateTripModal";
import RecentTrip from "./components/RecentTrip";

const TripsPage = () => {
  const { user } = useAuthStore();

  return (
    <section className="mx-auto mt-10 min-h-screen max-w-7xl rounded-2xl bg-slate-800 px-4 py-6 sm:px-6 sm:py-8">
      {/* Top Action */}
      <div className="flex w-full justify-end">
        <CreateTripModal />
      </div>

      {/* Welcome Card */}
      <div className="mt-8 rounded-xl bg-gradient-to-br from-blue-900/30 via-slate-800 to-purple-800/40 px-4 py-6 shadow-lg sm:px-6 sm:py-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-transform hover:scale-105">
            <Hand className="h-8 w-8 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              Hello,{" "}
              <span className="text-blue-400">{user?.name ?? "Guest"}</span>
            </h2>
            <p className="mt-1 text-sm text-gray-300">
              Welcome back! Let&apos;s plan your next adventure.
            </p>
          </div>
        </div>
      </div>

      {/* Upcoming Trips */}
      <div className="mt-12 rounded-xl bg-slate-600 px-4 py-6 shadow-md sm:px-6 sm:py-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-semibold text-white sm:text-2xl">
            Upcoming Trips
          </h2>
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
