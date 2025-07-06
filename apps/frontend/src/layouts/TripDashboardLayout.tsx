import { Outlet } from "react-router";

import DashboardNavbar from "@/shared/DashboardNavbar/DashboardNavbar";

const TripDashboardLayout = () => {
  return (
    <div>
      <DashboardNavbar />
      <Outlet />
    </div>
  );
};

export default TripDashboardLayout;
