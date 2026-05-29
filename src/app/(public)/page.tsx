import { getDb } from "@/lib/db";
import {
  pricingTiers,
  specifications,
  settings,
} from "@/lib/db/schema";
import { asc } from "drizzle-orm";
import FontLoader from "@/components/public/FontLoader";
import Header from "@/components/public/Header";
import Hero from "@/components/public/Hero";
import Introduction from "@/components/public/Introduction";
import PricingTable from "@/components/public/PricingTable";
import StatusTerminal from "@/components/public/StatusTerminal";
import ProductShowcase from "@/components/public/ProductShowcase";
import ContactForm from "@/components/public/ContactForm";
import FinalCTA from "@/components/public/FinalCTA";
import Footer from "@/components/public/Footer";

export const dynamic = "force-dynamic";

export default async function Page() {
  const db = getDb();
  const [pricing, specs, settingsList] = await Promise.all([
    db.select().from(pricingTiers).orderBy(asc(pricingTiers.sortOrder)),
    db.select().from(specifications).orderBy(asc(specifications.sortOrder)),
    db.select().from(settings),
  ]);

  const s = Object.fromEntries(settingsList.map((item) => [item.key, item.value]));

  return (
    <>
      <FontLoader
        displayFont={s.font_display || "Archivo Narrow"}
        bodyFont={s.font_body || "JetBrains Mono"}
      />
      <Header
        brandName={s.site_brand_name}
        version={s.nav_version}
        heroButtonText={s.hero_button_text}
      />
      <main className="w-full pt-20 min-h-screen">
        <Hero settings={s} />
        <Introduction settings={s} />

        <section id="pricing" className="py-margin px-gutter max-w-container-max mx-auto">
          <div className="flex items-center gap-stack-md mb-stack-lg">
            <span className="font-mono text-sm uppercase text-machine-white bg-safety-orange px-2">
              {s.pricing_section_title || "PRICING_MATRIX"}
            </span>
            <div className="h-[2px] flex-grow bg-steel-slate" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
            <PricingTable
              title={s.pricing_7inch_title || "01 // 7-INCH FORMAT"}
              note={s.pricing_7inch_note || "Editions limited to 100 copies maximum."}
              items={pricing.filter((p) => p.format === "7-INCH")}
            />
            <PricingTable
              title={s.pricing_12inch_title || "02 // 12-INCH FORMAT"}
              note={s.pricing_12inch_note || "Editions limited to 50 copies maximum."}
              items={pricing.filter((p) => p.format === "12-INCH")}
            />
          </div>
        </section>

        <StatusTerminal
          specifications={specs}
          sectionTitle={s.specs_section_title}
          techHeading={s.specs_section_subheading}
        />
        <ProductShowcase settings={s} />
        <ContactForm settings={s} />
        <FinalCTA settings={s} />
      </main>
      <Footer settings={s} />
    </>
  );
}
