"use client";

import { useEffect, useState } from "react";

interface Product {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  badgeText: string | null;
  referenceCode: string | null;
  status: string | null;
  sortOrder: number | null;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    imageUrl: "",
    badgeText: "SAMPLE_OUTPUT",
    referenceCode: "",
    sortOrder: 0,
  });

  useEffect(() => {
    fetch("/api/admin/products")
      .then((r) => r.json())
      .then(setProducts);
  }, []);

  async function handleAdd() {
    await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setShowForm(false);
    setForm({
      title: "",
      description: "",
      imageUrl: "",
      badgeText: "SAMPLE_OUTPUT",
      referenceCode: "",
      sortOrder: 0,
    });
    const res = await fetch("/api/admin/products");
    setProducts(await res.json());
  }

  async function handleDelete(id: string) {
    await fetch("/api/admin/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  async function toggleStatus(product: Product) {
    const newStatus = product.status === "published" ? "draft" : "published";
    await fetch("/api/admin/products", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...product, status: newStatus }),
    });
    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, status: newStatus } : p))
    );
  }

  return (
    <div className="p-margin">
      <div className="flex items-center gap-stack-md mb-stack-lg">
        <span className="font-mono text-sm uppercase text-machine-white bg-safety-orange px-2">
          OUT
        </span>
        <h1 className="font-display text-2xl text-machine-white uppercase">
          Products
        </h1>
        <div className="flex-grow" />
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-safety-orange text-lathe-charcoal px-stack-md py-2 font-mono text-xs uppercase font-bold border-thin border-lathe-charcoal brutal-shadow hover:brutal-shadow-active transition-all"
        >
          {showForm ? "CANCEL" : "+ ADD PRODUCT"}
        </button>
      </div>

      {showForm && (
        <div className="mb-stack-lg border-thin border-safety-orange bg-surface-container-low p-stack-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-sm mb-stack-sm">
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="bg-lathe-charcoal border-thin border-steel-slate text-machine-white font-mono text-sm px-stack-sm py-2"
              placeholder="Title"
            />
            <input
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              className="bg-lathe-charcoal border-thin border-steel-slate text-machine-white font-mono text-sm px-stack-sm py-2"
              placeholder="Image URL"
            />
            <input
              value={form.badgeText}
              onChange={(e) => setForm({ ...form, badgeText: e.target.value })}
              className="bg-lathe-charcoal border-thin border-steel-slate text-machine-white font-mono text-sm px-stack-sm py-2"
              placeholder="Badge Text"
            />
            <input
              value={form.referenceCode}
              onChange={(e) =>
                setForm({ ...form, referenceCode: e.target.value })
              }
              className="bg-lathe-charcoal border-thin border-steel-slate text-machine-white font-mono text-sm px-stack-sm py-2"
              placeholder="Reference Code"
            />
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
            SAVE PRODUCT
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-stack-md">
        {products.map((product) => (
          <div
            key={product.id}
            className={`border-thin border-steel-slate bg-surface-container-low ${
              product.status === "draft" ? "opacity-50" : ""
            }`}
          >
            <div className="aspect-video bg-lathe-charcoal overflow-hidden">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-full object-cover grayscale"
              />
            </div>
            <div className="p-stack-md">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-display text-sm text-machine-white uppercase">
                  {product.title}
                </h4>
                <span
                  className={`font-mono text-[10px] uppercase px-1 ${
                    product.status === "published"
                      ? "text-green-400"
                      : "text-on-surface/30"
                  }`}
                >
                  {product.status}
                </span>
              </div>
              <p className="font-mono text-[10px] text-on-surface/40 mb-stack-sm line-clamp-2">
                {product.description}
              </p>
              <div className="flex items-center gap-stack-sm">
                <button
                  onClick={() => toggleStatus(product)}
                  className="font-mono text-[10px] text-on-surface/40 hover:text-safety-orange uppercase border-thin border-steel-slate px-2 py-1"
                >
                  TOGGLE
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
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
