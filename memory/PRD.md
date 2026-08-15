# PRD — Ascenxion Agency Website

## Original Problem Statement
Build a premium, high-conversion website for tech service agency "Ascenxion" (production-level AI workflows, AI agents, high-converting websites, chatbots). Immersive 3D-feel hero using the "Creation of Adam" image that starts zoomed out and zooms in on scroll (Lenis smooth scroll) to reveal the next section. Dark mood-board aesthetic with orange glow accents, glassmorphism, awwwards-style story flow. Target: international clients. Desktop-first, responsive mobile.

## User Personas
- International founders/executives evaluating an AI/web agency
- Referral visitors checking credibility via project showcase

## Core Requirements (static)
- Cinematic scroll-zoom hero (Creation of Adam asset: gs5gc1wx_image.png)
- Lenis smooth scrolling, premium dark theme, orange shader glow
- 3–4 project showcase cards
- Capabilities/services section
- Contact inquiry form persisted to MongoDB
- Responsive mobile layout

## Implemented
- 2026-08-15 (earlier sessions): FastAPI backend with POST /api/inquiries (MongoDB `inquiries` collection), Lenis cinematic hero zoom, awwwards story rail, glass navbar, work grid, capabilities list, contact form.
- 2026-08-15 (this session): Conversion-focused copy ("Make growth repeatable", Automate/Deploy/Convert offer strip). Premium visual pass: deeper orange shader blooms (hero + sections), Apple-style glass (pill navbar, hero telemetry cards, form inputs, offer cards), orange rim/glow hover states on project cards, glowing submit button, orange selection/scrollbar, mobile styles for new components.
- 2026-08-15 (later): Removed hero status card + circular CTA; scroll-linked hero copy; cursor parallax (glass panel, focus ring, orbits, artwork); CSS scroll reveals.
- 2026-08-15 (Editions hero): Rebuilt hero as Shopify-Editions-style centered glass index panel (masked line-by-line headline reveal via framer-motion, index links with roman numerals I–IV), floating neon-orange accents (orb, ring, prism) with mouse parallax, Creation of Adam scroll-zoom retained and panel scales/fades with zoom. Sections renumbered as manifesto chapters (Chapter 01–04). Slow editorial marquee strip between statement and work. All section reveals migrated to framer-motion (`Reveal` component, whileInView + whileHover). Added framer-motion dependency.
- 2026-08-15 (3D hero): Removed glass panel + painting from hero per user feedback. New full-screen React Three Fiber hero (`src/components/HeroScene.jsx`): dark-chrome torus knot with molten orange emissive core, orange rim lighting, sparkles, idle float, mouse parallax, and Lenis-driven scroll progress (shared `scrollState`) controlling rotation + camera push-in (7.5 → 4.3). Headline overlays with masked line reveal and fades on scroll. Deps added: three, @react-three/fiber, @react-three/drei (yarn --ignore-engines). PLACEHOLDER model active — swap in user's GLB via useGLTF when attached.
- 2026-08-15 (GLB mounted): User's `the_creation_of_adam.glb` (Sketchfab export, 4 meshes, long axis +Z) mounted via useGLTF from `/public/the_creation_of_adam.glb`. Model re-oriented (inner group rotation [0.45, π/2, 0], drei Center, scale 5.4) so both hands frame the headline horizontally. Scroll rig: rotation.y = t*0.08 + p*0.75π, camera z 7.2→3.8, y +0.45, orange core point-light pulses with scroll. Verified: start frame = hands framing headline; deep scroll = dramatic zoomed rotation into Chapter 01.

## Architecture
- Frontend: React + craco, Lenis, lucide-react, axios. Single-page in src/App.js, styles in src/App.css (cascade-override blocks).
- Backend: FastAPI server.py, /api prefix, Motor async MongoDB (MONGO_URL/DB_NAME from .env).
- Key API: POST /api/inquiries {name, email, company, project}

## Backlog
- P0: Replace placeholder project cards (Aetheris/Vortex/NeuralCore/Synthetix metrics are MOCKED) with real work, logos, testimonials.
- P1: Scroll-triggered section reveal animations (GSAP ScrollTrigger) for statement/work sections.
- P1: Cursor parallax on hero glass panels (pointer depth).
- P2: CTA/inquiry conversion tracking.
- P2: Case-study detail pages per project.

## Next Tasks
1. Collect real project data/testimonials from user and swap into work grid.
2. Add scroll-reveal animation pass.
3. Add pointer parallax to hero glass cards.

## Testing Notes
- Verified 2026-08-15: POST /api/inquiries via curl (200, valid body); form submit end-to-end in browser shows success state; hero zoom, offer strip, glass components, and mobile (390px) layout screenshot-checked.
