"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Activity, Shield, LogOut, Menu } from "lucide-react";
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

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/actividades", label: "Actividades", icon: Activity },
];

const adminItems = [
  { href: "/admin/equipo", label: "Gestión Equipo", icon: Shield },
];

function NavContent({ onNavigate }: { onNavigate?: () => void }) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const role = session?.user?.role;

  const isActive = (href: string) =>
    href === "/admin" ? pathname === href : pathname.startsWith(href);

  return (
    <>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Button
            key={item.href}
            asChild
            variant={isActive(item.href) ? "secondary" : "ghost"}
            className={`w-full justify-start ${isActive(item.href) ? "" : "text-slate-300 hover:text-white hover:bg-slate-800"}`}
            onClick={onNavigate}
          >
            <Link href={item.href}>
              <item.icon className="h-4 w-4 mr-3" />
              {item.label}
            </Link>
          </Button>
        ))}

        {role === "ADMIN" && (
          <>
            <Separator className="bg-slate-800 my-4" />
            {adminItems.map((item) => (
              <Button
                key={item.href}
                asChild
                variant={isActive(item.href) ? "secondary" : "ghost"}
                className={`w-full justify-start ${isActive(item.href) ? "" : "text-emerald-400 hover:text-emerald-300 hover:bg-emerald-900/20"}`}
                onClick={onNavigate}
              >
                <Link href={item.href}>
                  <item.icon className="h-4 w-4 mr-3" />
                  {item.label}
                </Link>
              </Button>
            ))}
          </>
        )}
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

export default function Sidebar() {
  const [open, setOpen] = useState(false);

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
              <SheetTitle className="text-white text-left">Casa de Dios</SheetTitle>
              <Badge variant="secondary" className="mt-2 w-fit">Admin</Badge>
            </SheetHeader>
            <div className="flex flex-col h-[calc(100vh-120px)]">
              <NavContent onNavigate={() => setOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>
        <span className="ml-4 font-bold text-white">Panel Admin</span>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-slate-900 text-white flex-col h-screen fixed left-0 top-0 border-r border-slate-800">
        <div className="p-6">
          <h2 className="text-xl font-bold">Casa de Dios</h2>
          <Badge variant="secondary" className="mt-2">Admin</Badge>
        </div>
        <Separator className="bg-slate-800" />
        <div className="flex flex-col flex-1">
          <NavContent />
        </div>
      </aside>
    </>
  );
}
