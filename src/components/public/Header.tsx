"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header({
  brandName,
  version,
  heroButtonText,
}: {
  brandName?: string;
  version?: string;
  heroButtonText?: string;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-background border-b-4 border-steel-slate">
      <div className="flex justify-between items-center w-full px-gutter h-20 max-w-container-max mx-auto">
        <div className="flex items-center gap-stack-md">
          <span className="font-display text-xl tracking-tighter text-machine-white uppercase font-bold">
            {brandName || "LATHE_CUT_SYSTEMS"}
          </span>
          <span className="hidden md:block h-6 w-1 bg-safety-orange" />
          <span className="hidden md:block font-mono text-xs uppercase text-safety-orange">
            {version || "VER_3.45.01"}
          </span>
        </div>

        <div className="hidden md:flex items-center gap-stack-lg">
          <a href="#pricing" className="font-mono text-xs uppercase text-on-background hover:bg-surface-variant hover:text-safety-orange transition-colors px-2 py-1">
            Pricing
          </a>
          <a href="#product" className="font-mono text-xs uppercase text-on-background hover:bg-surface-variant hover:text-safety-orange transition-colors px-2 py-1">
            Product
          </a>
          <a href="#contact" className="font-mono text-xs uppercase text-on-background hover:bg-surface-variant hover:text-safety-orange transition-colors px-2 py-1">
            Contact
          </a>
        </div>

        <div className="flex items-center gap-stack-sm">
          <a href="#contact" className="hidden sm:block bg-safety-orange text-lathe-charcoal font-mono text-xs uppercase px-stack-lg py-stack-md border-2 border-lathe-charcoal hover:bg-machine-white transition-all active:translate-y-1">
            {heroButtonText || "START CUT"}
          </a>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-machine-white p-2" aria-label="Toggle menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-background border-t-2 border-steel-slate px-gutter pb-stack-md">
          <a href="#pricing" className="block py-stack-sm font-mono text-xs uppercase text-on-background" onClick={() => setMenuOpen(false)}>Pricing</a>
          <a href="#product" className="block py-stack-sm font-mono text-xs uppercase text-on-background" onClick={() => setMenuOpen(false)}>Product</a>
          <a href="#contact" className="block py-stack-sm font-mono text-xs uppercase text-on-background" onClick={() => setMenuOpen(false)}>Contact</a>
        </div>
      )}
    </nav>
  );
}
