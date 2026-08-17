import { useEffect, useRef, useState } from "react";
import "@/App.css";
import axios from "axios";
import { ArrowUpRight, Menu, X, Check, Send } from "lucide-react";
import Lenis from "lenis";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroScene, { scrollState } from "@/components/HeroScene";
import { GlassEffect, GlassFilter } from "@/components/LiquidGlass";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const projects = [
  { number: "01", title: "Aetheris", type: "Smart delivery system", metric: "84%", detail: "faster order delivery", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=85" },
  { number: "02", title: "Vortex", type: "Instant answers for teams", metric: "12M+", detail: "questions answered automatically", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=85" },
  { number: "03", title: "NeuralCore", type: "Website that sells", metric: "3.8×", detail: "more revenue per visitor", image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=1400&q=85" },
  { number: "04", title: "Synthetix", type: "Research made faster", metric: "6×", detail: "faster results", image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1400&q=85" }
];
const services = ["Automation that saves your team hours", "AI that talks to your customers 24/7", "Websites that turn visitors into buyers", "Chatbots that answer, sell, and support"];
const marqueeWords = ["Automation", "AI Agents", "Websites", "Chatbots", "Ascenxion®"];
const EASE = [0.16, 0.7, 0.24, 1];

const ZReveal = ({ children, className = "", ...rest }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.3"] });
  const z = useTransform(scrollYProgress, [0, 1], [-520, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.55, 1], [0, 0.7, 1]);
  const filter = useTransform(scrollYProgress, [0, 1], ["blur(16px)", "blur(0px)"]);
  return <motion.div ref={ref} className={className} style={{ z, opacity, filter, transformPerspective: 1300 }} {...rest}>{children}</motion.div>;
};

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", project: "" });
  const lenisRef = useRef(null);
  const hybridRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: hybridRef, offset: ["start start", "end end"] });
  // The 2nd page text scales up from the dead center of the screen
  // Wait for hands to fade out (by 0.5), then scale text up from 0.5 to 0.85
  const statementOpacity = useTransform(scrollYProgress, [0.5, 0.75], [0, 1]);
  const statementScale = useTransform(scrollYProgress, [0.5, 0.85], [0.1, 1]);
  const statementFilter = useTransform(scrollYProgress, [0.5, 0.75], ["blur(20px)", "blur(0px)"]);

  const heroOpacity = useTransform(scrollYProgress, [0.35, 0.5], [1, 0]);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true, syncTouch: true });
    lenisRef.current = lenis;
    let frame;
    const mouse = { tx: 0, ty: 0, x: 0, y: 0 };
    const raf = (time) => {
      lenis.raf(time);
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      document.documentElement.style.setProperty("--mx", mouse.x.toFixed(4));
      document.documentElement.style.setProperty("--my", mouse.y.toFixed(4));
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    const onMouse = (e) => { mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2; mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2; };

    const unsubscribe = scrollYProgress.onChange(v => {
      const heroP = Math.min(Math.max(v, 0), 1);
      document.documentElement.style.setProperty("--hero-progress", heroP.toFixed(3));
      scrollState.progress = heroP;
    });

    window.addEventListener("mousemove", onMouse, { passive: true });
    return () => { window.removeEventListener("mousemove", onMouse); cancelAnimationFrame(frame); lenis.destroy(); lenisRef.current = null; unsubscribe(); };
  }, [scrollYProgress]);

  const submitInquiry = async (event) => {
    event.preventDefault();
    try { await axios.post(`${API}/inquiries`, form); } catch (error) { console.warn("Inquiry endpoint unavailable", error); }
    setSubmitted(true);
  };
  const goTo = (id) => { lenisRef.current?.scrollTo(`#${id}`); setMenuOpen(false); };

  return (
    <main id="top">
      <GlassFilter />
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 w-full" style={{ pointerEvents: 'none' }}>
        <GlassEffect className="rounded-[24px] w-full max-w-6xl h-[76px] pointer-events-auto" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
          <nav className="w-full h-full flex items-center justify-between px-6 md:px-10" data-testid="site-navigation">
            <button className="brand" onClick={() => goTo("top")} data-testid="brand-home">ASCENXION<span>®</span></button>
            <div className={`nav-links ${menuOpen ? "open" : ""}`}>
              <button onClick={() => goTo("work")} data-testid="nav-work">Work</button>
              <button onClick={() => goTo("capabilities")} data-testid="nav-capabilities">Capabilities</button>
              <button onClick={() => goTo("contact")} data-testid="nav-contact">Contact</button>
            </div>
            <button className="nav-cta" onClick={() => goTo("contact")} data-testid="nav-strategy-button">Start a project <ArrowUpRight size={15} /></button>
            <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} data-testid="mobile-menu-button">{menuOpen ? <X /> : <Menu />}</button>
          </nav>
        </GlassEffect>
      </div>

      {/* Cinematic Sequence: 1. Hands zoom in, 2. Hands fade out, 3. Hero Text zooms in from Z */}
      <div ref={hybridRef} style={{ height: '220vh', position: 'relative' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', perspective: '1200px' }}>

          <motion.div style={{ opacity: heroOpacity, position: 'absolute', inset: 0 }}>
            <section className="hero-immersion" id="hero-immersion" data-testid="hero-section" style={{ height: '100vh' }}>
              <div className="hero-stage">
                <HeroScene />
                <div className="hero-grain"></div>
                <div className="hero-overlay"></div>
                <div className="hero-foot">
                  <span data-testid="hero-scroll-label">Scroll to begin</span>
                  <span>© ASCENXION 2026</span>
                  <span>AI systems for the ambitious</span>
                </div>
              </div>
            </section>
          </motion.div>

          <motion.div style={{ scale: statementScale, opacity: statementOpacity, filter: statementFilter, position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="hero-headline" style={{ position: 'relative', top: 'auto', left: 'auto', transform: 'none', width: '100%', padding: '0 10vw', textAlign: 'center' }}>
              <p className="eyebrow" data-testid="hero-eyebrow">Automation + websites + AI / 2026</p>
              <h1 data-testid="hero-heading">We build things<br /><em>that grow your business.</em></h1>
              <p className="hero-sub" data-testid="hero-description" style={{ margin: '28px auto 0' }}>Smart automation, websites that actually sell, and AI that handles your customers — so you can focus on the work that matters.</p>
            </div>
          </motion.div>

        </div>
        <div id="process" style={{ position: 'absolute', bottom: 0 }}></div>
      </div>

      {/* Y-Scroll continues naturally below the sticky stage */}
      <section className="statement" style={{ paddingTop: '80px' }}>
        <ZReveal>
          <div className="offer-strip" data-testid="offer-strip"><div><span>01 / AUTOMATE</span><strong>Stop doing repetitive work.</strong><small>We set up smart systems that handle the boring stuff — so your team spends time on what actually grows the business.</small></div><div><span>02 / BUILD</span><strong>AI that works while you sleep.</strong><small>We build AI assistants that talk to your customers, answer questions, and close sales — all day, every day.</small></div><div><span>03 / CONVERT</span><strong>A website that actually sells.</strong><small>Not just a pretty page. A fast, modern website designed to turn every visitor into a paying customer.</small></div></div>
          <div className="story-line" data-testid="story-line"><div className="story-step active"><span>01</span><strong>You tell us the problem</strong><small>One quick call. We figure out what's slowing your business down.</small></div><div className="story-step"><span>02</span><strong>We build the solution</strong><small>Automation, AI, website — all connected. You see updates every week.</small></div><div className="story-step"><span>03</span><strong>You go live, we stick around</strong><small>We don't disappear after launch. We stay for support and improvements.</small></div></div>
          <div className="stat-row"><div><strong>24<span>+</span></strong><small>Projects delivered</small></div><div><strong>08</strong><small>Industries served</small></div><div><strong>&lt;48h</strong><small>We reply fast</small></div></div>
        </ZReveal>
      </section>

      <div className="marquee-strip" data-testid="marquee-strip"><div className="marquee-track">{[...marqueeWords, ...marqueeWords].map((word, i) => <span key={i} className={i % 2 ? "mq-alt" : ""}>{word}<i>✦</i></span>)}</div></div>
      <section className="work-section" id="work" data-testid="work-section"><ZReveal className="section-head"><div><p className="eyebrow">Chapter 02 — Our work</p><h2>Built by us.<br /><em>Loved by clients.</em></h2></div><p className="section-note">Real projects with real results. We don't just build and leave — we build and it works.</p></ZReveal><ZReveal><div className="project-grid">{projects.map((project, index) => <article className={`project-card card-${index + 1}`} key={project.number} data-testid={`project-card-${index + 1}`}><div className="project-image" style={{ backgroundImage: `url(${project.image})` }}></div><div className="project-shade"></div><div className="project-meta"><span>{project.number} / 2026</span><ArrowUpRight size={18} /></div><div className="project-title"><p>{project.type}</p><h3>{project.title}</h3><strong>{project.metric}</strong><small>{project.detail}</small></div></article>)}</div></ZReveal></section>
      <section className="capabilities" id="capabilities" data-testid="capabilities-section"><ZReveal className="cap-head"><p className="eyebrow">Chapter 03 — What we do</p><h2>Three things.<br /><em>Done right.</em></h2></ZReveal><ZReveal><div className="service-list">{services.map((service, index) => <div className="service" key={service} data-testid={`service-item-${index + 1}`}><span>0{index + 1}</span><h3>{service}</h3><ArrowUpRight size={20} /></div>)}</div></ZReveal></section>
      <section className="contact-section" id="contact" data-testid="contact-section"><div className="contact-art"></div><ZReveal className="contact-inner"><p className="eyebrow">Chapter 04 — Let's talk</p><h2>Got an idea?<br /><em>Let's build it.</em></h2><p>Tell us what you need. One message is enough — we take it from there.</p>{submitted ? <div className="success-message" data-testid="inquiry-success"><Check size={22} /> Received. We'll be in touch within 48 hours.</div> : <form onSubmit={submitInquiry} data-testid="inquiry-form"><input required placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} data-testid="inquiry-name-input" /><input required type="email" placeholder="Work email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} data-testid="inquiry-email-input" /><input placeholder="Company (optional)" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} data-testid="inquiry-company-input" /><textarea required placeholder="Tell us what you need help with" value={form.project} onChange={e => setForm({ ...form, project: e.target.value })} data-testid="inquiry-project-input" /><button type="submit" className="submit-button" data-testid="inquiry-submit-button">Start a project <Send size={17} /></button></form>}<a className="email-link" href="mailto:hello@ascenxion.ai" data-testid="email-cta">Prefer email? hello@ascenxion.ai <ArrowUpRight size={16} /></a></ZReveal></section>
      <footer data-testid="site-footer"><span>ASCENXION®</span><span>Automation, AI & websites — made to grow your business.</span><span>Global / Remote-first</span></footer>
    </main>
  );
};

function App() {
  return <Home />;
}

export default App;
