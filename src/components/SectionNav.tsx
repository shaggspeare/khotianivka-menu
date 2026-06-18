"use client";

import { useEffect, useState } from "react";
import { SECTIONS } from "@/data/menu";

const ALL_TABS = [
  ...SECTIONS.map((s) => ({ id: s.id, title: s.title })),
  { id: "payment", title: "Оплата" },
];

export function SectionNav() {
  const [activeId, setActiveId] = useState<string>(ALL_TABS[0].id);

  useEffect(() => {
    const sections = ALL_TABS.map((t) => document.getElementById(t.id)).filter(
      (el): el is HTMLElement => el !== null,
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(id)?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <nav aria-label="Розділи меню" className="sticky top-0 z-10 bg-bg">
      <ul className="mx-auto flex max-w-xl gap-6 overflow-x-auto border-b border-line px-5 sm:px-8">
        {ALL_TABS.map((tab) => {
          const isActive = tab.id === activeId;
          return (
            <li key={tab.id} className="flex items-center shrink-0">
              {tab.id === "payment" ? (
                <button
                  type="button"
                  onClick={() => handleClick(tab.id)}
                  className={`rounded border px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "border-accent bg-accent text-white"
                      : "border-accent text-accent"
                  }`}
                >
                  {tab.title}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleClick(tab.id)}
                  className={`flex h-14 items-center border-b-2 text-sm font-medium transition-[border-color,color] ${
                    isActive ? "border-accent text-ink" : "border-transparent text-muted"
                  }`}
                >
                  {tab.title}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
