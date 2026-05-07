import WhatsAppIcon from "./WhatsAppIcon";

const DEFAULT_PHONE = "543584153649";

export function waLink(message: string, phoneNumber?: string) {
  const phone = phoneNumber || DEFAULT_PHONE;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

interface WhatsAppButtonProps {
  message?: string;
  label?: string;
  /** visual variant */
  variant?: "pill" | "full" | "ghost";
  className?: string;
  /** Número de teléfono (sin espacios ni guiones). Ej: 543584153649 */
  phoneNumber?: string;
}

export default function WhatsAppButton({
  message = "Quiero agendar una consulta por una propiedad.",
  label = "Consultanos por WhatsApp",
  variant = "pill",
  className = "",
  phoneNumber,
}: WhatsAppButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 bg-wa text-white font-bold tracking-widest uppercase transition-colors hover:bg-wa-dark";

  const variants: Record<string, string> = {
    pill: "text-[10px] md:text-xs px-6 py-3.5 rounded-full shadow-sm",
    full: "text-xs px-10 py-5 rounded-full shadow-lg w-full",
    ghost:
      "text-[10px] text-white/90 !bg-transparent hover:!bg-transparent hover:!text-white !shadow-none",
  };

  return (
    <a
      href={waLink(message, phoneNumber)}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${variants[variant]} ${className}`}
    >
      <WhatsAppIcon />
      {label}
    </a>
  );
}
