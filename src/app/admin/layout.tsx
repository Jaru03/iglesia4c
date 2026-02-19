import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <main className="lg:ml-64 pt-14 lg:pt-0 p-4 lg:p-8">
        {children}
      </main>
    </div>
  );
}
