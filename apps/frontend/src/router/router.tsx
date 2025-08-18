import { lazy } from "react";

import { createBrowserRouter } from "react-router";

import { suspenseWrapper } from "@/shared/suspense-wrapper";

import ErrorPage from "@/pages/ErrorPage/ErrorPage";

const HomePage = lazy(async () => import("@/pages/HomePage/HomePage"));
const TripsPage = lazy(async () => import("@/pages/TripsPage/TripsPage"));
const TripsDetailsPage = lazy(
  async () => import("@/pages/TripDetailsPage/TripsDetailsPage")
);
const GlobePage = lazy(async () => import("@/pages/GlobePage/GlobePage"));
const TripsHistory = lazy(
  async () => import("@/pages/TripsHistory/TripsHistory")
);
const NotFoundPage = lazy(
  async () => import("@/pages/NotFoundPage/NotFoundPage")
);
const RootLayout = lazy(async () => import("@/layouts/RootLayout"));

const router = createBrowserRouter([
  {
    children: [
      {
        element: suspenseWrapper(HomePage),
        path: "",
      },
      {
        children: [
          {
            element: suspenseWrapper(TripsPage),
            path: "trips",
          },
          {
            element: suspenseWrapper(TripsDetailsPage),
            path: "trips/:tripId",
          },
          {
            element: suspenseWrapper(GlobePage),
            path: "globe",
          },
          {
            element: suspenseWrapper(TripsHistory),
            path: "trips/history",
          },
        ],
        element: suspenseWrapper(RootLayout),
        path: "",
      },

      {
        element: suspenseWrapper(NotFoundPage),
        path: "*",
      },
    ],
    errorElement: <ErrorPage />,
    path: "/",
  },
]);

export default router;
