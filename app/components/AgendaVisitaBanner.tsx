import WhatsAppButton from "./WhatsAppButton";

export default function AgendaVisitaBanner() {
  return (
    <div className="bg-[#3A3833] rounded-[2.5rem] px-8 py-14 md:py-20 md:px-16 text-center">
      <span className="label-caps !text-white/60 block mb-4">¿Te interesa alguna?</span>
      <h2 className="title-serif text-4xl md:text-6xl text-white mb-6">Agendá una consulta</h2>
      <p className="text-white/70 font-sans text-base leading-relaxed max-w-xl mx-auto mb-10">
        Escribinos para agendar una cita así te asesoramos de manera personalizada.
      </p>
      <WhatsAppButton
        message="Quiero agendar una consulta por una propiedad."
        label="Agendar cita por WhatsApp"
        variant="full"
        className="!w-auto"
      />
    </div>
  );
}
