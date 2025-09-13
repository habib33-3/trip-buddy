import { Outlet } from "react-router";

import Navbar from "./components/Navbar";

const SettingsLayout = () => {
  return (
    <div className="mx-auto flex size-full min-h-screen max-w-7xl flex-col bg-slate-950">
      <Navbar />
      <div className="flex-1 p-6">
        <div className="rounded-2xl bg-slate-900 p-6 shadow-lg">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
