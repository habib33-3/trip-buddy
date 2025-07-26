import { Navigate } from "react-router";

import { useAuthStore } from "@/stores/useAuthStore";

import Navbar from "./components/Navbar";

const HomePage = () => {
  const { user } = useAuthStore();

  if (user) {
    return <Navigate to="/trips" />;
  }

  return (
    <div className="mx-auto max-w-7xl">
      <Navbar />
    </div>
  );
};

export default HomePage;
