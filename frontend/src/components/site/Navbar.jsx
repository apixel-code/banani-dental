// Top navigation bar - sticky, glass on scroll
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV = [
  { to: "/", label: "হোম" },
  { to: "/gallery", label: "গ্যালারি" },
  { to: "/#services", label: "সেবা", hash: true },
  { to: "/#doctors", label: "চিকিৎসক", hash: true },
  { to: "/#contact", label: "যোগাযোগ", hash: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-bg/85 backdrop-blur-lg border-b border-line/60"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex items-center justify-between py-4 md:py-5">
        <Link
          to="/"
          data-testid="nav-logo"
          className="flex items-center gap-2 group"
        >
          <span className="font-enSerif text-xl md:text-2xl tracking-tight text-ink">
            Banani
          </span>
          <span className="font-bnSerif text-xl md:text-2xl text-gold">
            ডেন্টাল
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {NAV.map((item) =>
            item.hash ? (
              <a
                key={item.label}
                href={item.to}
                data-testid={`nav-link-${item.label}`}
                className="link-underline font-bnSans text-sm text-ink/80 hover:text-gold transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <NavLink
                key={item.label}
                to={item.to}
                data-testid={`nav-link-${item.label}`}
                className={({ isActive }) =>
                  `link-underline font-bnSans text-sm transition-colors ${
                    isActive
                      ? "text-gold is-active"
                      : "text-ink/80 hover:text-gold"
                  }`
                }
              >
                {item.label}
              </NavLink>
            )
          )}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:01711170890"
            data-testid="nav-phone"
            className="hidden md:inline-flex items-center gap-2 text-sm text-ink/70 hover:text-gold transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span className="tabular-nums">01711170890</span>
          </a>
          <a
            href="/#contact"
            data-testid="nav-cta"
            className="hidden lg:inline-flex btn-gold !py-2.5 !px-5 text-sm"
          >
            অ্যাপয়েন্টমেন্ট
          </a>
          <button
            data-testid="nav-mobile-toggle"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden p-2 text-ink"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-bg border-t border-line/60"
          >
            <div className="container-x py-6 flex flex-col gap-4">
              {NAV.map((item) => (
                <a
                  key={item.label}
                  href={item.to}
                  onClick={() => setOpen(false)}
                  data-testid={`mobile-nav-link-${item.label}`}
                  className="font-bnSans text-base text-ink py-2 border-b border-line/40"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/#contact"
                onClick={() => setOpen(false)}
                data-testid="mobile-nav-cta"
                className="btn-gold mt-3 justify-center"
              >
                অ্যাপয়েন্টমেন্ট নিন
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
