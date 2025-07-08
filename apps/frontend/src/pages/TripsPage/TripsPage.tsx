import CreateTripModal from "./components/CreateTripModal";

const TripsPage = () => {
  return (
    <section className="mx-auto mt-10 min-h-screen max-w-7xl rounded-2xl bg-gray-200/60 p-4">
      <div className="mx-auto my-6 flex w-11/12 items-center justify-between">
        <h1 className="text-3xl font-bold">Trips</h1>
        <div className="">
          <CreateTripModal />
        </div>
      </div>
    </section>
  );
};

export default TripsPage;
