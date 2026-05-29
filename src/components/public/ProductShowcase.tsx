interface ProductShowcaseProps {
  settings: Record<string, string>;
}

export default function ProductShowcase({ settings }: ProductShowcaseProps) {
  const imageUrl = settings.product_image_url || "";
  const badge = settings.product_badge_text || "SAMPLE_OUTPUT";
  const refCode = settings.product_reference_code || "REF: MASTER_001";
  const qcStatus = settings.product_qc_status || "STATUS: QC_PASSED";

  return (
    <section id="product" className="bg-lathe-charcoal border-y-4 border-steel-slate">
      <div className="max-w-container-max mx-auto px-gutter py-margin">
        <div className="flex items-center gap-stack-md mb-stack-lg">
          <span className="font-mono text-sm uppercase text-machine-white bg-safety-orange px-2">
            {settings.product_section_title || "PRODUCT_DETAILS"}
          </span>
          <div className="h-[2px] flex-grow bg-steel-slate" />
        </div>

        <div className="flex flex-col lg:flex-row gap-gutter">
          <div className="lg:w-1/2">
            <div className="border-4 border-machine-white p-1 relative group">
              <div className="w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
                <img
                  className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000"
                  src={imageUrl}
                  alt={settings.product_title || "Product"}
                />
              </div>
              <div className="absolute top-4 right-4 z-20">
                <span className="bg-machine-white text-lathe-charcoal px-3 py-1 font-mono text-xs uppercase font-bold">
                  {badge}
                </span>
              </div>
              <div className="mt-stack-md p-stack-md border-t-2 border-steel-slate flex justify-between bg-background">
                <p className="font-mono text-xs opacity-50 uppercase">{refCode}</p>
                <p className="font-mono text-xs text-safety-orange uppercase">{qcStatus}</p>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 flex flex-col justify-center space-y-stack-lg">
            <div>
              <h3 className="font-display text-2xl text-machine-white uppercase mb-stack-sm">
                {settings.product_title || "The PETG Standard"}
              </h3>
              <p className="font-mono text-base text-on-background/80 leading-relaxed">
                {settings.product_description || ""}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-stack-md">
              <div className="border-2 border-steel-slate p-stack-md bg-surface-container hover:border-safety-orange transition-colors">
                <p className="font-mono text-xs text-on-surface/40 uppercase mb-1">
                  {settings.product_stat1_label || "Durability"}
                </p>
                <p className="font-mono text-sm text-machine-white">
                  {settings.product_stat1_value || "1000+ PLAYS"}
                </p>
              </div>
              <div className="border-2 border-steel-slate p-stack-md bg-surface-container hover:border-safety-orange transition-colors">
                <p className="font-mono text-xs text-on-surface/40 uppercase mb-1">
                  {settings.product_stat2_label || "Fidelity"}
                </p>
                <p className="font-mono text-sm text-machine-white">
                  {settings.product_stat2_value || "ANALOG MASTER"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
