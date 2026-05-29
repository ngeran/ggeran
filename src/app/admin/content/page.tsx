"use client";

import { useEffect, useState, useCallback } from "react";
import ImageUpload from "@/components/admin/ImageUpload";

interface Setting {
  id: string;
  key: string;
  value: string;
}

type Section = "fonts" | "header" | "hero" | "intro" | "specs" | "pricing" | "product" | "contact" | "cta" | "footer";

const SECTIONS: { id: Section; label: string; icon: string }[] = [
  { id: "fonts", label: "TYPOGRAPHY", icon: "Aa" },
  { id: "header", label: "HEADER / BRAND", icon: "NAV" },
  { id: "hero", label: "HERO SECTION", icon: "HER" },
  { id: "intro", label: "INTRODUCTION", icon: "INT" },
  { id: "specs", label: "SPECIFICATIONS", icon: "SPE" },
  { id: "pricing", label: "PRICING", icon: "$$$" },
  { id: "product", label: "PRODUCT", icon: "PRO" },
  { id: "contact", label: "CONTACT", icon: "COM" },
  { id: "cta", label: "FINAL CTA", icon: "CTA" },
  { id: "footer", label: "FOOTER", icon: "FOT" },
];

const FONT_OPTIONS = [
  "Archivo Narrow",
  "Inter",
  "Space Grotesk",
  "Bebas Neue",
  "Oswald",
  "Outfit",
  "DM Sans",
  "Sora",
  "Montserrat",
  "Playfair Display",
];

const MONO_OPTIONS = [
  "JetBrains Mono",
  "IBM Plex Mono",
  "Roboto Mono",
  "Source Code Pro",
  "Fira Code",
  "Space Mono",
  "Courier Prime",
  "Geist Mono",
];

const FIELD_DEFS: Record<Section, { key: string; label: string; type?: "text" | "textarea" | "select"; options?: string[] }[]> = {
  fonts: [
    { key: "font_display", label: "Display / Headline Font", type: "select", options: FONT_OPTIONS },
    { key: "font_body", label: "Body / Mono Font", type: "select", options: MONO_OPTIONS },
  ],
  header: [
    { key: "site_brand_name", label: "Brand Name" },
    { key: "nav_version", label: "Version Tag" },
  ],
  hero: [
    { key: "hero_protocol", label: "Protocol Line" },
    { key: "hero_title", label: "Main Headline" },
    { key: "hero_description", label: "Description", type: "textarea" },
    { key: "hero_button_text", label: "Button Text" },
    { key: "counter_target", label: "Counter Target Number" },
    { key: "counter_label", label: "Counter Label (e.g. DISCS CUT)" },
    { key: "lathe_status", label: "Status (e.g. OPERATIONAL)" },
    { key: "session_q", label: "Session Tag (e.g. Q3 2024)" },
  ],
  intro: [
    { key: "intro_heading", label: "Heading" },
    { key: "intro_body", label: "Body Text", type: "textarea" },
    { key: "intro_stat1_label", label: "Stat 1 Label" },
    { key: "intro_stat1_value", label: "Stat 1 Value" },
    { key: "intro_stat2_label", label: "Stat 2 Label" },
    { key: "intro_stat2_value", label: "Stat 2 Value" },
  ],
  specs: [
    { key: "specs_section_title", label: "Section Title" },
    { key: "specs_section_subheading", label: "Technical Specs Subheading" },
  ],
  pricing: [
    { key: "pricing_section_title", label: "Section Title" },
    { key: "pricing_7inch_title", label: "7-Inch Table Title" },
    { key: "pricing_7inch_note", label: "7-Inch Edition Note" },
    { key: "pricing_12inch_title", label: "12-Inch Table Title" },
    { key: "pricing_12inch_note", label: "12-Inch Edition Note" },
  ],
  product: [
    { key: "product_section_title", label: "Section Title" },
    { key: "product_badge_text", label: "Badge Text" },
    { key: "product_reference_code", label: "Reference Code" },
    { key: "product_qc_status", label: "QC Status" },
    { key: "product_title", label: "Product Title" },
    { key: "product_description", label: "Description", type: "textarea" },
    { key: "product_stat1_label", label: "Stat 1 Label" },
    { key: "product_stat1_value", label: "Stat 1 Value" },
    { key: "product_stat2_label", label: "Stat 2 Label" },
    { key: "product_stat2_value", label: "Stat 2 Value" },
  ],
  contact: [
    { key: "contact_section_title", label: "Section Title" },
    { key: "contact_heading", label: "Form Heading" },
    { key: "contact_body", label: "Description", type: "textarea" },
    { key: "contact_tip_label", label: "Tip Box Label" },
    { key: "contact_tip_text", label: "Tip Box Text" },
    { key: "contact_button_text", label: "Button Text" },
  ],
  cta: [
    { key: "cta_heading", label: "Heading" },
    { key: "cta_subtext", label: "Subtext Prefix" },
    { key: "cta_button_text", label: "Button Text" },
  ],
  footer: [
    { key: "footer_brand", label: "Brand Name" },
    { key: "footer_copyright", label: "Copyright Text" },
    { key: "footer_links", label: "Footer Links (Label|URL, one per line)", type: "textarea" },
  ],
};

