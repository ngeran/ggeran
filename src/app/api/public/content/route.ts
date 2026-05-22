import { getDb } from "@/lib/db";
import {
  pricingTiers,
  specifications,
  products,
  settings,
} from "@/lib/db/schema";
import { asc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
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

  return NextResponse.json({
    settings: siteSettings,
    pricing,
    specifications: specs,
    products: productList,
  });
}
