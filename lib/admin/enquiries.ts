import { createClient } from "@/lib/supabase/server";
import type { Enquiry } from "@/types";
import { ENQUIRY_STATUSES, type EnquiryStatus } from "@/lib/validation";

export const PAGE_SIZE = 10;

export interface EnquiryFilters {
  q?: string;
  service?: string;
  status?: string;
  page?: number;
}

/** Remove characters that have meaning inside a PostgREST filter string. */
const clean = (s: string) => s.replace(/[%,()*\\]/g, " ").trim();

export async function listEnquiries(filters: EnquiryFilters) {
  const supabase = createClient();
  const page = Math.max(1, filters.page ?? 1);
  let query = supabase.from("enquiries").select("*", { count: "exact" }).order("created_at", { ascending: false });

  const q = filters.q ? clean(filters.q) : "";
  if (q) query = query.or(`full_name.ilike.%${q}%,phone.ilike.%${q}%`);
  if (filters.service) query = query.eq("service", filters.service);
  if (filters.status && (ENQUIRY_STATUSES as readonly string[]).includes(filters.status)) {
    query = query.eq("status", filters.status);
  }

  const from = (page - 1) * PAGE_SIZE;
  const { data, count, error } = await query.range(from, from + PAGE_SIZE - 1);
  return { rows: (data ?? []) as Enquiry[], total: count ?? 0, page, error: error?.message };
}

export async function getEnquiry(id: string) {
  const supabase = createClient();
  const { data } = await supabase.from("enquiries").select("*").eq("id", id).maybeSingle();
  return (data as Enquiry | null) ?? null;
}

export async function getStats() {
  const supabase = createClient();
  const count = async (status?: EnquiryStatus) => {
    let q = supabase.from("enquiries").select("id", { count: "exact", head: true });
    if (status) q = q.eq("status", status);
    const { count: c } = await q;
    return c ?? 0;
  };
  const [total, fresh, contacted, progress, completed] = await Promise.all([
    count(),
    count("New"),
    count("Contacted"),
    count("In Progress"),
    count("Completed"),
  ]);
  return { total, fresh, contacted, progress, completed };
}
