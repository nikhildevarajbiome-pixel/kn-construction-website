"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { galleryCategories, images } from "@/config/images";

export function Gallery({ limit }: { limit?: number }) {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const filteredItems = images.gallery.filter(
    (g) => filter === "All" || g.category === filter
  );

  const items =
    limit === undefined ? filteredItems : filteredItems.slice(0, limit);

  useEffect(() => {
    if (active === null) return;

    closeRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);

      if (event.key === "ArrowRight") {
        setActive((current) =>
          current === null ? current : (current + 1) % items.length
        );
      }

      if (event.key === "ArrowLeft") {
        setActive((current) =>
          current === null
            ? current
            : (current - 1 + items.length) % items.length
        );
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [active, items.length]);

  const current = active === null ? null : items[active];

  return (
    <div>
      {/* Category Filters */}
      <div
        className="mb-8 flex flex-wrap gap-2 sm:mb-10"
        role="group"
        aria-label="Filter by category"
      >
        {["All", ...galleryCategories].map((category) => {
          const selected = filter === category;

          return (
            <button
              key={category}
              type="button"
              aria-pressed={selected}
              onClick={() => {
                setFilter(category);
                setActive(null);
              }}
              className={`min-h-10 border px-5 py-2 text-xs font-semibold transition-all duration-300 sm:text-sm ${
                selected
                  ? "border-[#101D2E] bg-[#101D2E] text-white"
                  : "border-[#D9D2C5] bg-transparent text-[#101D2E] hover:border-[#C6A66B] hover:bg-[#C6A66B]/10"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Gallery Grid */}
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
        {items.map((item, index) => (
          <li key={item.src}>
            <button
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Open image: ${item.category}`}
              className="group relative block w-full overflow-hidden bg-[#101D2E] text-left"
            >
              <div
                className={`relative ${
                  index % 4 === 0
                    ? "aspect-[4/5]"
                    : index % 4 === 1
                      ? "aspect-[4/3]"
                      : index % 4 === 2
                        ? "aspect-[3/4]"
                        : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#101D2E]/85 via-[#101D2E]/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Category and View Label */}
                <div className="absolute inset-x-0 bottom-0 flex translate-y-2 items-end justify-between p-5 opacity-90 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:p-6">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#D8BD88]">
                      Gallery
                    </p>

                    <h3 className="mt-2 font-serif text-xl text-white sm:text-2xl">
                      {item.category}
                    </h3>
                  </div>

                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/50 text-white transition-all duration-300 group-hover:border-[#C6A66B] group-hover:bg-[#C6A66B] group-hover:text-[#101D2E]"
                  >
                    ↗
                  </span>
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>

      {/* Full Screen Image Preview */}
      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${current.category} image preview`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#101D2E]/[0.97] p-4 backdrop-blur-xl sm:p-8"
          onClick={() => setActive(null)}
        >
          {/* Close */}
          <button
            ref={closeRef}
            type="button"
            aria-label="Close preview"
            onClick={() => setActive(null)}
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center border border-white/30 text-white transition-colors hover:border-[#C6A66B] hover:bg-[#C6A66B] hover:text-[#101D2E] sm:right-8 sm:top-8"
          >
            <X size={20} />
          </button>

          {/* Previous */}
          <button
            type="button"
            aria-label="Previous image"
            onClick={(event) => {
              event.stopPropagation();
              setActive((active! - 1 + items.length) % items.length);
            }}
            className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-white/30 text-white transition-colors hover:border-[#C6A66B] hover:bg-[#C6A66B] hover:text-[#101D2E] sm:left-6 sm:h-12 sm:w-12"
          >
            <ChevronLeft />
          </button>

          {/* Next */}
          <button
            type="button"
            aria-label="Next image"
            onClick={(event) => {
              event.stopPropagation();
              setActive((active! + 1) % items.length);
            }}
            className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-white/30 text-white transition-colors hover:border-[#C6A66B] hover:bg-[#C6A66B] hover:text-[#101D2E] sm:right-6 sm:h-12 sm:w-12"
          >
            <ChevronRight />
          </button>

          {/* Image */}
          <figure
            className="w-full max-w-6xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative mx-auto aspect-[4/3] max-h-[75vh] w-full">
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>

            <figcaption className="mt-5 text-center">
              <p className="font-serif text-xl text-white">
                {current.category}
              </p>

              <p className="mt-2 text-xs text-white/50">
                Explore our gallery
              </p>
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}