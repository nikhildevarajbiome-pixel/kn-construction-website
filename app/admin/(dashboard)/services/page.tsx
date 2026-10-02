import { requireAdmin } from "@/lib/auth";
import { services } from "@/config/company";

export const metadata = { title: "Services" };

export default async function AdminServices() {
  await requireAdmin();
  return (
    <div>
      <h1 className="text-4xl">Services</h1>
      <p className="mt-3 max-w-2xl text-grey">Services are defined in <code>config/company.ts</code>. Edit that file to change service names, descriptions or bullet points; the public pages and enquiry form update automatically.</p>
      <ul className="mt-8 space-y-3">
        {services.map((s) => (
          <li key={s.slug} className="border border-navy/10 p-4"><p className="font-semibold">{s.title}</p><p className="text-sm text-grey">/services/{s.slug}: {s.points.join(", ")}</p></li>
        ))}
      </ul>
    </div>
  );
}
