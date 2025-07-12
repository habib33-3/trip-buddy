import { useUserStore } from "@/stores/userStore";

import CreateTripModal from "./components/CreateTripModal";
import RecentTrip from "./components/RecentTrip";

const TripsPage = () => {
  const { user } = useUserStore();

  return (
    <section className="mx-auto mt-10 min-h-screen max-w-7xl rounded-2xl bg-gray-100 p-4 sm:p-6">
      <div className="flex w-full items-center justify-between rounded-xl bg-white px-6 py-5 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-800">Trips</h1>
        <CreateTripModal />
      </div>

      <div className="mt-8 rounded-xl bg-gradient-to-r from-blue-50 via-white to-purple-50 px-6 py-10 shadow-md">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 text-2xl text-white shadow-md">
            👋
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Hello,{" "}
              <span className="text-blue-700">{user?.name || "Guest"}</span>
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Welcome back! Let’s plan your next adventure.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 rounded-xl bg-white px-6 py-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-800">Upcoming Trips</h2>
        <RecentTrip />
      </div>
    </section>
  );
};

export default TripsPage;
