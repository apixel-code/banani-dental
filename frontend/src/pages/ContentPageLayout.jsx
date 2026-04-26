// Generic content page layout for About / Privacy / Terms - clean editorial typography
import { Fragment } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import MarqueeBar from "@/components/site/MarqueeBar";
import WhatsAppButton from "@/components/site/WhatsAppButton";
import { buildTelHref } from "@/content/brand";

function InlineContent({ content }) {
  if (!Array.isArray(content)) return content;

  return content.map((part, index) => {
    if (typeof part === "string") {
      return <Fragment key={index}>{part}</Fragment>;
    }

    const className = [
      part.strong ? "text-ink" : "",
      part.tabular ? "tabular-nums" : "",
    ]
      .filter(Boolean)
      .join(" ");

    if (part.strong) {
      return (
        <strong key={index} className={className || undefined}>
          {part.text}
        </strong>
      );
    }

    return (
      <span key={index} className={className || undefined}>
        {part.text}
      </span>
    );
  });
}

function ContentSection({ section, index, numberSections }) {
  const paragraphs = Array.isArray(section.content)
    ? section.content
    : [section.content].filter(Boolean);

  return (
    <section className="mt-8">
      <h2 className="font-bnSerif text-xl md:text-2xl text-ink mb-3">
        {numberSections ? `${index + 1}. ` : ""}
        {section.title}
      </h2>
      {paragraphs.map((paragraph, paragraphIndex) => (
        <p
          key={paragraphIndex}
          className="font-bnSans text-ink-muted leading-relaxed text-[15px] md:text-base mt-4 first:mt-0"
        >
          <InlineContent content={paragraph} />
        </p>
      ))}
      {section.quote && (
        <blockquote className="my-8 pl-5 border-l-4 border-accent bg-gold/5 py-4 pr-5 rounded-r-xl">
          <p className="font-bnSans text-ink leading-relaxed text-[15px] italic">
            {section.quote}
          </p>
        </blockquote>
      )}
    </section>
  );
}

function ContactBlock({ contactBlock }) {
  if (!contactBlock) return null;

  return (
    <div className="mt-12 not-prose bg-gold/5 border border-line/50 rounded-2xl p-6">
      <h3 className="font-bnSerif text-lg text-ink mb-2">
        {contactBlock.title}
      </h3>
      <p className="font-bnSans text-sm text-ink-muted">
        {contactBlock.desc}
        <br />
        ইমেইল:{" "}
        <a
          className="text-accent hover:underline"
          href={`mailto:${contactBlock.email}`}
        >
          {contactBlock.email}
        </a>
        <br />
        ফোন:{" "}
        <a
          className="text-accent hover:underline tabular-nums"
          href={buildTelHref(contactBlock.phone.number)}
        >
          {contactBlock.phone.display}
        </a>
      </p>
    </div>
  );
}

export default function ContentPageLayout({
  eyebrow,
  title,
  intro,
  lastUpdated,
  sections = [],
  numberSections = false,
  contactBlock,
  afterSections,
  children,
  testId,
}) {
  return (
    <div data-testid={testId} className="min-h-screen bg-bg text-ink">
      <MarqueeBar />
      <Navbar />
      <main>
        {/* Header */}
        <section className="pt-32 md:pt-40 pb-10 md:pb-14 border-b border-line/60 mesh-bg">
          <div className="container-x">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl"
            >
              {eyebrow && (
                <span className="eyebrow mb-4 md:mb-5">{eyebrow}</span>
              )}
              <h1 className="font-bnSerif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ink leading-[1.15]">
                {title}
              </h1>
              {intro && (
                <p className="font-bnSans text-base md:text-lg text-ink-muted leading-relaxed mt-5 md:mt-6 max-w-2xl">
                  {intro}
                </p>
              )}
            </motion.div>
          </div>
        </section>

        {/* Body */}
        <section className="section-pad">
          <div className="container-x">
            <motion.article
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="max-w-3xl mx-auto prose prose-ink"
            >
              {lastUpdated && (
                <p className="font-bnSans text-sm text-ink-muted not-prose">
                  সর্বশেষ আপডেট: {lastUpdated}
                </p>
              )}
              {children}
              {sections.map((section, index) => (
                <ContentSection
                  key={section.title}
                  section={section}
                  index={index}
                  numberSections={numberSections}
                />
              ))}
              {afterSections}
              <ContactBlock contactBlock={contactBlock} />
            </motion.article>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
