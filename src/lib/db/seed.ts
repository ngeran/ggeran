import { getDb } from "./index";
import { users, settings, pricingTiers, specifications, products } from "./schema";
import bcrypt from "bcrypt";

async function seed() {
  console.log("Seeding database...");
  const db = getDb();

  const password = await bcrypt.hash("admin123", 10);

  await db.insert(users).values({
    email: "admin@lathecut.com",
    passwordHash: password,
    name: "Admin",
  }).onConflictDoNothing();

  await db.insert(settings).values([
    { key: "hero_title", value: "THE ANALOG PULSE" },
    { key: "hero_protocol", value: "PROTOCOL: 3.45RPM // ANALOG_FIDELITY" },
    { key: "hero_description", value: "Hand-crafted sonic preservation through precision mechanical etching. Every groove is a signature of engineering excellence." },
    { key: "counter_target", value: "50352" },
    { key: "lathe_status", value: "OPERATIONAL" },
    { key: "session_q", value: "Q3 2024" },
    { key: "hero_image_url", value: "https://lh3.googleusercontent.com/aida-public/AB6AXuBa-JMxf1vPN3o3fet1-AFV1vrhs-ceZpK6IQQ3Qof_Gi1MEl2ALEcEt5l4s1Z6m3zbRIgXHfGtvY4Y8SwQiDibHFI1ewbR_U0oA3AYdxNcYy6DW5gZ-4CthO0-1O3w769QndXhTmcRLXV-84Elyu7rrDcFsv0nse-4pqzPToc_g8fd8SLB_bXnJ3r7Fx331ng3QkPXPvFWDJZ07O7o_ypzPevifC6CJTQEHBd9B8sI4h7fUxWs0rz-QDgxu6M-UUlmJrf-jVDAWqee" },
    { key: "product_image_url", value: "https://lh3.googleusercontent.com/aida/ADBb0uizN8YYtci2LQuIID-4lgCGdON9alhf3l42nq4UejRDaGJrrzR9Y23SfRHkEOUyQUiz0O_S8G5_IxtgQczWkCnoo8uH1iNSh6MX4g_v39kBikFaZRcRG5R2DOTDzsfH2GZ_KspW3b3x3t2kEHNrqx3W1bIRPMuZnf9xpvv2pZtKDAWdvYxCTfwGV63bhIqLV05jqI8X31IEZe7Zo9qzLuB6Mw5ncXUQjdBMa7JH9KuFNt23BxrUAeEBII-s" },
    { key: "intro_heading", value: "Functional art, highbrow entertainment." },
    { key: "intro_body", value: "We operate at the intersection of microscopic accuracy and physical warmth. Our service bridges the gap for labels and creators requiring limited edition, high-durability physical media. From a single bespoke master to a run of 100 archival copies, we deliver the definitive analog experience." },
    { key: "nav_version", value: "VER_3.45.01" },
  ]).onConflictDoNothing();

  await db.insert(pricingTiers).values([
    { format: "7-INCH", minQuantity: 1, maxQuantity: 10, timePerSide: "Up to 4:30 min", pricePerUnit: "15.00", sortOrder: 1 },
    { format: "7-INCH", minQuantity: 11, maxQuantity: 50, timePerSide: "Up to 4:30 min", pricePerUnit: "12.50", sortOrder: 2 },
    { format: "7-INCH", minQuantity: 51, maxQuantity: 100, timePerSide: "Up to 4:30 min", pricePerUnit: "10.00", sortOrder: 3 },
    { format: "12-INCH", minQuantity: 1, maxQuantity: 10, timePerSide: "Up to 18:00 min", pricePerUnit: "35.00", sortOrder: 1 },
    { format: "12-INCH", minQuantity: 11, maxQuantity: 25, timePerSide: "Up to 18:00 min", pricePerUnit: "30.00", sortOrder: 2 },
    { format: "12-INCH", minQuantity: 26, maxQuantity: 50, timePerSide: "Up to 18:00 min", pricePerUnit: "25.00", sortOrder: 3 },
  ]).onConflictDoNothing();

  await db.insert(specifications).values([
    {
      title: "Hard Wearing PETG",
      description: "Unlike traditional acetate dubplates, our PETG discs are durable enough for thousands of plays without degradation. Industrial strength audio.",
      specNumber: "01_MATERIAL",
      icon: "layers",
      serialTag: "SN: MAT-882-PETG",
      category: "feature",
      sortOrder: 1,
    },
    {
      title: "Pure Analogue Transfer",
      description: "Direct signal path from source to stylus. No unnecessary conversion, ensuring the transient response and dynamic range remain uncompromised.",
      specNumber: "02_PROCESS",
      icon: "waves",
      serialTag: "SIGNAL: 24-BIT/96KHZ+",
      category: "feature",
      sortOrder: 2,
    },
    {
      title: "Futureproof Format",
      description: "Vinyl is the only storage medium with a 100+ year proven lifespan. Our cuts are built to survive the digital obsolescence cycle.",
      specNumber: "03_LONGEVITY",
      icon: "update",
      serialTag: "ARCHIVE_CLASS: OMEGA",
      category: "feature",
      sortOrder: 3,
    },
    {
      title: "Direct-Drive High Torque",
      description: "Drive System",
      specNumber: "DRIVE",
      icon: "settings",
      serialTag: "SPEC: DRIVE-01",
      category: "technical",
      sortOrder: 1,
    },
    {
      title: "Custom Stereo Ortofon",
      description: "Cutting Head",
      specNumber: "HEAD",
      icon: "album",
      serialTag: "SPEC: HEAD-01",
      category: "technical",
      sortOrder: 2,
    },
    {
      title: "33 / 45 / 78 Precision",
      description: "RPM Control",
      specNumber: "RPM",
      icon: "speed",
      serialTag: "SPEC: RPM-01",
      category: "technical",
      sortOrder: 3,
    },
    {
      title: "Diamond Pre-Heated T6",
      description: "Stylus Type",
      specNumber: "STYLUS",
      icon: "diamond",
      serialTag: "SPEC: STY-01",
      category: "technical",
      sortOrder: 4,
    },
  ]).onConflictDoNothing();

  await db.insert(products).values([
    {
      title: "The PETG Standard",
      description: "Our records are cut into heavy-duty PETG plastic. Unlike traditional acetate dubplates, which degrade after a dozen plays, PETG offers the same longevity as pressed vinyl. It is a futureproofed format—playable on any standard turntable for lifetimes to come.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDackml2ko56myHBZLkOpKaCbLEfeaceP7g-7TYjTPSx5zLC1mDqWV88PVHa8EbfDgaYeHAR7TpilBxliwAY5TcErGDoqVrgAYG8tsR8dE-JmB56M8REruJwvoGFVAKx8E8MfJ5X4BuJTxT5zokYtLTXJD_P3lrdBiNYm6zIyyXSZW3f9W76d-i5x_E6NCEYKfD4136oz0KwQVJqofk8g43-nuffHNsnLml_fAIrdFx9dwrhmkx_Z0i2NJv3sBbol6IcWVNU_Wgen0r",
      badgeText: "SAMPLE_OUTPUT_PETG",
      referenceCode: "REF: TRANSPARENT_8INCH_MASTER",
      status: "published",
      sortOrder: 1,
    },
  ]).onConflictDoNothing();

  console.log("Seeding complete.");
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
