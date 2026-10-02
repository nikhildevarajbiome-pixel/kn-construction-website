const colours: Record<string, string> = {
  New: "bg-blue-100 text-blue-900",
  Contacted: "bg-amber-100 text-amber-900",
  "In Progress": "bg-indigo-100 text-indigo-900",
  Completed: "bg-green-100 text-green-900",
  Cancelled: "bg-gray-200 text-gray-800",
};

export function StatusBadge({ status }: { status: string }) {
  return <span className={`inline-block px-2.5 py-1 text-xs font-semibold ${colours[status] ?? "bg-gray-100"}`}>{status}</span>;
}
