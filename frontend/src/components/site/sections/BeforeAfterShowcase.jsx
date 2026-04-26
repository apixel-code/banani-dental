// Home before/after preview - shows the latest 1-2 transformations
import BeforeAfterSlider from "@/components/site/BeforeAfterSlider";
import { api } from "@/lib/api";
import { fadeUp, stagger } from "@/lib/motion";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
      id="gallery"
      data-testid="home-ba"
      className="section-pad scroll-mt-24 bg-gradient-to-b from-accent/5 via-bg to-bg"
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
            Gallery
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-bnSerif text-3xl md:text-5xl text-ink leading-tight"
          >
            Signature Transformations, <span className="italic text-gradient">Clinically Delivered</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="font-bnSans text-ink-muted mt-5"
          >
            Explore real before-and-after cases from Banani Clinic and compare outcomes with the interactive slider.
          </motion.p>
        </motion.div>

        {loading ? (
          <div className="h-[440px] rounded-2xl bg-white border border-line/50 animate-pulse" />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {items.map((item) => (
              <div key={item.id} className="rounded-2xl border border-line/60 bg-white p-2 md:p-3 shadow-sm">
                <BeforeAfterSlider
                  before={item.beforeUrl}
                  after={item.afterUrl}
                  title={item.title}
                  caption={item.caption}
                />
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
        <Link
          to="/gallery"
          data-testid="ba-view-all"
          className="btn-outline-gold"
        >
          View All Transformations <ArrowRight className="w-4 h-4" />
        </Link>
        </div>
      </div>
    </section>
  );
}