export default function AdminContent() {
  const [settingsMap, setSettingsMap] = useState<Record<string, string>>({});
  const [activeSection, setActiveSection] = useState<Section>("fonts");
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((list: Setting[]) => {
        const map: Record<string, string> = {};
        for (const s of list) map[s.key] = s.value;
        setSettingsMap(map);
      });
  }, []);

  const save = useCallback(async (key: string, value: string) => {
    setSaving(key);
    await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value }),
    });
    setSettingsMap((prev) => ({ ...prev, [key]: value }));
    setSaving(null);
  }, []);

  const IMAGE_FIELDS: Record<string, { key: string; label: string; aspect: string }> = {
    hero: { key: "hero_image_url", label: "Hero Background Image", aspect: "16/9" },
    product: { key: "product_image_url", label: "Product Showcase Image", aspect: "16/9" },
  };

  const fields = FIELD_DEFS[activeSection];
  const img = IMAGE_FIELDS[activeSection];

  function renderField(f: (typeof fields)[0]) {
    const val = settingsMap[f.key] || "";
    const isSaving = saving === f.key;

    if (f.type === "textarea") {
      return (
        <div key={f.key} className="mb-stack-md">
          <label className="font-mono text-[10px] text-on-surface/50 uppercase tracking-widest block mb-1">
            {f.label}
          </label>
          <textarea
            value={val}
            onChange={(e) =>
              setSettingsMap((prev) => ({ ...prev, [f.key]: e.target.value }))
            }
            onBlur={() => save(f.key, val)}
            rows={4}
            className="w-full bg-lathe-charcoal border-thin border-steel-slate text-machine-white font-mono text-sm px-stack-sm py-2 focus:border-safety-orange focus:outline-none resize-y"
          />
          {isSaving && (
            <span className="font-mono text-[10px] text-safety-orange">SAVING...</span>
          )}
        </div>
      );
    }

    if (f.type === "select" && f.options) {
      return (
        <div key={f.key} className="mb-stack-md">
          <label className="font-mono text-[10px] text-on-surface/50 uppercase tracking-widest block mb-1">
            {f.label}
          </label>
          <select
            value={val}
            onChange={(e) => save(f.key, e.target.value)}
            className="w-full bg-lathe-charcoal border-thin border-steel-slate text-machine-white font-mono text-sm px-stack-sm py-2 focus:border-safety-orange focus:outline-none"
          >
            {f.options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
      );
    }

    return (
      <div key={f.key} className="mb-stack-md">
        <label className="font-mono text-[10px] text-on-surface/50 uppercase tracking-widest block mb-1">
          {f.label}
        </label>
        <input
          value={val}
          onChange={(e) =>
            setSettingsMap((prev) => ({ ...prev, [f.key]: e.target.value }))
          }
          onBlur={() => save(f.key, val)}
          onKeyDown={(e) => {
            if (e.key === "Enter") (e.target as HTMLInputElement).blur();
          }}
          className="w-full bg-lathe-charcoal border-thin border-steel-slate text-machine-white font-mono text-sm px-stack-sm py-2 focus:border-safety-orange focus:outline-none"
        />
        {isSaving && (
          <span className="font-mono text-[10px] text-safety-orange">SAVING...</span>
        )}
      </div>
    );
  }

  return (
    <div className="p-margin">
      <div className="flex items-center gap-stack-md mb-stack-lg">
        <span className="font-mono text-sm uppercase text-machine-white bg-safety-orange px-2">
          CMS
        </span>
        <h1 className="font-display text-2xl text-machine-white uppercase">
          Content Editor
        </h1>
      </div>

      <div className="flex gap-stack-md mb-stack-lg overflow-x-auto pb-2">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={`flex items-center gap-1 px-stack-sm py-2 font-mono text-xs uppercase tracking-widest whitespace-nowrap border-thin transition-colors ${
              activeSection === s.id
                ? "bg-safety-orange text-lathe-charcoal font-bold border-safety-orange"
                : "border-steel-slate text-on-surface/60 hover:text-machine-white hover:border-safety-orange"
            }`}
          >
            <span className="text-[10px] opacity-50">[{s.icon}]</span>
            {s.label}
          </button>
        ))}
      </div>

      <div className="border-thin border-steel-slate bg-surface-container-low p-stack-lg">
        <h2 className="font-display text-lg text-machine-white uppercase mb-stack-md border-b-thin border-steel-slate pb-stack-sm">
          {SECTIONS.find((s) => s.id === activeSection)?.label}
        </h2>

        {img && (
          <div className="mb-stack-lg">
            <ImageUpload
              currentUrl={settingsMap[img.key] || ""}
              label={img.label}
              aspectHint={img.aspect}
              settingKey={img.key}
              onSaved={(url) =>
                setSettingsMap((prev) => ({ ...prev, [img.key]: url }))
              }
            />
          </div>
        )}

        {fields.map((f) => renderField(f))}
      </div>
    </div>
  );
}
