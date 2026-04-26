// Home page composition
import Footer from "@/components/site/Footer";
import MarqueeBar from "@/components/site/MarqueeBar";
import Navbar from "@/components/site/Navbar";
import AboutPreview from "@/components/site/sections/AboutPreview";
import BeforeAfterShowcase from "@/components/site/sections/BeforeAfterShowcase";
import Contact from "@/components/site/sections/Contact";
import Doctors from "@/components/site/sections/Doctors";
import Hero from "@/components/site/sections/Hero";
import Services from "@/components/site/sections/Services";
import WhatsAppButton from "@/components/site/WhatsAppButton";
import { heroContent, servicesContent } from "@/content/home";

export default function Home() {
  return (
    <div data-testid="home-page" className="min-h-screen bg-bg text-ink">
      <MarqueeBar />
      <Navbar />
      <main className="relative overflow-hidden">
        <Hero content={heroContent} />
        <BeforeAfterShowcase />
        <AboutPreview />
        <Services
          heading={servicesContent.heading}
          items={servicesContent.items}
        />
        <Doctors />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
