// About Us page - includes Banani Clinic specialization, cleft lip & palate, filariasis
import ContentPageLayout from "./ContentPageLayout";
import { motion } from "framer-motion";
import { Award, Heart, Stethoscope, ShieldCheck } from "lucide-react";
import HashLink from "@/components/site/HashLink";

const VALUES = [
  {
    icon: ShieldCheck,
    title: "ব্যথামুক্ত চিকিৎসা",
    desc: "আধুনিক প্রযুক্তি ও সঠিক অ্যানেস্থেসিয়া ব্যবহার করে আমরা চিকিৎসাকে যতটা সম্ভব আরামদায়ক করি।",
  },
  {
    icon: Award,
    title: "আন্তর্জাতিক প্রশিক্ষণ",
    desc: "জাপান, কোরিয়া, ইউকে, আমেরিকা ও অস্ট্রেলিয়া থেকে অগ্রসর প্রশিক্ষণপ্রাপ্ত বিশেষজ্ঞ চিকিৎসকদের দল।",
  },
  {
    icon: Heart,
    title: "রোগীকেন্দ্রিক যত্ন",
    desc: "প্রতিটি রোগীর জন্য আলাদাভাবে ব্যক্তিগত চিকিৎসা পরিকল্পনা ও সহানুভূতিশীল পরিচর্যা।",
  },
  {
    icon: Stethoscope,
    title: "সম্পূর্ণ সমাধান",
    desc: "ডেন্টাল, ম্যাক্সিলোফেসিয়াল সার্জারি থেকে ক্লেফট লিপ ও ফাইলেরিয়াসিস — সব সমাধান এক ছাদের নিচে।",
  },
];

