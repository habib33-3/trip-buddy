import { Navigate, Outlet } from "react-router";

import { useUserStore } from "@/stores/useAuthStore";

import DashboardNavbar from "@/shared/DashboardNavbar/DashboardNavbar";

const TripDashboardLayout = () => {
  const { user } = useUserStore();

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
