"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchFilterProps {
  placeholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

export function SearchFilter({ placeholder = "Buscar...", searchValue = "", onSearchChange }: SearchFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          type="search"
          placeholder={placeholder}
          defaultValue={searchValue}
          onChange={(e) => onSearchChange?.(e.target.value)}
          className="pl-9 pr-8 bg-white"
        />
        {searchValue && (
          <button
            onClick={() => onSearchChange?.("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
