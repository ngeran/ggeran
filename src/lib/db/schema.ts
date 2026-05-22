import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  decimal,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const pricingTiers = pgTable("pricing_tiers", {
  id: uuid("id").primaryKey().defaultRandom(),
  format: varchar("format", { length: 50 }).notNull(),
  minQuantity: integer("min_quantity").notNull(),
  maxQuantity: integer("max_quantity").notNull(),
  timePerSide: varchar("time_per_side", { length: 100 }).notNull(),
  pricePerUnit: decimal("price_per_unit", { precision: 10, scale: 2 }).notNull(),
  sortOrder: integer("sort_order").default(0),
});

export const specifications = pgTable("specifications", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  specNumber: varchar("spec_number", { length: 50 }).notNull(),
  icon: varchar("icon", { length: 100 }).notNull().default("wrench"),
  serialTag: varchar("serial_tag", { length: 100 }).notNull(),
  category: varchar("category", { length: 50 }).notNull(),
  active: boolean("active").default(true),
  sortOrder: integer("sort_order").default(0),
});

export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  badgeText: varchar("badge_text", { length: 100 }).default("SAMPLE_OUTPUT"),
  referenceCode: varchar("reference_code", { length: 100 }),
  status: varchar("status", { length: 20 }).default("published"),
  sortOrder: integer("sort_order").default(0),
});

export const settings = pgTable("settings", {
  id: uuid("id").primaryKey().defaultRandom(),
  key: varchar("key", { length: 255 }).unique().notNull(),
  value: text("value").notNull(),
});

export const inquiries = pgTable("inquiries", {
  id: uuid("id").primaryKey().defaultRandom(),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  senderEmail: varchar("sender_email", { length: 255 }),
  senderName: varchar("sender_name", { length: 255 }),
  attachmentUrl: text("attachment_url"),
  status: varchar("status", { length: 20 }).default("new"),
  createdAt: timestamp("created_at").defaultNow(),
});
