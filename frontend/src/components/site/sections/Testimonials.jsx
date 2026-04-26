// Patient testimonials - static, hand-curated
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { fadeUp, stagger } from "@/lib/motion";

export default function Testimonials({ heading, items }) {
  return (
    <section
      data-testid="home-testimonials"
      className="section-pad bg-gold/[0.04]"
    >
      <div className="container-x">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="max-w-2xl mb-14"
        >
          <motion.span variants={fadeUp} className="eyebrow mb-4">
            {heading.eyebrow}
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-bnSerif text-3xl md:text-5xl text-ink leading-tight"
          >
            {heading.title}{" "}
            <span className="italic text-gold">{heading.highlight}</span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {items.map((t, i) => (
            <motion.figure
              key={i}
              variants={fadeUp}
              data-testid={`testimonial-${i}`}
              className="lux-card relative"
            >
              <Quote className="w-8 h-8 text-gold/30 mb-4" />
              <blockquote className="font-bnSans text-ink leading-relaxed">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 pt-5 border-t border-line/60">
                <p className="font-bnSerif text-lg text-ink">{t.name}</p>
                <p className="font-bnSans text-xs text-gold uppercase tracking-widest mt-1">
                  {t.role}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
