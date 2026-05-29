"use client";

import { useState, useRef } from "react";

interface ImageUploadProps {
  currentUrl: string;
  label: string;
  aspectHint?: string;
  onSaved: (url: string) => void;
  settingKey: string;
}

export default function ImageUpload({
  currentUrl,
  label,
  aspectHint,
  onSaved,
  settingKey,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentUrl);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Only image files allowed");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("Max file size is 10MB");
      return;
    }

    setError("");
    setUploading(true);

    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);

    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      if (!res.ok) throw new Error("Upload failed");
      const { url } = await res.json();

      await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: settingKey, value: url }),
      });

      setPreview(url);
      onSaved(url);
    } catch {
      setError("Upload failed — try again");
      setPreview(currentUrl);
    } finally {
      setUploading(false);
    }
  }

  async function handleUrlSave(url: string) {
    setPreview(url);
    await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: settingKey, value: url }),
    });
    onSaved(url);
  }

  return (
    <div className="border-thin border-steel-slate bg-surface-container-low p-stack-md">
      <p className="font-mono text-xs text-on-surface/50 uppercase tracking-widest mb-2">
        {label}
      </p>

      {preview && (
        <div
          className="relative bg-lathe-charcoal border-thin border-steel-slate overflow-hidden mb-stack-sm"
          style={{ aspectRatio: aspectHint || "16/9" }}
        >
          <img
            src={preview}
            alt={label}
            className="w-full h-full object-cover"
          />
          {uploading && (
            <div className="absolute inset-0 bg-lathe-charcoal/60 flex items-center justify-center">
              <span className="font-mono text-xs text-safety-orange uppercase animate-pulse">
                UPLOADING...
              </span>
            </div>
          )}
        </div>
      )}

      {aspectHint && (
        <p className="font-mono text-[10px] text-on-surface/30 uppercase mb-2">
          Recommended aspect ratio: {aspectHint.replace("/", ":")}
        </p>
      )}

      <div className="flex items-center gap-stack-sm">
        <button
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="bg-safety-orange text-lathe-charcoal px-stack-md py-2 font-mono text-xs uppercase font-bold border-thin border-lathe-charcoal disabled:opacity-50"
        >
          {uploading ? "..." : "UPLOAD"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="hidden"
        />
        <span className="font-mono text-[10px] text-on-surface/30">
          or paste URL:
        </span>
        <input
          className="flex-1 bg-lathe-charcoal border-thin border-steel-slate text-machine-white font-mono text-xs px-2 py-1 focus:border-safety-orange outline-none"
          defaultValue={currentUrl}
          onBlur={(e) => {
            if (e.target.value && e.target.value !== currentUrl)
              handleUrlSave(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") (e.target as HTMLInputElement).blur();
          }}
        />
      </div>

      {error && (
        <p className="font-mono text-xs text-safety-orange mt-1">{error}</p>
      )}
    </div>
  );
}
