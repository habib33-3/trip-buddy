import { Outlet } from "react-router";

import Navbar from "./components/Navbar";

const SettingsLayout = () => {
  return (
    <div className="mx-auto flex size-full min-h-screen max-w-7xl flex-col bg-gradient-to-br from-slate-900 via-slate-700 to-slate-800">
      <Navbar />
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default SettingsLayout;
