import useGetSingleTrip from "@/hooks/trip/useGetSingleTrip";

import Loader from "@/shared/Loader";

import ErrorPage from "../ErrorPage/ErrorPage";
import TripTabsContainer from "./components/TripTabsContainer";
import AddLocationModal from "./components/modal/AddLocationModal";
import DeleteTripModal from "./components/modal/DeleteTripModal";
import UpdateTripModal from "./components/modal/UpdateTripModal";

const TripsDetailsPage = () => {
  const { status, trip } = useGetSingleTrip();

  if (status === "pending") return <Loader />;
  if (status === "error") return <ErrorPage />;

  if (!trip) return null;

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <section className="rounded-2xl border bg-white p-8 shadow-sm">
        <header className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-semibold text-gray-900">
              {trip.title}
            </h1>
            <p className="mt-2 text-gray-600">{trip.description}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <UpdateTripModal />
            <DeleteTripModal />
          </div>
        </header>

        <div className="mt-10 flex justify-end">
          <AddLocationModal />
        </div>
      </section>

      <section className="mt-10 rounded-2xl border bg-white p-8 shadow-sm">
        <TripTabsContainer />
      </section>
    </main>
  );
};

export default TripsDetailsPage;
