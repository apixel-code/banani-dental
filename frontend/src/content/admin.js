export const adminSidebar = {
  panelLabel: "অ্যাডমিন প্যানেল",
  userRoleLabel: "administrator",
  logoutLabel: "লগআউট",
  navigation: [
    {
      href: "/admin",
      label: "ড্যাশবোর্ড",
      icon: "dashboard",
      end: true,
    },
    {
      href: "/admin/gallery",
      label: "গ্যালারি",
      icon: "gallery",
    },
    {
      href: "/admin/doctors",
      label: "চিকিৎসক",
      icon: "doctors",
    },
    {
      href: "/admin/appointments",
      label: "অ্যাপয়েন্টমেন্ট",
      icon: "appointments",
    },
    {
      href: "/admin/settings",
      label: "সেটিংস",
      icon: "settings",
    },
  ],
};

export const adminDashboard = {
  eyebrow: "ড্যাশবোর্ড",
  title: "স্বাগতম! এখানে আপনার ক্লিনিকের সংক্ষিপ্ত পরিসংখ্যান",
  detailsLabel: "→ বিস্তারিত",
  cards: [
    {
      label: "মোট ছবি",
      statKey: "gallery",
      icon: "gallery",
      href: "/admin/gallery",
    },
    {
      label: "চিকিৎসক",
      statKey: "doctors",
      icon: "doctors",
      href: "/admin/doctors",
    },
    {
      label: "মোট অ্যাপয়েন্টমেন্ট",
      statKey: "appointments",
      icon: "appointments",
      href: "/admin/appointments",
    },
    {
      label: "নতুন অ্যাপয়েন্টমেন্ট",
      statKey: "newAppointments",
      icon: "sparkles",
      href: "/admin/appointments",
      highlight: true,
    },
  ],
  quickActions: [
    {
      href: "/admin/gallery",
      title: "গ্যালারিতে নতুন ছবি যোগ করুন",
      description: "ক্লিনিক, রোগী, চিকিৎসক বা ট্রান্সফরমেশন ছবি আপলোড করুন।",
      icon: "gallery",
    },
    {
      href: "/admin/doctors",
      title: "চিকিৎসক প্রোফাইল আপডেট করুন",
      description: "চিকিৎসকদের ছবি, যোগ্যতা ও বিস্তারিত তথ্য সম্পাদনা করুন।",
      icon: "doctors",
    },
  ],
};

export const appointmentStatuses = [
  {
    id: "new",
    label: "নতুন",
    color: "bg-gold/15 text-gold border-gold/30",
  },
  {
    id: "contacted",
    label: "যোগাযোগ হয়েছে",
    color: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    id: "confirmed",
    label: "নিশ্চিত",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    id: "completed",
    label: "সম্পন্ন",
    color: "bg-slate-100 text-slate-700 border-slate-200",
  },
  {
    id: "cancelled",
    label: "বাতিল",
    color: "bg-red-50 text-red-700 border-red-200",
  },
];

export const adminGalleryCategories = [
  { id: "clinic", label: "ক্লিনিক" },
  { id: "patients", label: "রোগী" },
  { id: "doctors", label: "চিকিৎসক" },
  { id: "before-after", label: "ট্রান্সফরমেশন" },
];
