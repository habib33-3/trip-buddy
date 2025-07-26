import AuthModal from "./modal/AuthModal";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-3 py-7">
      <div className="">Logo</div>
      <div className="">
        <AuthModal />
      </div>
    </nav>
  );
};

export default Navbar;
