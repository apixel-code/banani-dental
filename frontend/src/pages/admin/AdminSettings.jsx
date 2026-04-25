// Admin Settings page - control marquee announcement bar
import { useEffect, useState } from "react";
import { Save, Megaphone, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { api } from "@/lib/api";

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    marqueeEnabled: true,
    marqueeText: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    api
      .get("/settings")
      .then((r) => setSettings(r.data))
      .catch(() => setErr("সেটিংস লোড করা যায়নি"))
      .finally(() => setLoading(false));
  }, []);

  const save = async (e) => {
    e?.preventDefault();
    setSaving(true);
    setErr("");
    try {
      const { data } = await api.put("/settings", settings);
      setSettings(data);
      setSavedAt(new Date());
      setTimeout(() => setSavedAt(null), 3000);
    } catch (e2) {
      setErr(e2?.response?.data?.error || "সংরক্ষণে সমস্যা হয়েছে");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div data-testid="admin-settings-loading" className="space-y-4">
        <div className="h-12 w-64 bg-white border border-line rounded-xl animate-pulse" />
        <div className="h-64 bg-white border border-line rounded-2xl animate-pulse" />
      </div>
    );
  }

  return (
    <div data-testid="admin-settings-page">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.22em] text-gold font-bnSans mb-2">
          সেটিংস
        </p>
        <h1 className="font-bnSerif text-2xl md:text-4xl text-ink">
          সাইট কনফিগারেশন
        </h1>
        <p className="font-bnSans text-sm text-ink-muted mt-2">
          ঘোষণা বার ও সাইটের অন্যান্য সেটিংস নিয়ন্ত্রণ করুন।
        </p>
      </header>

      {/* Marquee announcement card */}
      <form onSubmit={save} className="bg-white rounded-2xl border border-line/60 p-6 md:p-8 max-w-3xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gold to-accent flex items-center justify-center text-white">
            <Megaphone className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bnSerif text-xl text-ink">ঘোষণা বার (Marquee)</h2>
            <p className="text-xs text-ink-muted font-bnSans mt-0.5">
              নেভিগেশনের উপরে স্ক্রলিং টেক্সট দেখান
            </p>
          </div>
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-between p-4 bg-bg/60 border border-line/40 rounded-xl mb-6">
          <div className="flex items-center gap-3">
            {settings.marqueeEnabled ? (
              <Eye className="w-5 h-5 text-accent" />
            ) : (
              <EyeOff className="w-5 h-5 text-ink-muted" />
            )}
            <div>
              <p className="font-bnSerif text-ink">
                {settings.marqueeEnabled ? "চালু আছে" : "বন্ধ আছে"}
              </p>
              <p className="text-xs text-ink-muted font-bnSans">
                {settings.marqueeEnabled
                  ? "ঘোষণাটি ওয়েবসাইটে দৃশ্যমান"
                  : "ঘোষণাটি লুকানো রয়েছে"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() =>
              setSettings((s) => ({ ...s, marqueeEnabled: !s.marqueeEnabled }))
            }
            data-testid="marquee-toggle"
            className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
              settings.marqueeEnabled ? "bg-accent" : "bg-ink-muted/30"
            }`}
            aria-label="Toggle marquee"
          >
            <motion.span
              layout
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md ${
                settings.marqueeEnabled ? "left-7" : "left-0.5"
              }`}
            />
          </button>
        </div>

        {/* Text input */}
        <div className="mb-6">
          <label className="block text-xs uppercase tracking-widest text-ink-muted font-bnSans mb-2">
            ঘোষণার টেক্সট
          </label>
          <textarea
            data-testid="marquee-text"
            value={settings.marqueeText}
            onChange={(e) =>
              setSettings((s) => ({ ...s, marqueeText: e.target.value }))
            }
            rows={3}
            placeholder="যেমন: আজই অ্যাপয়েন্টমেন্ট নিয়ে বিশেষ ছাড় উপভোগ করুন"
            className="w-full px-4 py-3 rounded-xl border border-line bg-bg/40 font-bnSans text-base focus:outline-none focus:border-accent transition-colors resize-none"
          />
          <p className="text-xs text-ink-muted/80 font-bnSans mt-2">
            টেক্সটি স্বয়ংক্রিয়ভাবে স্ক্রল হবে। সংক্ষিপ্ত ও আকর্ষণীয় রাখার পরামর্শ দেওয়া হলো।
          </p>
        </div>

        {/* Live preview */}
        <div className="mb-6">
          <p className="text-xs uppercase tracking-widest text-ink-muted font-bnSans mb-2">
            লাইভ প্রিভিউ
          </p>
          <div className="rounded-xl overflow-hidden border border-line/60">
            {settings.marqueeEnabled && settings.marqueeText.trim() ? (
              <div className="bg-gradient-to-r from-[#1F4E79] via-[#2C8DCC] to-[#1F4E79] text-white py-2 overflow-hidden">
                <div className="marquee-track whitespace-nowrap">
                  {[0, 1, 2, 3].map((i) => (
                    <span key={i} className="font-bnSans text-sm pr-16 inline-flex items-center gap-3">
                      {settings.marqueeText}
                      <span className="opacity-50">✦</span>
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-bg/60 py-4 text-center text-sm text-ink-muted font-bnSans">
                ঘোষণা বার বর্তমানে দৃশ্যমান নয়
              </div>
            )}
          </div>
        </div>

        {err && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-700 text-sm font-bnSans">
            {err}
          </div>
        )}
        {savedAt && (
          <div data-testid="settings-saved" className="mb-4 p-3 rounded-xl bg-emerald-50 text-emerald-700 text-sm font-bnSans">
            ✓ পরিবর্তন সংরক্ষিত হয়েছে
          </div>
        )}

        <button
          type="submit"
          disabled={saving}
          data-testid="settings-save"
          className="btn-gold w-full md:w-auto justify-center"
        >
          <Save className="w-4 h-4" />
          {saving ? "সংরক্ষণ হচ্ছে..." : "পরিবর্তন সংরক্ষণ করুন"}
        </button>
      </form>
    </div>
  );
}
