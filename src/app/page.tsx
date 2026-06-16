import { MenuHero } from "@/components/MenuHero";
import { MenuSection } from "@/components/MenuSection";
import { SectionNav } from "@/components/SectionNav";
import { SiteFooter } from "@/components/SiteFooter";
import { SECTIONS } from "@/data/menu";

export default function Home() {
  return (
    <>
      <MenuHero />
      <SectionNav />
      <main>
        {SECTIONS.map((section) => (
          <MenuSection key={section.id} section={section} />
        ))}
      </main>
      <SiteFooter />
    </>
  );
}
