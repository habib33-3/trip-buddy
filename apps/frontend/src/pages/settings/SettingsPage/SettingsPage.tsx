import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
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
        <section className="flex-1 p-6 md:p-10">
          <ChangePassword />
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;
