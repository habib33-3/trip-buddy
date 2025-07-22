import { Link } from "react-router";

import { useAuthStore } from "@/stores/useAuthStore";

import { navLinks } from "@/constants/index";

import { Button } from "@/ui/button";

import AvatarDropdown from "./AvatarDropdown";
import MenuButton from "./MenuButton";

const DashboardNavbar = () => {
  const { user } = useAuthStore();

  return (
    <header
      className="sticky top-0 z-50 w-full border-b bg-background shadow-sm"
      role="banner"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:py-3">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-semibold tracking-tight text-foreground"
        >
          MySite
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
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
