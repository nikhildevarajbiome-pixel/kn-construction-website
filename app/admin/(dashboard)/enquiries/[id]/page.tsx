import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MessageCircle, Phone } from "lucide-react";
import { deleteEnquiryAction, updateEnquiryAction } from "@/app/admin/actions";
import { ConfirmDeleteButton } from "@/components/admin/ConfirmDeleteButton";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { requireAdmin } from "@/lib/auth";
import { getEnquiry } from "@/lib/admin/enquiries";
import { formatDate, whatsappLink } from "@/lib/utils";
import { ENQUIRY_STATUSES } from "@/lib/validation";

export const metadata = { title: "Enquiry" };

export default async function EnquiryDetail({ params, searchParams }: { params: { id: string }; searchParams: { saved?: string; error?: string } }) {
  await requireAdmin();
  if (!/^[0-9a-f-]{36}$/i.test(params.id)) notFound();
  const e = await getEnquiry(params.id);
  if (!e) notFound();

  return (
    <div className="max-w-3xl">
      <Link href="/admin/enquiries" className="inline-flex items-center gap-2 text-sm underline-offset-4 hover:underline"><ArrowLeft size={16} aria-hidden /> All enquiries</Link>
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <h1 className="text-4xl">{e.full_name}</h1>
        <StatusBadge status={e.status} />
      </div>
      {searchParams.saved && <p role="status" className="mt-4 bg-green-100 p-3 text-sm text-green-900">Changes saved.</p>}
      {searchParams.error && <p role="alert" className="mt-4 bg-red-100 p-3 text-sm text-red-900">The change could not be saved. Please try again.</p>}

      <div className="mt-6 flex flex-wrap gap-3">
        <a href={`tel:${e.phone}`} className="btn btn-navy"><Phone size={16} aria-hidden /> Call customer</a>
        <a href={whatsappLink(e.phone, `Hello ${e.full_name}, this is KN Construction and Builders regarding your enquiry.`)} target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark"><MessageCircle size={16} aria-hidden /> WhatsApp customer</a>
      </div>

      <dl className="mt-8 grid gap-5 border border-navy/10 p-6 sm:grid-cols-2">
        <div><dt className="text-sm text-grey">Phone</dt><dd>{e.phone}</dd></div>
        <div><dt className="text-sm text-grey">Email</dt><dd>{e.email ?? "Not provided"}</dd></div>
        <div><dt className="text-sm text-grey">Service</dt><dd>{e.service}</dd></div>
        <div><dt className="text-sm text-grey">Received</dt><dd>{formatDate(e.created_at)}</dd></div>
        <div className="sm:col-span-2"><dt className="text-sm text-grey">Message</dt><dd className="whitespace-pre-wrap">{e.message}</dd></div>
      </dl>

      <form action={updateEnquiryAction} className="mt-8 space-y-5">
        <input type="hidden" name="id" value={e.id} />
        <div>
          <label htmlFor="status" className="mb-1.5 block text-sm font-semibold">Status</label>
          <select id="status" name="status" defaultValue={e.status} className="field max-w-xs">
            {ENQUIRY_STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="notes" className="mb-1.5 block text-sm font-semibold">Internal notes (not visible to the customer)</label>
          <textarea id="notes" name="notes" rows={5} maxLength={5000} defaultValue={e.admin_notes ?? ""} className="field" />
        </div>
        <button type="submit" className="btn btn-navy">Save changes</button>
      </form>

      <form action={deleteEnquiryAction} className="mt-12 border-t border-navy/10 pt-6">
        <input type="hidden" name="id" value={e.id} />
        <ConfirmDeleteButton />
      </form>
    </div>
  );
}
