// Admin Gallery management - upload, filter, delete
import { useEffect, useState } from "react";
import { Trash2, Upload, X, Image as ImageIcon, Plus } from "lucide-react";
import { api } from "@/lib/api";
import { adminGalleryCategories } from "@/content/admin";

export default function AdminGallery() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/gallery");
      setItems(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("এই ছবিটি স্থায়ীভাবে মুছে ফেলা হবে। নিশ্চিত?")) return;
    await api.delete(`/gallery/${id}`);
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const filtered = filter === "all" ? items : items.filter((it) => it.category === filter);

  return (
    <div data-testid="admin-gallery-page">
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-gold font-bnSans mb-2">
            গ্যালারি ম্যানেজমেন্ট
          </p>
          <h1 className="font-bnSerif text-2xl md:text-4xl text-ink">
            সব ছবি ও ট্রান্সফরমেশন
          </h1>
          <p className="font-bnSans text-sm text-ink-muted mt-2">
            মোট {items.length} টি আইটেম
          </p>
        </div>
        <button
          data-testid="gallery-upload-btn"
          onClick={() => setShowUpload(true)}
          className="btn-gold w-full md:w-auto"
        >
          <Plus className="w-4 h-4" />
          নতুন ছবি যোগ করুন
        </button>
      </header>

      {/* Filter chips */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-6 hide-scrollbar -mx-4 md:mx-0 px-4 md:px-0">
        <FilterChip
          active={filter === "all"}
          onClick={() => setFilter("all")}
          label="সব"
          count={items.length}
        />
        {adminGalleryCategories.map((c) => (
          <FilterChip
            key={c.id}
            active={filter === c.id}
            onClick={() => setFilter(c.id)}
            label={c.label}
            count={items.filter((it) => it.category === c.id).length}
          />
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-square bg-white border border-line rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState onUpload={() => setShowUpload(true)} />
      ) : (
        <div data-testid="admin-gallery-grid" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((it) => (
            <GalleryCard key={it.id} item={it} onDelete={() => handleDelete(it.id)} />
          ))}
        </div>
      )}

      {showUpload && (
        <UploadModal
          onClose={() => setShowUpload(false)}
          onSuccess={() => {
            setShowUpload(false);
            fetchItems();
          }}
        />
      )}
    </div>
  );
}

