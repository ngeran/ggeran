"use client";

import { useEffect, useState } from "react";

interface Specification {
  id: string;
  title: string;
  description: string;
  specNumber: string;
  icon: string;
  serialTag: string;
  category: string;
  active: boolean | null;
  sortOrder: number | null;
}

export default function AdminSpecifications() {
  const [specs, setSpecs] = useState<Specification[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    specNumber: "",
    icon: "wrench",
    serialTag: "",
    category: "feature",
    sortOrder: 0,
  });

  useEffect(() => {
    fetch("/api/admin/specifications")
      .then((r) => r.json())
      .then(setSpecs);
  }, []);

  async function handleAdd() {
    await fetch("/api/admin/specifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setShowForm(false);
    setForm({
      title: "",
      description: "",
      specNumber: "",
      icon: "wrench",
      serialTag: "",
      category: "feature",
      sortOrder: 0,
    });
    const res = await fetch("/api/admin/specifications");
    setSpecs(await res.json());
  }

  async function handleDelete(id: string) {
    await fetch("/api/admin/specifications", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setSpecs((prev) => prev.filter((s) => s.id !== id));
  }

  async function toggleActive(spec: Specification) {
    await fetch("/api/admin/specifications", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...spec, active: !spec.active }),
    });
    setSpecs((prev) =>
      prev.map((s) => (s.id === spec.id ? { ...s, active: !s.active } : s))
    );
  }

  return (
    <div className="p-margin">
      <div className="flex items-center gap-stack-md mb-stack-lg">
        <span className="font-mono text-sm uppercase text-machine-white bg-safety-orange px-2">
          TEC
        </span>
        <h1 className="font-display text-2xl text-machine-white uppercase">
          Specifications
        </h1>
        <div className="flex-grow" />
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-safety-orange text-lathe-charcoal px-stack-md py-2 font-mono text-xs uppercase font-bold border-thin border-lathe-charcoal brutal-shadow hover:brutal-shadow-active transition-all"
        >
          {showForm ? "CANCEL" : "+ ADD SPEC"}
        </button>
      </div>

      {showForm && (
        <div className="mb-stack-lg border-thin border-safety-orange bg-surface-container-low p-stack-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-sm mb-stack-sm">
            <input
              value={form.specNumber}
              onChange={(e) => setForm({ ...form, specNumber: e.target.value })}
              className="bg-lathe-charcoal border-thin border-steel-slate text-machine-white font-mono text-sm px-stack-sm py-2"
              placeholder="Spec Number (e.g. 01_MATERIAL)"
            />
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="bg-lathe-charcoal border-thin border-steel-slate text-machine-white font-mono text-sm px-stack-sm py-2"
              placeholder="Title"
            />
            <input
              value={form.serialTag}
              onChange={(e) => setForm({ ...form, serialTag: e.target.value })}
              className="bg-lathe-charcoal border-thin border-steel-slate text-machine-white font-mono text-sm px-stack-sm py-2"
              placeholder="Serial Tag (e.g. SN: MAT-882)"
            />
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="bg-lathe-charcoal border-thin border-steel-slate text-machine-white font-mono text-sm px-stack-sm py-2"
            >
              <option value="feature">Feature</option>
              <option value="technical">Technical</option>
            </select>
          </div>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
            className="w-full bg-lathe-charcoal border-thin border-steel-slate text-machine-white font-mono text-sm px-stack-sm py-2 mb-stack-sm"
            placeholder="Description"
          />
          <button
            onClick={handleAdd}
            className="bg-safety-orange text-lathe-charcoal px-stack-md py-2 font-mono text-xs uppercase font-bold border-thin border-lathe-charcoal"
          >
            SAVE SPEC
          </button>
        </div>
      )}

      <div className="space-y-stack-sm">
        {specs.map((spec) => (
          <div
            key={spec.id}
            className={`border-thin border-steel-slate bg-surface-container-low p-stack-md ${
              spec.active ? "" : "opacity-40"
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-stack-sm mb-1">
                  <span className="font-mono text-[10px] text-safety-orange uppercase tracking-widest">
                    {spec.specNumber}
                  </span>
                  <span className="font-mono text-[10px] text-on-surface/30">
                    {spec.serialTag}
                  </span>
                  <span
                    className={`font-mono text-[10px] uppercase px-1 ${
                      spec.category === "feature"
                        ? "text-safety-orange bg-safety-orange/10"
                        : "text-warning-blue bg-warning-blue/10"
                    }`}
                  >
                    {spec.category}
                  </span>
                </div>
                <h4 className="font-display text-base text-machine-white uppercase">
                  {spec.title}
                </h4>
                <p className="font-mono text-xs text-on-surface/60 mt-1">
                  {spec.description}
                </p>
              </div>
              <div className="flex items-center gap-stack-sm">
                <button
                  onClick={() => toggleActive(spec)}
                  className={`font-mono text-[10px] uppercase px-2 py-1 border-thin ${
                    spec.active
                      ? "border-green-500 text-green-400"
                      : "border-steel-slate text-on-surface/30"
                  }`}
                >
                  {spec.active ? "ACTIVE" : "INACTIVE"}
                </button>
                <button
                  onClick={() => handleDelete(spec.id)}
                  className="font-mono text-[10px] text-on-surface/30 hover:text-safety-orange uppercase"
                >
                  DEL
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
