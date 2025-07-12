import { createBrowserRouter } from "react-router";

import TripDashboardLayout from "@/layouts/TripDashboardLayout";

import LoginPage from "@/pages/LoginPage/LoginPage";
import RegisterPage from "@/pages/RegisterPage/RegisterPage";
import TripsDetailsPage from "@/pages/TripDetailsPage/TripsDetailsPage";
import TripsPage from "@/pages/TripsPage/TripsPage";

const router = createBrowserRouter([
  {
    element: <RegisterPage />,
    path: "/register",
  },
  {
    element: <LoginPage />,
    path: "/login",
  },
  {
    children: [
      {
        element: <TripsPage />,
        path: "",
      },
      {
        element: <TripsDetailsPage />,
        path: ":tripId",
      },
    ],
    element: <TripDashboardLayout />,
    path: "/trips",
  },
]);

export default router;
