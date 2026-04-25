// Premium footer with logo + Link routing
import { Link } from "react-router-dom";
import { Phone, MapPin, MessageCircle, Mail } from "lucide-react";
import { motion } from "framer-motion";

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
                src="/brand/logo.png"
                alt="Banani Clinic"
                className="w-12 h-12 object-contain bg-white/95 rounded-xl p-1"
              />
              <div>
                <p className="font-enSerif text-xl tracking-tight">Banani Clinic</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-accent-soft mt-0.5">
                  Specialized Hospital
                </p>
              </div>
            </div>
            <p className="font-bnSans text-sm text-bg/65 leading-relaxed max-w-xs">
              ব্যথামুক্ত আধুনিক ডেন্টাল চিকিৎসায় ফিরিয়ে দিচ্ছি প্রকৃত আত্মবিশ্বাস।
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
                  House #116, Road #15, Block #C, Banani, Dhaka-1213
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent" />
                <a
                  href="tel:01711170890"
                  className="text-bg/90 hover:text-accent transition-colors tabular-nums"
                  data-testid="footer-phone"
                >
                  01711170890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-accent" />
                <a
                  href="https://wa.me/8801711170890"
                  target="_blank"
                  rel="noreferrer"
                  className="text-bg/90 hover:text-accent transition-colors"
                  data-testid="footer-whatsapp"
                >
                  হোয়াটসঅ্যাপে কথা বলুন
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent" />
                <span className="text-bg/80">contact@bananiclinic.com</span>
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
          <p className="text-xs text-bg/40 font-bnSans text-center md:text-left">
            © {new Date().getFullYear()} Banani Clinic Ltd. সমস্ত অধিকার সংরক্ষিত।
          </p>
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-bnSans">
            <Link
              to="/about"
              className="text-bg/55 hover:text-accent transition-colors"
              data-testid="footer-about"
            >
              আমাদের সম্পর্কে
            </Link>
            <Link
              to="/privacy"
              className="text-bg/55 hover:text-accent transition-colors"
              data-testid="footer-privacy"
            >
              গোপনীয়তা নীতি
            </Link>
            <Link
              to="/terms"
              className="text-bg/55 hover:text-accent transition-colors"
              data-testid="footer-terms"
            >
              শর্তাবলী
            </Link>
            <Link
              to="/admin/login"
              className="text-bg/40 hover:text-accent transition-colors"
              data-testid="footer-admin-link"
            >
              অ্যাডমিন
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
