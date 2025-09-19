import { Loader } from "lucide-react";

const LoadingComponent = () => {
  return (
    <div
      className="flex h-full w-full items-center justify-center"
      role="status"
      aria-busy="true"
    >
      <Loader
        className="animate-spin text-gray-800"
        size={40}
        strokeWidth={2.5}
      />
    </div>
  );
};

export default LoadingComponent;
