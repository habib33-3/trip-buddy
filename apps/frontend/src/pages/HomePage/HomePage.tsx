import { useState } from "react";

import { Navigate } from "react-router";

import { useAuthStore } from "@/stores/useAuthStore";

import Logo from "@/shared/Logo";

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
      className={`flex min-h-screen w-full flex-col items-center justify-center px-4 text-white sm:px-6 lg:px-12 ${
        isLogin
          ? "bg-gradient-to-br from-gray-950 via-slate-900 to-gray-800"
          : "bg-gradient-to-tr from-rose-950 via-rose-800 to-rose-700"
      }`}
    >
      <div className="py-6">
        <Logo />
      </div>

      <section className="flex w-full max-w-7xl flex-1 flex-col items-center justify-center gap-12 sm:gap-16 md:flex-row md:gap-20">
        <div className="order-1 flex w-full max-w-md flex-1 items-center justify-center md:order-none">
          {isLogin ? (
            <LoginForm navigateToRegister={() => setFormType("register")} />
          ) : (
            <RegisterUserForm navigateToLogin={() => setFormType("login")} />
          )}
        </div>

        <div className="order-2 flex w-full max-w-md flex-1 items-center justify-center text-center md:order-none md:text-left">
          <div className="p-4 sm:p-6">
            <h2 className="mb-6 text-3xl font-extrabold drop-shadow-lg sm:text-4xl lg:text-5xl">
              {isLogin
                ? "Welcome Back, Explorer!"
                : "Join Our Travel Community"}
            </h2>
            <p className="text-base leading-relaxed drop-shadow-md sm:text-lg">
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
