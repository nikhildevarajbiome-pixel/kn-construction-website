"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { navigation, services } from "@/config/company";
import { Logo } from "./Logo";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    setOpen(false);
    setMenu(false);
  }, [pathname]);

  const linkClass = (href: string) =>
    `px-3 py-2 text-sm font-medium transition-colors hover:text-gold ${
      (href === "/" ? pathname === "/" : pathname.startsWith(href))
        ? "text-gold"
        : "text-white"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-white/15 bg-[#101D2E]/60 shadow-[0_4px_30px_rgba(0,0,0,0.12)] backdrop-blur-2xl backdrop-saturate-150">
      <div className="container-x flex h-20 items-center justify-between">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) =>
            "children" in item ? (
              <div
                key={item.href}
                className="relative flex items-center"
                onMouseEnter={() => setMenu(true)}
                onMouseLeave={() => setMenu(false)}
                onKeyDown={(e) => e.key === "Escape" && setMenu(false)}
              >
                <Link href={item.href} className={linkClass(item.href)}>
                  {item.label}
                </Link>

                <button
                  type="button"
                  aria-label="Toggle services menu"
                  aria-expanded={menu}
                  aria-controls="services-menu"
                  onClick={() => setMenu((v) => !v)}
                  className="-ml-2 p-2 text-white hover:text-gold"
                >
                  <ChevronDown
                    size={16}
                    className={
                      menu
                        ? "rotate-180 transition-transform"
                        : "transition-transform"
                    }
                  />
                </button>

                {menu && (
                  <ul
                    id="services-menu"
                    className="absolute left-0 top-full w-72 border border-white/10 border-t-gold bg-navy-2 py-2 shadow-xl"
                  >
                    {services.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/services/${s.slug}`}
                          className="block px-5 py-2.5 text-sm text-white hover:bg-white/5 hover:text-gold"
                        >
                          {s.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={linkClass(item.href)}
              >
                {item.label}
              </Link>
            ),
          )}

          <Link href="/contact#enquiry" className="btn btn-gold ml-4">
            Get a Quote
          </Link>
        </nav>

        <button
          type="button"
          className="p-2 text-white lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-white/10 bg-[#101D2E]/80 backdrop-blur-2xl lg:hidden"
        >
          <ul className="container-x py-4">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block py-3 text-base font-medium text-white"
                >
                  {item.label}
                </Link>

                {"children" in item && (
                  <ul className="mb-2 ml-3 border-l border-gold/50 pl-4">
                    {services.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/services/${s.slug}`}
                          className="block py-2 text-sm text-white/80"
                        >
                          {s.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}

            <li className="pt-3">
              <Link href="/contact#enquiry" className="btn btn-gold w-full">
                Get a Quote
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}