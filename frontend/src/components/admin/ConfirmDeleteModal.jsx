import { useEffect } from "react";
import { Trash2 } from "lucide-react";

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title = "মুছে ফেলতে চান?",
  description = "এই আইটেমটি স্থায়ীভাবে মুছে যাবে। পরে এটি ফিরিয়ে আনা যাবে না।",
  confirmLabel = "মুছুন",
  cancelLabel = "বাতিল",
}) {
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      data-testid="confirm-delete-modal"
      className="fixed inset-0 z-50 bg-ink/20 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-delete-title"
        aria-describedby="confirm-delete-description"
        className="w-full max-w-md bg-white border border-line/60 rounded-3xl shadow-lux p-6 md:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-100 text-red-600 flex items-center justify-center mb-5">
          <Trash2 className="w-6 h-6" />
        </div>

        <h2
          id="confirm-delete-title"
          className="font-bnSerif text-2xl text-ink mb-2"
        >
          {title}
        </h2>
        <p
          id="confirm-delete-description"
          className="font-bnSans text-sm leading-relaxed text-ink-muted"
        >
          {description}
        </p>

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-8">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-full bg-white border border-line text-ink-muted hover:border-gold hover:text-gold font-bnSans text-sm transition-all duration-300"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-5 py-2.5 rounded-full bg-red-50 text-red-600 hover:bg-red-600 hover:text-white font-bnSans text-sm transition-all duration-300 inline-flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
