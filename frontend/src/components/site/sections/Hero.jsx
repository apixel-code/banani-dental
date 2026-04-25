// Home page hero - cinematic hero with Bengali emotional headline
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { fadeUp, stagger } from "@/lib/motion";

const HERO_IMG =
  "https://images.pexels.com/photos/11563145/pexels-photo-11563145.jpeg";

export default function Hero() {
  return (
    <section
      data-testid="home-hero"
      className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden grain-overlay"
    >
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <img
          src={HERO_IMG}
          alt="Confident smile"
          className="w-full h-full object-cover object-center"
        />
        {/* Soft champagne wash for readable dark text on light theme */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg/95 via-bg/75 to-bg/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/40 via-transparent to-bg/40" />
      </div>

      <div className="container-x w-full">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.span
            variants={fadeUp}
            className="eyebrow mb-6"
            data-testid="hero-eyebrow"
          >
            <Sparkles className="w-3 h-3" />
            BANANI DENTAL CLINIC · বানানী, ঢাকা
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="font-bnSerif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.15] text-ink mb-6"
            data-testid="hero-headline"
          >
            ব্যথামুক্ত আধুনিক চিকিৎসায়
            <br />
            <span className="italic text-gold font-en-serif">বদলে দিন</span>{" "}
            আপনার জীবন।
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="font-bnSans text-base md:text-lg text-ink-muted leading-relaxed max-w-xl mb-10"
            data-testid="hero-sub"
          >
            লুকানো হাসি নয়, ফিরে পান আপনার প্রকৃত আত্মবিশ্বাস। প্রিমিয়াম
            কেয়ার, বিশ্বমানের সরঞ্জাম এবং অভিজ্ঞ চিকিৎসকের তত্ত্বাবধানে।
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#contact"
              data-testid="hero-cta-primary"
              className="btn-gold"
            >
              আপনার নতুন হাসির যাত্রা শুরু করুন
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/gallery"
              data-testid="hero-cta-secondary"
              className="btn-outline-gold"
            >
              ট্রান্সফরমেশন গ্যালারি দেখুন
            </a>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            variants={fadeUp}
            className="mt-14 grid grid-cols-3 gap-6 max-w-lg"
            data-testid="hero-trust"
          >
            {[
              { num: "১৫+", label: "বছরের অভিজ্ঞতা" },
              { num: "৫০০০+", label: "সন্তুষ্ট রোগী" },
              { num: "১০০%", label: "ব্যথামুক্ত" },
            ].map((s) => (
              <div key={s.label} className="text-left">
                <p className="font-enSerif text-3xl text-gold tabular-nums">
                  {s.num}
                </p>
                <p className="font-bnSans text-xs text-ink-muted mt-1 leading-tight">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
