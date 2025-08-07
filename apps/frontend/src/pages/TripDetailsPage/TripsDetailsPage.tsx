import useGetSingleTrip from "@/hooks/trip/useGetSingleTrip";

import ErrorComponent from "@/shared/ErrorComponent";
import Loader from "@/shared/Loader";

import { tripStatusColorMap } from "@/constants/index";

import { Badge } from "@/ui/badge";

import ChangeTripStatusSelect from "./components/ChangeTripStatusSelect";
import TripTabsContainer from "./components/TripTabsContainer";
import AddItineraryModal from "./components/modal/AddItineraryModal";
import DeleteTripModal from "./components/modal/DeleteTripModal";
import UpdateTripModal from "./components/modal/UpdateTripModal";

const TripsDetailsPage = () => {
  const { status, trip } = useGetSingleTrip();

  if (status === "pending") return <Loader />;
  if (status === "error" || !trip) {
    return (
      <ErrorComponent message="Something went wrong while fetching trip" />
    );
  }

  return (
    <main className="mx-auto max-w-5xl space-y-10 px-4 py-12 sm:px-6 lg:px-8">
      <section className="space-y-6 rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-800 to-purple-900 p-6 shadow-lg sm:p-8">
        <header className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          {/* Title & Description */}
          <div className="flex-1 space-y-4">
            <Badge
              variant="secondary"
              className={`w-fit rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${
                tripStatusColorMap[trip.status] || "bg-gray-100 text-gray-800"
              }`}
              aria-label={`Trip status: ${trip.status}`}
            >
              {trip.status}
            </Badge>

            <h1 className="text-4xl font-extrabold text-white">{trip.title}</h1>
            {trip.description ? (
              <p className="max-w-2xl text-lg text-gray-300">
                {trip.description}
              </p>
            ) : null}
          </div>

          <div className="flex flex-wrap justify-start gap-3">
            <UpdateTripModal />
            <DeleteTripModal />
            <ChangeTripStatusSelect trip={trip} />
          </div>
        </header>

        <div className="flex justify-end">
          <AddItineraryModal />
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-800 via-slate-900 to-purple-950 p-6 shadow-lg sm:p-8">
        <TripTabsContainer />
      </section>
    </main>
  );
};

export default TripsDetailsPage;
