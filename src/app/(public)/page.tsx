import { getDb } from "@/lib/db";
import {
  pricingTiers,
  specifications,
  products,
  settings,
} from "@/lib/db/schema";
import { asc } from "drizzle-orm";
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
  const [pricing, specs, productList, settingsList] = await Promise.all([
    db.select().from(pricingTiers).orderBy(asc(pricingTiers.sortOrder)),
    db.select().from(specifications).orderBy(asc(specifications.sortOrder)),
    db.select().from(products).orderBy(asc(products.sortOrder)),
    db.select().from(settings),
  ]);

  const siteSettings = Object.fromEntries(
    settingsList.map((s) => [s.key, s.value])
  );

  return (
    <>
      <Header version={siteSettings.nav_version} />
      <main className="w-full pt-20 min-h-screen">
        <Hero settings={siteSettings} />
        <Introduction settings={siteSettings} />

        <section
          id="pricing"
          className="py-margin px-gutter max-w-container-max mx-auto"
        >
          <div className="flex items-center gap-stack-md mb-stack-lg">
            <span className="font-mono text-sm uppercase text-machine-white bg-safety-orange px-2">
              PRICING_MATRIX
            </span>
            <div className="h-[2px] flex-grow bg-steel-slate" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
            <PricingTable
              format="7-INCH"
              index={1}
              maxEdition={100}
              items={pricing.filter((p) => p.format === "7-INCH")}
            />
            <PricingTable
              format="12-INCH"
              index={2}
              maxEdition={50}
              items={pricing.filter((p) => p.format === "12-INCH")}
            />
          </div>
        </section>

        <StatusTerminal specifications={specs} />
        <ProductShowcase products={productList} />
        <ContactForm />
        <FinalCTA settings={siteSettings} />
      </main>
      <Footer />
    </>
  );
}
