// Top navigation bar - logo, glass on scroll, hash-aware smooth navigation
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import HashLink from "@/components/site/HashLink";
import { api } from "@/lib/api";
import { brand, buildTelHref } from "@/content/brand";
import { navItems } from "@/content/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [marqueeActive, setMarqueeActive] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    // detect marquee presence to offset navbar
    api
      .get("/settings")
      .then((r) => setMarqueeActive(!!r.data?.marqueeEnabled && !!r.data?.marqueeText?.trim()))
      .catch(() => setMarqueeActive(false));
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Top offset so navbar sits below marquee
  const topClass = marqueeActive ? "top-7 md:top-9" : "top-0";

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      data-testid="site-navbar"
      className={`fixed ${topClass} left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-bg/85 backdrop-blur-lg border-b border-line/60 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex items-center justify-between py-3 md:py-4">
        <Link
          to="/"
          data-testid="nav-logo"
          className="flex items-center gap-2.5 md:gap-3 group shrink-0 min-w-0"
        >
          <motion.img
            whileHover={{ rotate: -8, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            src={brand.logo.src}
            alt={brand.logo.alt}
            className="w-9 h-9 md:w-11 md:h-11 object-contain drop-shadow-sm shrink-0"
          />
          <span className="flex flex-col leading-none min-w-0">
            <span className="font-enSerif text-sm md:text-lg tracking-tight text-ink truncate">
              {brand.name}
            </span>
            <span className="font-bnSans text-[8px] md:text-[11px] uppercase tracking-[0.16em] md:tracking-[0.18em] text-accent mt-0.5 truncate">
              {brand.subtitle}
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-9">
          {navItems.map((item) =>
            item.type === "hash" ? (
              <HashLink
                key={item.label}
                to={item.href}
                data-testid={`nav-link-${item.label}`}
                className="link-underline font-bnSans text-sm text-ink/80 hover:text-gold transition-colors cursor-pointer"
              >
                {item.label}
              </HashLink>
            ) : (
              <NavLink
                key={item.label}
                to={item.href}
                end
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

        <div className="flex items-center gap-2.5 md:gap-3">
          <a
            href={buildTelHref(brand.contact.phone.number)}
            data-testid="nav-phone"
            className="hidden md:inline-flex items-center gap-2 text-sm text-ink/70 hover:text-accent transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span className="tabular-nums">{brand.contact.phone.display}</span>
          </a>
          <HashLink
            to="/#contact"
            data-testid="nav-cta"
            className="hidden lg:inline-flex btn-gold !py-2 !px-4 !text-xs cursor-pointer"
          >
            অ্যাপয়েন্টমেন্ট
          </HashLink>
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-bg border-t border-line/60 overflow-hidden"
          >
            <div className="container-x py-5 flex flex-col gap-1">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                >
                  {item.type === "hash" ? (
                    <HashLink
                      to={item.href}
                      onClick={() => setOpen(false)}
                      data-testid={`mobile-nav-link-${item.label}`}
                      className="block font-bnSans text-base text-ink py-3 border-b border-line/40 cursor-pointer"
                    >
                      {item.label}
                    </HashLink>
                  ) : (
                    <Link
                      to={item.href}
                      onClick={() => setOpen(false)}
                      data-testid={`mobile-nav-link-${item.label}`}
                      className="block font-bnSans text-base text-ink py-3 border-b border-line/40"
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <HashLink
                  to="/#contact"
                  onClick={() => setOpen(false)}
                  data-testid="mobile-nav-cta"
                  className="btn-gold mt-4 justify-center cursor-pointer"
                >
                  অ্যাপয়েন্টমেন্ট নিন
                </HashLink>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
