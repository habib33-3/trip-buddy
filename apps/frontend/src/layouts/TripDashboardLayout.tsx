import { Navigate, Outlet } from "react-router";

import { useAuthStore } from "@/stores/useAuthStore";

import DashboardNavbar from "@/shared/DashboardNavbar/DashboardNavbar";

const TripDashboardLayout = () => {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <DashboardNavbar />
      <Outlet />
    </div>
  );
};

export default TripDashboardLayout;
