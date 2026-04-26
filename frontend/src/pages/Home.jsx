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
import {
  heroContent,
  servicesContent,
  testimonialsContent,
} from "@/content/home";

export default function Home() {
  return (
    <div data-testid="home-page" className="min-h-screen bg-bg text-ink">
      <MarqueeBar />
      <Navbar />
      <main>
        <Hero content={heroContent} />
        <Services
          heading={servicesContent.heading}
          items={servicesContent.items}
        />
        <Doctors />
        <BeforeAfterShowcase />
        <Testimonials
          heading={testimonialsContent.heading}
          items={testimonialsContent.items}
        />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
