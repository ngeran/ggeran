interface Product {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  badgeText: string | null;
  referenceCode: string | null;
  status: string | null;
  sortOrder: number | null;
}

interface ProductShowcaseProps {
  products: Product[];
}

export default function ProductShowcase({ products }: ProductShowcaseProps) {
  const product = products[0];
  if (!product) return null;

  return (
    <section
      id="product"
      className="bg-lathe-charcoal border-y-4 border-steel-slate"
    >
      <div className="max-w-container-max mx-auto px-gutter py-margin">
        <div className="flex items-center gap-stack-md mb-stack-lg">
          <span className="font-mono text-sm uppercase text-machine-white bg-safety-orange px-2">
            PRODUCT_DETAILS
          </span>
          <div className="h-[2px] flex-grow bg-steel-slate" />
        </div>

        <div className="flex flex-col lg:flex-row gap-gutter">
          <div className="lg:w-1/2">
            <div className="border-4 border-machine-white p-1 relative group">
              <img
                className="w-full aspect-video object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000"
                src={product.imageUrl}
                alt={product.title}
              />
              {product.badgeText && (
                <div className="absolute top-4 right-4 z-20">
                  <span className="bg-machine-white text-lathe-charcoal px-3 py-1 font-mono text-xs uppercase font-bold">
                    {product.badgeText}
                  </span>
                </div>
              )}
              <div className="mt-stack-md p-stack-md border-t-2 border-steel-slate flex justify-between bg-background">
                <p className="font-mono text-xs opacity-50 uppercase">
                  {product.referenceCode || "REF: MASTER_001"}
                </p>
                <p className="font-mono text-xs text-safety-orange uppercase">
                  STATUS: QC_PASSED
                </p>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 flex flex-col justify-center space-y-stack-lg">
            <div>
              <h3 className="font-display text-2xl text-machine-white uppercase mb-stack-sm">
                {product.title}
              </h3>
              <p className="font-mono text-base text-on-background/80 leading-relaxed">
                {product.description}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-stack-md">
              <div className="border-2 border-steel-slate p-stack-md bg-surface-container hover:border-safety-orange transition-colors">
                <p className="font-mono text-xs text-on-surface/40 uppercase mb-1">
                  Durability
                </p>
                <p className="font-mono text-sm text-machine-white">
                  1000+ PLAYS
                </p>
              </div>
              <div className="border-2 border-steel-slate p-stack-md bg-surface-container hover:border-safety-orange transition-colors">
                <p className="font-mono text-xs text-on-surface/40 uppercase mb-1">
                  Fidelity
                </p>
                <p className="font-mono text-sm text-machine-white">
                  ANALOG MASTER
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
