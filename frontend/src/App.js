// Banani Clinic - Root App
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "@/App.css";
import { AuthProvider } from "@/context/AuthContext";
import ScrollToTop from "@/components/site/ScrollToTop";
import ScrollProgress from "@/components/site/ScrollProgress";

import Home from "@/pages/Home";
import Gallery from "@/pages/Gallery";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminLayout from "@/pages/admin/AdminLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminGallery from "@/pages/admin/AdminGallery";
import AdminDoctors from "@/pages/admin/AdminDoctors";
import AdminAppointments from "@/pages/admin/AdminAppointments";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="doctors" element={<AdminDoctors />} />
          <Route path="appointments" element={<AdminAppointments />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollProgress />
        <ScrollToTop />
        <AnimatedRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
