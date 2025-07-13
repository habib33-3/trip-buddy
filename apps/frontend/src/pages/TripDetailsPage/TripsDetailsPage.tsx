import useGetSingleTrip from "@/hooks/trip/useGetSingleTrip";

import Loader from "@/shared/Loader";

import ErrorPage from "../ErrorPage/ErrorPage";
import DeleteTripModal from "./components/DeleteTripModal";
import UpdateTripModal from "./components/UpdateTripModal";

const TripsDetailsPage = () => {
  const { status, trip } = useGetSingleTrip();

  if (status === "pending") return <Loader />;

  if (status === "error") return <ErrorPage />;

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="rounded-2xl border bg-white p-8 shadow-md">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">{trip?.title}</h1>
            <p className="mt-3 text-base text-gray-600">{trip?.description}</p>
          </div>
          <div className="flex items-center gap-4">
            <UpdateTripModal />
            <DeleteTripModal />
          </div>
        </div>
      </div>
    </main>
  );
};

export default TripsDetailsPage;
