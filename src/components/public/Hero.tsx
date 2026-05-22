import Counter from "./Counter";

interface HeroProps {
  settings: Record<string, string>;
}

export default function Hero({ settings }: HeroProps) {
  const heroImage =
    settings.hero_image_url ||
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBa-JMxf1vPN3o3fet1-AFV1vrhs-ceZpK6IQQ3Qof_Gi1MEl2ALEcEt5l4s1Z6m3zbRIgXHfGtvY4Y8SwQiDibHFI1ewbR_U0oA3AYdxNcYy6DW5gZ-4CthO0-1O3w769QndXhTmcRLXV-84Elyu7rrDcFsv0nse-4pqzPToc_g8fd8SLB_bXnJ3r7Fx331ng3QkPXPvFWDJZ07O7o_ypzPevifC6CJTQEHBd9B8sI4h7fUxWs0rz-QDgxu6M-UUlmJrf-jVDAWqee";

  return (
    <section className="relative h-[921px] border-b-4 border-steel-slate overflow-hidden flex flex-col justify-end">
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
          src={heroImage}
          alt="Precision record-cutting lathe in operation"
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
                DISCS CUT
              </span>
            </div>
          </div>
          <div className="flex flex-col items-start gap-stack-md">
            <p className="font-mono text-base md:text-lg text-machine-white max-w-md leading-relaxed">
              {settings.hero_description ||
                "Hand-crafted sonic preservation through precision mechanical etching. Every groove is a signature of engineering excellence."}
            </p>
            <button className="bg-safety-orange text-lathe-charcoal px-stack-lg py-4 font-mono font-bold uppercase border-2 border-lathe-charcoal brutal-shadow active:brutal-shadow-active transition-all">
              START YOUR CUT
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
