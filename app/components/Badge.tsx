export default function Badge({ type }: { type: string }) {
  const isVenta = type.toLowerCase().includes("venta");
  const isTemporal = type.toLowerCase().includes("temporal");

  if (isVenta) {
    return (
      <span className="label-caps px-3.5 py-1.5 rounded-full bg-[#C9A96E] !text-[#1A1714]">
        Venta
      </span>
    );
  }

  if (isTemporal) {
    return (
      <span className="label-caps px-3.5 py-1.5 rounded-full bg-[#1C1814] !text-[#C9A96E] border border-[#C9A96E]/30">
        Alquiler Temporal
      </span>
    );
  }

  return (
    <span className="label-caps px-3.5 py-1.5 rounded-full bg-[#1C1814] !text-[#C9A96E] border border-[#C9A96E]/30">
      Alquiler
    </span>
  );
}
