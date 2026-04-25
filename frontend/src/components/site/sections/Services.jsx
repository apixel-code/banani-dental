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

const SERVICES = [
  {
    icon: Smile,
    title: "কসমেটিক ডেন্টিস্ট্রি",
    desc: "নিখুঁত হাসির জন্য স্মাইল ডিজাইনিং, ভেনিয়ার ও দাঁতের সাদা করণ।",
  },
  {
    icon: Crown,
    title: "ডেন্টাল ইমপ্ল্যান্ট",
    desc: "হারিয়ে যাওয়া দাঁতের স্থায়ী সমাধান বিশ্বমানের ইমপ্ল্যান্ট দিয়ে।",
  },
  {
    icon: Activity,
    title: "অর্থোডন্টিক্স",
    desc: "ইনভিজিবল ব্রেস ও ক্লিয়ার অ্যালাইনারে দাঁত সোজা করুন।",
  },
  {
    icon: Stethoscope,
    title: "জেনারেল ডেন্টিস্ট্রি",
    desc: "ফিলিং, এক্সট্রাকশন, রুট ক্যানাল ও দাঁতের সমস্ত সাধারণ চিকিৎসা।",
  },
  {
    icon: ShieldCheck,
    title: "পেডিয়াট্রিক কেয়ার",
    desc: "শিশুদের জন্য বন্ধুত্বপূর্ণ পরিবেশে আনন্দদায়ক ডেন্টাল কেয়ার।",
  },
  {
    icon: Sparkles,
    title: "টিথ হোয়াইটেনিং",
    desc: "মাত্র এক সিটিংয়ে ঝকঝকে সাদা দাঁত পেতে অ্যাডভান্সড ট্রিটমেন্ট।",
  },
];

export default function Services() {
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
            আমাদের সেবা
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-bnSerif text-3xl md:text-5xl text-ink leading-tight"
          >
            প্রতিটি সমস্যার জন্য{" "}
            <span className="italic text-gold">প্রিমিয়াম সমাধান</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="font-bnSans text-ink-muted mt-5 leading-relaxed"
          >
            আধুনিক প্রযুক্তি এবং বিশেষজ্ঞ চিকিৎসকদের সমন্বয়ে আমরা প্রদান করি
            ডেন্টাল কেয়ারের সম্পূর্ণ স্পেকট্রাম।
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
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
