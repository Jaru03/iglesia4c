import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <div className="hidden md:block fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="flex-1 ml-0 md:ml-64 p-3 sm:p-4 md:p-8 w-full transition-all duration-300">
        {children}
      </main>
    </div>
  );
}
