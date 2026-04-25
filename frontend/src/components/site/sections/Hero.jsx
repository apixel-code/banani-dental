// Home page hero - 2-column layout: cinematic Bengali headline + premium image card on right
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Award } from "lucide-react";
import HashLink from "@/components/site/HashLink";
import CountUp from "@/components/site/CountUp";

const HERO_IMG_RIGHT =
  "https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg";
const HERO_IMG_BG =
  "https://images.pexels.com/photos/11563145/pexels-photo-11563145.jpeg";

const Reveal = ({ children, delay = 0 }) => (
  <span className="reveal-mask">
    <motion.span
      initial={{ y: "110%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
      className="inline-block"
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
      className="relative min-h-[100svh] flex items-center pt-28 md:pt-36 pb-12 overflow-hidden"
    >
      {/* Soft mesh background */}
      <div className="absolute inset-0 -z-10 mesh-bg" />
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 -z-10 dot-pattern opacity-40" />

      {/* Floating decorative blobs */}
      <motion.div
        aria-hidden
        className="absolute top-20 -right-20 w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-accent/15 to-gold/10 blur-3xl pointer-events-none"
        animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-gradient-to-br from-gold/10 to-accent/15 blur-3xl pointer-events-none"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-x w-full relative">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* LEFT: text */}
          <div className="lg:col-span-7">
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

            <h1
              className="font-bnSerif text-[2rem] sm:text-5xl md:text-6xl lg:text-[4.2rem] leading-[1.18] text-ink mb-5 md:mb-7"
              data-testid="hero-headline"
            >
              <span className="block">
                <Reveal delay={0.3}>ব্যথামুক্ত</Reveal>{" "}
                <Reveal delay={0.4}>আধুনিক</Reveal>{" "}
                <Reveal delay={0.5}>চিকিৎসায়</Reveal>
              </span>
              <span className="block mt-2 md:mt-3">
                <Reveal delay={0.7}>
                  <span className="italic text-gradient font-en-serif">বদলে দিন</span>
                </Reveal>{" "}
                <Reveal delay={0.85}>আপনার</Reveal>{" "}
                <Reveal delay={0.95}>জীবন।</Reveal>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.15 }}
              className="font-bnSans text-base md:text-lg text-ink-muted leading-relaxed max-w-xl mb-8 md:mb-10"
              data-testid="hero-sub"
            >
              লুকানো হাসি নয়, ফিরে পান আপনার প্রকৃত আত্মবিশ্বাস। প্রিমিয়াম কেয়ার,
              বিশ্বমানের সরঞ্জাম এবং অভিজ্ঞ চিকিৎসকের তত্ত্বাবধানে।
            </motion.p>

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
                ট্রান্সফরমেশন গ্যালারি
              </Link>
            </motion.div>

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
                    <CountUp value={s.num} suffix={s.suffix} />
                  </p>
                  <p className="font-bnSans text-[11px] md:text-xs text-ink-muted mt-1 leading-tight">
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT: hero image card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="lg:col-span-5 relative"
          >
            {/* Decorative back panel */}
            <div className="absolute -inset-4 bg-gradient-to-br from-accent/20 via-gold/15 to-transparent rounded-[2rem] blur-2xl pointer-events-none" />

            {/* Main image card */}
            <div className="relative rounded-[2rem] overflow-hidden bg-white border border-line/60 shadow-lux">
              <div className="aspect-[4/5] overflow-hidden">
                <motion.img
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                  src={HERO_IMG_RIGHT}
                  alt="Confident smile - Banani Clinic"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
              </div>

              {/* Floating award badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
                className="absolute top-5 left-5 bg-white/95 backdrop-blur-md rounded-2xl p-3 md:p-4 shadow-lg flex items-center gap-2.5 md:gap-3 max-w-[80%]"
              >
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-gold to-accent flex items-center justify-center text-white shrink-0">
                  <Award className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <div>
                  <p className="font-bnSerif text-[12px] md:text-sm text-ink leading-tight">
                    AACD সনদপ্রাপ্ত
                  </p>
                  <p className="font-bnSans text-[9px] md:text-[10px] text-ink-muted uppercase tracking-widest">
                    USA Certified
                  </p>
                </div>
              </motion.div>

              {/* Floating bottom card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7, duration: 0.7 }}
                className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md rounded-2xl p-4 md:p-5 shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bnSerif text-base md:text-lg text-ink">
                      Dr. Aslam Almehdi
                    </p>
                    <p className="font-bnSans text-[10px] md:text-xs text-accent uppercase tracking-widest mt-0.5">
                      Founder · Maxillofacial Surgeon
                    </p>
                  </div>
                  <div className="flex -space-x-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-gold pulse-dot"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Decorative dot grid */}
            <div className="absolute -bottom-8 -right-8 w-24 h-24 dot-pattern opacity-50 pointer-events-none hidden md:block" />
          </motion.div>
        </div>
      </div>

      {/* Hidden background image (for SEO/preload) */}
      <img src={HERO_IMG_BG} alt="" className="hidden" aria-hidden />
    </section>
  );
}
