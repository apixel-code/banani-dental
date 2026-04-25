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
- ✅ Home page sections: Hero, Services bento grid, dynamic Doctors, BeforeAfter showcase, Testimonials, Contact form
- ✅ `/gallery` page: filter chips, masonry grid, lightbox, before/after compare slider
- ✅ `/admin/login` + protected admin sub-routes (gallery, doctors, appointments)
- ✅ Testing agent: 100% backend (30/30), 100% frontend flows pass

## Iteration 2 — 2026-04-25 (User feedback)
User feedback: logo not added, no animations, full page reload on navigation, no scroll-to-top, mobile button issues, missing WhatsApp button.
- ✅ **Logo integration** — User-uploaded `Banani Clinic Ltd.` logo now in Navbar, Footer, Admin login, Admin sidebar, mobile admin top bar
- ✅ **Color palette overhaul** — Switched from champagne gold to **Medical Navy `#1F4E79` + Cobalt Blue `#2C8DCC` + Steel Grey** to match logo identity. Updated tailwind.config.js + index.css design tokens
- ✅ **Page reload bug fixed** — Replaced `<a href>` with `<Link to>` and custom `HashLink` for hash anchors. No more full page reloads on navigation
- ✅ **Smooth scroll-to-top** — `ScrollToTop` component using `useLayoutEffect` + RAF polling. Resets scrollY on route change; smooth-scrolls to hash sections after AnimatePresence mounts new page
- ✅ **AnimatePresence page transitions** — Wrapped routes for fade+y exit/enter
- ✅ **Premium animations** — Hero word-by-word reveal mask, Bengali CountUp stat animation (১৫+, ৫০০০+, ১০০%), floating decorative blobs, scroll progress bar, magnetic CTAs, staggered mobile menu, scroll hint
- ✅ **WhatsApp floating button** — Green pulse-ring CTA on `/` and `/gallery` pages, opens `wa.me/8801711170890` with prefilled message
- ✅ **Mobile button responsiveness** — Both hero CTAs now full-width (350×48) on viewports <640px; reduced padding & font on small screens

## Iteration 3 — 2026-04-26 (User feedback)
User feedback: admin Gallery & Appointments not mobile-responsive; suggest Hind Siliguri/Kalpurush Bengali font; create About/Privacy/Terms pages.
- ✅ **Mobile admin pages** — Delete/edit buttons now `opacity-100 lg:opacity-0 lg:group-hover:opacity-100` (always visible on mobile, hover-only on desktop). Added 9px buttons with shadows. Fixed AdminAppointments layout (status select + delete in horizontal row at bottom of card with border-top divider on mobile). Reduced AdminLayout padding on mobile (`p-4 sm:p-6 md:p-10`). Heading sizes responsive (`text-2xl md:text-4xl`). Added `-mx-4 md:mx-0 px-4 md:px-0` for filter chips edge-to-edge scroll on mobile.
- ✅ **Bengali font upgrade** — Body changed to **Hind Siliguri** (clean, professional, readable). Headings remain **Tiro Bangla** (luxury serif). Anek Bangla removed entirely. Added Noto Serif Bengali as fallback. Updated `index.html`, `tailwind.config.js`, `index.css`.
- ✅ **3 new pages**:
  - **`/about`** — Banani Clinic intro, Dr. Aslam Almehdi credentials (BDS, FCPS, AACD member, USA/Japan/Korea/UK trained), 4 value cards (ব্যথামুক্ত, আন্তর্জাতিক, রোগীকেন্দ্রিক, সম্পূর্ণ), full Cleft Lip & Palate explainer (6,000 children stat), Filariasis/Elephantiasis section, CTA to /#contact
  - **`/privacy`** — 8-section Bengali privacy policy
  - **`/terms`** — 9-section Bengali terms
- ✅ **Shared `ContentPageLayout`** with mesh-bg header, Navbar+Footer+WhatsAppButton+PageTransition wrappers
- ✅ **Footer expanded** — 4 legal nav links (About, Privacy, Terms, Admin) all using `<Link>` for SPA navigation
- ✅ **Navbar expanded** — Added `আমাদের সম্পর্কে` (About) link
- ✅ **Testing agent: 14/14 (100%)** iteration 3 frontend tests pass

## Iteration 4 — 2026-04-26 (User feedback)
User feedback: 1) Hero text top characters cut off 2) Mobile navbar logo text not visible 3) Remove admin link from public footer 4) Add "by Apixel" link 5) Marquee announcement bar with admin toggle 6) Doctors section centered layout 7) Hero right-side image 8) Owner photo in About page.
- ✅ **Hero text cut-off fixed** — `.reveal-mask` now has `padding-top: 0.18em; padding-bottom: 0.06em; margin-top: -0.18em` to accommodate Bengali matras
- ✅ **Mobile navbar logo text** — Removed `hidden sm:flex`, now always visible with smaller `text-sm md:text-lg` for "Banani Clinic" + `text-[8px] md:text-[11px]` for "SPECIALIZED HOSPITAL"
- ✅ **Admin link removed from footer** — public footer only shows About / Privacy / Terms now
- ✅ **"Crafted by Apixel · www.apixel.net"** at footer bottom-right, target="_blank" with hover effect
- ✅ **Marquee announcement bar**:
  - Backend: new `Settings` singleton model (`marqueeEnabled`, `marqueeText`) + `GET /api/settings` (public) + `PUT /api/settings` (admin)
  - Frontend: `MarqueeBar` component on all public pages (Home, Gallery, About, Privacy, Terms) with gradient #1F4E79→#2C8DCC + horizontal scroll animation + Megaphone icon label
  - Navbar offsets `top-7 md:top-9` when marquee active
  - **Admin Settings page** (`/admin/settings`): toggle on/off (animated switch), text edit textarea, live preview, save with success toast
- ✅ **Doctors section** — Header centered, paragraph below header centered, dynamic max-width based on doctor count (1=max-w-sm, 2=max-w-3xl, 3=max-w-5xl, 4+=max-w-6xl)
- ✅ **Hero 2-column redesign** — Text left (col-span-7), premium image card right (col-span-5) with floating AACD certified badge top-left + Dr. Aslam Almehdi name card at bottom + decorative dot grid + soft mesh-bg background
- ✅ **Owner photo** — Dr. Aslam Almehdi's photo (/brand/owner.jpg, 2.5MB) shown in About page with 3:4 aspect, gradient overlay, AACD MEMBER badge
- ✅ **Testing agent: 16/16 acceptance criteria + 5/5 backend tests PASS (100%)** — zero bugs found

## Backlog / Future Improvements (P0–P2)
- **P1**: Multi-language toggle (Bengali ⇄ English)
- **P1**: Email/SMS notifications when new appointment arrives (SendGrid + Twilio)
- **P2**: SEO meta tags + Open Graph image; sitemap.xml
- **P2**: Drag-to-reorder doctors and gallery items in admin
- **P2**: Patient testimonials CRUD in admin (currently hardcoded)
- **P2**: Add "Services" detail page
- **P2**: Image optimization (WebP, srcset, lazy)

## Next Action Items
- Demo to user; collect feedback on copy / imagery / additional sections
- Replace seeded Pexels demo content with real clinic photos via admin upload
- Add real doctor profiles via `/admin/doctors`

## Setup Notes
- `.env` files have all secrets (Cloudinary, JWT, admin creds) — never commit
- Supervisor command for backend: `/usr/bin/node /app/backend/server.js`
- Hot-reload works via React dev server; backend changes require `supervisorctl restart backend`
