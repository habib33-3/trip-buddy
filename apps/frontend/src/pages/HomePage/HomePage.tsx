import { Navigate } from "react-router";

import { useAuthStore } from "@/stores/useAuthStore";

import Banner from "./components/Banner";
import Navbar from "./components/Navbar";

const HomePage = () => {
  const { user } = useAuthStore();

  if (user) {
    return (
      <Navigate
        to="/trips"
        replace
      />
    );
  }

  return (
    <div className="min-h-screen w-full bg-background">
      <div className="mx-auto max-w-7xl">
        <Navbar />
        <Banner />
      </div>
    </div>
  );
};

export default HomePage;
