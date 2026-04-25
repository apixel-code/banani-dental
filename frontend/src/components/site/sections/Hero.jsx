// Home page hero - premium clinical theme with cinematic animations
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import HashLink from "@/components/site/HashLink";
import CountUp from "@/components/site/CountUp";

const HERO_IMG =
  "https://images.pexels.com/photos/11563145/pexels-photo-11563145.jpeg";

// Word-by-word reveal helper
const Reveal = ({ children, delay = 0, className = "" }) => (
  <span className="reveal-mask">
    <motion.span
      initial={{ y: "110%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.span>
  </span>
);

const STATS = [
  { num: 15, suffix: "+", label: "বছরের অভিজ্ঞতা" },
  { num: 5000, suffix: "+", label: "সন্তুষ্ট রোগী" },
  { num: 100, suffix: "%", label: "ব্যথামুক্ত" },
];

export default function Hero() {
  return (
    <section
      data-testid="home-hero"
      className="relative min-h-[100svh] flex items-center pt-24 md:pt-32 pb-12 overflow-hidden"
    >
      {/* Background image with gradient mask */}
      <div className="absolute inset-0 -z-10">
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          src={HERO_IMG}
          alt="Confident smile"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg/95 via-bg/85 to-bg/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/40 via-transparent to-bg/60" />
      </div>

      {/* Floating decorative shapes */}
      <motion.div
        aria-hidden
        className="absolute top-32 right-10 md:right-32 w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-accent/30 to-gold/30 blur-3xl"
        animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-20 right-1/4 w-24 h-24 rounded-full bg-gradient-to-br from-gold/20 to-accent/20 blur-2xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-x w-full relative">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="eyebrow mb-5 md:mb-7"
            data-testid="hero-eyebrow"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            BANANI CLINIC LTD · SPECIALIZED HOSPITAL
          </motion.span>

          {/* Headline with word reveal */}
          <h1
            className="font-bnSerif text-[2.1rem] sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-ink mb-5 md:mb-7"
            data-testid="hero-headline"
          >
            <span className="block">
              <Reveal delay={0.3}>ব্যথামুক্ত</Reveal>{" "}
              <Reveal delay={0.4}>আধুনিক</Reveal>{" "}
              <Reveal delay={0.5}>চিকিৎসায়</Reveal>
            </span>
            <span className="block mt-1 md:mt-2">
              <Reveal delay={0.7}>
                <span className="italic text-gradient font-en-serif">বদলে দিন</span>
              </Reveal>{" "}
              <Reveal delay={0.85}>আপনার</Reveal>{" "}
              <Reveal delay={0.95}>জীবন।</Reveal>
            </span>
          </h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.15 }}
            className="font-bnSans text-base md:text-lg text-ink-muted leading-relaxed max-w-xl mb-8 md:mb-10"
            data-testid="hero-sub"
          >
            লুকানো হাসি নয়, ফিরে পান আপনার প্রকৃত আত্মবিশ্বাস। প্রিমিয়াম
            কেয়ার, বিশ্বমানের সরঞ্জাম এবং অভিজ্ঞ চিকিৎসকের তত্ত্বাবধানে।
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.3 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <HashLink
              to="/#contact"
              data-testid="hero-cta-primary"
              className="btn-gold cursor-pointer"
            >
              আপনার নতুন হাসির যাত্রা শুরু করুন
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </HashLink>
            <Link
              to="/gallery"
              data-testid="hero-cta-secondary"
              className="btn-outline-gold"
            >
              ট্রান্সফরমেশন গ্যালারি দেখুন
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="mt-12 md:mt-14 grid grid-cols-3 gap-4 md:gap-6 max-w-lg"
            data-testid="hero-trust"
          >
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.7 + i * 0.1 }}
                className="text-left border-l-2 border-accent/40 pl-3 md:pl-4"
              >
                <p className="font-enSerif text-2xl md:text-3xl text-gradient">
                  <CountUp value={s.num} suffix={s.suffix === "+" ? "+" : s.suffix} />
                </p>
                <p className="font-bnSans text-[11px] md:text-xs text-ink-muted mt-1 leading-tight">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        aria-hidden
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-ink-muted font-bnSans">
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-accent to-transparent"
        />
      </motion.div>
    </section>
  );
}
