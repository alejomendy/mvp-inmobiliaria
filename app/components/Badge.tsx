export default function Badge({ type }: { type: string }) {
  const isVenta = type.toLowerCase().includes("venta");
  const isTemporal = type.toLowerCase().includes("temporal");

  if (isVenta) {
    return (
      <span className="label-caps px-3.5 py-1.5 rounded-full bg-gold !text-ink">
        Venta
      </span>
    );
  }

  if (isTemporal) {
    return (
      <span className="label-caps px-3.5 py-1.5 rounded-full bg-ink !text-gold border border-gold/30">
        Alquiler Temporal
      </span>
    );
  }

  return (
    <span className="label-caps px-3.5 py-1.5 rounded-full bg-ink !text-gold border border-gold/30">
      Alquiler
    </span>
  );
}
