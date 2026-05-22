"use client";

import { useEffect, useState } from "react";

interface Setting {
  id: string;
  key: string;
  value: string;
}

export default function AdminSettings() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then(setSettings);
  }, []);

  async function handleUpdate(key: string, value: string) {
    setSaving(key);
    await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value }),
    });
    setSaving(null);
  }

  async function handleAdd() {
    if (!newKey || !newValue) return;
    await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: newKey, value: newValue }),
    });
    setNewKey("");
    setNewValue("");
    const res = await fetch("/api/admin/settings");
    setSettings(await res.json());
  }

  async function handleDelete(key: string) {
    await fetch("/api/admin/settings", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key }),
    });
    setSettings((prev) => prev.filter((s) => s.key !== key));
  }

  return (
    <div className="p-margin">
      <div className="flex items-center gap-stack-md mb-stack-lg">
        <span className="font-mono text-sm uppercase text-machine-white bg-safety-orange px-2">
          SYS_CONFIG
        </span>
        <h1 className="font-display text-2xl text-machine-white uppercase">
          Settings
        </h1>
      </div>

      <div className="border-thin border-steel-slate bg-surface-container-low">
        <div className="grid grid-cols-[1fr_2fr_auto] gap-0 bg-surface-container border-b-thin border-steel-slate px-stack-md py-stack-sm">
          <span className="font-mono text-[10px] text-on-surface/50 uppercase tracking-widest">
            Key
          </span>
          <span className="font-mono text-[10px] text-on-surface/50 uppercase tracking-widest">
            Value
          </span>
          <span className="font-mono text-[10px] text-on-surface/50 uppercase tracking-widest">
            Actions
          </span>
        </div>

        {settings.map((s) => (
          <div
            key={s.id}
            className="grid grid-cols-[1fr_2fr_auto] gap-0 px-stack-md py-stack-sm border-b border-steel-slate/50 hover:bg-surface-container transition-colors"
          >
            <span className="font-mono text-xs text-safety-orange">
              {s.key}
            </span>
            <input
              defaultValue={s.value}
              onBlur={(e) => handleUpdate(s.key, e.target.value)}
              className="bg-transparent font-mono text-sm text-machine-white focus:outline-none focus:bg-lathe-charcoal px-1"
            />
            <div className="flex items-center gap-stack-sm">
              {saving === s.key && (
                <span className="font-mono text-[10px] text-safety-orange uppercase">
                  SAVING...
                </span>
              )}
              <button
                onClick={() => handleDelete(s.key)}
                className="font-mono text-[10px] text-on-surface/30 hover:text-safety-orange uppercase"
              >
                DEL
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-stack-lg border-thin border-steel-slate bg-surface-container-low p-stack-md">
        <h3 className="font-mono text-xs text-on-surface/50 uppercase tracking-widest mb-stack-sm">
          Add New Setting
        </h3>
        <div className="grid grid-cols-[1fr_2fr_auto] gap-stack-sm">
          <input
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
            className="bg-lathe-charcoal border-thin border-steel-slate text-machine-white font-mono text-sm px-stack-sm py-2 focus:border-safety-orange focus:outline-none"
            placeholder="SETTING_KEY"
          />
          <input
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            className="bg-lathe-charcoal border-thin border-steel-slate text-machine-white font-mono text-sm px-stack-sm py-2 focus:border-safety-orange focus:outline-none"
            placeholder="Value"
          />
          <button
            onClick={handleAdd}
            className="bg-safety-orange text-lathe-charcoal px-stack-md py-2 font-mono text-xs uppercase font-bold border-thin border-lathe-charcoal brutal-shadow hover:brutal-shadow-active transition-all"
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
}
