// /gallery page - filterable masonry + before/after section
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import Lightbox from "@/components/site/Lightbox";
import BeforeAfterSlider from "@/components/site/BeforeAfterSlider";
import WhatsAppButton from "@/components/site/WhatsAppButton";
import PageTransition from "@/components/site/PageTransition";
import { api } from "@/lib/api";
import { fadeUp, stagger } from "@/lib/motion";

const FILTERS = [
  { id: "all", label: "সব" },
  { id: "before-after", label: "ট্রান্সফরমেশন" },
  { id: "doctors", label: "চিকিৎসক" },
  { id: "patients", label: "রোগী" },
  { id: "clinic", label: "ক্লিনিক" },
];

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [active, setActive] = useState("all");
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState({ open: false, src: "", caption: "" });

  useEffect(() => {
    api
      .get("/gallery")
      .then((r) => setItems(r.data))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    if (active === "all") return items;
    return items.filter((it) => it.category === active);
  }, [items, active]);

  const beforeAfterItems = filtered.filter((i) => i.category === "before-after");
  const regularItems = filtered.filter((i) => i.category !== "before-after");

  return (
    <PageTransition>
      <div data-testid="gallery-page" className="min-h-screen bg-bg text-ink">
        <Navbar />
      <main>
        {/* Header */}
        <section className="pt-32 md:pt-40 pb-12">
          <div className="container-x">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="max-w-3xl"
            >
              <motion.span variants={fadeUp} className="eyebrow mb-5">
                ট্রান্সফরমেশন গ্যালারি
              </motion.span>
              <motion.h1
                variants={fadeUp}
                className="font-bnSerif text-4xl md:text-6xl text-ink leading-[1.1] mb-6"
              >
                হাজারো হাসির <span className="italic text-gold">প্রকৃত গল্প</span>
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="font-bnSans text-ink-muted leading-relaxed max-w-xl"
              >
                আমাদের চিকিৎসক, ক্লিনিক ও রোগীদের ট্রান্সফরমেশনের সংগ্রহ। প্রতিটি
                ছবি একটি ফিরে পাওয়া আত্মবিশ্বাসের সাক্ষ্য।
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Filter tabs */}
        <section className="sticky top-[72px] md:top-[80px] z-20 bg-bg/85 backdrop-blur-lg border-y border-line/60">
          <div className="container-x">
            <div className="flex gap-2 md:gap-3 overflow-x-auto py-4 hide-scrollbar">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  data-testid={`filter-${f.id}`}
                  onClick={() => setActive(f.id)}
                  className={`shrink-0 px-5 md:px-7 py-2.5 rounded-full font-bnSans text-sm transition-all duration-300 ${
                    active === f.id
                      ? "bg-ink text-bg"
                      : "bg-white text-ink-muted border border-line hover:border-gold hover:text-gold"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="section-pad pt-12">
          <div className="container-x">
            {loading ? (
              <div data-testid="gallery-loading" className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="aspect-[3/4] rounded-2xl bg-white border border-line animate-pulse" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <p data-testid="gallery-empty" className="font-bnSans text-ink-muted text-center py-16">
                এই ক্যাটাগরিতে এখনো কোন ছবি নেই।
              </p>
            ) : (
              <>
                {/* Before/after group (full width slider) */}
                {beforeAfterItems.length > 0 && (
                  <div data-testid="gallery-ba-group" className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                    {beforeAfterItems.map((it) => (
                      <BeforeAfterSlider
                        key={it.id}
                        before={it.beforeUrl}
                        after={it.afterUrl}
                        title={it.title}
                        caption={it.caption}
                      />
                    ))}
                  </div>
                )}

                {/* Regular masonry */}
                {regularItems.length > 0 && (
                  <div
                    data-testid="gallery-masonry"
                    className="masonry columns-1 md:columns-2 lg:columns-3"
                  >
                    {regularItems.map((it, idx) => (
                      <motion.button
                        key={it.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.7,
                          delay: idx * 0.04,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        onClick={() =>
                          setLightbox({
                            open: true,
                            src: it.imageUrl,
                            caption: it.title || it.caption,
                          })
                        }
                        data-testid={`gallery-item-${it.id}`}
                        className="w-full text-left group rounded-2xl overflow-hidden relative bg-white"
                      >
                        <img
                          src={it.imageUrl}
                          alt={it.title || it.caption || ""}
                          loading="lazy"
                          className="w-full h-auto img-fade-in group-hover:scale-[1.03] transition-transform duration-[1.2s] ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        {(it.title || it.caption) && (
                          <div className="absolute bottom-0 left-0 right-0 p-5 text-white opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                            {it.title && (
                              <p className="font-bnSerif text-lg">{it.title}</p>
                            )}
                            {it.caption && (
                              <p className="font-bnSans text-xs text-white/80 mt-1">
                                {it.caption}
                              </p>
                            )}
                          </div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
      <Lightbox
        open={lightbox.open}
        onClose={() => setLightbox({ open: false, src: "", caption: "" })}
        src={lightbox.src}
        caption={lightbox.caption}
      />
      </div>
    </PageTransition>
  );
}
