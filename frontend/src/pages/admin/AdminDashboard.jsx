// Admin Dashboard - quick stats overview
import { useEffect, useState } from "react";
import { Image as ImageIcon, Users, Calendar, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { api } from "@/lib/api";
import { adminDashboard } from "@/content/admin";

const DASHBOARD_ICONS = {
  appointments: Calendar,
  doctors: Users,
  gallery: ImageIcon,
  sparkles: Sparkles,
};

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

  return (
    <div data-testid="admin-dashboard">
      <header className="mb-8 md:mb-10">
        <p className="text-xs uppercase tracking-[0.22em] text-gold font-bnSans mb-2">
          {adminDashboard.eyebrow}
        </p>
        <h1 className="font-bnSerif text-2xl md:text-4xl text-ink leading-tight">
          {adminDashboard.title}
        </h1>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {adminDashboard.cards.map((c) => {
          const Icon = DASHBOARD_ICONS[c.icon] || ImageIcon;
          return (
            <Link
              key={c.label}
              to={c.href}
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
                  {adminDashboard.detailsLabel}
                </span>
              </div>
              <p
                className={`font-enSerif text-5xl tabular-nums ${
                  c.highlight ? "text-white" : "text-ink"
                }`}
              >
                {stats[c.statKey]}
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
        {adminDashboard.quickActions.map((action) => {
          const Icon = DASHBOARD_ICONS[action.icon] || ImageIcon;

          return (
            <Link
              key={action.href}
              to={action.href}
              className="lux-card flex items-center gap-5 hover:border-gold/40"
            >
              <span className="w-12 h-12 rounded-xl bg-gold/10 text-gold flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </span>
              <div>
                <p className="font-bnSerif text-lg text-ink">{action.title}</p>
                <p className="text-sm text-ink-muted font-bnSans">
                  {action.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
