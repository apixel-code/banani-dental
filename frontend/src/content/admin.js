export const adminSidebar = {
  panelLabel: "Admin Panel",
  userRoleLabel: "administrator",
  logoutLabel: "Logout",
  navigation: [
    {
      href: "/admin",
      label: "Dashboard",
      icon: "dashboard",
      end: true,
    },
    {
      href: "/admin/gallery",
      label: "Gallery",
      icon: "gallery",
    },
    {
      href: "/admin/doctors",
      label: "Doctors",
      icon: "doctors",
    },
    {
      href: "/admin/appointments",
      label: "Appointments",
      icon: "appointments",
    },
    {
      href: "/admin/settings",
      label: "Settings",
      icon: "settings",
    },
  ],
};

export const adminDashboard = {
  eyebrow: "Dashboard",
  title: "Welcome. Here is a concise overview of your clinic.",
  detailsLabel: "-> Details",
  cards: [
    {
      label: "Total Images",
      statKey: "gallery",
      icon: "gallery",
      href: "/admin/gallery",
    },
    {
      label: "Doctors",
      statKey: "doctors",
      icon: "doctors",
      href: "/admin/doctors",
    },
    {
      label: "Total Appointments",
      statKey: "appointments",
      icon: "appointments",
      href: "/admin/appointments",
    },
    {
      label: "New Appointments",
      statKey: "newAppointments",
      icon: "sparkles",
      href: "/admin/appointments",
      highlight: true,
    },
  ],
  quickActions: [
    {
      href: "/admin/gallery",
      title: "Add New Gallery Images",
      description: "Upload clinic, patient, doctor, or transformation images.",
      icon: "gallery",
    },
    {
      href: "/admin/doctors",
      title: "Update Doctor Profiles",
      description: "Edit doctors' photos, qualifications, and professional details.",
      icon: "doctors",
    },
  ],
};

export const appointmentStatuses = [
  {
    id: "new",
    label: "New",
    color: "bg-gold/15 text-gold border-gold/30",
  },
  {
    id: "contacted",
    label: "Contacted",
    color: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    id: "confirmed",
    label: "Confirmed",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    id: "completed",
    label: "Completed",
    color: "bg-slate-100 text-slate-700 border-slate-200",
  },
  {
    id: "cancelled",
    label: "Cancelled",
    color: "bg-red-50 text-red-700 border-red-200",
  },
];

export const adminGalleryCategories = [
  { id: "clinic", label: "Clinic" },
  { id: "patients", label: "Patients" },
  { id: "doctors", label: "Doctors" },
  { id: "before-after", label: "Transformations" },
];
