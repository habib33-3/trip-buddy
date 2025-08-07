import { Link } from "react-router";

const Logo = () => {
  return (
    <div className="px-6 py-4">
      <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl">
        <Link
          to="/"
          className="flex gap-1"
        >
          <span className="bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent">
            Trip
          </span>
          <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Buddy
          </span>
        </Link>
      </h1>
    </div>
  );
};

export default Logo;
