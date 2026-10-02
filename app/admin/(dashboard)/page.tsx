import Link from "next/link";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { requireAdmin } from "@/lib/auth";
import { getStats, listEnquiries } from "@/lib/admin/enquiries";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Overview" };

export default async function OverviewPage() {
  await requireAdmin();
  const [stats, recent] = await Promise.all([getStats(), listEnquiries({ page: 1 })]);
  const cards = [
    ["Total Enquiries", stats.total],
    ["New", stats.fresh],
    ["Contacted", stats.contacted],
    ["In Progress", stats.progress],
    ["Completed", stats.completed],
  ] as const;

  return (
    <div>
      <h1 className="text-4xl">Overview</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map(([label, n]) => (
          <div key={label} className="border border-navy/10 border-t-2 border-t-gold p-5">
            <p className="text-sm text-grey">{label}</p>
            <p className="mt-2 font-serif text-4xl">{n}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 flex items-end justify-between">
        <h2 className="text-2xl">Recent enquiries</h2>
        <Link href="/admin/enquiries" className="text-sm font-semibold underline underline-offset-4">View all</Link>
      </div>
      <div className="mt-4 overflow-x-auto border border-navy/10">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-ivory"><tr><th className="p-3">Customer</th><th className="p-3">Service</th><th className="p-3">Date</th><th className="p-3">Status</th></tr></thead>
          <tbody>
            {recent.rows.slice(0, 5).map((r) => (
              <tr key={r.id} className="border-t border-navy/10">
                <td className="p-3"><Link href={`/admin/enquiries/${r.id}`} className="font-semibold underline-offset-4 hover:underline">{r.full_name}</Link></td>
                <td className="p-3">{r.service}</td>
                <td className="p-3">{formatDate(r.created_at)}</td>
                <td className="p-3"><StatusBadge status={r.status} /></td>
              </tr>
            ))}
            {recent.rows.length === 0 && <tr><td colSpan={4} className="p-6 text-center text-grey">No enquiries yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
