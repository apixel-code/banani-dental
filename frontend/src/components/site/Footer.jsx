// Premium footer
import { Phone, MapPin, MessageCircle, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer
      data-testid="site-footer"
      className="bg-ink text-bg/95 mt-24"
    >
      <div className="container-x py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className="font-enSerif text-2xl tracking-tight">
                Banani
              </span>
              <span className="font-bnSerif text-2xl text-gold">ডেন্টাল</span>
            </div>
            <p className="font-bnSans text-sm text-bg/60 leading-relaxed max-w-xs">
              ব্যথামুক্ত আধুনিক ডেন্টাল চিকিৎসায় ফিরিয়ে দিচ্ছি প্রকৃত আত্মবিশ্বাস।
            </p>
          </div>

          {/* Quick contact */}
          <div>
            <h4 className="font-enSerif text-sm uppercase tracking-[0.2em] text-gold mb-5">
              যোগাযোগ
            </h4>
            <ul className="space-y-3 font-bnSans text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-gold shrink-0" />
                <span className="text-bg/80">
                  House #116, Road #15, Block #C, Banani, Dhaka-1213
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold" />
                <a
                  href="tel:01711170890"
                  className="text-bg/90 hover:text-gold transition-colors tabular-nums"
                  data-testid="footer-phone"
                >
                  01711170890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-gold" />
                <a
                  href="https://wa.me/8801711170890"
                  target="_blank"
                  rel="noreferrer"
                  className="text-bg/90 hover:text-gold transition-colors"
                  data-testid="footer-whatsapp"
                >
                  হোয়াটসঅ্যাপে কথা বলুন
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold" />
                <span className="text-bg/80">contact@bananidental.com</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-enSerif text-sm uppercase tracking-[0.2em] text-gold mb-5">
              খোলার সময়
            </h4>
            <ul className="space-y-2 font-bnSans text-sm text-bg/80">
              <li className="flex justify-between">
                <span>শনি - বৃহস্পতি</span>
                <span className="text-bg/60 tabular-nums">৯:০০ - ১০:০০</span>
              </li>
              <li className="flex justify-between">
                <span>শুক্রবার</span>
                <span className="text-bg/60 tabular-nums">৩:০০ - ৯:০০</span>
              </li>
              <li className="pt-3 text-xs text-bg/50">
                জরুরী সেবা: ২৪/৭ ফোনে যোগাযোগ
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-bg/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-bg/40 font-bnSans">
            © {new Date().getFullYear()} Banani Dental Clinic. সমস্ত অধিকার সংরক্ষিত।
          </p>
          <a
            href="/admin/login"
            className="text-xs text-bg/40 hover:text-gold transition-colors font-bnSans"
            data-testid="footer-admin-link"
          >
            অ্যাডমিন লগইন
          </a>
        </div>
      </div>
    </footer>
  );
}
