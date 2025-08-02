import { createBrowserRouter } from "react-router";

import TripDashboardLayout from "@/layouts/TripDashboardLayout";

import ErrorPage from "@/pages/ErrorPage/ErrorPage";
import GlobePage from "@/pages/GlobePage/GlobePage";
import HomePage from "@/pages/HomePage/HomePage";
import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage";
import TripsDetailsPage from "@/pages/TripDetailsPage/TripsDetailsPage";
import TripsHistory from "@/pages/TripsHistory/TripsHistory";
import TripsPage from "@/pages/TripsPage/TripsPage";

const router = createBrowserRouter([
  {
    children: [
      {
        element: <HomePage />,
        path: "",
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
          {
            element: <GlobePage />,
            path: "globe",
          },
          {
            element: <TripsHistory />,
            path: "history",
          },
        ],
        element: <TripDashboardLayout />,
        path: "trips",
      },

      {
        element: <NotFoundPage />,
        path: "*",
      },
    ],
    errorElement: <ErrorPage />,
    path: "/",
  },
]);

export default router;