export default function About() {
  return (
    <ContentPageLayout
      testId="about-page"
      eyebrow="আমাদের সম্পর্কে"
      title="বানানী ক্লিনিক — যেখানে আস্থা ও দক্ষতা মিশে এক হয়"
      intro="ঢাকার বানানীতে অবস্থিত একটি স্পেশালাইজড হাসপাতাল যেখানে আধুনিক প্রযুক্তি, আন্তর্জাতিক মানের চিকিৎসা ও মানবিক যত্ন একসাথে পাওয়া যায়। আমরা শুধু চিকিৎসা দিই না — ফিরিয়ে দিই আত্মবিশ্বাস।"
    >
      {/* Lead doctor */}
      <h2 className="font-bnSerif text-2xl md:text-3xl text-ink mt-0 mb-6 not-prose">
        আমাদের প্রতিষ্ঠাতা ও বিশেষজ্ঞ
      </h2>

      {/* Owner photo + bio */}
      <div className="not-prose grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="md:col-span-2"
        >
          <div className="relative rounded-2xl overflow-hidden bg-white border border-line/50 shadow-lux">
            <div className="aspect-[3/4]">
              <img
                src="/brand/owner.jpg"
                alt="Assoc. Prof. Dr. Aslam Almehdi"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent p-5 text-white">
              <p className="font-enSerif text-lg leading-tight">Dr. Aslam Almehdi</p>
              <p className="font-bnSans text-[10px] uppercase tracking-[0.2em] text-accent-soft mt-1">
                Founder · Lead Maxillofacial Surgeon
              </p>
            </div>
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur rounded-full px-3 py-1 text-[10px] uppercase tracking-widest font-bnSans text-accent flex items-center gap-1.5">
              <Award className="w-3 h-3" /> AACD Member
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="md:col-span-3 flex flex-col justify-center"
        >
          <p className="font-bnSans text-ink-muted leading-relaxed text-[15px] md:text-base">
            <strong className="text-ink">Assoc. Prof. Dr. Aslam Almehdi</strong> — Best Dentist /
            Dental Surgeon / Periodontist / Implantologist / Maxillofacial Surgeon. তিনি Advanced
            Dentistry এর Leader এবং Advanced Digital Implant Treatments (USA) এর leader। American
            Academy of Cosmetic Dentistry (AACD) এর সম্মানিত সদস্য।
          </p>
          <p className="font-bnSans text-ink-muted leading-relaxed text-[15px] md:text-base mt-4">
            Dental implants, maxillofacial surgery এবং periodontal plastic surgery তে বিশেষ
            দক্ষতাসম্পন্ন এই অভিজ্ঞ চিকিৎসক <strong className="text-ink">জাপান, কোরিয়া, ইউকে,
            আমেরিকা ও অস্ট্রেলিয়া</strong> থেকে advanced training সম্পন্ন করেছেন। জটিল dental ও
            oral conditions এর ক্ষেত্রে personalized treatment plans এবং cutting-edge procedures এর
            জন্য তিনি প্রসিদ্ধ।
          </p>
        </motion.div>
      </div>

      {/* Values grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10 not-prose">
        {VALUES.map((v, i) => {
          const Icon = v.icon;
          return (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="lux-card !p-5 md:!p-6"
            >
              <div className="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center mb-3">
                <Icon className="w-4 h-4" />
              </div>
              <h3 className="font-bnSerif text-lg text-ink">{v.title}</h3>
              <p className="font-bnSans text-sm text-ink-muted mt-2 leading-relaxed">{v.desc}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Cleft Lip & Palate */}
      <h2 className="font-bnSerif text-2xl md:text-3xl text-ink mt-12 mb-4">
        About Cleft Lip and Palate
      </h2>
      <p className="font-bnSans text-ink-muted leading-relaxed text-[15px] md:text-base">
        Cleft lip & palate is one of the most common birth defects in Bangladesh and affects more
        than <strong className="text-ink tabular-nums">6,000 children</strong> in the country.
        Unless treated, cleft lip & palate can interfere with feeding, speech development and
        hearing.
      </p>
      <p className="font-bnSans text-ink-muted leading-relaxed text-[15px] md:text-base mt-4">
        Cleft lip & palate are birth defects that happen while a baby is developing in the
        uterus. During the 6th to 10th week of pregnancy, the bones and tissues of a baby's upper
        jaw, nose, and mouth normally come together to form the roof of the mouth and the upper
        lip. If the tissue in the developing mouth and the palate don't fuse together, a baby
        could be born with a condition called cleft lip & palate.
      </p>
      <p className="font-bnSans text-ink-muted leading-relaxed text-[15px] md:text-base mt-4">
        The palate is the roof of the mouth and has two main parts. The front part behind the
        teeth is hard and the back part near the throat is soft. In babies with cleft palate,
        there is an opening between the roof of the mouth and the nose. This opening may be only
        through part of the palate (either the soft part or hard part) or through the entire
        palate. A complete cleft palate occurs when the left and right sides of the roof of the
        mouth have not fused together in the middle. In many cases, a baby born with a cleft
        palate also has a cleft lip.
      </p>
      <blockquote className="my-8 pl-5 border-l-4 border-accent bg-gold/5 py-4 pr-5 rounded-r-xl">
        <p className="font-bnSans text-ink leading-relaxed text-[15px] italic">
          আমাদের ক্লেফট লিপ ও প্যালেট চিকিৎসা সম্পূর্ণ surgical correction থেকে speech therapy
          পর্যন্ত — সব ধরনের সাপোর্ট এক ছাদের নিচে।
        </p>
      </blockquote>

      {/* Filariasis */}
      <h2 className="font-bnSerif text-2xl md:text-3xl text-ink mt-12 mb-4">
        About Filariasis / Elephantiasis
      </h2>
      <p className="font-bnSans text-ink-muted leading-relaxed text-[15px] md:text-base">
        Filariasis — commonly known as <strong className="text-ink">elephantiasis</strong> — is a
        neglected tropical disease. Infection occurs when filarial parasites are transmitted to
        humans through mosquitoes. Elephantiasis is the enlargement and hardening of limbs or
        body parts due to tissue swelling.
      </p>
      <p className="font-bnSans text-ink-muted leading-relaxed text-[15px] md:text-base mt-4">
        It is characterised by edema, hypertrophy, and fibrosis of skin and subcutaneous tissues
        due to obstruction of lymphatic vessels. The term elephantiasis is often used in
        reference to parasitic worm infections, but may refer to a variety of diseases where
        parts of a person's body swell to massive proportions.
      </p>
      <p className="font-bnSans text-ink-muted leading-relaxed text-[15px] md:text-base mt-4">
        Banani Clinic এ আমরা early diagnosis, comprehensive medical management ও long-term care
        সহ filariasis এর সমন্বিত চিকিৎসা প্রদান করি।
      </p>

      {/* CTA */}
      <div className="mt-14 not-prose text-center bg-gradient-to-br from-gold/10 to-accent/10 border border-line/50 rounded-3xl p-8 md:p-12">
        <h3 className="font-bnSerif text-2xl md:text-3xl text-ink">
          আপনার চিকিৎসার যাত্রা শুরু হোক আজই
        </h3>
        <p className="font-bnSans text-ink-muted mt-3 max-w-xl mx-auto">
          অভিজ্ঞ বিশেষজ্ঞের তত্ত্বাবধানে ব্যক্তিগত পরামর্শের জন্য আজই যোগাযোগ করুন।
        </p>
        <HashLink to="/#contact" className="btn-gold mt-7 inline-flex cursor-pointer">
          অ্যাপয়েন্টমেন্ট নিন
        </HashLink>
      </div>
    </ContentPageLayout>
  );
}
