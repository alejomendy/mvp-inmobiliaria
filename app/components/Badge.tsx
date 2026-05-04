
export default function Badge({ type }: { type: string }) {
  const isVenta = type.toLowerCase().includes("venta");
  return (
    <span
      className={`label-caps px-3.5 py-1.5 rounded-full ${
        isVenta
          ? "bg-[#C9A96E] !text-[#1A1714]"
          : "bg-[#8B9485]/90 backdrop-blur-sm !text-white"
      }`}
    >
      {isVenta ? "Venta" : "Alquiler"}
    </span>
  );
}
