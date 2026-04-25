# PRD - Banani Dental Clinic

## Original Problem Statement
Comprehensive upgrade for `apixel-code/Dental-Clinic-Template2`:
- New Gallery module (high-end masonry grid for Doctors / Patients / Clinic)
- Interactive Before/After comparison slider
- Dynamic Admin Panel for content management (Gallery, Doctor profiles)
- Modern Luxury & Minimalist UI ("Premium Whitey Vibe" with clinical teal or gold accents)
- Mobile-first 100% responsive
- Bengali primary copywriting (reptilian-brain triggers around transformation/confidence)
- Image storage on Cloudinary (NOT local) — DB stores URLs only

## Architecture
- **Frontend**: React 19 + react-router-dom v7 + Tailwind CSS + Framer Motion + react-compare-slider + axios
- **Backend**: Node.js (Express) + Mongoose + JWT (jsonwebtoken) + bcryptjs + multer + multer-storage-cloudinary + cloudinary SDK
- **Database**: MongoDB (local), DB name `banani_dental`
- **Image Storage**: Cloudinary (cloud_name=dadqlgwdr) — backend signed uploads via multer-storage-cloudinary
- **Supervisor**: backend program runs `node /app/backend/server.js` on port 8001 (replaced uvicorn)

## User Personas
- **Public visitor / patient**: Browses home, gallery, submits appointment request via contact form
- **Clinic admin**: Logs into `/admin`, manages gallery, doctors, appointments

## Core Requirements (Static)
1. Public site: Home (`/`), Transformation Gallery (`/gallery`)
2. Admin: `/admin/login` → `/admin` with sub-routes `/admin/gallery`, `/admin/doctors`, `/admin/appointments`
3. JWT-based admin auth (admin / Admin@2026 default)
4. All image uploads go through Cloudinary; only secure URLs + public_ids stored in DB
5. Bengali primary content; Tiro Bangla + Anek Bangla + Playfair Display fonts
6. Mobile-first responsive (Navbar + Admin sidebar collapse to hamburger)

## What's Been Implemented (Iteration 1 — 2026-04-25)
- ✅ Express backend with full CRUD on `/api/auth`, `/api/doctors`, `/api/gallery`, `/api/appointments`
- ✅ JWT middleware (`requireAdmin`) on all admin endpoints; bcrypt password hashing
- ✅ Cloudinary signed-upload via backend (`buildUploader('folder')`); auto-destroy on delete & photo replace
- ✅ Idempotent seeding: 1 admin (admin/Admin@2026), 2 demo doctors, 7 demo gallery items (incl. 1 before-after pair)
- ✅ Home page sections: Hero (Bengali emotional headline + Pexels imagery), Services bento grid (6 services), dynamic Doctors section, BeforeAfter showcase, Testimonials, Contact form (POSTs to `/api/appointments`)
- ✅ `/gallery` page: filter chips (All / Transformation / Doctors / Patients / Clinic), masonry grid, lightbox, before/after comparison slider with gold handle
- ✅ `/admin/login` luxury card with auto-redirect when authed
- ✅ `/admin` sidebar layout with mobile hamburger; dashboard stats cards
- ✅ `/admin/gallery` upload modal (auto-switches between single-image and before/after pair fields), category-tagged items, hover-delete
- ✅ `/admin/doctors` create/edit modal with photo replacement, list cards, hover-delete
- ✅ `/admin/appointments` list with status dropdown (new/contacted/confirmed/completed/cancelled), WhatsApp/tel/email quick links
- ✅ Champagne Gold #C5A059 design tokens applied across the app via tailwind.config + index.css
- ✅ data-testid coverage across all interactive elements
- ✅ Testing agent: 100% backend (30/30), 100% executed frontend flows pass

## Backlog / Future Improvements (P0–P2)
- **P1**: Multi-language toggle (Bengali ⇄ English) for international tourists
- **P1**: Email/SMS notifications to clinic when new appointment arrives (SendGrid + Twilio)
- **P2**: SEO meta tags per route + Open Graph image; sitemap.xml
- **P2**: Drag-to-reorder doctors and gallery items in admin
- **P2**: Patient testimonials CRUD in admin (currently hardcoded)
- **P2**: WhatsApp Click-to-Chat float button on all pages
- **P2**: Add "Services" page with detailed treatment info
- **P2**: Audit log of admin actions
- **P2**: Image optimization (WebP, srcset)

## Next Action Items
- Demo to user; collect feedback on copy / imagery / additional sections
- Replace seeded Pexels demo content with real clinic photos via admin upload
- Add real doctor profiles via `/admin/doctors`

## Setup Notes
- `.env` files have all secrets (Cloudinary, JWT, admin creds) — never commit
- Supervisor command for backend: `/usr/bin/node /app/backend/server.js`
- Hot-reload works via React dev server; backend changes require `supervisorctl restart backend`
