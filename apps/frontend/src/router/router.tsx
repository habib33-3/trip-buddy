import { lazy } from "react";

import { createBrowserRouter } from "react-router";

import { suspenseWrapper } from "@/shared/suspense-wrapper";

import ErrorPage from "@/pages/others/ErrorPage";
import NotFoundPage from "@/pages/others/NotFoundPage";

const HomePage = lazy(async () => import("@/pages/HomePage/HomePage"));
const TripsPage = lazy(async () => import("@/pages/trips/TripsPage/TripsPage"));
const TripsDetailsPage = lazy(
  async () => import("@/pages/trips/TripDetailsPage/TripsDetailsPage")
);
const GlobePage = lazy(async () => import("@/pages/GlobePage/GlobePage"));
const TripsHistory = lazy(
  async () => import("@/pages/trips/TripsHistory/TripsHistory")
);

const RootLayout = lazy(async () => import("@/layouts/RootLayout/RootLayout"));

const SettingsPage = lazy(
  async () => import("@/pages/settings/SettingsPage/SettingsPage")
);

const SettingsLayout = lazy(
  async () => import("@/layouts/SettingsLayout/SettingsLayout")
);

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
        children: [
          {
            element: suspenseWrapper(SettingsPage),
            path: "",
          },
        ],
        element: suspenseWrapper(SettingsLayout),
        path: "settings",
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
