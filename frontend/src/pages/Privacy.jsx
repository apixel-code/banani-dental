// Privacy Policy page
import ContentPageLayout from "./ContentPageLayout";

const SECTIONS = [
  {
    title: "তথ্য সংগ্রহ",
    body:
      "Banani Clinic শুধুমাত্র আপনার চিকিৎসা সেবা প্রদান এবং অ্যাপয়েন্টমেন্ট ব্যবস্থাপনার প্রয়োজনে নাম, ফোন নম্বর, ইমেইল এবং সংক্ষিপ্ত মেডিকেল তথ্য সংগ্রহ করে। সংগৃহীত তথ্য কখনোই তৃতীয় পক্ষের কাছে বিক্রি বা শেয়ার করা হয় না।",
  },
  {
    title: "তথ্যের ব্যবহার",
    body:
      "আপনার দেওয়া তথ্য আমরা ব্যবহার করি — অ্যাপয়েন্টমেন্ট নিশ্চিত করতে, ফলো-আপ যোগাযোগে, চিকিৎসা পরিষেবা উন্নত করতে, এবং প্রয়োজন অনুসারে আপনাকে গুরুত্বপূর্ণ মেডিকেল রিমাইন্ডার পাঠাতে।",
  },
  {
    title: "কুকিজ ও ব্রাউজিং তথ্য",
    body:
      "আমাদের ওয়েবসাইটে শুধুমাত্র অপরিহার্য কুকিজ ব্যবহৃত হয় (অ্যাডমিন সেশন ও পেজ অ্যানালিটিক্স)। আপনি ব্রাউজার সেটিংস থেকে যেকোনো সময় কুকিজ নিষ্ক্রিয় করতে পারেন।",
  },
  {
    title: "ছবি ও মিডিয়া",
    body:
      "চিকিৎসার আগে/পরের ছবি বা গ্যালারিতে প্রদর্শনের জন্য ব্যবহৃত যেকোনো ফটো শুধুমাত্র রোগীর লিখিত সম্মতি নিয়ে পাবলিশ করা হয়। যেকোনো সময় অপসারণের অনুরোধ করা যাবে।",
  },
  {
    title: "তথ্যের নিরাপত্তা",
    body:
      "আপনার তথ্য encrypted database ও secure cloud (Cloudinary, MongoDB) এ সংরক্ষিত। শুধুমাত্র অনুমোদিত প্রশাসনিক কর্মী JWT-প্রটেক্টেড অ্যাডমিন প্যানেলে অ্যাক্সেস পান।",
  },
  {
    title: "তৃতীয় পক্ষের পরিষেবা",
    body:
      "WhatsApp ক্লিক-টু-চ্যাট, Google Fonts এবং Cloudinary CDN আমাদের সাইটে ব্যবহৃত হয়। এই পরিষেবাগুলোর নিজস্ব প্রাইভেসি পলিসি রয়েছে।",
  },
  {
    title: "আপনার অধিকার",
    body:
      "আপনি যেকোনো সময় আপনার সংরক্ষিত তথ্য দেখতে, সংশোধন করতে অথবা মুছে ফেলার অনুরোধ করতে পারেন। অনুরোধের জন্য contact@bananiclinic.com -এ ইমেইল করুন অথবা 01711170890 নম্বরে কল দিন।",
  },
  {
    title: "নীতির পরিবর্তন",
    body:
      "এই প্রাইভেসি পলিসিতে যেকোনো পরিবর্তন এই পেজে আপডেট করা হবে। নিয়মিত পরিদর্শনের জন্য অনুরোধ করা হলো।",
  },
];

export default function Privacy() {
  return (
    <ContentPageLayout
      testId="privacy-page"
      eyebrow="গোপনীয়তা নীতি"
      title="আপনার তথ্যের গোপনীয়তা — আমাদের সর্বোচ্চ অগ্রাধিকার"
      intro="Banani Clinic Ltd. আপনার ব্যক্তিগত ও মেডিকেল তথ্যের গোপনীয়তাকে সর্বোচ্চ গুরুত্ব দেয়। কীভাবে আমরা তথ্য সংগ্রহ, ব্যবহার এবং সুরক্ষিত রাখি, তা নিচে বিস্তারিত উল্লেখ করা হলো।"
    >
      <p className="font-bnSans text-sm text-ink-muted not-prose">
        সর্বশেষ আপডেট: জানুয়ারি ২০২৬
      </p>

      {SECTIONS.map((s, i) => (
        <section key={i} className="mt-8">
          <h2 className="font-bnSerif text-xl md:text-2xl text-ink mb-3">
            {i + 1}. {s.title}
          </h2>
          <p className="font-bnSans text-ink-muted leading-relaxed text-[15px] md:text-base">
            {s.body}
          </p>
        </section>
      ))}

      <div className="mt-12 not-prose bg-gold/5 border border-line/50 rounded-2xl p-6">
        <h3 className="font-bnSerif text-lg text-ink mb-2">যোগাযোগ</h3>
        <p className="font-bnSans text-sm text-ink-muted">
          গোপনীয়তা সংক্রান্ত যেকোনো প্রশ্নের জন্য —
          <br />
          ইমেইল:{" "}
          <a className="text-accent hover:underline" href="mailto:contact@bananiclinic.com">
            contact@bananiclinic.com
          </a>
          <br />
          ফোন:{" "}
          <a className="text-accent hover:underline tabular-nums" href="tel:01711170890">
            01711170890
          </a>
        </p>
      </div>
    </ContentPageLayout>
  );
}
