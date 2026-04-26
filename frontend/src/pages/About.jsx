// About Us page - includes Banani Clinic specialization, cleft lip & palate, filariasis
import ContentPageLayout from "./ContentPageLayout";
import { motion } from "framer-motion";
import { Award, Heart, Stethoscope, ShieldCheck } from "lucide-react";
import HashLink from "@/components/site/HashLink";
import { aboutPage } from "@/content/about";

const VALUE_ICONS = {
  award: Award,
  heart: Heart,
  shield: ShieldCheck,
  stethoscope: Stethoscope,
};

function RichText({ content }) {
  return content.map((part, index) => {
    if (!part.strong) return <span key={index}>{part.text}</span>;

    return (
      <strong key={index} className="text-ink">
        {part.text}
      </strong>
    );
  });
}

export default function About() {
  const { founder, values, sections, cta } = aboutPage;

  return (
    <ContentPageLayout
      testId={aboutPage.testId}
      eyebrow={aboutPage.eyebrow}
      title={aboutPage.title}
      intro={aboutPage.intro}
      sections={sections}
      afterSections={
        <div className="mt-14 not-prose text-center bg-gradient-to-br from-gold/10 to-accent/10 border border-line/50 rounded-3xl p-8 md:p-12">
          <h3 className="font-bnSerif text-2xl md:text-3xl text-ink">
            {cta.title}
          </h3>
          <p className="font-bnSans text-ink-muted mt-3 max-w-xl mx-auto">
            {cta.desc}
          </p>
          <HashLink
            to={cta.href}
            className="btn-gold mt-7 inline-flex cursor-pointer"
          >
            {cta.label}
          </HashLink>
        </div>
      }
    >
      {/* Lead doctor */}
      <h2 className="font-bnSerif text-2xl md:text-3xl text-ink mt-0 mb-6 not-prose">
        {founder.sectionTitle}
      </h2>

      {/* Owner photo + bio */}
      <div className="not-prose grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="md:col-span-2"
        >
          <div className="relative rounded-2xl overflow-hidden bg-white border border-line/50 shadow-lux">
            <div className="aspect-[3/4]">
              <img
                src={founder.image}
                alt={founder.imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent p-5 text-white">
              <p className="font-enSerif text-lg leading-tight">
                {founder.displayName}
              </p>
              <p className="font-bnSans text-[10px] uppercase tracking-[0.2em] text-accent-soft mt-1">
                {founder.role}
              </p>
            </div>
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur rounded-full px-3 py-1 text-[10px] uppercase tracking-widest font-bnSans text-accent flex items-center gap-1.5">
              <Award className="w-3 h-3" /> {founder.badge}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="md:col-span-3 flex flex-col justify-center"
        >
          {founder.bio.map((paragraph, index) => (
            <p
              key={index}
              className="font-bnSans text-ink-muted leading-relaxed text-[15px] md:text-base mt-4 first:mt-0"
            >
              <RichText content={paragraph} />
            </p>
          ))}
        </motion.div>
      </div>

      {/* Values grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10 not-prose">
        {values.map((v, i) => {
          const Icon = VALUE_ICONS[v.icon] || ShieldCheck;
          return (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="lux-card !p-5 md:!p-6"
            >
              <div className="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center mb-3">
                <Icon className="w-4 h-4" />
              </div>
              <h3 className="font-bnSerif text-lg text-ink">{v.title}</h3>
              <p className="font-bnSans text-sm text-ink-muted mt-2 leading-relaxed">{v.desc}</p>
            </motion.div>
          );
        })}
      </div>

    </ContentPageLayout>
  );
}
