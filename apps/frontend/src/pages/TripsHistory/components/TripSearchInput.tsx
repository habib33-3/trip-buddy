import { useEffect, useState } from "react";

import { useSearchParams } from "react-router";

import useDebounce from "@/hooks/useDebounce";

import { Input } from "@/ui/input";

const TripSearchInput = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultSearch = searchParams.get("search") ?? "";
  const [searchTerm, setSearchTerm] = useState(defaultSearch);

  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    const updated = new URLSearchParams(searchParams);
    if (debouncedSearch.trim()) {
      updated.set("search", debouncedSearch);
    } else {
      updated.delete("search");
    }
    setSearchParams(updated);
  }, [debouncedSearch, searchParams, setSearchParams]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="relative mx-auto mt-4 mb-2 w-9/12 px-2 py-3">
      <Input
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search trips..."
        className="w-full rounded-2xl border border-gray-300 bg-white px-5 py-3 pr-12 text-base shadow-sm transition-all placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none"
        type="search"
      />
    </div>
  );
};

export default TripSearchInput;
