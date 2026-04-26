const phoneNumber = "01711170890";
const whatsappNumber = "8801711170890";

export const brand = {
  name: "Banani Clinic",
  legalName: "Banani Clinic Ltd.",
  subtitle: "Specialized Hospital",
  tagline:
    "Restoring genuine confidence through comfortable, modern dental care.",
  logo: {
    src: "/brand/logo.png",
    alt: "Banani Clinic Ltd.",
  },
  images: {
    owner: "/brand/owner.jpg",
  },
  contact: {
    phone: {
      number: phoneNumber,
      display: phoneNumber,
    },
    whatsapp: {
      number: whatsappNumber,
      label: "Chat on WhatsApp",
    },
    email: "contact@bananiclinic.com",
    address: {
      line1: "House #116, Road #15, Block #C",
      line2: "Banani, Dhaka-1213",
      full: "House #116, Road #15, Block #C, Banani, Dhaka-1213",
    },
  },
  copyrightText: "All rights reserved.",
  developerCredit: {
    prefix: "Developed by",
    name: "Apixel",
    href: "https://www.apixel.net",
    displayUrl: "www.apixel.net",
    ariaLabel: "Visit Apixel website",
  },
};

export const buildTelHref = (number) => `tel:${number.replace(/[^\d+]/g, "")}`;

export const buildWhatsAppHref = (number) =>
  `https://wa.me/${number.replace(/\D/g, "")}`;
