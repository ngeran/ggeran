interface PricingTier {
  id: string;
  format: string;
  minQuantity: number;
  maxQuantity: number;
  timePerSide: string;
  pricePerUnit: string;
  sortOrder: number | null;
}

interface PricingTableProps {
  format: string;
  index: number;
  items: PricingTier[];
  maxEdition: number;
}

export default function PricingTable({
  format,
  index,
  items,
  maxEdition,
}: PricingTableProps) {
  return (
    <div className="border-4 border-steel-slate bg-surface-container-low p-stack-lg">
      <h3 className="font-display text-xl text-machine-white mb-stack-md border-b-2 border-safety-orange pb-2 uppercase">
        0{index} // {format} FORMAT
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full font-mono text-sm text-left">
          <thead>
            <tr className="border-b border-steel-slate text-safety-orange uppercase">
              <th className="py-2">Quantity</th>
              <th className="py-2">Time/Side</th>
              <th className="py-2 text-right">Price (EST)</th>
            </tr>
          </thead>
          <tbody className="text-on-surface/70 divide-y divide-steel-slate/30">
            {items.map((item) => (
              <tr key={item.id}>
                <td className="py-3">
                  {item.minQuantity} - {item.maxQuantity} Units
                </td>
                <td className="py-3">{item.timePerSide}</td>
                <td className="py-3 text-right font-bold text-machine-white">
                  &euro;{item.pricePerUnit} ea
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 font-mono text-xs opacity-50 uppercase italic">
        Notes: Editions limited to {maxEdition} copies maximum.
      </p>
    </div>
  );
}
