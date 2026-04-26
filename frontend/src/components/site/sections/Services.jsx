// Services bento grid
import { motion } from "framer-motion";
import {
  Smile,
  Stethoscope,
  Sparkles,
  Crown,
  ShieldCheck,
  Activity,
} from "lucide-react";
import { fadeUp, stagger } from "@/lib/motion";

const SERVICE_ICONS = {
  teeth: Smile,
  implant: Crown,
  orthodontics: Activity,
  stethoscope: Stethoscope,
  shield: ShieldCheck,
  sparkles: Sparkles,
};

export default function Services({ heading, items }) {
  return (
    <section
      id="services"
      data-testid="home-services"
      className="section-pad scroll-mt-20"
    >
      <div className="container-x">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="max-w-2xl mb-16"
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
          <motion.p
            variants={fadeUp}
            className="font-bnSans text-ink-muted mt-5 leading-relaxed"
          >
            {heading.description}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {items.map((s, i) => {
            const Icon = SERVICE_ICONS[s.icon] || Smile;
            return (
              <motion.div
                key={s.title}
                variants={fadeUp}
                data-testid={`service-card-${i}`}
                className="lux-card group cursor-default"
              >
                <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold group-hover:text-white text-gold transition-all duration-500">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bnSerif text-xl text-ink mb-2">{s.title}</h3>
                <p className="font-bnSans text-sm text-ink-muted leading-relaxed">
                  {s.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
