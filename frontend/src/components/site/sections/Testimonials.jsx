// Patient testimonials - static, hand-curated
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { fadeUp, stagger } from "@/lib/motion";

const TESTIMONIALS = [
  {
    quote:
      "জীবনে প্রথমবার আয়নায় তাকিয়ে নিজের হাসি দেখে চোখে পানি এসে গিয়েছিল। ধন্যবাদ পুরো টিমকে।",
    name: "সাদিয়া রহমান",
    role: "স্মাইল মেকওভার",
  },
  {
    quote:
      "ভয় ছিল ব্যথা হবে। কিন্তু পুরো প্রক্রিয়া এত আরামদায়ক ছিল যে বুঝতেই পারিনি কখন শেষ হলো।",
    name: "তানভীর হোসেন",
    role: "ডেন্টাল ইমপ্ল্যান্ট",
  },
  {
    quote:
      "আমার মেয়ের ব্রেস করানোর সময় সবচেয়ে কঠিন কাজটা ছিল ক্লিনিক বেছে নেয়া। বানানী ডেন্টাল এর সিদ্ধান্ত নিয়ে আমি পুরোপুরি সন্তুষ্ট।",
    name: "মাহফুজা আক্তার",
    role: "অর্থোডন্টিক্স",
  },
];

export default function Testimonials() {
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
            রোগীর কথা
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-bnSerif text-3xl md:text-5xl text-ink leading-tight"
          >
            যাঁরা পেয়েছেন{" "}
            <span className="italic text-gold">নতুন আত্মবিশ্বাস</span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {TESTIMONIALS.map((t, i) => (
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
