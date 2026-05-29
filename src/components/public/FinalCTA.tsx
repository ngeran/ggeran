interface FinalCTAProps {
  settings: Record<string, string>;
}

export default function FinalCTA({ settings }: FinalCTAProps) {
  return (
    <section className="py-stack-lg px-gutter max-w-container-max mx-auto mb-margin">
      <div className="bg-safety-orange p-stack-lg border-4 border-lathe-charcoal flex flex-col md:flex-row items-center justify-between gap-stack-lg brutal-shadow">
        <div className="text-lathe-charcoal">
          <h2 className="font-display text-2xl uppercase mb-2">
            {settings.cta_heading || "READY TO PRINT YOUR PULSE?"}
          </h2>
          <p className="font-mono text-sm uppercase">
            {settings.cta_subtext || "CONFIGURING SESSIONS FOR"} {settings.session_q || "Q3 2024"}
          </p>
        </div>
        <a href="#contact" className="w-full md:w-auto bg-lathe-charcoal text-safety-orange px-stack-lg py-stack-lg font-display text-xl uppercase hover:bg-machine-white hover:text-lathe-charcoal transition-all text-center">
          {settings.cta_button_text || "START_NEW_CUT"}
        </a>
      </div>
    </section>
  );
}
