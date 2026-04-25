// Doctors section - dynamic from API
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api } from "@/lib/api";
import { fadeUp, stagger } from "@/lib/motion";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/doctors")
      .then((r) => setDoctors(r.data))
      .catch(() => setDoctors([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section
      id="doctors"
      data-testid="home-doctors"
      className="section-pad bg-gold/[0.04] scroll-mt-20"
    >
      <div className="container-x">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div className="max-w-xl">
            <motion.span variants={fadeUp} className="eyebrow mb-4">
              বিশেষজ্ঞ চিকিৎসক দল
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="font-bnSerif text-3xl md:text-5xl text-ink leading-tight"
            >
              অভিজ্ঞ হাতে{" "}
              <span className="italic text-gold">নিরাপদ চিকিৎসা</span>
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp}
            className="font-bnSans text-ink-muted max-w-md"
          >
            দেশের শীর্ষস্থানীয় ডেন্টাল প্রতিষ্ঠান থেকে প্রশিক্ষিত ও আন্তর্জাতিক
            অভিজ্ঞতাসম্পন্ন চিকিৎসক।
          </motion.p>
        </motion.div>

        {loading ? (
          <div data-testid="doctors-loading" className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div key={i} className="h-96 rounded-2xl bg-white border border-line/50 animate-pulse" />
            ))}
          </div>
        ) : doctors.length === 0 ? (
          <p className="font-bnSans text-ink-muted">কোন চিকিৎসকের তথ্য পাওয়া যায়নি।</p>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {doctors.map((d) => (
              <motion.article
                key={d.id}
                variants={fadeUp}
                data-testid={`doctor-card-${d.id}`}
                className="group bg-white rounded-2xl overflow-hidden border border-line/50 hover:shadow-lux transition-all duration-700"
              >
                <div className="aspect-[4/5] overflow-hidden relative">
                  <img
                    src={d.photoUrl}
                    alt={d.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur text-xs font-bnSans text-ink">
                    {d.experience || "অভিজ্ঞ"}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-bnSerif text-2xl text-ink">{d.name}</h3>
                  {d.nameEn && (
                    <p className="font-enSerif italic text-sm text-ink-muted mt-0.5">
                      {d.nameEn}
                    </p>
                  )}
                  <p className="text-sm text-gold font-bnSans mt-2">
                    {d.specialization}
                  </p>
                  {d.degrees && (
                    <p className="text-xs text-ink-muted mt-1 font-bnSans">
                      {d.degrees}
                    </p>
                  )}
                  {d.bio && (
                    <p className="text-sm text-ink-muted mt-4 font-bnSans leading-relaxed line-clamp-3">
                      {d.bio}
                    </p>
                  )}
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
