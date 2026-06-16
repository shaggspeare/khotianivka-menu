"use client";

import { useEffect, useState } from "react";
import { SECTIONS, type SectionId } from "@/data/menu";

export function SectionNav() {
  const [activeId, setActiveId] = useState<SectionId>(SECTIONS[0].id);

  useEffect(() => {
    const sections = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null,
    );

    // Treat the section crossing the vertical middle of the viewport as active.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id as SectionId);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleClick = (id: SectionId) => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(id)?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <nav aria-label="Розділи меню" className="sticky top-0 z-10 bg-bg">
      <ul className="mx-auto flex max-w-xl gap-6 overflow-x-auto border-b border-line px-5 sm:px-8">
        {SECTIONS.map((section) => {
          const isActive = section.id === activeId;
          return (
            <li key={section.id} className="shrink-0">
              <button
                type="button"
                onClick={() => handleClick(section.id)}
                className={`flex h-14 items-center border-b-2 text-sm font-medium transition-[border-color,color] ${
                  isActive ? "border-accent text-ink" : "border-transparent text-muted"
                }`}
              >
                {section.title}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
