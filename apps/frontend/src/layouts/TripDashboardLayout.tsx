import { Navigate, Outlet } from "react-router";

import { useAuthStore } from "@/stores/useAuthStore";

import Navbar from "./TripDashboardLayout/Navbar/Navbar";

const TripDashboardLayout = () => {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default TripDashboardLayout;
