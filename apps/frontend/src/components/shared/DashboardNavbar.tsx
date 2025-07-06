import { Link } from "react-router";

const navPaths = [
  {
    name: "Trips",
    path: "/trips",
  },
  {
    name: "globes",
    path: "/globes",
  },
];

const DashboardNavbar = () => {
  return (
    <nav>
      <div className="flex">
        <h2>Dashboard</h2>
        <div className="flex">
          <div className="flex">
            {navPaths.map((path) => (
              <Link
                key={path.name}
                to={path.path}
              >
                {path.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
