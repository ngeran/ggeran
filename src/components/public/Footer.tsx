interface FooterProps {
  settings: Record<string, string>;
}

function parseFooterLinks(raw: string): { label: string; href: string }[] {
  if (!raw) return [];
  return raw.split(",").map((entry) => {
    const [label, href] = entry.split("|").map((s) => s.trim());
    return { label: label || "", href: href || "#" };
  });
}

export default function Footer({ settings }: FooterProps) {
  const links = parseFooterLinks(settings.footer_links || "");
  const brand = settings.footer_brand || "LATHE_CUT_PRECISION";
  const copyright = settings.footer_copyright || "©2024 LATHE_CUT_PRECISION // ALL RIGHTS RESERVED";

  return (
    <footer className="w-full py-margin px-gutter flex flex-col md:flex-row justify-between items-center gap-stack-md bg-surface-container-lowest border-t-4 border-steel-slate">
      <div className="flex flex-col items-center md:items-start gap-stack-sm">
        <span className="font-display text-xl text-safety-orange uppercase">{brand}</span>
        <p className="font-mono text-xs tracking-widest uppercase text-on-surface/30">{copyright}</p>
      </div>
      <div className="flex flex-wrap justify-center gap-stack-lg">
        {links.map((link, i) => (
          <a key={i} href={link.href} className="font-mono text-xs tracking-widest uppercase text-on-surface/30 hover:text-safety-orange transition-colors">
            {link.label}
          </a>
        ))}
      </div>
      <div className="flex gap-stack-md">
        <div className="w-2 h-2 bg-safety-orange" />
        <div className="w-2 h-2 bg-steel-slate" />
        <div className="w-2 h-2 bg-steel-slate" />
      </div>
    </footer>
  );
}
