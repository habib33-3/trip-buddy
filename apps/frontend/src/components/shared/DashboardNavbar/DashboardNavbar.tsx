import { Link } from "react-router";

import { useUserStore } from "@/stores/userStore";

import { navLinks } from "@/constants/index";

import { Button } from "@/ui/button";

import AvatarDropdown from "./AvatarDropdown";
import MenuButton from "./MenuButton";

const DashboardNavbar = () => {
  const { user } = useUserStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link
          to="/"
          className="text-xl font-bold"
        >
          MySite
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-gray-700 transition-colors hover:text-black"
            >
              {link.name}
            </Link>
          ))}

          {user ? (
            <AvatarDropdown />
          ) : (
            <Button asChild>
              <Link to="/login">Login</Link>
            </Button>
          )}
        </nav>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <MenuButton />
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
