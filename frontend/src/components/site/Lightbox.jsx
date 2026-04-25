// Lightbox for gallery image preview
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function Lightbox({ open, onClose, src, caption }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          data-testid="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={onClose}
        >
          <button
            data-testid="lightbox-close"
            onClick={onClose}
            className="absolute top-6 right-6 text-white/90 hover:text-gold transition-colors"
            aria-label="Close"
          >
            <X className="w-8 h-8" />
          </button>
          <motion.div
            initial={{ scale: 0.92 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-5xl max-h-[88vh] flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={src}
              alt={caption || ""}
              className="max-h-[80vh] w-auto rounded-xl shadow-2xl"
            />
            {caption && (
              <p className="font-bnSans text-white/80 text-center text-sm max-w-xl">
                {caption}
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
