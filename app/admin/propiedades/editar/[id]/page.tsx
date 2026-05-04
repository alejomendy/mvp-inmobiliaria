import EditarContent from "./EditarContent";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://inmobiliaria-backend-wi6o.onrender.com/api";

export async function generateStaticParams() {
  try {
    const res = await fetch(`${API_URL}/propiedades`);
    if (!res.ok) return [{ id: "0" }];
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return [{ id: "0" }];
    return data.map((p: { id: number }) => ({ id: p.id.toString() }));
  } catch {
    return [{ id: "0" }];
  }
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditarPropiedadPage({ params }: PageProps) {
  const { id } = await params;
  return <EditarContent id={id} />;
}
