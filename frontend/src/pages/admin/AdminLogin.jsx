// Admin login screen - luxury minimal
import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AdminLogin() {
  const { login, user, loading } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [err, setErr] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  if (!loading && user) return <Navigate to="/admin" replace />;

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErr("");
    try {
      await login(form.username, form.password);
      navigate("/admin");
    } catch (e2) {
      setErr(e2?.response?.data?.error || "Login failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      data-testid="admin-login-page"
      className="min-h-screen bg-bg flex items-center justify-center p-6 relative overflow-hidden"
    >
      {/* Decorative gradient blob */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gold/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gold/5 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-lux border border-line/60 p-8 md:p-10"
      >
        <div className="text-center mb-8">
          <motion.img
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
            src="/brand/logo.png"
            alt="Banani Clinic"
            className="w-16 h-16 mx-auto mb-4 object-contain"
          />
          <p className="text-xs uppercase tracking-[0.25em] text-accent font-bnSans">
            Admin Panel
          </p>
          <h1 className="font-bnSerif text-2xl md:text-3xl text-ink mt-3">
            Welcome, Please Log In
          </h1>
        </div>

        <form onSubmit={submit} className="space-y-5">
          {err && (
            <div data-testid="login-error" className="p-3 rounded-xl bg-red-50 text-red-700 text-sm font-bnSans">
              {err}
            </div>
          )}

          <div>
            <label className="block text-xs uppercase tracking-widest text-ink-muted font-bnSans mb-2">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
              <input
                data-testid="login-username"
                value={form.username}
                onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
                required
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-line bg-bg/40 font-bnSans focus:outline-none focus:border-gold transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-ink-muted font-bnSans mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
              <input
                data-testid="login-password"
                type="password"
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                required
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-line bg-bg/40 font-bnSans focus:outline-none focus:border-gold transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            data-testid="login-submit"
            className="btn-gold w-full justify-center"
          >
            {submitting ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-ink-muted font-bnSans">
          Default: <span className="font-mono text-ink">admin / Admin@2026</span>
        </p>
      </motion.div>
    </div>
  );
}
