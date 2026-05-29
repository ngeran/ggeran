import Counter from "./Counter";

interface HeroProps {
  settings: Record<string, string>;
}

export default function Hero({ settings }: HeroProps) {
  return (
    <section className="relative h-[921px] border-b-4 border-steel-slate overflow-hidden flex flex-col justify-end">
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
          src={settings.hero_image_url || ""}
          alt="Hero background"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <div className="absolute inset-0 groove-pattern opacity-30" />
      </div>

      <div className="relative z-10 px-margin pb-stack-lg max-w-container-max w-full mx-auto">
        <div className="border-l-4 border-safety-orange pl-stack-md mb-stack-lg">
          <p className="font-mono text-sm text-safety-orange uppercase tracking-widest mb-stack-sm">
            {settings.hero_protocol || "PROTOCOL: 3.45RPM // ANALOG_FIDELITY"}
          </p>
          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl text-machine-white uppercase leading-none font-bold">
            {settings.hero_title || "THE ANALOG PULSE"}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg items-end">
          <div className="bg-lathe-charcoal/80 backdrop-blur-md border-2 border-steel-slate p-stack-lg border-l-8 border-l-safety-orange">
            <p className="font-mono text-xs text-on-surface/50 uppercase mb-2">
              Cumulative Unit Output
            </p>
            <div className="flex items-baseline gap-stack-sm">
              <Counter target={Number(settings.counter_target || 50352)} />
              <span className="font-mono text-lg text-safety-orange font-bold">
                {settings.counter_label || "DISCS CUT"}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-start gap-stack-md">
            <p className="font-mono text-base md:text-lg text-machine-white max-w-md leading-relaxed">
              {settings.hero_description || ""}
            </p>
            <a
              href="#contact"
              className="bg-safety-orange text-lathe-charcoal px-stack-lg py-4 font-mono font-bold uppercase border-2 border-lathe-charcoal brutal-shadow active:brutal-shadow-active transition-all inline-block"
            >
              {settings.hero_button_text || "START YOUR CUT"}
            </a>
          </div>
        </div>

        <div className="mt-stack-lg flex items-center gap-stack-md">
          <div className="flex items-center gap-stack-sm">
            <div className="w-2 h-2 bg-green-500 animate-pulse" />
            <span className="font-mono text-xs text-on-surface/60 uppercase">
              {settings.lathe_status || "OPERATIONAL"}
            </span>
          </div>
          <span className="font-mono text-xs text-steel-slate">|</span>
          <span className="font-mono text-xs text-on-surface/60 uppercase">
            SESSION: {settings.session_q || "Q3 2024"}
          </span>
        </div>
      </div>
    </section>
  );
}
