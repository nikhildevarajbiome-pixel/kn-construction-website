"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { ENQUIRY_STATUSES } from "@/lib/validation";

const updateSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(ENQUIRY_STATUSES),
  notes: z.string().max(5000),
});

export async function signOutAction() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function updateEnquiryAction(formData: FormData) {
  await requireAdmin();
  const parsed = updateSchema.safeParse({
    id: formData.get("id"),
    status: formData.get("status"),
    notes: formData.get("notes") ?? "",
  });
  if (!parsed.success) redirect("/admin/enquiries?error=invalid");

  const { id, status, notes } = parsed.data;
  const supabase = createClient();
  const { error } = await supabase.from("enquiries").update({ status, admin_notes: notes.trim() || null }).eq("id", id);
  revalidatePath("/admin", "layout");
  redirect(`/admin/enquiries/${id}?${error ? "error=save" : "saved=1"}`);
}

export async function deleteEnquiryAction(formData: FormData) {
  await requireAdmin();
  const id = z.string().uuid().safeParse(formData.get("id"));
  if (!id.success) redirect("/admin/enquiries?error=invalid");
  const supabase = createClient();
  const { error } = await supabase.from("enquiries").delete().eq("id", id.data);
  revalidatePath("/admin", "layout");
  redirect(error ? `/admin/enquiries/${id.data}?error=delete` : "/admin/enquiries?deleted=1");
}
