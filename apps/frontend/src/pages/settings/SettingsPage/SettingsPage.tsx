import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ChangeAvatar from "./components/settings/ChangeAvatar";
import ChangePassword from "./components/settings/ChangePassword";

const SettingsPage = () => {
  return (
    <div className="min-h-screen w-full bg-slate-900 text-slate-100">
      <Navbar />
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden w-64 border-r border-white/10 bg-slate-800/60 backdrop-blur-md md:block">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <section className="mx-auto flex w-full flex-1 flex-col items-center justify-center gap-6 p-6 md:p-10">
          <ChangePassword />
          <ChangeAvatar />
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;
