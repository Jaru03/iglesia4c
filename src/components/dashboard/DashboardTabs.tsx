"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, type ReactNode } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Activity, Building2, Calendar, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ICON_MAP = {
  TrendingUp,
  Building2,
  Activity,
  Calendar,
} as const;

export type TabIconName = keyof typeof ICON_MAP;

export interface TabDef {
  id: string;
  label: string;
  icon?: TabIconName;
  content: ReactNode;
}

export interface DeptSelectorConfig {
  depts: { id: number; name: string }[];
  activeDeptId: number;
  basePath: string;
}

export interface DashboardTabsProps {
  title: string;
  subtitle?: string;
  tabs: TabDef[];
  defaultTab?: string;
  deptSelector?: DeptSelectorConfig;
}

export function DashboardTabs({
  title,
  subtitle,
  tabs,
  defaultTab,
  deptSelector,
}: DashboardTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const firstTab = tabs[0]?.id ?? "";
  const [activeTab, setActiveTab] = useState(defaultTab ?? firstTab);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && tabs.some((t) => t.id === tab)) {
      setActiveTab(tab);
    }
  }, [searchParams, tabs]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", value);
    router.push(`?${params.toString()}`);
  };

  const hoy = new Date();
  const fechaActual = format(hoy, "EEEE d 'de' MMMM, yyyy", { locale: es });

  return (
    <div className="max-w-7xl mx-auto p-4 pb-6">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
        {/* Header row */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          {/* Title + optional dept selector */}
          <div className="flex items-center gap-3 flex-wrap">
            {deptSelector && deptSelector.depts.length > 1 && activeTab !== "departamentos" && (
              <Tabs
                value={deptSelector.activeDeptId.toString()}
                onValueChange={(id) => {
                  const params = new URLSearchParams(searchParams.toString());
                  params.set("dept", id);
                  router.push(`${deptSelector.basePath}?${params.toString()}`);
                }}
              >
                <TabsList className="bg-white border shadow-sm h-9">
                  {deptSelector.depts.map((d) => (
                    <TabsTrigger key={d.id} value={d.id.toString()} className="text-sm px-3">
                      {d.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            )}
            <div>
              <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
              {subtitle && <p className="text-slate-500 text-sm">{subtitle}</p>}
            </div>
          </div>

          {/* Date badge — hidden on mobile */}
          <Card className="w-fit shadow-sm hidden lg:block">
            <CardContent className="px-4 py-2 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-600">{fechaActual}</span>
            </CardContent>
          </Card>

          {/* Tab switcher */}
          <TabsList className="bg-white border shadow-sm">
            {tabs.map(({ id, label, icon }) => {
              const Icon = icon ? ICON_MAP[icon] : undefined;
              return (
                <TabsTrigger key={id} value={id} className="gap-2">
                  {Icon && <Icon className="h-4 w-4" />}
                  {label}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>

        {/* Tab contents */}
        {tabs.map(({ id, content }) => (
          <TabsContent key={id} value={id}>
            {content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
