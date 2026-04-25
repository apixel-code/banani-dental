// Admin layout - sidebar + main, route protection
import { useState } from "react";
import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Image as ImageIcon,
  Users,
  Calendar,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const NAV = [
  { to: "/admin", label: "ড্যাশবোর্ড", icon: LayoutDashboard, end: true },
  { to: "/admin/gallery", label: "গ্যালারি", icon: ImageIcon },
  { to: "/admin/doctors", label: "চিকিৎসক", icon: Users },
  { to: "/admin/appointments", label: "অ্যাপয়েন্টমেন্ট", icon: Calendar },
];

export default function AdminLayout() {
  const { user, loading, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="flex gap-2">
          <span className="w-2 h-2 rounded-full bg-gold pulse-dot" />
          <span className="w-2 h-2 rounded-full bg-gold pulse-dot" style={{ animationDelay: "0.2s" }} />
          <span className="w-2 h-2 rounded-full bg-gold pulse-dot" style={{ animationDelay: "0.4s" }} />
        </div>
      </div>
    );
  }
  if (!user) return <Navigate to="/admin/login" replace />;

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div data-testid="admin-layout" className="min-h-screen bg-bg text-ink flex">
      {/* Mobile top bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-bg/90 backdrop-blur border-b border-line/60">
        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="font-enSerif text-lg text-ink">Banani</span>
            <span className="font-bnSerif text-lg text-gold">ডেন্টাল</span>
          </div>
          <button
            data-testid="admin-mobile-menu-btn"
            onClick={() => setOpen((v) => !v)}
            className="p-2 text-ink"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        data-testid="admin-sidebar"
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-white border-r border-line/60 z-30 transition-transform duration-500 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 flex flex-col`}
      >
        <div className="p-7 border-b border-line/60">
          <div className="flex items-center gap-2">
            <span className="font-enSerif text-xl text-ink">Banani</span>
            <span className="font-bnSerif text-xl text-gold">ডেন্টাল</span>
          </div>
          <p className="text-xs uppercase tracking-[0.22em] text-gold font-bnSans mt-1.5">
            অ্যাডমিন প্যানেল
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {NAV.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setOpen(false)}
                data-testid={`admin-nav-${item.label}`}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl font-bnSans text-sm transition-all duration-300 ${
                    isActive
                      ? "bg-gold/10 text-gold"
                      : "text-ink-muted hover:bg-bg hover:text-ink"
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t border-line/60">
          <div className="flex items-center justify-between mb-3 px-2">
            <div>
              <p className="font-bnSerif text-sm text-ink">{user.username}</p>
              <p className="text-xs text-ink-muted font-bnSans">administrator</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            data-testid="admin-logout"
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-ink-muted hover:text-red-600 hover:bg-red-50 transition-colors font-bnSans"
          >
            <LogOut className="w-4 h-4" />
            লগআউট
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-ink/40 z-20 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Main */}
      <main className="flex-1 lg:ml-0 pt-20 lg:pt-0">
        <div className="p-6 md:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
