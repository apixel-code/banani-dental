// Home before/after preview - shows the latest 1-2 transformations
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { api } from "@/lib/api";
import BeforeAfterSlider from "@/components/site/BeforeAfterSlider";
import { fadeUp, stagger } from "@/lib/motion";

export default function BeforeAfterShowcase() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/gallery", { params: { category: "before-after" } })
      .then((r) => setItems(r.data.slice(0, 2)))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  if (!loading && items.length === 0) return null;

  return (
    <section
      data-testid="home-ba"
      className="section-pad"
    >
      <div className="container-x">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <motion.span variants={fadeUp} className="eyebrow mb-4 justify-center">
            ট্রান্সফরমেশন
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-bnSerif text-3xl md:text-5xl text-ink leading-tight"
          >
            আগে ও পরে — <span className="italic text-gold">প্রকৃত পরিবর্তন</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="font-bnSans text-ink-muted mt-5"
          >
            আমাদের রোগীদের আত্মবিশ্বাস ফিরে পাওয়ার গল্প। স্লাইড করে দেখুন।
          </motion.p>
        </motion.div>

        {loading ? (
          <div className="h-[440px] rounded-2xl bg-white border border-line/50 animate-pulse" />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {items.map((item) => (
              <BeforeAfterSlider
                key={item.id}
                before={item.beforeUrl}
                after={item.afterUrl}
                title={item.title}
                caption={item.caption}
              />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
        <Link
          to="/gallery"
          data-testid="ba-view-all"
          className="btn-outline-gold"
        >
          সব ট্রান্সফরমেশন দেখুন <ArrowRight className="w-4 h-4" />
        </Link>
        </div>
      </div>
    </section>
  );
}
