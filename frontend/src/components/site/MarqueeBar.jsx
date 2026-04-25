// Marquee announcement bar - shows admin-controlled announcement above navbar
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Megaphone } from "lucide-react";
import { api } from "@/lib/api";

export default function MarqueeBar() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    api
      .get("/settings")
      .then((r) => setSettings(r.data))
      .catch(() => setSettings(null));
  }, []);

  if (!settings || !settings.marqueeEnabled || !settings.marqueeText?.trim()) {
    return null;
  }

  // Repeat the text 4x for seamless marquee scroll
  const items = Array.from({ length: 4 }, (_, i) => i);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        data-testid="marquee-bar"
        className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-[#1F4E79] via-[#2C8DCC] to-[#1F4E79] text-white overflow-hidden"
      >
        <div className="flex items-center gap-3 py-1.5 md:py-2 relative">
          <div className="flex items-center gap-2 pl-3 md:pl-5 shrink-0 z-10 bg-[#1F4E79] pr-3">
            <Megaphone className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span className="text-[10px] md:text-xs uppercase tracking-[0.18em] font-bnSans hidden sm:inline">
              ঘোষণা
            </span>
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="marquee-track whitespace-nowrap">
              {items.map((i) => (
                <span
                  key={i}
                  className="font-bnSans text-xs md:text-sm pr-16 inline-flex items-center gap-3"
                >
                  {settings.marqueeText}
                  <span className="opacity-50">✦</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
