import AuthModal from "./modal/AuthModal";

const Navbar = () => {
  return (
    <header className="sticky top-0 w-full bg-transparent px-4 sm:px-6 lg:px-8">
      <nav className="flex items-center justify-between rounded-lg px-6 py-4 sm:px-8 sm:py-6 md:px-12">
        <div className="text-2xl font-bold text-gray-800">Logo</div>
        <div>
          <AuthModal />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
