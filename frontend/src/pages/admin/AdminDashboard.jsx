// Admin Dashboard - quick stats overview
import { useEffect, useState } from "react";
import { Image as ImageIcon, Users, Calendar, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { api } from "@/lib/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    gallery: 0,
    doctors: 0,
    appointments: 0,
    newAppointments: 0,
  });

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [g, d, a] = await Promise.all([
          api.get("/gallery"),
          api.get("/doctors"),
          api.get("/appointments"),
        ]);
        setStats({
          gallery: g.data.length,
          doctors: d.data.length,
          appointments: a.data.length,
          newAppointments: a.data.filter((it) => it.status === "new").length,
        });
      } catch {
        /* ignore */
      }
    };
    fetchAll();
  }, []);

  const cards = [
    { label: "মোট ছবি", value: stats.gallery, icon: ImageIcon, to: "/admin/gallery" },
    { label: "চিকিৎসক", value: stats.doctors, icon: Users, to: "/admin/doctors" },
    { label: "মোট অ্যাপয়েন্টমেন্ট", value: stats.appointments, icon: Calendar, to: "/admin/appointments" },
    { label: "নতুন অ্যাপয়েন্টমেন্ট", value: stats.newAppointments, icon: Sparkles, to: "/admin/appointments", highlight: true },
  ];

  return (
    <div data-testid="admin-dashboard">
      <header className="mb-8 md:mb-10">
        <p className="text-xs uppercase tracking-[0.22em] text-gold font-bnSans mb-2">
          ড্যাশবোর্ড
        </p>
        <h1 className="font-bnSerif text-2xl md:text-4xl text-ink leading-tight">
          স্বাগতম! এখানে আপনার ক্লিনিকের সংক্ষিপ্ত পরিসংখ্যান
        </h1>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.label}
              to={c.to}
              data-testid={`stat-${c.label}`}
              style={c.highlight ? { background: "linear-gradient(135deg, #1F4E79 0%, #2C8DCC 100%)", borderColor: "transparent" } : {}}
              className={`lux-card group !p-7 ${c.highlight ? "!text-white" : ""}`}
            >
              <div className="flex items-start justify-between mb-6">
                <Icon
                  className={`w-5 h-5 ${
                    c.highlight ? "text-white" : "text-gold"
                  }`}
                />
                <span
                  className={`text-xs uppercase tracking-widest font-bnSans ${
                    c.highlight ? "text-white/80" : "text-ink-muted"
                  }`}
                >
                  → বিস্তারিত
                </span>
              </div>
              <p
                className={`font-enSerif text-5xl tabular-nums ${
                  c.highlight ? "text-white" : "text-ink"
                }`}
              >
                {c.value}
              </p>
              <p
                className={`font-bnSans text-sm mt-2 ${
                  c.highlight ? "text-white/85" : "text-ink-muted"
                }`}
              >
                {c.label}
              </p>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Link to="/admin/gallery" className="lux-card flex items-center gap-5 hover:border-gold/40">
          <span className="w-12 h-12 rounded-xl bg-gold/10 text-gold flex items-center justify-center">
            <ImageIcon className="w-5 h-5" />
          </span>
          <div>
            <p className="font-bnSerif text-lg text-ink">গ্যালারিতে নতুন ছবি যোগ করুন</p>
            <p className="text-sm text-ink-muted font-bnSans">
              ক্লিনিক, রোগী, চিকিৎসক বা ট্রান্সফরমেশন ছবি আপলোড করুন।
            </p>
          </div>
        </Link>
        <Link to="/admin/doctors" className="lux-card flex items-center gap-5 hover:border-gold/40">
          <span className="w-12 h-12 rounded-xl bg-gold/10 text-gold flex items-center justify-center">
            <Users className="w-5 h-5" />
          </span>
          <div>
            <p className="font-bnSerif text-lg text-ink">চিকিৎসক প্রোফাইল আপডেট করুন</p>
            <p className="text-sm text-ink-muted font-bnSans">
              চিকিৎসকদের ছবি, যোগ্যতা ও বিস্তারিত তথ্য সম্পাদনা করুন।
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
