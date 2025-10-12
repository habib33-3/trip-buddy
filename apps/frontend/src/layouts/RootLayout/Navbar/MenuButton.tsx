import { useState } from "react";

import { Link, useLocation } from "react-router";

import { ChevronRight, Menu } from "lucide-react";

import Logo from "@/shared/Logo";

import { navLinks } from "@/constants/index";

import { Button } from "@/ui/button";
import { Separator } from "@/ui/separator";
import { Sheet, SheetContent, SheetFooter, SheetTrigger } from "@/ui/sheet";

import AvatarDropdown from "./AvatarDropdown";

const MenuButton = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const isActiveLink = (path: string) =>
    pathname === path || pathname.startsWith(`${path}/`);

  return (
    <Sheet
      open={open}
      onOpenChange={setOpen}
    >
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open menu"
          className="rounded-2xl border border-white/10 bg-white/5 p-2 shadow-sm backdrop-blur hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/40"
        >
          <Menu className="size-5 text-white" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[300px] border-white/10 bg-gradient-to-b from-slate-900/90 to-slate-800/70 p-0 shadow-xl backdrop-blur-xl"
      >
        <div className="flex items-center justify-between px-4 pt-4 pb-3">
          <div className="flex items-center gap-2">
            <Logo />
          </div>
        </div>
        <Separator className="bg-white/10" />

        <nav className="max-h-[70vh] overflow-y-auto px-2 py-3">
          <ul className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const isActive = isActiveLink(link.path);

              return (
                <li key={link.path}>
                  <Button
                    asChild
                    onClick={() => setOpen(false)}
                    variant="ghost"
                    className="group text-white"
                  >
                    <Link
                      to={link.path}
                      className={`rounded-lg px-3 py-2 text-base font-semibold text-gray-100 transition-all duration-200 hover:bg-white/10 hover:text-white ${
                        isActive
                          ? "underline decoration-rose-400 decoration-2 underline-offset-8"
                          : ""
                      }`}
                    >
                      {link.name}
                      <ChevronRight className="size-4 opacity-50 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </Button>
                </li>
              );
            })}

            <li className="px-3 py-2">
              <Separator className="bg-white/10" />
            </li>
          </ul>
        </nav>

        <SheetFooter>
          <AvatarDropdown />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MenuButton;
