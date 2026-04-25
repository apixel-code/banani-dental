// Banani Dental Clinic - Root App
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@/App.css";
import { AuthProvider } from "@/context/AuthContext";

import Home from "@/pages/Home";
import Gallery from "@/pages/Gallery";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminLayout from "@/pages/admin/AdminLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminGallery from "@/pages/admin/AdminGallery";
import AdminDoctors from "@/pages/admin/AdminDoctors";
import AdminAppointments from "@/pages/admin/AdminAppointments";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
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
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
