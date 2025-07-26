import useGetSingleTrip from "@/hooks/trip/useGetSingleTrip";

import ErrorComponent from "@/shared/ErrorComponent";
import Loader from "@/shared/Loader";

import TripTabsContainer from "./components/TripTabsContainer";
import AddItineraryModal from "./components/modal/AddItineraryModal";
import DeleteTripModal from "./components/modal/DeleteTripModal";
import UpdateTripModal from "./components/modal/UpdateTripModal";

const TripsDetailsPage = () => {
  const { status, trip } = useGetSingleTrip();

  if (status === "pending") return <Loader />;
  if (status === "error")
    return (
      <ErrorComponent message="Something went wrong while fetching trip" />
    );
  if (!trip) return null;

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-md">
        <header className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900">
              {trip.title}
            </h1>
            {trip.description ? (
              <p className="mt-2 max-w-xl text-gray-600">{trip.description}</p>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-3">
            <UpdateTripModal />
            <DeleteTripModal />
          </div>
        </header>

        <div className="mt-10 flex w-full flex-1 justify-end">
          <AddItineraryModal />
        </div>
      </section>

      <section className="mt-12 rounded-2xl border border-gray-200 bg-white p-8 shadow-md">
        <TripTabsContainer />
      </section>
    </main>
  );
};

export default TripsDetailsPage;
