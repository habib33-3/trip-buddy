import { Image, KeySquareIcon } from "lucide-react";

const sidebarMenus = [
  {
    icon: <KeySquareIcon className="size-5" />,
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
    <nav className="flex flex-col gap-2 p-4">
      {sidebarMenus.map((menu) => (
        <a
          key={menu.name}
          href={menu.path}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-300 transition hover:bg-slate-700 hover:text-white"
        >
          <span>{menu.icon}</span>
          <span className="text-sm font-medium">{menu.name}</span>
        </a>
      ))}
    </nav>
  );
};

export default Sidebar;
