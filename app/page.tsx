import Nav from "./components/nav";
import Hero from "./components/Hero";
import Philosophy from "./components/Philosophy";
import PropertyGrid from "./components/PropertyGrid";

export default function Home() {
  return (
    <main className="bg-[#FAFAF7] min-h-screen">
      <Nav />
      <Hero />
      <Philosophy />
      <PropertyGrid />
    </main>
  );
}
