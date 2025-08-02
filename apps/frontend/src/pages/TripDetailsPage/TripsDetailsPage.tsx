import useGetSingleTrip from "@/hooks/trip/useGetSingleTrip";

import ErrorComponent from "@/shared/ErrorComponent";
import Loader from "@/shared/Loader";

import { tripStatusColorMap } from "@/constants/index";

import { Badge } from "@/ui/badge";

import ChangeStatusSelect from "./components/ChangeStatusSelect";
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
    <main className="mx-auto max-w-5xl space-y-12 px-4 py-12 sm:px-6 lg:px-8">
      <section className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-md sm:p-8">
        <header className="flex flex-col-reverse gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1 space-y-3">
            <Badge
              variant="secondary"
              className={`rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${
                tripStatusColorMap[trip.status]
              }`}
            >
              {trip.status}
            </Badge>

            <h1 className="text-4xl font-extrabold text-gray-900">
              {trip.title}
            </h1>
            {trip.description ? (
              <p className="max-w-xl text-gray-600">{trip.description}</p>
            ) : null}
          </div>

          <div className="flex flex-wrap justify-end gap-2 sm:justify-start sm:gap-3">
            <UpdateTripModal />
            <DeleteTripModal />
            <ChangeStatusSelect trip={trip} />
          </div>
        </header>

        <div className="flex justify-end">
          <AddItineraryModal />
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md sm:p-8">
        <TripTabsContainer />
      </section>
    </main>
  );
};

export default TripsDetailsPage;
