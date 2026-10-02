import { requireAdmin } from "@/lib/auth";
import { company } from "@/config/company";

export const metadata = { title: "Website Settings" };

export default async function AdminSettings() {
  await requireAdmin();
  const rows: [string, string][] = [
    ["Company", company.name],
    ["Tagline", company.tagline],
    ["Phone", company.phoneDisplay],
    ["WhatsApp", company.whatsappDisplay],
    ["Address", company.fullAddress],
    ["Google Maps", company.mapsUrl],
    ["Email", company.email || "Not set. Email links are hidden."],
  ];
  return (
    <div>
      <h1 className="text-4xl">Website Settings</h1>
      <p className="mt-3 max-w-2xl text-grey">Company details come from <code>config/company.ts</code>. Edit that file and redeploy to change them. Set <code>email</code> there to show email links.</p>
      <dl className="mt-8 max-w-3xl divide-y divide-navy/10 border border-navy/10">
        {rows.map(([k, v]) => (
          <div key={k} className="grid gap-1 p-4 sm:grid-cols-3"><dt className="text-sm text-grey">{k}</dt><dd className="sm:col-span-2">{v}</dd></div>
        ))}
      </dl>
    </div>
  );
}
