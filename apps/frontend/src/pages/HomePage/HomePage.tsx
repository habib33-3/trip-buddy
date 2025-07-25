import { Navigate } from "react-router";

import { useAuthStore } from "@/stores/useAuthStore";

const HomePage = () => {
  const { user } = useAuthStore();

  if (user) {
    return <Navigate to="/login" />;
  }

  return <div>HomePage</div>;
};

export default HomePage;
