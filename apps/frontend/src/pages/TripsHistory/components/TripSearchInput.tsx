import { useEffect, useState } from "react";

import { useSearchParams } from "react-router";

import { Search } from "lucide-react";

import useDebounce from "@/hooks/useDebounce";

import { Input } from "@/ui/input";

const TripSearchInput = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultSearch = searchParams.get("search") ?? "";
  const [searchTerm, setSearchTerm] = useState(defaultSearch);

  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    const trimmedSearch = debouncedSearch.trim();
    const currentSearch = searchParams.get("search") ?? "";

    if (trimmedSearch && trimmedSearch !== currentSearch) {
      const updated = new URLSearchParams(searchParams);
      updated.set("search", trimmedSearch);
      setSearchParams(updated);
    } else if (!trimmedSearch && currentSearch) {
      const updated = new URLSearchParams(searchParams);
      updated.delete("search");
      setSearchParams(updated);
    }
  }, [debouncedSearch, searchParams, setSearchParams]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="relative mx-auto mt-6 mb-4 w-full max-w-3xl px-4">
      <Search
        className="absolute top-1/2 left-5 -translate-y-1/2 text-gray-400"
        size={20}
      />
      <Input
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search your trips..."
        type="search"
        className="w-full rounded-2xl border border-gray-300 px-12 py-5 text-gray-100 shadow-sm placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none"
      />
    </div>
  );
};

export default TripSearchInput;
