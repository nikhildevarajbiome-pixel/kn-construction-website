import Link from "next/link";
import { MessageCircle, Phone, Search } from "lucide-react";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { requireAdmin } from "@/lib/auth";
import { listEnquiries, PAGE_SIZE } from "@/lib/admin/enquiries";
import { formatDate, whatsappLink } from "@/lib/utils";
import { ENQUIRY_STATUSES, SERVICE_OPTIONS } from "@/lib/validation";

export const metadata = { title: "Enquiries" };

type SP = { q?: string; service?: string; status?: string; page?: string; deleted?: string; error?: string };

export default async function EnquiriesPage({ searchParams }: { searchParams: SP }) {
  await requireAdmin();
  const page = Math.max(1, Number(searchParams.page) || 1);
  const { rows, total, error } = await listEnquiries({ q: searchParams.q, service: searchParams.service, status: searchParams.status, page });
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const href = (p: number) => {
    const sp = new URLSearchParams();
    if (searchParams.q) sp.set("q", searchParams.q);
    if (searchParams.service) sp.set("service", searchParams.service);
    if (searchParams.status) sp.set("status", searchParams.status);
    sp.set("page", String(p));
    return `/admin/enquiries?${sp.toString()}`;
  };

  return (
    <div>
      <h1 className="text-4xl">Enquiries</h1>
      {searchParams.deleted && <p role="status" className="mt-4 bg-green-100 p-3 text-sm text-green-900">Enquiry deleted.</p>}
      {(error || searchParams.error) && <p role="alert" className="mt-4 bg-red-100 p-3 text-sm text-red-900">Something went wrong loading or changing enquiries. {error}</p>}

      <form method="get" className="mt-6 grid gap-3 md:grid-cols-[1fr_auto_auto_auto]">
        <div className="relative">
          <label htmlFor="q" className="sr-only">Search by name or phone</label>
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-grey" aria-hidden />
          <input id="q" name="q" defaultValue={searchParams.q} placeholder="Search by name or phone" className="field pl-9" />
        </div>
        <div>
          <label htmlFor="service" className="sr-only">Filter by service</label>
          <select id="service" name="service" defaultValue={searchParams.service ?? ""} className="field">
            <option value="">All services</option>
            {SERVICE_OPTIONS.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="status" className="sr-only">Filter by status</label>
          <select id="status" name="status" defaultValue={searchParams.status ?? ""} className="field">
            <option value="">All statuses</option>
            {ENQUIRY_STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <button type="submit" className="btn btn-navy">Apply</button>
      </form>

      <div className="mt-6 overflow-x-auto border border-navy/10">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="bg-ivory">
            <tr><th className="p-3">Customer Name</th><th className="p-3">Phone</th><th className="p-3">Service</th><th className="p-3">Date</th><th className="p-3">Status</th><th className="p-3">Actions</th></tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-navy/10 align-middle">
                <td className="p-3 font-semibold">{r.full_name}</td>
                <td className="p-3">{r.phone}</td>
                <td className="p-3">{r.service}</td>
                <td className="p-3">{formatDate(r.created_at)}</td>
                <td className="p-3"><StatusBadge status={r.status} /></td>
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <Link href={`/admin/enquiries/${r.id}`} className="font-semibold underline underline-offset-4">View</Link>
                    <a href={`tel:${r.phone}`} aria-label={`Call ${r.full_name}`} className="text-navy hover:text-gold-dark"><Phone size={18} /></a>
                    <a href={whatsappLink(r.phone)} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${r.full_name}`} className="text-navy hover:text-gold-dark"><MessageCircle size={18} /></a>
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && <tr><td colSpan={6} className="p-8 text-center text-grey">No enquiries match these filters.</td></tr>}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-center justify-between text-sm">
        <p className="text-grey">{total} enquiries, page {Math.min(page, pages)} of {pages}</p>
        <div className="flex gap-2">
          {page > 1 && <Link href={href(page - 1)} className="btn btn-outline-dark py-2">Previous</Link>}
          {page < pages && <Link href={href(page + 1)} className="btn btn-outline-dark py-2">Next</Link>}
        </div>
      </div>
    </div>
  );
}
