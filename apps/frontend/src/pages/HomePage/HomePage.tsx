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

  const isLogin = formType === "login";

  return (
    <main
      className={`flex min-h-screen min-w-screen flex-col items-center justify-center text-white ${
        isLogin
          ? "bg-gradient-to-tr from-blue-800 via-blue-600 to-purple-700"
          : "bg-gradient-to-tr from-pink-800 via-pink-600 to-red-700"
      }`}
    >
      <header className="px-6 py-4 text-3xl font-bold md:text-4xl">
        TripBuddy
      </header>

      <section className="flex min-h-[calc(100vh-5rem)] flex-1 flex-col items-center justify-center gap-20 md:flex-row">
        {/* Form Section */}
        <div className="flex h-full flex-1 items-center justify-center px-6">
          {isLogin ? (
            <LoginForm navigateToRegister={() => setFormType("register")} />
          ) : (
            <RegisterUserForm navigateToLogin={() => setFormType("login")} />
          )}
        </div>

        {/* Info Section */}
        <div className="hidden flex-1 items-center justify-center md:flex">
          <div className="max-w-md p-6 text-left">
            <h2 className="mb-6 text-5xl font-extrabold drop-shadow-lg">
              {isLogin
                ? "Welcome Back, Explorer!"
                : "Join Our Travel Community"}
            </h2>
            <p className="text-lg leading-relaxed drop-shadow-md">
              {isLogin
                ? "Log in to access your saved trips, track your plans, and continue your adventure with ease."
                : "Sign up to start planning unforgettable trips, discover new destinations, and manage all your journeys in one place."}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
