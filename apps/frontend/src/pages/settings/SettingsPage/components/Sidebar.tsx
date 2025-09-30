// Sidebar.tsx
import { Image, KeySquare } from "lucide-react";

const sidebarMenus = [
  {
    icon: <KeySquare className="size-5" />,
    name: "Change Password",
    path: "#change-password",
  },
  {
    icon: <Image className="size-5" />,
    name: "Change Avatar",
    path: "#change-avatar",
  },
];

const Sidebar = () => {
  return (
    <nav className="flex flex-col gap-1 p-4">
      {sidebarMenus.map((menu) => (
        <a
          key={menu.name}
          href={menu.path}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-300 transition hover:bg-slate-700/70 hover:text-white focus:bg-slate-700/80 focus:text-white"
        >
          <span>{menu.icon}</span>
          <span className="text-sm font-medium">{menu.name}</span>
        </a>
      ))}
    </nav>
  );
};

export default Sidebar;
