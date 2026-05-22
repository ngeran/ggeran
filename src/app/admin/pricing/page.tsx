"use client";

import { useEffect, useState } from "react";

interface PricingTier {
  id: string;
  format: string;
  minQuantity: number;
  maxQuantity: number;
  timePerSide: string;
  pricePerUnit: string;
  sortOrder: number | null;
}

export default function AdminPricing() {
  const [tiers, setTiers] = useState<PricingTier[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    format: "7-INCH",
    minQuantity: 1,
    maxQuantity: 50,
    timePerSide: "4min",
    pricePerUnit: "8.00",
    sortOrder: 0,
  });

  useEffect(() => {
    fetch("/api/admin/pricing")
      .then((r) => r.json())
      .then(setTiers);
  }, []);

  async function handleAdd() {
    await fetch("/api/admin/pricing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setShowForm(false);
    const res = await fetch("/api/admin/pricing");
    setTiers(await res.json());
  }

  async function handleDelete(id: string) {
    await fetch("/api/admin/pricing", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setTiers((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="p-margin">
      <div className="flex items-center gap-stack-md mb-stack-lg">
        <span className="font-mono text-sm uppercase text-machine-white bg-safety-orange px-2">
          $$$
        </span>
        <h1 className="font-display text-2xl text-machine-white uppercase">
          Pricing Matrix
        </h1>
        <div className="flex-grow" />
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-safety-orange text-lathe-charcoal px-stack-md py-2 font-mono text-xs uppercase font-bold border-thin border-lathe-charcoal brutal-shadow hover:brutal-shadow-active transition-all"
        >
          {showForm ? "CANCEL" : "+ ADD TIER"}
        </button>
      </div>

      {showForm && (
        <div className="mb-stack-lg border-thin border-safety-orange bg-surface-container-low p-stack-md">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-stack-sm">
            <select
              value={form.format}
              onChange={(e) => setForm({ ...form, format: e.target.value })}
              className="bg-lathe-charcoal border-thin border-steel-slate text-machine-white font-mono text-sm px-stack-sm py-2"
            >
              <option value="7-INCH">7-INCH</option>
              <option value="12-INCH">12-INCH</option>
            </select>
            <input
              type="number"
              value={form.minQuantity}
              onChange={(e) =>
                setForm({ ...form, minQuantity: Number(e.target.value) })
              }
              className="bg-lathe-charcoal border-thin border-steel-slate text-machine-white font-mono text-sm px-stack-sm py-2"
              placeholder="Min Qty"
            />
            <input
              type="number"
              value={form.maxQuantity}
              onChange={(e) =>
                setForm({ ...form, maxQuantity: Number(e.target.value) })
              }
              className="bg-lathe-charcoal border-thin border-steel-slate text-machine-white font-mono text-sm px-stack-sm py-2"
              placeholder="Max Qty"
            />
            <input
              value={form.timePerSide}
              onChange={(e) => setForm({ ...form, timePerSide: e.target.value })}
              className="bg-lathe-charcoal border-thin border-steel-slate text-machine-white font-mono text-sm px-stack-sm py-2"
              placeholder="Time/Side"
            />
            <input
              value={form.pricePerUnit}
              onChange={(e) =>
                setForm({ ...form, pricePerUnit: e.target.value })
              }
              className="bg-lathe-charcoal border-thin border-steel-slate text-machine-white font-mono text-sm px-stack-sm py-2"
              placeholder="Price"
            />
            <button
              onClick={handleAdd}
              className="bg-safety-orange text-lathe-charcoal font-mono text-xs uppercase font-bold"
            >
              SAVE
            </button>
          </div>
        </div>
      )}

      <div className="border-thin border-steel-slate bg-surface-container-low">
        <div className="grid grid-cols-[auto_1fr_1fr_1fr_1fr_auto] gap-0 bg-surface-container border-b-thin border-steel-slate px-stack-md py-stack-sm">
          <span className="font-mono text-[10px] text-on-surface/50 uppercase w-20">
            Format
          </span>
          <span className="font-mono text-[10px] text-on-surface/50 uppercase">
            Qty Range
          </span>
          <span className="font-mono text-[10px] text-on-surface/50 uppercase">
            Time/Side
          </span>
          <span className="font-mono text-[10px] text-on-surface/50 uppercase">
            Price/Unit
          </span>
          <span className="font-mono text-[10px] text-on-surface/50 uppercase">
            Order
          </span>
          <span className="font-mono text-[10px] text-on-surface/50 uppercase w-16">
            Actions
          </span>
        </div>

        {tiers.map((t) => (
          <div
            key={t.id}
            className="grid grid-cols-[auto_1fr_1fr_1fr_1fr_auto] gap-0 px-stack-md py-stack-sm border-b border-steel-slate/50 hover:bg-surface-container transition-colors items-center"
          >
            <span className="font-mono text-xs text-safety-orange w-20">
              {t.format}
            </span>
            <span className="font-mono text-sm text-machine-white">
              {t.minQuantity}–{t.maxQuantity}
            </span>
            <span className="font-mono text-sm text-on-surface">
              {t.timePerSide}
            </span>
            <span className="font-mono text-sm text-safety-orange font-bold">
              ${t.pricePerUnit}
            </span>
            <span className="font-mono text-sm text-on-surface/40">
              #{t.sortOrder || 0}
            </span>
            <button
              onClick={() => handleDelete(t.id)}
              className="font-mono text-[10px] text-on-surface/30 hover:text-safety-orange uppercase"
            >
              DEL
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
