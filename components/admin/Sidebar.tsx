"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FolderKanban, Inbox, LayoutDashboard, LogOut, Settings, Wrench } from "lucide-react";
import { signOutAction } from "@/app/admin/actions";
import { Logo } from "@/components/Logo";

const items = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/enquiries", label: "Enquiries", icon: Inbox },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/services", label: "Services", icon: Wrench },
  { href: "/admin/settings", label: "Website Settings", icon: Settings },
];

export function Sidebar({ email }: { email?: string }) {
  const pathname = usePathname();
  return (
    <aside className="bg-navy text-white md:sticky md:top-0 md:flex md:h-screen md:w-64 md:shrink-0 md:flex-col">
      <div className="flex items-center justify-between border-b border-white/10 p-5 md:block"><Logo /></div>
      <nav aria-label="Admin" className="flex gap-1 overflow-x-auto p-3 md:flex-1 md:flex-col md:overflow-visible">
        {items.map(({ href, label, icon: Icon }) => {
          const active = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
          return (
            <Link key={href} href={href} aria-current={active ? "page" : undefined} className={`flex shrink-0 items-center gap-3 px-4 py-3 text-sm ${active ? "bg-navy-2 text-gold" : "text-white/80 hover:bg-white/5"}`}>
              <Icon size={18} aria-hidden /> {label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-white/10 p-4">
        {email && <p className="mb-3 truncate text-xs text-white/60">{email}</p>}
        <form action={signOutAction}>
          <button type="submit" className="flex w-full items-center gap-3 px-4 py-3 text-sm text-white/80 hover:bg-white/5"><LogOut size={18} aria-hidden /> Logout</button>
        </form>
      </div>
    </aside>
  );
}
