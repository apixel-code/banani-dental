// Home page composition
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import MarqueeBar from "@/components/site/MarqueeBar";
import Hero from "@/components/site/sections/Hero";
import Services from "@/components/site/sections/Services";
import Doctors from "@/components/site/sections/Doctors";
import BeforeAfterShowcase from "@/components/site/sections/BeforeAfterShowcase";
import Testimonials from "@/components/site/sections/Testimonials";
import Contact from "@/components/site/sections/Contact";
import WhatsAppButton from "@/components/site/WhatsAppButton";
import PageTransition from "@/components/site/PageTransition";

export default function Home() {
  return (
    <PageTransition>
      <div data-testid="home-page" className="min-h-screen bg-bg text-ink">
        <MarqueeBar />
        <Navbar />
        <main>
          <Hero />
          <Services />
          <Doctors />
          <BeforeAfterShowcase />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </PageTransition>
  );
}