function FilterChip({ active, onClick, label, count }) {
  return (
    <button
      onClick={onClick}
      data-testid={`admin-filter-${label}`}
      className={`shrink-0 px-5 py-2.5 rounded-full text-sm font-bnSans transition-all duration-300 flex items-center gap-2 ${
        active
          ? "bg-ink text-bg"
          : "bg-white text-ink-muted border border-line hover:border-gold hover:text-gold"
      }`}
    >
      {label}
      <span
        className={`tabular-nums text-xs px-2 py-0.5 rounded-full ${
          active ? "bg-bg/20 text-bg" : "bg-bg text-ink-muted"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

function GalleryCard({ item, onDelete }) {
  const isBA = item.category === "before-after";
  const previewSrc = isBA ? item.afterUrl : item.imageUrl;
  const categoryLabel =
    adminGalleryCategories.find((c) => c.id === item.category)?.label ||
    item.category;

  return (
    <div
      data-testid={`admin-gallery-item-${item.id}`}
      className="group relative rounded-2xl overflow-hidden bg-white border border-line/50 hover:shadow-lux transition-all duration-500"
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={previewSrc}
          alt={item.title || ""}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur text-[10px] uppercase tracking-widest font-bnSans text-ink">
        {categoryLabel}
      </span>

      <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
        {item.title && <p className="font-bnSerif text-sm">{item.title}</p>}
      </div>

      <button
        onClick={onDelete}
        data-testid={`delete-gallery-${item.id}`}
        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 backdrop-blur text-red-600 flex items-center justify-center opacity-100 lg:opacity-0 lg:group-hover:opacity-100 hover:bg-red-600 hover:text-white shadow-md transition-all duration-300"
        aria-label="Delete"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}

function EmptyState({ onUpload }) {
  return (
    <div
      data-testid="admin-gallery-empty"
      className="rounded-3xl bg-white border border-dashed border-line py-20 text-center"
    >
      <div className="w-16 h-16 mx-auto rounded-full bg-gold/10 text-gold flex items-center justify-center mb-5">
        <ImageIcon className="w-7 h-7" />
      </div>
      <h3 className="font-bnSerif text-2xl text-ink">এখনো কোন ছবি যোগ করা হয়নি</h3>
      <p className="font-bnSans text-sm text-ink-muted mt-2 max-w-md mx-auto">
        আপনার ক্লিনিকের প্রিমিয়াম ছবিগুলো আপলোড করুন এবং ভিজিটরদের আস্থা অর্জন করুন।
      </p>
      <button onClick={onUpload} data-testid="empty-upload-btn" className="btn-gold mt-7">
        <Plus className="w-4 h-4" />
        প্রথম ছবি আপলোড করুন
      </button>
    </div>
  );
}

function UploadModal({ onClose, onSuccess }) {
  const [category, setCategory] = useState("clinic");
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [beforeFile, setBeforeFile] = useState(null);
  const [afterFile, setAfterFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("category", category);
      fd.append("title", title);
      fd.append("caption", caption);
      if (category === "before-after") {
        if (!beforeFile || !afterFile) {
          setErr("আগে ও পরে — দুটি ছবিই দিতে হবে");
          setSubmitting(false);
          return;
        }
        fd.append("before", beforeFile);
        fd.append("after", afterFile);
      } else {
        if (!imageFile) {
          setErr("একটি ছবি নির্বাচন করুন");
          setSubmitting(false);
          return;
        }
        fd.append("image", imageFile);
      }
      await api.post("/gallery", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onSuccess();
    } catch (e2) {
      setErr(e2?.response?.data?.error || "আপলোডে সমস্যা হয়েছে");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      data-testid="upload-modal"
      className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <form
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl w-full max-w-xl p-6 md:p-8 shadow-lux my-8"
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-gold font-bnSans">
              নতুন ছবি
            </p>
            <h2 className="font-bnSerif text-2xl text-ink mt-1">গ্যালারিতে যোগ করুন</h2>
          </div>
          <button type="button" onClick={onClose} className="p-2 text-ink-muted hover:text-ink">
            <X className="w-5 h-5" />
          </button>
        </div>

        {err && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-700 text-sm font-bnSans">
            {err}
          </div>
        )}

        <div className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-widest text-ink-muted font-bnSans mb-2">
              ক্যাটাগরি
            </label>
            <select
              data-testid="upload-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-line bg-bg/40 font-bnSans focus:outline-none focus:border-gold"
            >
              {adminGalleryCategories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-ink-muted font-bnSans mb-2">
                শিরোনাম
              </label>
              <input
                data-testid="upload-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-line bg-bg/40 font-bnSans focus:outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-ink-muted font-bnSans mb-2">
                ক্যাপশন
              </label>
              <input
                data-testid="upload-caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-line bg-bg/40 font-bnSans focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          {category === "before-after" ? (
            <div className="grid grid-cols-2 gap-4">
              <FileDrop
                testId="upload-before"
                label="আগের ছবি *"
                file={beforeFile}
                onFile={setBeforeFile}
              />
              <FileDrop
                testId="upload-after"
                label="পরের ছবি *"
                file={afterFile}
                onFile={setAfterFile}
              />
            </div>
          ) : (
            <FileDrop
              testId="upload-image"
              label="ছবি নির্বাচন করুন *"
              file={imageFile}
              onFile={setImageFile}
            />
          )}
        </div>

        <div className="flex gap-3 mt-8">
          <button
            type="submit"
            disabled={submitting}
            data-testid="upload-submit"
            className="btn-gold flex-1 justify-center"
          >
            {submitting ? "আপলোড হচ্ছে..." : "আপলোড করুন"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="btn-outline-gold"
          >
            বাতিল
          </button>
        </div>
      </form>
    </div>
  );
}

function FileDrop({ label, file, onFile, testId }) {
  return (
    <label
      data-testid={testId}
      className="block cursor-pointer"
    >
      <span className="block text-xs uppercase tracking-widest text-ink-muted font-bnSans mb-2">
        {label}
      </span>
      <div
        className={`relative aspect-video rounded-2xl border-2 border-dashed transition-colors flex items-center justify-center overflow-hidden ${
          file ? "border-gold" : "border-line hover:border-gold"
        }`}
      >
        {file ? (
          <img
            src={URL.createObjectURL(file)}
            alt="preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-center">
            <Upload className="w-6 h-6 text-gold mx-auto mb-2" />
            <p className="text-xs text-ink-muted font-bnSans">
              ক্লিক করে নির্বাচন করুন
            </p>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => onFile(e.target.files?.[0] || null)}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>
    </label>
  );
}
