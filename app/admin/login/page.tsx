import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";
import { Logo } from "@/components/Logo";
import { getAdminState } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function LoginPage({ searchParams }: { searchParams: { error?: string } }) {
  const { state } = await getAdminState();
  if (state === "ok") redirect("/admin");

  return (
    <main className="flex min-h-screen items-center justify-center bg-navy px-5 py-12">
      <div className="w-full max-w-md border border-gold/40 bg-navy-2 p-8 sm:p-10">
        <div className="flex justify-center"><Logo /></div>
        <h1 className="mt-8 text-center text-4xl text-white">Admin sign in</h1>
        {state === "unconfigured" && (
          <p role="alert" className="mt-6 border border-gold bg-navy p-4 text-sm text-white/90">
            Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local, then restart the server.
          </p>
        )}
        {searchParams.error === "forbidden" && (
          <p role="alert" className="mt-6 border border-red-400 bg-red-950/50 p-4 text-sm text-red-100">
            This account is signed in but is not an authorized administrator.
          </p>
        )}
        <LoginForm disabled={state === "unconfigured"} />
      </div>
    </main>
  );
}
