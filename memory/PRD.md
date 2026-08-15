# Ascenxion Agency Website PRD

## Original problem statement
Build a premium, high-conversion website for Ascenxion, an international AI service agency delivering production AI workflows, autonomous agents, websites, and chatbots. The hero should use a hand/connection image with a scroll-driven zoom-to-reveal feel, supported by polished concept case studies, strong animation, and a short inquiry form.

## Architecture decisions
- React single-page marketing experience with CSS-driven responsive immersion and smooth anchor navigation.
- FastAPI POST /api/inquiries endpoint backed by the existing MongoDB configuration.
- Remote editorial imagery and editable project data kept in the frontend for fast case-study iteration.
- Desktop-first composition with simplified, non-overflowing mobile layouts.

## Implemented
- Ascenxion dark luxury-tech visual system with orange accent, serif italic contrast, DM Sans/DM Mono typography, atmospheric image overlays, hover states, and scroll zoom.
- Hero, positioning statement, proof metrics, four concept case studies, capabilities list, contact form, email CTA, and footer.
- Working inquiry persistence endpoint with validation and success state.
- Verified desktop/mobile live flows, no horizontal overflow, and successful production build.

## Prioritized backlog
- P0: Replace concept case-study copy and metrics with approved client material.
- P1: Connect Book a Strategy Call to a scheduling provider or availability flow.
- P1: Add project detail pages and richer case-study media.
- P2: Add motion library refinement for scroll choreography and reduced-motion accessibility pass.

## Next tasks
- Add a real calendar booking flow.
- Add analytics events for CTA clicks and inquiry submissions.
- Add richer project storytelling and client proof.
