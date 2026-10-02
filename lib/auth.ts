import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export type AdminState = "unconfigured" | "anonymous" | "forbidden" | "ok";

/** Server-side check: valid session AND a row in public.admins. */
export async function getAdminState(): Promise<{ state: AdminState; email?: string }> {
  if (!isSupabaseConfigured()) return { state: "unconfigured" };
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { state: "anonymous" };
  const { data } = await supabase.from("admins").select("user_id").eq("user_id", user.id).maybeSingle();
  if (!data) return { state: "forbidden", email: user.email };
  return { state: "ok", email: user.email };
}

/** Call at the top of every admin page and server action. */
export async function requireAdmin() {
  const result = await getAdminState();
  if (result.state === "unconfigured" || result.state === "anonymous") redirect("/admin/login");
  if (result.state === "forbidden") redirect("/admin/login?error=forbidden");
  return result;
}
