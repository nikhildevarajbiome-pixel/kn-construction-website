"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Phone,
  ArrowDown,
  ArrowUpRight,
} from "lucide-react";

import { company, heroSlides } from "@/config/company";
import { images } from "@/config/images";

const INTERVAL = 6500;

export function HeroSlider() {
  const slides = images.hero.slice(0, heroSlides.length);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  const touchX = useRef<number | null>(null);

  const go = useCallback(
    (n: number) => {
      if (slides.length === 0) return;
      setIndex((n + slides.length) % slides.length);
    },
    [slides.length],
  );

  useEffect(() => {
    setReduced(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  useEffect(() => {
    if (paused || reduced || slides.length <= 1) return;

    const t = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, INTERVAL);

    return () => clearInterval(t);
  }, [paused, reduced, slides.length]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured services"
      className="relative h-[calc(100svh-5rem)] min-h-[560px] overflow-hidden bg-[#101D2E] sm:min-h-[620px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;

        const dx = e.changedTouches[0].clientX - touchX.current;

        if (Math.abs(dx) > 50) {
          go(index + (dx < 0 ? 1 : -1));
        }

        touchX.current = null;
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(index - 1);
        if (e.key === "ArrowRight") go(index + 1);
      }}
    >
      {/* Background Slides */}
      {slides.map((img, i) => (
        <div
          key={`${img.src}-${i}`}
          role="group"
          aria-roledescription="slide"
          aria-label={`${i + 1} of ${slides.length}`}
          aria-hidden={i !== index}
          className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out ${
            i === index
              ? "opacity-100"
              : "pointer-events-none opacity-0"
          }`}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className={`object-cover transition-transform duration-[8000ms] ease-out ${
              i === index ? "scale-105" : "scale-100"
            }`}
          />

          {/* Cinematic overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#081321]/90 via-[#101D2E]/55 to-[#101D2E]/10" />

          <div className="absolute inset-0 bg-gradient-to-t from-[#101D2E]/80 via-transparent to-[#101D2E]/15" />

          <div className="absolute inset-0 bg-black/10" />
        </div>
      ))}

      {/* Main Content */}
      <div className="container-x relative z-10 flex h-full items-center">
        <div
          className={`w-full max-w-3xl pb-10 pt-10 sm:pt-14 ${
            index >= 0 ? "animate-rise" : ""
          }`}
        >
          {/* Eyebrow */}
          <div className="mb-5 flex items-center gap-3 sm:mb-7">
            <span className="h-px w-7 bg-[#C6A66B] sm:w-10" />

            <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#E4C990] sm:text-xs sm:tracking-[0.35em]">
              {company.name}
            </p>

            <span className="h-px w-7 bg-[#C6A66B]/50 sm:w-10" />
          </div>

          {/* Headline */}
          <h1 className="max-w-3xl font-serif text-[clamp(2.25rem,5.2vw,4.8rem)] font-medium leading-[1.05] tracking-[-0.035em] text-white">
            {heroSlides[index]?.headline}
          </h1>

          {/* Gold accent */}
          <div className="mt-5 h-[2px] w-16 bg-gradient-to-r from-[#E5CC97] to-transparent sm:mt-7 sm:w-20" />

          {/* Description */}
          <p className="mt-5 max-w-lg text-sm leading-7 text-white/75 sm:mt-7 sm:text-base sm:leading-8">
            {heroSlides[index]?.description}
          </p>

          {/* Buttons */}
          <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-9">
            <a
              href={company.phoneHref}
              tabIndex={0}
              className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-[#E1C58D]/70 bg-gradient-to-b from-[#E3CB98] to-[#B89455] px-5 py-3 text-xs font-semibold text-[#101D2E] shadow-[0_8px_30px_rgba(198,166,107,0.18)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(198,166,107,0.3)] sm:gap-3 sm:px-6 sm:py-3.5 sm:text-sm"
            >
              <Phone size={15} />
              Call Now
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>

            <a
              href={company.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 bg-white/[0.08] px-5 py-3 text-xs font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/50 hover:bg-white/15 sm:gap-3 sm:px-6 sm:py-3.5 sm:text-sm"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>

            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 py-3 text-xs font-medium text-white/80 transition hover:text-[#E4C990] sm:px-4 sm:text-sm"
            >
              Contact Us
              <ArrowUpRight size={14} />
            </Link>
          </div>

          {/* Experience indicator */}
          <div className="mt-8 flex items-center gap-3 border-l border-[#C6A66B]/60 pl-4 sm:mt-12 sm:gap-4">
            <span className="font-serif text-2xl text-[#E4C990] sm:text-3xl">
              10+
            </span>

            <span className="max-w-[160px] text-[9px] uppercase leading-4 tracking-[0.16em] text-white/65 sm:max-w-[170px] sm:text-[10px] sm:leading-5 sm:tracking-[0.2em]">
              Years of experience in construction
            </span>
          </div>
        </div>
      </div>

      {/* Side Navigation */}
      <button
        type="button"
        onClick={() => go(index - 1)}
        aria-label="Previous slide"
        className="absolute left-5 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/[0.07] text-white/80 backdrop-blur-xl transition hover:border-[#C6A66B] hover:bg-[#C6A66B] hover:text-[#101D2E] md:flex"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        type="button"
        onClick={() => go(index + 1)}
        aria-label="Next slide"
        className="absolute right-5 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/[0.07] text-white/80 backdrop-blur-xl transition hover:border-[#C6A66B] hover:bg-[#C6A66B] hover:text-[#101D2E] md:flex"
      >
        <ChevronRight size={20} />
      </button>

      {/* Bottom Controls */}
      <div className="absolute bottom-5 left-0 right-0 z-20 sm:bottom-7">
        <div className="container-x flex items-center justify-between">
          <div
            className="flex items-center gap-2"
            role="tablist"
            aria-label="Choose slide"
          >
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => go(i)}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === index
                    ? "w-12 bg-[#D9BD85]"
                    : "w-5 bg-white/35 hover:bg-white/70"
                }`}
              />
            ))}
          </div>

          <div className="hidden items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-white/55 sm:flex">
            <span>Scroll to explore</span>
            <ArrowDown size={15} className="animate-bounce text-[#D9BD85]" />
          </div>

          <span className="font-serif text-sm text-white/65">
            <span className="text-[#D9BD85]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="mx-2 text-white/30">/</span>
            {String(slides.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}