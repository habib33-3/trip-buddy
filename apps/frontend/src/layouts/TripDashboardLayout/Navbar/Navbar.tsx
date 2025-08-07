import { Link } from "react-router";

import { useAuthStore } from "@/stores/useAuthStore";

import Logo from "@/shared/Logo";

import { navLinks } from "@/constants/index";

import AvatarDropdown from "./AvatarDropdown";
import MenuButton from "./MenuButton";

const Navbar = () => {
  const { user } = useAuthStore();

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-white/20 bg-slate-900/60 shadow-sm backdrop-blur-md backdrop-saturate-150"
      role="banner"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:py-3">
        <Logo />

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-base font-semibold text-gray-100 transition-colors duration-200 hover:text-gray-400"
            >
              {link.name}
            </Link>
          ))}

          {user ? <AvatarDropdown /> : null}
        </nav>

        <div className="md:hidden">
          <MenuButton />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
