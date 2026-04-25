// Generic content page layout for About / Privacy / Terms - clean editorial typography
import { motion } from "framer-motion";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import WhatsAppButton from "@/components/site/WhatsAppButton";
import PageTransition from "@/components/site/PageTransition";

export default function ContentPageLayout({ eyebrow, title, intro, children, testId }) {
  return (
    <PageTransition>
      <div data-testid={testId} className="min-h-screen bg-bg text-ink">
        <Navbar />
        <main>
          {/* Header */}
          <section className="pt-32 md:pt-40 pb-10 md:pb-14 border-b border-line/60 mesh-bg">
            <div className="container-x">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-3xl"
              >
                {eyebrow && <span className="eyebrow mb-4 md:mb-5">{eyebrow}</span>}
                <h1 className="font-bnSerif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ink leading-[1.15]">
                  {title}
                </h1>
                {intro && (
                  <p className="font-bnSans text-base md:text-lg text-ink-muted leading-relaxed mt-5 md:mt-6 max-w-2xl">
                    {intro}
                  </p>
                )}
              </motion.div>
            </div>
          </section>

          {/* Body */}
          <section className="section-pad">
            <div className="container-x">
              <motion.article
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="max-w-3xl mx-auto prose prose-ink"
              >
                {children}
              </motion.article>
            </div>
          </section>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </PageTransition>
  );
}
