import { Sidebar } from "@/components/admin/Sidebar";
import { getAdminState, requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { state } = await getAdminState();
  if (state === "unconfigured") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-ivory p-6">
        <div className="max-w-lg border border-gold bg-white p-8">
          <h1 className="text-3xl">Supabase is not configured</h1>
          <p className="mt-3 text-grey">The admin dashboard needs a database. Copy .env.example to .env.local, add your Supabase URL and anon key, run supabase/schema.sql, and restart the dev server. See README.md.</p>
        </div>
      </main>
    );
  }
  const { email } = await requireAdmin();
  return (
    <div className="min-h-screen bg-white md:flex">
      <Sidebar email={email} />
      <main className="min-w-0 flex-1 p-5 sm:p-8 lg:p-10">{children}</main>
    </div>
  );
}
