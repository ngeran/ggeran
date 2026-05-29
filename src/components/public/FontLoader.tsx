"use client";

import { useEffect } from "react";

export default function FontLoader({
  displayFont,
  bodyFont,
}: {
  displayFont: string;
  bodyFont: string;
}) {
  useEffect(() => {
    document.documentElement.style.setProperty("--font-display-active", displayFont);
    document.documentElement.style.setProperty("--font-mono-active", bodyFont);
  }, [displayFont, bodyFont]);

  return (
    <style>{`
      .font-display { font-family: var(--font-display-active), var(--font-display), "Archivo Narrow", sans-serif !important; }
      .font-mono, body { font-family: var(--font-mono-active), var(--font-mono), "JetBrains Mono", monospace !important; }
    `}</style>
  );
}
