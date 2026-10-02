import Link from "next/link";
import { company } from "@/config/company";

export function Logo({ light = true }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className="group flex items-center gap-3"
      aria-label={`${company.name} home`}
    >
      {/* Premium KN Monogram */}
      <span className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-sm border border-[#D5B779]/70 bg-gradient-to-br from-[#24364B] via-[#15263A] to-[#0C1726] shadow-[0_3px_15px_rgba(198,166,107,0.16)] transition-all duration-300 group-hover:border-[#E8D2A5] group-hover:shadow-[0_4px_22px_rgba(198,166,107,0.3)]">
        <span className="absolute inset-[3px] border border-[#C6A66B]/20" />

        <span className="relative bg-gradient-to-b from-[#F2DEAE] via-[#D4B474] to-[#A98548] bg-clip-text font-serif text-[27px] font-bold leading-none tracking-[-2px] text-transparent">
          KN
        </span>
      </span>

      {/* Company Name */}
      <span
        className={`flex flex-col justify-center leading-none ${
          light ? "text-white" : "text-navy"
        }`}
      >
        <span className="font-serif text-[17px] font-bold tracking-[0.015em] sm:text-[19px]">
          Construction
        </span>

        <span className="mt-1.5 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.25em] text-[#C6A66B] sm:text-[10px]">
          <span className="h-px w-4 bg-[#C6A66B]/70" />
          & Builders
          <span className="h-px w-4 bg-[#C6A66B]/70" />
        </span>
      </span>
    </Link>
  );
}