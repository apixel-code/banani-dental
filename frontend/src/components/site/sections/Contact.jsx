// Contact / Appointment request section
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, MessageCircle, MapPin, Phone, Send } from "lucide-react";
import { api } from "@/lib/api";
import { fadeUp, stagger } from "@/lib/motion";

const SERVICES = [
  "জেনারেল চেক-আপ",
  "কসমেটিক / স্মাইল ডিজাইনিং",
  "ডেন্টাল ইমপ্ল্যান্ট",
  "অর্থোডন্টিক্স / ব্রেস",
  "পেডিয়াট্রিক ডেন্টিস্ট্রি",
  "অন্যান্য",
];

const PAST_DATE_ERROR =
  "অনুগ্রহ করে আজকের তারিখ বা ভবিষ্যতের একটি তারিখ নির্বাচন করুন।";

const getTodayDateString = () => {
  const now = new Date();
  const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 10);
};

const getPreferredDateError = (preferredDate, todayDate = getTodayDateString()) => {
  if (preferredDate && preferredDate < todayDate) {
    return PAST_DATE_ERROR;
  }
  return "";
};

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    preferredDate: "",
    message: "",
  });
  const [status, setStatus] = useState({ loading: false, ok: false, err: "" });
  const todayDate = getTodayDateString();

  const submit = async (e) => {
    e.preventDefault();
    const preferredDateError = getPreferredDateError(form.preferredDate);
    if (preferredDateError) {
      setStatus({ loading: false, ok: false, err: preferredDateError });
      return;
    }

    setStatus({ loading: true, ok: false, err: "" });
    try {
      await api.post("/appointments", form);
      setStatus({ loading: false, ok: true, err: "" });
      setForm({ name: "", phone: "", email: "", service: "", preferredDate: "", message: "" });
    } catch (err) {
      setStatus({
        loading: false,
        ok: false,
        err: err?.response?.data?.error || "কিছু একটা সমস্যা হয়েছে। পরে চেষ্টা করুন।",
      });
    }
  };

  const onChange = (k) => (e) => {
    const { value } = e.target;
    setForm((f) => ({ ...f, [k]: value }));

    if (k === "preferredDate") {
      const preferredDateError = getPreferredDateError(value);
      setStatus((current) => ({
        ...current,
        ok: false,
        err:
          preferredDateError ||
          (current.err === PAST_DATE_ERROR ? "" : current.err),
      }));
    }
  };

  return (
    <section
      id="contact"
      data-testid="home-contact"
      className="section-pad scroll-mt-20"
    >
      <div className="container-x grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="lg:col-span-2"
        >
          <motion.span variants={fadeUp} className="eyebrow mb-4">
            যোগাযোগ
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-bnSerif text-3xl md:text-5xl text-ink leading-tight mb-6"
          >
            আপনার নতুন হাসির <span className="italic text-gold">যাত্রা</span>{" "}
            শুরু করুন
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="font-bnSans text-ink-muted mb-10 leading-relaxed"
          >
            ফর্মটি পূরণ করুন বা সরাসরি কল করুন। আমাদের কোঅর্ডিনেটর ১২ ঘণ্টার
            মধ্যে আপনার সাথে যোগাযোগ করবেন।
          </motion.p>

          <motion.ul variants={stagger} className="space-y-5">
            <motion.li variants={fadeUp} className="flex items-start gap-4">
              <span className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0">
                <MapPin className="w-4 h-4" />
              </span>
              <div>
                <p className="font-bnSerif text-ink">আমাদের ঠিকানা</p>
                <p className="font-bnSans text-sm text-ink-muted mt-1">
                  House #116, Road #15, Block #C,
                  <br />
                  Banani, Dhaka-1213
                </p>
              </div>
            </motion.li>
            <motion.li variants={fadeUp} className="flex items-start gap-4">
              <span className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0">
                <Phone className="w-4 h-4" />
              </span>
              <div>
                <p className="font-bnSerif text-ink">কল করুন</p>
                <a
                  href="tel:01711170890"
                  data-testid="contact-phone"
                  className="font-bnSans text-sm text-ink-muted hover:text-gold transition-colors tabular-nums"
                >
                  01711170890
                </a>
              </div>
            </motion.li>
            <motion.li variants={fadeUp} className="flex items-start gap-4">
              <span className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0">
                <MessageCircle className="w-4 h-4" />
              </span>
              <div>
                <p className="font-bnSerif text-ink">হোয়াটসঅ্যাপ</p>
                <a
                  href="https://wa.me/8801711170890"
                  target="_blank"
                  rel="noreferrer"
                  data-testid="contact-whatsapp"
                  className="font-bnSans text-sm text-ink-muted hover:text-gold transition-colors"
                >
                  হোয়াটসঅ্যাপে কথা বলুন →
                </a>
              </div>
            </motion.li>
          </motion.ul>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          data-testid="appointment-form"
          className="lg:col-span-3 bg-white rounded-3xl p-6 md:p-10 border border-line/60 shadow-sm"
        >
          {status.ok && (
            <div
              data-testid="appointment-success"
              className="mb-6 p-4 rounded-xl bg-gold/10 border border-gold/30 flex items-start gap-3"
            >
              <CheckCircle2 className="w-5 h-5 text-gold mt-0.5 shrink-0" />
              <div>
                <p className="font-bnSerif text-ink">ধন্যবাদ! আপনার অনুরোধ পাঠানো হয়েছে।</p>
                <p className="font-bnSans text-sm text-ink-muted">
                  আমাদের কোঅর্ডিনেটর শীঘ্রই আপনার সাথে যোগাযোগ করবেন।
                </p>
              </div>
            </div>
          )}
          {status.err && (
            <div
              data-testid="appointment-error"
              className="mb-6 p-4 rounded-xl bg-red-50 text-red-700 text-sm font-bnSans"
            >
              {status.err}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field
              label="আপনার নাম *"
              required
              value={form.name}
              onChange={onChange("name")}
              testId="appt-name"
            />
            <Field
              label="ফোন নম্বর *"
              required
              type="tel"
              value={form.phone}
              onChange={onChange("phone")}
              testId="appt-phone"
            />
            <Field
              label="ইমেইল"
              type="email"
              value={form.email}
              onChange={onChange("email")}
              testId="appt-email"
            />
            <Field
              label="পছন্দের তারিখ"
              type="date"
              min={todayDate}
              value={form.preferredDate}
              onChange={onChange("preferredDate")}
              testId="appt-date"
            />
            <div className="md:col-span-2">
              <label className="block text-xs uppercase tracking-widest text-ink-muted font-bnSans mb-2">
                সেবা
              </label>
              <select
                data-testid="appt-service"
                value={form.service}
                onChange={onChange("service")}
                className="w-full px-4 py-3 rounded-xl border border-line bg-bg/40 font-bnSans focus:outline-none focus:border-gold transition-colors"
              >
                <option value="">— সেবা নির্বাচন করুন —</option>
                {SERVICES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs uppercase tracking-widest text-ink-muted font-bnSans mb-2">
                বার্তা
              </label>
              <textarea
                data-testid="appt-message"
                value={form.message}
                onChange={onChange("message")}
                rows={4}
                placeholder="আপনার দাঁতের সমস্যা সংক্ষেপে বলুন..."
                className="w-full px-4 py-3 rounded-xl border border-line bg-bg/40 font-bnSans focus:outline-none focus:border-gold transition-colors resize-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={status.loading}
            data-testid="appointment-submit"
            className="btn-gold mt-7 w-full md:w-auto justify-center"
          >
            {status.loading ? "পাঠানো হচ্ছে..." : "অ্যাপয়েন্টমেন্ট রিকোয়েস্ট পাঠান"}
            {!status.loading && <Send className="w-4 h-4" />}
          </button>
        </motion.form>
      </div>
    </section>
  );
}

function Field({ label, testId, ...rest }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest text-ink-muted font-bnSans mb-2">
        {label}
      </label>
      <input
        data-testid={testId}
        {...rest}
        className="w-full px-4 py-3 rounded-xl border border-line bg-bg/40 font-bnSans focus:outline-none focus:border-gold transition-colors"
      />
    </div>
  );
}
