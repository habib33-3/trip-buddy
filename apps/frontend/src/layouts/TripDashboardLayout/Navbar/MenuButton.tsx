import { useState } from "react";

import { Link } from "react-router";

import { Menu, X } from "lucide-react";

import { navLinks } from "@/constants/index";

import { Button } from "@/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/ui/sheet";

import AvatarDropdown from "./AvatarDropdown";

const MenuButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet
      open={open}
      onOpenChange={setOpen}
    >
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[250px]"
      >
        <div className="mb-4 flex items-center justify-between">
          <span className="text-lg font-semibold">Menu</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setOpen(false);
            }}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <Button
              asChild
              onClick={() => {
                setOpen(false);
              }}
              key={link.path}
            >
              <Link
                to={link.path}
                className="text-gray-700 hover:text-black"
              >
                {link.name}
              </Link>
            </Button>
          ))}
          <div className="mt-6">
            <AvatarDropdown />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MenuButton;
