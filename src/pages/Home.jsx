import { Navbar, Hero, Features, Benefits, CTA, Footer } from "../components";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <Navbar />
      <Hero />
      <Features />
      <Benefits />
      <CTA />
      <Footer />
    </div>
  );
}
