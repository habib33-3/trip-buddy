import { useUserStore } from "@/stores/userStore";

import CreateTripModal from "./components/CreateTripModal";
import RecentTrip from "./components/RecentTrip";

const TripsPage = () => {
  const { user } = useUserStore();

  return (
    <section className="mx-auto mt-10 min-h-screen max-w-7xl rounded-2xl bg-gray-200/60 p-4">
      <div className="mx-auto my-6 flex w-11/12 items-center justify-between">
        <h1 className="text-3xl font-bold">Trips</h1>
        <div>
          <CreateTripModal />
        </div>
      </div>
      <div className="mt-10 rounded-2xl bg-gradient-to-r from-blue-100 via-white to-purple-100 px-6 py-10 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 text-2xl text-white shadow-md">
            👋
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Hello,{" "}
              <span className="font-semibold text-blue-700">{user?.name}</span>
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Welcome back! Let’s plan your next adventure.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 bg-white p-4">
        <h1 className="mt-10 text-3xl font-bold">Upcoming Trips</h1>
        <RecentTrip />
      </div>
    </section>
  );
};

export default TripsPage;
