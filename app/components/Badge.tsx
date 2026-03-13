
export default function Badge({ type }: { type: string }) {
  const isVenta = type.toLowerCase().includes("venta");
  return (
    <span
      className={`label-caps px-3.5 py-1.5 rounded-full ${
        isVenta ? "bg-[#3A3833] !text-[#FAFAF7]" : "bg-[#8B9485] !text-white"
      }`}
    >
      {isVenta ? "Venta" : "Alquiler"}
    </span>
  );
}
