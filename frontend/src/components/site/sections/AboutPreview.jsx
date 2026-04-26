// Homepage About Us preview - premium snapshot with founder profile and core values
import { aboutPage } from "@/content/about";
import { fadeUp, stagger } from "@/lib/motion";
import { motion } from "framer-motion";
import { ArrowRight, Award, Heart, ShieldCheck, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";

const VALUE_ICONS = {
  award: Award,
  heart: Heart,
  shield: ShieldCheck,
  stethoscope: Stethoscope,
};

export default function AboutPreview() {
  const topValues = aboutPage.values.slice(0, 3);

  return (
    <section
      id="about"
      data-testid="home-about"
      className="section-pad scroll-mt-24 bg-gradient-to-b from-bg to-accent/5"
    >
      <div className="container-x">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
        >
          <motion.span variants={fadeUp} className="eyebrow mb-4 justify-center">
            About Us
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-bnSerif text-3xl md:text-5xl text-ink leading-tight"
          >
            Trusted Care from <span className="italic text-gradient">Banani Clinic</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="font-bnSans text-ink-muted mt-5 leading-relaxed"
          >
            {aboutPage.intro}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-stretch">
          <motion.article
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 bg-white rounded-3xl overflow-hidden border border-line/60 shadow-lux"
          >
            <div className="aspect-[4/5] relative overflow-hidden">
              <img
                src={aboutPage.founder.image}
                alt={aboutPage.founder.imageAlt}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="font-bnSerif text-white text-xl leading-tight">
                  {aboutPage.founder.displayName}
                </p>
                <p className="font-bnSans text-white/85 text-[11px] uppercase tracking-[0.2em] mt-1">
                  {aboutPage.founder.role}
                </p>
              </div>
            </div>
          </motion.article>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="lg:col-span-3"
          >
            <div className="bg-white/85 backdrop-blur rounded-3xl border border-line/60 p-6 md:p-8">
              <motion.p
                variants={fadeUp}
                className="font-bnSans text-ink-muted leading-relaxed"
              >
                Banani Clinic combines advanced technology, specialist expertise, and patient-first care to deliver safe,
                comfortable, and confidence-restoring treatment.
              </motion.p>

              <motion.div
                variants={stagger}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-7"
              >
                {topValues.map((value) => {
                  const Icon = VALUE_ICONS[value.icon] || ShieldCheck;
                  return (
                    <motion.div key={value.title} variants={fadeUp} className="lux-card !p-5">
                      <div className="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center mb-3">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-bnSerif text-lg text-ink">{value.title}</h3>
                      <p className="font-bnSans text-sm text-ink-muted mt-2 leading-relaxed">
                        {value.desc}
                      </p>
                    </motion.div>
                  );
                })}
              </motion.div>

              <motion.div variants={fadeUp} className="mt-8">
                <Link to="/about" data-testid="home-about-cta" className="btn-outline-gold">
                  Learn More About Us <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
