import {
  Navbar,
  Hero,
  Features,
  Benefits,
  CTA as CallToAction,
  Footer,
} from "@/components";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-background">
      <Navbar />

      <Hero />
      <Features />
      <Benefits />
      <CallToAction />
      <Footer />
    </div>
  );
}
