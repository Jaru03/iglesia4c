"use client";

import { ReactNode, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { SearchContext } from "./search-context";

interface ListCardProps {
  title: string;
  filter?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function ListCard({ title, filter, children, className }: ListCardProps) {
  const [search, setSearch] = useState("");

  return (
    <SearchContext.Provider value={search}>
      <Card className={`shadow-md border-slate-200 ${className ?? ""}`}>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <CardTitle>{title}</CardTitle>
              {filter && <div className="flex flex-col sm:flex-row gap-3">{filter}</div>}
            </div>
            <div className="relative w-full sm:w-56">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </SearchContext.Provider>
  );
}
