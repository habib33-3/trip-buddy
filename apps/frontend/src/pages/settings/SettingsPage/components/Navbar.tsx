import Logo from "@/shared/Logo";

const Navbar = () => {
  return (
    <header className="flex items-center justify-between border-b border-white/10 bg-slate-800/70 px-6 py-4 backdrop-blur-md">
      <Logo />
    </header>
  );
};

export default Navbar;
