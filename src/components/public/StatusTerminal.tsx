interface Specification {
  id: string;
  title: string;
  description: string;
  specNumber: string;
  icon: string;
  serialTag: string;
  category: string;
  active: boolean | null;
  sortOrder: number | null;
}

interface StatusTerminalProps {
  specifications: Specification[];
}

export default function StatusTerminal({ specifications }: StatusTerminalProps) {
  const features = specifications.filter((s) => s.category === "feature");
  const technical = specifications.filter((s) => s.category === "technical");

  return (
    <>
      {/* Features Grid — 3-column with borders */}
      <section
        id="specifications"
        className="bg-surface-container-low border-y-4 border-steel-slate"
      >
        <div className="max-w-container-max mx-auto px-gutter py-margin">
          <div className="flex items-center gap-stack-md mb-stack-lg">
            <span className="font-mono text-sm uppercase text-machine-white bg-safety-orange px-2">
              SPECIFICATIONS
            </span>
            <div className="h-[2px] flex-grow bg-steel-slate" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 border-2 border-steel-slate divide-y-2 md:divide-y-0 md:divide-x-2 divide-steel-slate">
            {features.map((spec) => (
              <div
                key={spec.id}
                className="p-stack-lg group hover:bg-lathe-charcoal transition-colors"
              >
                <div className="flex justify-between items-start mb-stack-lg">
                  <span className="font-mono text-xs text-safety-orange">
                    {spec.specNumber}
                  </span>
                  <span className="font-mono text-sm text-safety-orange">
                    {spec.icon === "layers" && "≡"}
                    {spec.icon === "waves" && "∿"}
                    {spec.icon === "update" && "↻"}
                  </span>
                </div>
                <h3 className="font-display text-xl text-machine-white uppercase mb-stack-md">
                  {spec.title}
                </h3>
                <p className="font-mono text-sm text-on-surface/70 mb-stack-lg">
                  {spec.description}
                </p>
                <div className="border-t border-steel-slate pt-4">
                  <span className="text-xs font-mono opacity-30 group-hover:opacity-100 transition-opacity">
                    {spec.serialTag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specs — 4-column grid */}
      {technical.length > 0 && (
        <section className="py-margin px-gutter max-w-container-max mx-auto">
          <div className="space-y-stack-lg">
            <div className="border-b-2 border-steel-slate pb-stack-md">
              <h4 className="font-mono text-sm text-safety-orange uppercase mb-stack-sm">
                Technical Specifications [Manual 01]
              </h4>
              <p className="font-mono text-lg text-machine-white leading-tight uppercase">
                The groove is the data. The lathe is the encoder.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-stack-md">
              {technical.map((spec) => (
                <div
                  key={spec.id}
                  className="border-2 border-steel-slate p-stack-md bg-surface-container hover:border-safety-orange transition-colors"
                >
                  <p className="font-mono text-xs text-on-surface/40 uppercase mb-2">
                    {spec.description}
                  </p>
                  <p className="font-mono text-sm text-machine-white uppercase">
                    {spec.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
