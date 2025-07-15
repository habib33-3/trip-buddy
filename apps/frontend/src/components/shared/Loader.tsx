import { Skeleton } from "@/ui/skeleton";

const Loader = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          // eslint-disable-next-line react-x/no-array-index-key, react/no-array-index-key
          key={i}
          className="space-y-3 rounded-xl border p-4 shadow-sm"
        >
          <Skeleton className="h-48 w-full rounded-lg" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
};

export default Loader;
