// Premium footer with logo + Link routing
import { Link } from "react-router-dom";
import { Phone, MapPin, MessageCircle, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { brand, buildTelHref, buildWhatsAppHref } from "@/content/brand";
import { footerLinks } from "@/content/navigation";

export default function Footer() {
  return (
    <footer
      data-testid="site-footer"
      className="bg-ink text-bg/95 mt-24 relative overflow-hidden"
    >
      {/* Decorative blob */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-x py-14 md:py-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <img
                src={brand.logo.src}
                alt={brand.logo.alt}
                className="w-12 h-12 object-contain bg-white/95 rounded-xl p-1"
              />
              <div>
                <p className="font-enSerif text-xl tracking-tight">{brand.name}</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-accent-soft mt-0.5">
                  {brand.subtitle}
                </p>
              </div>
            </div>
            <p className="font-bnSans text-sm text-bg/65 leading-relaxed max-w-xs">
              {brand.tagline}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-enSerif text-sm uppercase tracking-[0.22em] text-accent-soft mb-5">
              যোগাযোগ
            </h4>
            <ul className="space-y-3 font-bnSans text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-accent shrink-0" />
                <span className="text-bg/80">
                  {brand.contact.address.full}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent" />
                <a
                  href={buildTelHref(brand.contact.phone.number)}
                  className="text-bg/90 hover:text-accent transition-colors tabular-nums"
                  data-testid="footer-phone"
                >
                  {brand.contact.phone.display}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-accent" />
                <a
                  href={buildWhatsAppHref(brand.contact.whatsapp.number)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-bg/90 hover:text-accent transition-colors"
                  data-testid="footer-whatsapp"
                >
                  {brand.contact.whatsapp.label}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent" />
                <a
                  href={`mailto:${brand.contact.email}`}
                  className="text-bg/80 hover:text-accent transition-colors"
                >
                  {brand.contact.email}
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-enSerif text-sm uppercase tracking-[0.22em] text-accent-soft mb-5">
              খোলার সময়
            </h4>
            <ul className="space-y-2 font-bnSans text-sm text-bg/80">
              <li className="flex justify-between">
                <span>শনি - বৃহস্পতি</span>
                <span className="text-bg/55 tabular-nums">৯:০০ - ১০:০০</span>
              </li>
              <li className="flex justify-between">
                <span>শুক্রবার</span>
                <span className="text-bg/55 tabular-nums">৩:০০ - ৯:০০</span>
              </li>
              <li className="pt-3 text-xs text-bg/45">
                জরুরী সেবা: ২৪/৭ ফোনে যোগাযোগ
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="mt-12 pt-8 border-t border-bg/10 flex flex-col md:flex-row justify-between items-center gap-5">
          <div className="flex flex-col md:flex-row items-center gap-x-5 gap-y-2 text-xs font-bnSans">
            <p className="text-bg/40 text-center md:text-left">
              © {new Date().getFullYear()} {brand.legalName} {brand.copyrightText}
            </p>
            <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-bg/55 hover:text-accent transition-colors"
                  data-testid={link.testId}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <a
            href="https://www.apixel.net"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="footer-apixel"
            className="text-xs font-bnSans text-bg/45 hover:text-accent transition-colors flex items-center gap-1.5 group"
          >
            <span className="opacity-70">Crafted by</span>
            <span className="font-enSerif tracking-wide group-hover:text-accent transition-colors">
              Apixel
            </span>
            <span className="text-bg/30 group-hover:text-accent/70 transition-colors">
              · www.apixel.net
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
