// Home page composition
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import Hero from "@/components/site/sections/Hero";
import Services from "@/components/site/sections/Services";
import Doctors from "@/components/site/sections/Doctors";
import BeforeAfterShowcase from "@/components/site/sections/BeforeAfterShowcase";
import Testimonials from "@/components/site/sections/Testimonials";
import Contact from "@/components/site/sections/Contact";

export default function Home() {
  return (
    <div data-testid="home-page" className="min-h-screen bg-bg text-ink">
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
    </div>
  );
}
