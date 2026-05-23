"use client";

import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";

const SearchBar = () => {
  const updateSearchParam = useUpdateSearchParams();
  return (
    <div className="relative hidden md:block">
      <Input
        id="search"
        placeholder="Search your interest"
        className="rounded-full bg-[#0e1015] border-[#1b1e25] text-white px-5 h-10 placeholder:text-zinc-500 focus-visible:ring-primary/40"
        size={40}
        onChange={(e) => updateSearchParam("searchTerm", e.target.value)}
      />
      <Search className="absolute right-3 top-2.5 text-zinc-500 size-4" />
    </div>
  );
};

export default SearchBar;
