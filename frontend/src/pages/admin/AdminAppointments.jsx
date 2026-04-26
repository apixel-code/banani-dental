// Admin appointments management
import { useEffect, useState } from "react";
import { Phone, Mail, MessageCircle, Trash2, Calendar } from "lucide-react";
import { api } from "@/lib/api";
import { appointmentStatuses } from "@/content/admin";

const statusObj = (id) =>
  appointmentStatuses.find((s) => s.id === id) || appointmentStatuses[0];

export default function AdminAppointments() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const fetchItems = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/appointments");
      setItems(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const updateStatus = async (id, status) => {
    const { data } = await api.patch(`/appointments/${id}`, { status });
    setItems((prev) => prev.map((it) => (it.id === id ? data : it)));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("এই অ্যাপয়েন্টমেন্ট মুছে ফেলবেন?")) return;
    await api.delete(`/appointments/${id}`);
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const filtered = filter === "all" ? items : items.filter((it) => it.status === filter);

  return (
    <div data-testid="admin-appointments-page">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.22em] text-gold font-bnSans mb-2">
          অ্যাপয়েন্টমেন্ট
        </p>
        <h1 className="font-bnSerif text-2xl md:text-4xl text-ink">
          সব অ্যাপয়েন্টমেন্ট রিকোয়েস্ট
        </h1>
        <p className="font-bnSans text-sm text-ink-muted mt-2">মোট {items.length} টি</p>
      </header>

      <div className="flex gap-2 overflow-x-auto pb-3 mb-6 hide-scrollbar -mx-4 md:mx-0 px-4 md:px-0">
        <button
          data-testid="appt-filter-all"
          onClick={() => setFilter("all")}
          className={`shrink-0 px-5 py-2 rounded-full text-sm font-bnSans transition ${
            filter === "all" ? "bg-ink text-bg" : "bg-white border border-line text-ink-muted hover:border-gold"
          }`}
        >
          সব
        </button>
        {appointmentStatuses.map((s) => (
          <button
            key={s.id}
            data-testid={`appt-filter-${s.id}`}
            onClick={() => setFilter(s.id)}
            className={`shrink-0 px-5 py-2 rounded-full text-sm font-bnSans transition ${
              filter === s.id ? "bg-ink text-bg" : "bg-white border border-line text-ink-muted hover:border-gold"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-32 rounded-2xl bg-white border border-line animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div data-testid="appt-empty" className="rounded-3xl bg-white border border-dashed border-line py-20 text-center">
          <Calendar className="w-12 h-12 mx-auto text-gold mb-4" />
          <h3 className="font-bnSerif text-xl text-ink">কোন অ্যাপয়েন্টমেন্ট নেই</h3>
          <p className="font-bnSans text-sm text-ink-muted mt-2">
            নতুন রিকোয়েস্ট এলে এখানে দেখা যাবে।
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((appt) => {
            const s = statusObj(appt.status);
            return (
              <article
                key={appt.id}
                data-testid={`appt-${appt.id}`}
                className="bg-white rounded-2xl border border-line/60 p-4 md:p-6 hover:shadow-lux transition-shadow duration-500"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 md:gap-3 mb-2 flex-wrap">
                      <h3 className="font-bnSerif text-lg md:text-xl text-ink break-words">{appt.name}</h3>
                      <span
                        className={`text-[10px] md:text-xs px-2.5 md:px-3 py-0.5 md:py-1 rounded-full border font-bnSans whitespace-nowrap ${s.color}`}
                      >
                        {s.label}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-ink-muted font-bnSans mt-3">
                      <a href={`tel:${appt.phone}`} className="flex items-center gap-2 hover:text-gold">
                        <Phone className="w-4 h-4" />
                        <span className="tabular-nums">{appt.phone}</span>
                      </a>
                      {appt.email && (
                        <a href={`mailto:${appt.email}`} className="flex items-center gap-2 hover:text-gold break-all">
                          <Mail className="w-4 h-4 shrink-0" />
                          <span className="break-all">{appt.email}</span>
                        </a>
                      )}
                      <a
                        href={`https://wa.me/88${appt.phone.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 hover:text-gold"
                      >
                        <MessageCircle className="w-4 h-4" />
                        WhatsApp
                      </a>
                    </div>
                    {appt.service && (
                      <p className="mt-3 text-sm font-bnSans">
                        <span className="text-ink-muted">সেবা:</span>{" "}
                        <span className="text-ink">{appt.service}</span>
                      </p>
                    )}
                    {appt.preferredDate && (
                      <p className="mt-1 text-sm font-bnSans">
                        <span className="text-ink-muted">পছন্দের তারিখ:</span>{" "}
                        <span className="text-ink tabular-nums">{appt.preferredDate}</span>
                      </p>
                    )}
                    {appt.message && (
                      <p className="mt-3 text-sm font-bnSans bg-bg/60 rounded-xl p-3 border border-line/40 break-words">
                        {appt.message}
                      </p>
                    )}
                    <p className="mt-3 text-xs text-ink-muted/70 font-bnSans">
                      {new Date(appt.createdAt).toLocaleString("bn-BD")}
                    </p>
                  </div>

                  <div className="flex flex-row md:flex-col items-stretch md:items-end gap-3 md:gap-2 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-line/40">
                    <select
                      data-testid={`appt-status-${appt.id}`}
                      value={appt.status}
                      onChange={(e) => updateStatus(appt.id, e.target.value)}
                      className="flex-1 md:flex-none px-3 py-2 rounded-lg border border-line bg-bg/40 text-sm font-bnSans focus:outline-none focus:border-gold"
                    >
                      {appointmentStatuses.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => handleDelete(appt.id)}
                      data-testid={`delete-appt-${appt.id}`}
                      className="px-3 py-2 md:px-0 md:py-0 rounded-lg md:rounded-none text-xs text-red-600 hover:text-red-800 font-bnSans flex items-center justify-center gap-1 border md:border-0 border-red-200 md:bg-transparent"
                    >
                      <Trash2 className="w-3 h-3" />
                      মুছুন
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
