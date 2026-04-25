// Custom Before/After comparison slider with luxury gold handle
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";

const Handle = () => (
  <div
    data-testid="ba-handle"
    className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-gold border-2 border-gold"
  >
    <div className="flex items-center gap-1">
      <span className="w-1 h-4 bg-gold rounded-full" />
      <span className="w-1 h-4 bg-gold rounded-full" />
    </div>
  </div>
);

export default function BeforeAfterSlider({ before, after, caption, title }) {
  return (
    <div
      data-testid="before-after-slider"
      className="relative group rounded-2xl overflow-hidden bg-white border border-line/60 shadow-sm hover:shadow-lux transition-all duration-500"
    >
      <ReactCompareSlider
        handle={<Handle />}
        boundsPadding={0}
        position={50}
        itemOne={
          <ReactCompareSliderImage
            src={before}
            alt="Before treatment"
            style={{ filter: "saturate(0.9)" }}
          />
        }
        itemTwo={<ReactCompareSliderImage src={after} alt="After treatment" />}
        style={{ height: "440px", borderRadius: "1rem" }}
      />
      {/* Labels */}
      <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/55 backdrop-blur text-white text-xs uppercase tracking-widest font-bnSans">
        আগে
      </span>
      <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gold text-white text-xs uppercase tracking-widest font-bnSans">
        পরে
      </span>
      {(title || caption) && (
        <div className="px-6 py-5 bg-white border-t border-line/60">
          {title && (
            <h4 className="font-bnSerif text-lg text-ink">{title}</h4>
          )}
          {caption && (
            <p className="text-sm text-ink-muted mt-1 font-bnSans">{caption}</p>
          )}
        </div>
      )}
    </div>
  );
}
