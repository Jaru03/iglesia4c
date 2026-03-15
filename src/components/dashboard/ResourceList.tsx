"use client";

import { ReactNode, useContext, useMemo, useState } from "react";
import { EmptyState } from "./EmptyState";
import { LucideIcon, Church, Users, Calendar, Activity, MessageSquare, MessageCircle, User, ClipboardCheck, Megaphone } from "lucide-react";
import { SearchContext } from "./search-context";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const iconMap: Record<string, LucideIcon> = {
  Church,
  Users,
  Calendar,
  Activity,
  MessageSquare,
  MessageCircle,
  User,
  ClipboardCheck,
  Megaphone,
};

interface ResourceListProps<T extends { id: number | string }> {
  items: T[];
  renderItem: (item: T) => ReactNode;
  emptyMessage?: string;
  emptyIconName?: string;
  searchFields?: string[];
  pageSize?: number;
}

export function ResourceList<T extends { id: number | string }>({
  items,
  renderItem,
  emptyMessage = "No hay resultados.",
  emptyIconName,
  searchFields = ["name"],
  pageSize = 10,
}: ResourceListProps<T>) {
  const search = useContext(SearchContext);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredItems = useMemo(() => {
    if (!search.trim()) return items;
    const searchLower = search.toLowerCase();
    return items.filter((item) => {
      for (const field of searchFields) {
        const value = getNestedValue(item, field);
        if (value && String(value).toLowerCase().includes(searchLower)) {
          return true;
        }
      }
      return false;
    });
  }, [items, search, searchFields]);

  const totalPages = Math.ceil(filteredItems.length / pageSize);
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredItems.slice(start, start + pageSize);
  }, [filteredItems, currentPage, pageSize]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {filteredItems.length === 0 ? (
        <EmptyState message={emptyMessage} icon={emptyIconName ? iconMap[emptyIconName] : undefined} />
      ) : (
        <>
          <div className="divide-y divide-slate-100">
            {paginatedItems.map((item) => (
              <div key={item.id} className="py-4 first:pt-0 last:pb-0">
                {renderItem(item)}
              </div>
            ))}
          </div>
          {totalPages > 1 && (
            <Pagination className="mt-6">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(currentPage - 1);
                    }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(page);
                      }}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(currentPage + 1);
                    }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </div>
  );
}

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce((acc: unknown, part: string) => {
    if (acc && typeof acc === "object") {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj);
}
