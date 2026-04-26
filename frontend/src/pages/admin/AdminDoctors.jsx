// Admin Doctors management - CRUD
import { useEffect, useState } from "react";
import { Trash2, Plus, X, Upload, Pencil, Users } from "lucide-react";
import ConfirmDeleteModal from "@/components/admin/ConfirmDeleteModal";
import { api } from "@/lib/api";

export default function AdminDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null | "new" | doctor obj
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/doctors");
      setDoctors(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleDelete = (doctor) => {
    setDeleteTarget(doctor);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    await api.delete(`/doctors/${deleteTarget.id}`);
    setDoctors((prev) => prev.filter((d) => d.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <div data-testid="admin-doctors-page">
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-gold font-bnSans mb-2">
            চিকিৎসক ম্যানেজমেন্ট
          </p>
          <h1 className="font-bnSerif text-2xl md:text-4xl text-ink">
            চিকিৎসকদের প্রোফাইল
          </h1>
        </div>
        <button
          data-testid="add-doctor-btn"
          onClick={() => setEditing("new")}
          className="btn-gold w-full md:w-auto"
        >
          <Plus className="w-4 h-4" />
          নতুন চিকিৎসক যোগ করুন
        </button>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-72 rounded-2xl bg-white border border-line animate-pulse" />
          ))}
        </div>
      ) : doctors.length === 0 ? (
        <EmptyDoctors onAdd={() => setEditing("new")} />
      ) : (
        <div data-testid="admin-doctors-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {doctors.map((d) => (
            <article
              key={d.id}
              data-testid={`admin-doctor-${d.id}`}
              className="group bg-white rounded-2xl border border-line/50 overflow-hidden hover:shadow-lux transition-all duration-500"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={d.photoUrl}
                  alt={d.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 right-3 flex gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => setEditing(d)}
                    data-testid={`edit-doctor-${d.id}`}
                    className="w-9 h-9 rounded-full bg-white text-ink hover:bg-gold hover:text-white shadow-md flex items-center justify-center transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(d)}
                    data-testid={`delete-doctor-${d.id}`}
                    className="w-9 h-9 rounded-full bg-white text-red-600 hover:bg-red-600 hover:text-white shadow-md flex items-center justify-center transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bnSerif text-xl text-ink">{d.name}</h3>
                <p className="font-bnSans text-sm text-gold mt-1">{d.specialization}</p>
                {d.degrees && (
                  <p className="text-xs text-ink-muted mt-1 font-bnSans">{d.degrees}</p>
                )}
                {d.experience && (
                  <p className="text-xs text-ink-muted mt-2 font-bnSans">
                    অভিজ্ঞতা: {d.experience}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      {editing && (
        <DoctorFormModal
          doctor={editing === "new" ? null : editing}
          onClose={() => setEditing(null)}
          onSuccess={() => {
            setEditing(null);
            fetchDoctors();
          }}
        />
      )}

      <ConfirmDeleteModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title="চিকিৎসকের প্রোফাইল মুছে ফেলবেন?"
        description={
          deleteTarget?.name
            ? `${deleteTarget.name} এর প্রোফাইলটি স্থায়ীভাবে মুছে যাবে। পরে এটি ফিরিয়ে আনা যাবে না।`
            : "এই চিকিৎসকের প্রোফাইলটি স্থায়ীভাবে মুছে যাবে। পরে এটি ফিরিয়ে আনা যাবে না।"
        }
      />
    </div>
  );
}

function EmptyDoctors({ onAdd }) {
  return (
    <div
      data-testid="admin-doctors-empty"
      className="rounded-3xl bg-white border border-dashed border-line py-20 text-center"
    >
      <div className="w-16 h-16 mx-auto rounded-full bg-gold/10 text-gold flex items-center justify-center mb-5">
        <Users className="w-7 h-7" />
      </div>
      <h3 className="font-bnSerif text-2xl text-ink">এখনো কোন চিকিৎসক যোগ করা হয়নি</h3>
      <p className="font-bnSans text-sm text-ink-muted mt-2 max-w-md mx-auto">
        চিকিৎসকদের প্রোফাইল যোগ করুন যাতে রোগীরা সঠিক বিশেষজ্ঞের কাছে পৌঁছাতে পারেন।
      </p>
      <button onClick={onAdd} data-testid="empty-add-doctor" className="btn-gold mt-7">
        <Plus className="w-4 h-4" />
        প্রথম চিকিৎসক যোগ করুন
      </button>
    </div>
  );
}

function DoctorFormModal({ doctor, onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: doctor?.name || "",
    nameEn: doctor?.nameEn || "",
    specialization: doctor?.specialization || "",
    bio: doctor?.bio || "",
    experience: doctor?.experience || "",
    degrees: doctor?.degrees || "",
    order: doctor?.order ?? 0,
  });
  const [photo, setPhoto] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState("");

  const isEdit = !!doctor;

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setSubmitting(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (photo) fd.append("photo", photo);
      else if (!isEdit) {
        setErr("একটি ছবি আপলোড করুন");
        setSubmitting(false);
        return;
      }
      if (isEdit) {
        await api.put(`/doctors/${doctor.id}`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/doctors", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      onSuccess();
    } catch (e2) {
      setErr(e2?.response?.data?.error || "সংরক্ষণে সমস্যা হয়েছে");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      data-testid="doctor-form-modal"
      className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <form
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl w-full max-w-2xl p-6 md:p-8 shadow-lux my-8"
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-gold font-bnSans">
              {isEdit ? "এডিট" : "নতুন"}
            </p>
            <h2 className="font-bnSerif text-2xl text-ink mt-1">
              {isEdit ? "চিকিৎসকের প্রোফাইল আপডেট" : "নতুন চিকিৎসক যোগ করুন"}
            </h2>
          </div>
          <button type="button" onClick={onClose} className="p-2 text-ink-muted hover:text-ink">
            <X className="w-5 h-5" />
          </button>
        </div>

        {err && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-700 text-sm font-bnSans">{err}</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <PhotoDrop file={photo} existingUrl={doctor?.photoUrl} onFile={setPhoto} />
          </div>

          <FormField
            label="নাম (বাংলা) *"
            value={form.name}
            onChange={(v) => setForm((f) => ({ ...f, name: v }))}
            required
            testId="doctor-name"
          />
          <FormField
            label="নাম (English)"
            value={form.nameEn}
            onChange={(v) => setForm((f) => ({ ...f, nameEn: v }))}
            testId="doctor-nameEn"
          />
          <FormField
            label="বিশেষজ্ঞতা *"
            value={form.specialization}
            onChange={(v) => setForm((f) => ({ ...f, specialization: v }))}
            required
            testId="doctor-spec"
          />
          <FormField
            label="ডিগ্রি"
            value={form.degrees}
            onChange={(v) => setForm((f) => ({ ...f, degrees: v }))}
            placeholder="BDS, FCPS"
            testId="doctor-degrees"
          />
          <FormField
            label="অভিজ্ঞতা"
            value={form.experience}
            onChange={(v) => setForm((f) => ({ ...f, experience: v }))}
            placeholder="১০+ বছর"
            testId="doctor-experience"
          />
          <FormField
            label="ক্রম (Order)"
            value={form.order}
            onChange={(v) => setForm((f) => ({ ...f, order: v }))}
            type="number"
            testId="doctor-order"
          />

          <div className="md:col-span-2">
            <label className="block text-xs uppercase tracking-widest text-ink-muted font-bnSans mb-2">
              বায়ো / পরিচিতি
            </label>
            <textarea
              data-testid="doctor-bio"
              value={form.bio}
              onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-line bg-bg/40 font-bnSans focus:outline-none focus:border-gold resize-none"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button
            type="submit"
            disabled={submitting}
            data-testid="doctor-submit"
            className="btn-gold flex-1 justify-center"
          >
            {submitting ? "সংরক্ষণ হচ্ছে..." : isEdit ? "আপডেট" : "যোগ করুন"}
          </button>
          <button type="button" onClick={onClose} className="btn-outline-gold">
            বাতিল
          </button>
        </div>
      </form>
    </div>
  );
}

function FormField({ label, value, onChange, testId, type = "text", ...rest }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest text-ink-muted font-bnSans mb-2">
        {label}
      </label>
      <input
        data-testid={testId}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-line bg-bg/40 font-bnSans focus:outline-none focus:border-gold"
        {...rest}
      />
    </div>
  );
}

function PhotoDrop({ file, existingUrl, onFile }) {
  const previewUrl = file ? URL.createObjectURL(file) : existingUrl;
  return (
    <label className="block cursor-pointer">
      <span className="block text-xs uppercase tracking-widest text-ink-muted font-bnSans mb-2">
        চিকিৎসকের ছবি
      </span>
      <div
        className={`relative aspect-[3/2] rounded-2xl border-2 border-dashed transition-colors flex items-center justify-center overflow-hidden ${
          previewUrl ? "border-gold" : "border-line hover:border-gold"
        }`}
      >
        {previewUrl ? (
          <img src={previewUrl} alt="preview" className="w-full h-full object-cover" />
        ) : (
          <div className="text-center">
            <Upload className="w-7 h-7 text-gold mx-auto mb-2" />
            <p className="text-sm text-ink-muted font-bnSans">ক্লিক করে ছবি নির্বাচন করুন</p>
            <p className="text-xs text-ink-muted/70 mt-1">JPG, PNG (max 10MB)</p>
          </div>
        )}
        <input
          data-testid="doctor-photo-input"
          type="file"
          accept="image/*"
          onChange={(e) => onFile(e.target.files?.[0] || null)}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>
    </label>
  );
}
