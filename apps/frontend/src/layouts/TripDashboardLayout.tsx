import { Navigate, Outlet } from "react-router";

import { useAuthStore } from "@/stores/useAuthStore";

import Navbar from "./TripDashboardLayout/Navbar/Navbar";

const TripDashboardLayout = () => {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-700 to-slate-800">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default TripDashboardLayout;
