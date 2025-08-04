import { useState } from "react";

import { Navigate } from "react-router";

import { useAuthStore } from "@/stores/useAuthStore";

import LoginForm from "./components/form/LoginForm";
import RegisterUserForm from "./components/form/RegisterUserForm";

const HomePage = () => {
  const { user } = useAuthStore();
  const [formType, setFormType] = useState<"login" | "register">("login");

  if (user) {
    return (
      <Navigate
        to="/trips"
        replace
      />
    );
  }

  return (
    <main
      className={`flex h-screen w-screen flex-col md:flex-row ${
        formType === "login"
          ? "bg-gradient-to-tr from-blue-800 via-blue-600 to-purple-700 text-white"
          : "bg-gradient-to-tr from-pink-800 via-pink-600 to-red-700 text-white"
      }`}
    >
      {/* Left / Form Section */}
      <section className="flex flex-1 items-center justify-center px-6">
        <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-lg">
          {formType === "login" ? (
            <LoginForm navigateToRegister={() => setFormType("register")} />
          ) : (
            <RegisterUserForm navigateToLogin={() => setFormType("login")} />
          )}
        </div>
      </section>

      {/* Right / Info Section */}
      <section className="hidden flex-1 flex-col justify-center md:flex">
        {formType === "login" ? (
          <>
            <h2 className="mb-6 text-5xl font-extrabold drop-shadow-lg">
              Welcome Back, Explorer!
            </h2>
            <p className="max-w-md text-lg leading-relaxed drop-shadow-md">
              Log in to access your saved trips, track your plans, and continue
              your adventure with ease.
            </p>
          </>
        ) : (
          <>
            <h2 className="mb-6 text-5xl font-extrabold drop-shadow-lg">
              Join Our Travel Community
            </h2>
            <p className="max-w-md text-lg leading-relaxed drop-shadow-md">
              Sign up to start planning unforgettable trips, discover new
              destinations, and manage all your journeys in one place.
            </p>
          </>
        )}
      </section>
    </main>
  );
};

export default HomePage;
