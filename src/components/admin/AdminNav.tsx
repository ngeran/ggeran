"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const navItems = [
  { href: "/admin/content", label: "CONTENT", icon: "CMS" },
  { href: "/admin/pricing", label: "PRICING", icon: "$$$" },
  { href: "/admin/specifications", label: "SPECS", icon: "TEC" },
  { href: "/admin/products", label: "PRODUCTS", icon: "OUT" },
  { href: "/admin/inquiries", label: "INBOX", icon: "MSG" },
  { href: "/admin/settings", label: "SETTINGS", icon: "SYS" },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="w-64 min-h-screen bg-lathe-charcoal border-r-brutal border-steel-slate flex flex-col">
      <div className="p-stack-md border-b-thin border-steel-slate">
        <div className="flex items-center gap-stack-sm">
          <div className="w-3 h-3 bg-safety-orange" />
          <span className="font-display text-machine-white text-sm uppercase">
            LATHE_CUT
          </span>
        </div>
        <span className="font-mono text-[10px] text-on-surface/30 uppercase tracking-widest block mt-1">
          Control Panel v2.1
        </span>
      </div>

      <div className="flex-1 py-stack-sm">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-stack-sm px-stack-md py-stack-sm font-mono text-xs uppercase tracking-widest transition-colors ${
              pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href))
                ? "bg-safety-orange text-lathe-charcoal font-bold"
                : "text-on-surface/60 hover:text-machine-white hover:bg-surface-container"
            }`}
          >
            <span className="text-[10px] opacity-50">[{item.icon}]</span>
            {item.label}
          </Link>
        ))}
      </div>

      <div className="p-stack-md border-t-thin border-steel-slate">
        <button
          onClick={() => {
            signOut({ redirect: false });
            router.push("/admin");
          }}
          className="w-full text-left font-mono text-xs uppercase tracking-widest text-on-surface/40 hover:text-safety-orange transition-colors"
        >
          DISCONNECT
        </button>
      </div>
    </nav>
  );
}
