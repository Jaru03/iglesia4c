"use client";

export default function ExportJovenesCsv({ data }: { data: any[] }) {
  const handleExport = () => {
    const headers = ["ID", "Nombres", "Apellidos", "Documento", "Telefono", "Sede", "Estado"];
    const rows = data.map((j) => [
      j.id,
      j.nombres || "",
      j.apellidos || "",
      j.documento || "",
      j.telefono || "",
      j.sede || "General",
      j.activo ? "Activo" : "Inactivo",
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `jovenes-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      className="px-4 py-3 rounded-xl font-bold border text-sm whitespace-nowrap bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
    >
      Exportar CSV
    </button>
  );
}
