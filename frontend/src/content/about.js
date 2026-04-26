import { brand } from "@/content/brand";

export const aboutPage = {
  testId: "about-page",
  eyebrow: "About Us",
  title: "Banani Clinic: Where Trust and Clinical Excellence Come Together",
  intro:
    "Located in Banani, Dhaka, Banani Clinic is a specialized hospital where advanced technology, international-standard treatment, and compassionate care come together. We do more than provide treatment; we restore confidence.",
  founder: {
    sectionTitle: "Our Founder and Specialist",
    fullName: "Assoc. Prof. Dr. Aslam Almehdi",
    displayName: "Dr. Aslam Almehdi",
    role: "Founder · Lead Maxillofacial Surgeon",
    badge: "AACD Member",
    image: brand.images.owner,
    imageAlt: "Assoc. Prof. Dr. Aslam Almehdi",
    bio: [
      [
        { text: "Assoc. Prof. Dr. Aslam Almehdi", strong: true },
        {
          text:
            " - Best Dentist / Dental Surgeon / Periodontist / Implantologist / Maxillofacial Surgeon. He is recognized as a leader in advanced dentistry and Advanced Digital Implant Treatments (USA), and is an esteemed member of the American Academy of Cosmetic Dentistry (AACD).",
        },
      ],
      [
        {
          text:
            "With specialized expertise in dental implants, maxillofacial surgery, and periodontal plastic surgery, this experienced clinician has completed advanced training in ",
        },
        {
          text: "Japan, Korea, the United Kingdom, the United States, and Australia",
          strong: true,
        },
        {
          text:
            ". He is known for personalized treatment plans and advanced procedures for complex dental and oral conditions.",
        },
      ],
    ],
  },
  values: [
    {
      icon: "shield",
      title: "Comfortable Treatment",
      desc: "We use modern technology and appropriate anesthesia to make every procedure as comfortable as possible.",
    },
    {
      icon: "award",
      title: "International Training",
      desc: "Our specialist clinicians have received advanced training in Japan, Korea, the United Kingdom, the United States, and Australia.",
    },
    {
      icon: "heart",
      title: "Patient-Centered Care",
      desc: "Each patient receives an individualized treatment plan and compassionate clinical care.",
    },
    {
      icon: "stethoscope",
      title: "Comprehensive Solutions",
      desc: "From dentistry and maxillofacial surgery to cleft lip and filariasis care, our services are available under one roof.",
    },
  ],
  sections: [
    {
      title: "About Cleft Lip and Palate",
      content: [
        [
          {
            text:
              "Cleft lip & palate is one of the most common birth defects in Bangladesh and affects more than ",
          },
          { text: "6,000 children", strong: true, tabular: true },
          {
            text:
              " in the country. Unless treated, cleft lip & palate can interfere with feeding, speech development and hearing.",
          },
        ],
        "Cleft lip & palate are birth defects that happen while a baby is developing in the uterus. During the 6th to 10th week of pregnancy, the bones and tissues of a baby's upper jaw, nose, and mouth normally come together to form the roof of the mouth and the upper lip. If the tissue in the developing mouth and the palate don't fuse together, a baby could be born with a condition called cleft lip & palate.",
        "The palate is the roof of the mouth and has two main parts. The front part behind the teeth is hard and the back part near the throat is soft. In babies with cleft palate, there is an opening between the roof of the mouth and the nose. This opening may be only through part of the palate (either the soft part or hard part) or through the entire palate. A complete cleft palate occurs when the left and right sides of the roof of the mouth have not fused together in the middle. In many cases, a baby born with a cleft palate also has a cleft lip.",
      ],
      quote:
        "Our cleft lip and palate care includes comprehensive support under one roof, from surgical correction to speech therapy.",
    },
    {
      title: "About Filariasis / Elephantiasis",
      content: [
        [
          { text: "Filariasis — commonly known as " },
          { text: "elephantiasis", strong: true },
          {
            text:
              " — is a neglected tropical disease. Infection occurs when filarial parasites are transmitted to humans through mosquitoes. Elephantiasis is the enlargement and hardening of limbs or body parts due to tissue swelling.",
          },
        ],
        "It is characterised by edema, hypertrophy, and fibrosis of skin and subcutaneous tissues due to obstruction of lymphatic vessels. The term elephantiasis is often used in reference to parasitic worm infections, but may refer to a variety of diseases where parts of a person's body swell to massive proportions.",
        "At Banani Clinic, we provide integrated filariasis care, including early diagnosis, comprehensive medical management, and long-term follow-up.",
      ],
    },
  ],
  cta: {
    title: "Begin Your Treatment Journey Today",
    desc: "Contact us today for a personalized consultation under the care of an experienced specialist.",
    label: "Schedule an Appointment",
    href: "/#contact",
  },
};
