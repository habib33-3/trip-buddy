import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ChangeAvatar from "./components/settings/ChangeAvatar";
import ChangePassword from "./components/settings/ChangePassword";

const SettingsPage = () => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
      <Navbar />

      <div className="flex flex-1">
        <aside className="hidden w-64 flex-shrink-0 border-r border-white/10 bg-slate-800/70 backdrop-blur-lg md:flex">
          <Sidebar />
        </aside>

        <section className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="mx-auto flex max-w-3xl flex-col gap-10">
            <ChangePassword />
            <ChangeAvatar />
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;
