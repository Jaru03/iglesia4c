"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { getNavForRole, type NavItem } from "./navConfig";

type AppSidebarProps = {
  role: string;
  title: string;
  roleLabel: string;
  mobileHeaderLabel: string;
  departmentName?: string;
  isAtencionPrimaria?: boolean;
  hasDepartment?: boolean;
  unreadNotifications?: number;
  children: React.ReactNode;
};

function NavContent({
  navItems,
  onNavigate,
}: {
  navItems: NavItem[];
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav className="flex-1 p-4 space-y-4 overflow-y-auto">
        <div className="space-y-1">
          {navItems.map((item) => (
            <Button
              key={item.href}
              asChild
              variant={isActive(item.href, item.exact) ? "secondary" : "ghost"}
              className={`w-full justify-start ${
                isActive(item.href, item.exact)
                  ? ""
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
              onClick={onNavigate}
            >
              <Link href={item.href}>
                <item.icon className="h-4 w-4 mr-3" />
                {item.label}
              </Link>
            </Button>
          ))}
        </div>
      </nav>

      <Separator className="bg-slate-800" />

      <div className="p-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-900/20"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          <LogOut className="h-4 w-4 mr-3" />
          Cerrar Sesión
        </Button>
      </div>
    </>
  );
}

export function AppSidebar({
  role,
  title,
  roleLabel,
  mobileHeaderLabel,
  departmentName,
  isAtencionPrimaria,
  hasDepartment = true,
  children,
}: AppSidebarProps) {
  const [open, setOpen] = useState(false);

  // Build nav items on the client — icons (React components) never cross the server/client boundary
  const navItems = getNavForRole(role, isAtencionPrimaria)
    .filter((item) => item.href !== "/app/mi-disponibilidad" || hasDepartment);

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-slate-900 border-b border-slate-800 flex items-center px-4 z-50">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0 bg-slate-900 border-slate-800">
            <SheetHeader className="p-6 border-b border-slate-800">
              <SheetTitle className="text-white text-left">{title}</SheetTitle>
              <Badge variant="secondary" className="mt-2 w-fit">
                {roleLabel}
              </Badge>
            </SheetHeader>
            <div className="flex flex-col h-[calc(100vh-120px)]">
              <NavContent
                navItems={navItems}
                onNavigate={() => setOpen(false)}
              />
            </div>
          </SheetContent>
        </Sheet>
        <span className="ml-4 font-bold text-white">{mobileHeaderLabel}</span>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-slate-900 text-white flex-col h-screen fixed left-0 top-0 border-r border-slate-800">
        <div className="p-6">
          <h2 className="text-xl font-bold">{title}</h2>
          <Badge variant="secondary" className="mt-2">
            {roleLabel}
          </Badge>
        </div>
        <Separator className="bg-slate-800" />
        <div className="flex flex-col flex-1 overflow-hidden">
          <NavContent navItems={navItems} />
        </div>
      </aside>

      {/* Main Content */}
      <div className="min-h-screen bg-slate-50 lg:ml-64 pt-14 lg:pt-0">
        <main>{children}</main>
      </div>
    </>
  );
}
