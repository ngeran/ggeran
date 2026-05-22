export default function Footer() {
  return (
    <footer className="w-full py-margin px-gutter flex flex-col md:flex-row justify-between items-center gap-stack-md bg-surface-container-lowest border-t-4 border-steel-slate">
      <div className="flex flex-col items-center md:items-start gap-stack-sm">
        <span className="font-display text-xl text-safety-orange uppercase">
          LATHE_CUT_PRECISION
        </span>
        <p className="font-mono text-xs tracking-widest uppercase text-on-surface/30">
          &copy;2024 LATHE_CUT_PRECISION // ALL RIGHTS RESERVED
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-stack-lg">
        <a
          href="#"
          className="font-mono text-xs tracking-widest uppercase text-on-surface/30 hover:text-safety-orange transition-colors"
        >
          Terms of Service
        </a>
        <a
          href="#"
          className="font-mono text-xs tracking-widest uppercase text-on-surface/30 hover:text-safety-orange transition-colors"
        >
          Technical Manuals
        </a>
        <a
          href="#"
          className="font-mono text-xs tracking-widest uppercase text-on-surface/30 hover:text-safety-orange transition-colors"
        >
          Privacy Policy
        </a>
        <a
          href="#"
          className="font-mono text-xs tracking-widest uppercase text-on-surface/30 hover:text-safety-orange transition-colors"
        >
          Instagram
        </a>
        <a
          href="#"
          className="font-mono text-xs tracking-widest uppercase text-on-surface/30 hover:text-safety-orange transition-colors"
        >
          Twitter
        </a>
      </div>
      <div className="flex gap-stack-md">
        <div className="w-2 h-2 bg-safety-orange" />
        <div className="w-2 h-2 bg-steel-slate" />
        <div className="w-2 h-2 bg-steel-slate" />
      </div>
    </footer>
  );
}
