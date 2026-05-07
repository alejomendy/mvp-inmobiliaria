import Hero from "./components/Hero";
import Philosophy from "./components/Philosophy";
import PropertyGrid from "./components/PropertyGrid";
export default function Home() {
  return (
    <main className="bg-surface min-h-screen">
      <Hero />
      <Philosophy />
      <PropertyGrid />
    </main>
  );
}
