interface IntroductionProps {
  settings: Record<string, string>;
}

export default function Introduction({ settings }: IntroductionProps) {
  return (
    <section className="py-margin px-gutter max-w-container-max mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        <div className="md:col-span-4 border-r-2 border-steel-slate pr-stack-lg">
          <h2 className="font-display text-3xl md:text-4xl text-machine-white uppercase leading-tight mb-stack-md">
            {settings.intro_heading || "Functional art, highbrow entertainment."}
          </h2>
          <div className="h-1 w-20 bg-safety-orange" />
        </div>
        <div className="md:col-span-8 flex flex-col gap-stack-lg">
          <p className="font-mono text-base md:text-lg text-on-background leading-relaxed">
            {settings.intro_body || ""}
          </p>
          <div className="grid grid-cols-2 gap-stack-lg border-t-2 border-steel-slate pt-stack-lg">
            <div>
              <p className="font-mono text-xs text-safety-orange uppercase mb-1">
                {settings.intro_stat1_label || "CAPACITY_RANGE"}
              </p>
              <p className="font-mono text-sm text-machine-white">
                {settings.intro_stat1_value || "01 - 100 COPIES"}
              </p>
            </div>
            <div>
              <p className="font-mono text-xs text-safety-orange uppercase mb-1">
                {settings.intro_stat2_label || "LATENCY_STATUS"}
              </p>
              <p className="font-mono text-sm text-machine-white">
                {settings.intro_stat2_value || "14 DAY TURNAROUND"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
