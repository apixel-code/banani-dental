import { brand } from "@/content/brand";

const contact = {
  email: brand.contact.email,
  phone: brand.contact.phone,
};

export const privacyPolicy = {
  testId: "privacy-page",
  eyebrow: "Privacy Policy",
  title: "Your Privacy Is Our Highest Priority",
  intro:
    "Banani Clinic Ltd. places the highest importance on the confidentiality of your personal and medical information. The details below explain how we collect, use, and protect your data.",
  lastUpdated: "January 2026",
  numberSections: true,
  sections: [
    {
      title: "Information We Collect",
      content:
        "Banani Clinic collects your name, phone number, email address, and brief medical information only when required to provide clinical services and manage appointments. Collected information is never sold or shared with third parties.",
    },
    {
      title: "How We Use Information",
      content:
        "We use the information you provide to confirm appointments, support follow-up communication, improve clinical services, and send important medical reminders when necessary.",
    },
    {
      title: "Cookies and Browsing Information",
      content:
        "Our website uses only essential cookies, including admin session cookies and page analytics. You may disable cookies at any time through your browser settings.",
    },
    {
      title: "Images and Media",
      content:
        "Any before-and-after images or gallery photographs are published only with the patient's written consent. Removal may be requested at any time.",
    },
    {
      title: "Data Security",
      content:
        "Your information is stored in encrypted databases and secure cloud services, including Cloudinary and MongoDB. Only authorized administrative personnel can access the JWT-protected admin panel.",
    },
    {
      title: "Third-Party Services",
      content:
        "Our site uses WhatsApp click-to-chat, Google Fonts, and the Cloudinary CDN. These services maintain their own privacy policies.",
    },
    {
      title: "Your Rights",
      content:
        "You may request to view, correct, or delete your stored information at any time. To submit a request, email contact@bananiclinic.com or call 01711170890.",
    },
    {
      title: "Policy Updates",
      content:
        "Any changes to this Privacy Policy will be updated on this page. We recommend reviewing this page periodically.",
    },
  ],
  contactBlock: {
    title: "Contact",
    desc: "For any privacy-related questions:",
    ...contact,
  },
};

export const termsOfService = {
  testId: "terms-page",
  eyebrow: "Terms of Service",
  title: "Terms of Service: A Commitment to Transparency and Fairness",
  intro:
    "Please read the following terms carefully before using the website and services of Banani Clinic Ltd.",
  lastUpdated: "January 2026",
  numberSections: true,
  sections: [
    {
      title: "Acceptance of Terms",
      content:
        "By using this website (bananiclinic.com) or receiving clinical services, you agree to all terms stated below. If you do not agree with any term, please refrain from using this website.",
    },
    {
      title: "Medical Information and Disclaimer",
      content:
        "All information provided on our website, including articles related to cleft lip and palate or filariasis, is for educational and informational purposes only. It is not a substitute for personalized professional medical advice, diagnosis, or treatment. Always consult a qualified clinician directly for condition-specific care.",
    },
    {
      title: "Appointments and Payment",
      content:
        "An online appointment request is only a request for an appointment. The appointment is confirmed after communication with our coordinator. Treatment fees and payment methods will be explained at the clinic. For procedures requiring advance payment, the applicable refund policy will apply.",
    },
    {
      title: "Appointment Rescheduling and Cancellation",
      content:
        "To reschedule or cancel an appointment, please inform us by phone or WhatsApp at least 24 hours in advance. Repeated missed appointments may result in limitations on future appointment availability.",
    },
    {
      title: "Images and Content Rights",
      content:
        "All logos, images, written content, designs, and videos on this website are the intellectual property of Banani Clinic Ltd. Copying, republishing, or using any content commercially without written permission is strictly prohibited.",
    },
    {
      title: "User Conduct",
      content:
        "You agree not to provide false information, not to schedule appointments under another person's identity, to maintain respect for the clinic environment and staff, and to follow clinic policies.",
    },
    {
      title: "Limitation of Liability",
      content:
        "Banani Clinic Ltd. will not be liable for any direct or indirect loss resulting from website use. Standard treatment-related risks will be explained in advance, and written patient consent will be obtained when required.",
    },
    {
      title: "Governing Law",
      content:
        "This website and all activities of Banani Clinic Ltd. are governed by the laws of the People's Republic of Bangladesh. Any dispute shall fall under the jurisdiction of the courts of Dhaka.",
    },
    {
      title: "Changes to Terms",
      content:
        "These terms may be updated at any time. Continued use of the website after updates are published will be considered acceptance of the revised terms.",
    },
  ],
  contactBlock: {
    title: "Questions or Feedback?",
    desc: "For questions about these Terms of Service:",
    ...contact,
  },
};
