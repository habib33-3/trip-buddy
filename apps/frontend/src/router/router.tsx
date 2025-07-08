import { createBrowserRouter } from "react-router";

import TripDashboardLayout from "@/layouts/TripDashboardLayout";

import LoginPage from "@/pages/LoginPage/LoginPage";
import RegisterPage from "@/pages/RegisterPage/RegisterPage";
import TripsPage from "@/pages/TripsPage/TripsPage";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/trips",
    element: <TripDashboardLayout />,
    children: [
      {
        path: "",
        element: <TripsPage />,
      },
    ],
  },
]);

export default router;
