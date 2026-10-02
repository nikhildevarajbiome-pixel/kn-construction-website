export function cn(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" });
}

export function whatsappLink(phone: string, text?: string) {
  const digits = phone.replace(/\D/g, "").slice(-10);
  return `https://wa.me/91${digits}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}
