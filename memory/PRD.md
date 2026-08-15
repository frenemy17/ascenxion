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
