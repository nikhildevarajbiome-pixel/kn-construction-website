import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { enquirySchema, toE164 } from "@/lib/validation";

export const dynamic = "force-dynamic";

// Basic per-instance rate limit. Use an edge/WAF or Turnstile/reCAPTCHA for stronger protection.
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_HITS;
}

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { ok: false, code: "STORAGE_UNAVAILABLE", message: "Enquiry storage is not available right now. Please call or WhatsApp us instead." },
      { status: 503 },
    );
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) {
    return NextResponse.json({ ok: false, code: "RATE_LIMITED", message: "Too many enquiries. Please try again later or call us." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, code: "BAD_REQUEST", message: "Invalid request." }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success || parsed.data.website) {
    return NextResponse.json({ ok: false, code: "INVALID", message: "Please check the form and try again." }, { status: 400 });
  }

  const { fullName, phone, email, service, message } = parsed.data;
  const supabase = createClient();
  const { error } = await supabase.from("enquiries").insert({
    full_name: fullName,
    phone: toE164(phone),
    email: email || null,
    service,
    message,
  });

  if (error) {
    console.error("Enquiry insert failed:", error.message);
    return NextResponse.json({ ok: false, code: "DB_ERROR", message: "We could not save your enquiry. Please call or WhatsApp us." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
