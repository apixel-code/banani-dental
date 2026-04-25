// Animated number/label - count up when in view, supports Bengali numerals
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

const toBengali = (n) =>
  String(n)
    .split("")
    .map((ch) => (/\d/.test(ch) ? BN_DIGITS[Number(ch)] : ch))
    .join("");

export default function CountUp({ value, suffix = "", duration = 1.6, bengali = true }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {bengali ? toBengali(n) : n}
      {suffix}
    </span>
  );
}
