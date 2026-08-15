import { useEffect, useState } from "react";
import "@/App.css";
import axios from "axios";
import { ArrowUpRight, Menu, X, Check, Send } from "lucide-react";
import Lenis from "lenis";
import { motion } from "framer-motion";
import HeroScene, { scrollState } from "@/components/HeroScene";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const projects = [
  { number: "01", title: "Aetheris", type: "Autonomous logistics", metric: "84%", detail: "less dispatch latency", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=85" },
  { number: "02", title: "Vortex", type: "Enterprise knowledge engine", metric: "12M+", detail: "documents indexed", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=85" },
  { number: "03", title: "NeuralCore", type: "Omnichannel concierge", metric: "3.8×", detail: "conversion lift", image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=1400&q=85" },
  { number: "04", title: "Synthetix", type: "Biopharma R&D copilot", metric: "6×", detail: "faster synthesis", image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1400&q=85" }
];
const services = ["Production AI workflows", "Autonomous AI agents", "AI-driven web architecture", "Cognitive chatbots & voice"];
const marqueeWords = ["AI Workflows", "AI Agents", "High-Converting Websites", "Chatbots & Voice", "Ascenxion®"];
const EASE = [0.16, 0.7, 0.24, 1];

const Reveal = ({ children, className = "", delay = 0, hover = false, ...rest }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 56 }} whileInView={{ opacity: 1, y: 0 }} whileHover={hover ? { y: -6 } : undefined} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 1, delay, ease: EASE }} {...rest}>{children}</motion.div>
);

const MaskedLine = ({ children, delay = 0 }) => (
  <span className="mask-line"><motion.span initial={{ y: "115%" }} animate={{ y: "0%" }} transition={{ duration: 1.15, delay, ease: EASE }}>{children}</motion.span></span>
);

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", project: "" });
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, syncTouch: true });
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
    const onScroll = () => {
      const hero = document.getElementById("hero-immersion");
      if (!hero) return;
      const progress = Math.min(Math.max(-hero.getBoundingClientRect().top / (hero.offsetHeight - window.innerHeight), 0), 1);
      document.documentElement.style.setProperty("--hero-progress", progress.toFixed(3));
      scrollState.progress = progress;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse, { passive: true });
    onScroll();
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("mousemove", onMouse); cancelAnimationFrame(frame); lenis.destroy(); };
  }, []);

  const submitInquiry = async (event) => {
    event.preventDefault();
    try { await axios.post(`${API}/inquiries`, form); } catch (error) { console.warn("Inquiry endpoint unavailable", error); }
    setSubmitted(true);
  };
  const goTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  return (
    <main id="top">
      <nav className="nav" data-testid="site-navigation"><button className="brand" onClick={() => goTo("top")} data-testid="brand-home">ASCENXION<span>®</span></button><div className={`nav-links ${menuOpen ? "open" : ""}`}><button onClick={() => goTo("work")} data-testid="nav-work">Work</button><button onClick={() => goTo("capabilities")} data-testid="nav-capabilities">Capabilities</button><button onClick={() => goTo("contact")} data-testid="nav-contact">Contact</button></div><button className="nav-cta" onClick={() => goTo("contact")} data-testid="nav-strategy-button">Map my growth system <ArrowUpRight size={15} /></button><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} data-testid="mobile-menu-button">{menuOpen ? <X /> : <Menu />}</button></nav>
      <section className="hero-immersion" id="hero-immersion" data-testid="hero-section"><div className="hero-stage"><HeroScene /><div className="hero-grain"></div><div className="hero-overlay"></div><div className="hero-headline"><motion.p className="eyebrow" data-testid="hero-eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.35 }}>Digital growth systems / 001 — 2026</motion.p><h1 data-testid="hero-heading"><MaskedLine delay={0.45}>Make growth</MaskedLine><MaskedLine delay={0.62}><em>repeatable.</em></MaskedLine></h1><motion.p className="hero-sub" data-testid="hero-description" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.95, ease: EASE }}>We combine AI automation, deployed agents, and high-converting websites to turn ambitious businesses into faster-moving companies.</motion.p></div><div className="hero-foot"><span data-testid="hero-scroll-label">Scroll to turn the artifact</span><span>© ASCENXION 2026</span><span>Built for the next</span></div></div></section>
      <section className="statement" id="process" data-testid="statement-section"><Reveal><p className="eyebrow">Chapter 01 — The growth gap</p><h2 data-testid="statement-heading">Stop adding<br />more work.<br /><em>Build leverage.</em></h2></Reveal><Reveal delay={0.12}><p className="statement-copy">Your next stage of growth should not depend on more tabs, more tools, or more people chasing the same bottlenecks. Ascenxion designs the digital systems that make momentum compound.</p></Reveal><div className="offer-strip" data-testid="offer-strip"><Reveal hover><span>01 / AUTOMATE</span><strong>Give your team back its time.</strong><small>AI workflows that remove repetitive work and keep revenue moving.</small></Reveal><Reveal hover delay={0.14}><span>02 / DEPLOY</span><strong>Put an agent on the front line.</strong><small>Purpose-built AI agents that support customers, sales, and operations.</small></Reveal><Reveal hover delay={0.28}><span>03 / CONVERT</span><strong>Make every visit count.</strong><small>High-class websites engineered for clarity, trust, and action.</small></Reveal></div><div className="story-line" data-testid="story-line"><Reveal className="story-step active" hover><span>01</span><strong>Find the friction</strong><small>See where time, attention, and revenue are leaking.</small></Reveal><Reveal className="story-step" hover delay={0.14}><span>02</span><strong>Build the leverage</strong><small>Turn the bottleneck into a system that works.</small></Reveal><Reveal className="story-step" hover delay={0.28}><span>03</span><strong>Scale the signal</strong><small>Make the advantage visible to every customer.</small></Reveal></div><Reveal className="stat-row" delay={0.1}><div><strong>24<span>+</span></strong><small>Systems shipped</small></div><div><strong>08</strong><small>Industries transformed</small></div><div><strong>∞</strong><small>Room to scale</small></div></Reveal></section>
      <div className="marquee-strip" data-testid="marquee-strip"><div className="marquee-track">{[...marqueeWords, ...marqueeWords].map((word, i) => <span key={i} className={i % 2 ? "mq-alt" : ""}>{word}<i>✦</i></span>)}</div></div>
      <section className="work-section" id="work" data-testid="work-section"><Reveal className="section-head"><div><p className="eyebrow">Chapter 02 — Selected systems</p><h2>Work that<br /><em>moves</em> markets.</h2></div><p className="section-note">A small selection of the systems we've designed for teams thinking in decades, not quarters.</p></Reveal><div className="project-grid">{projects.map((project, index) => <Reveal className={`project-card card-${index + 1}`} hover delay={index * 0.1} key={project.number} data-testid={`project-card-${index + 1}`}><div className="project-image" style={{ backgroundImage: `url(${project.image})` }}></div><div className="project-shade"></div><div className="project-meta"><span>{project.number} / 2026</span><ArrowUpRight size={18} /></div><div className="project-title"><p>{project.type}</p><h3>{project.title}</h3><strong>{project.metric}</strong><small>{project.detail}</small></div></Reveal>)}</div></section>
      <section className="capabilities" id="capabilities" data-testid="capabilities-section"><Reveal className="cap-head"><p className="eyebrow">Chapter 03 — What we build</p><h2>Intelligence,<br /><em>engineered.</em></h2></Reveal><div className="service-list">{services.map((service, index) => <Reveal className="service" delay={index * 0.1} key={service} data-testid={`service-item-${index + 1}`}><span>0{index + 1}</span><h3>{service}</h3><ArrowUpRight size={20} /></Reveal>)}</div></section>
      <section className="contact-section" id="contact" data-testid="contact-section"><div className="contact-art"></div><Reveal className="contact-inner"><p className="eyebrow">Chapter 04 — What’s next</p><h2>Let’s build<br /><em>what’s next.</em></h2><p>Tell us where you're going. We'll show you the shortest path to get there.</p>{submitted ? <div className="success-message" data-testid="inquiry-success"><Check size={22} /> Received. We’ll be in touch shortly.</div> : <form onSubmit={submitInquiry} data-testid="inquiry-form"><input required placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} data-testid="inquiry-name-input" /><input required type="email" placeholder="Work email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} data-testid="inquiry-email-input" /><input placeholder="Company (optional)" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} data-testid="inquiry-company-input" /><textarea required placeholder="What are you looking to build?" value={form.project} onChange={e => setForm({ ...form, project: e.target.value })} data-testid="inquiry-project-input" /><button type="submit" className="submit-button" data-testid="inquiry-submit-button">Start the conversation <Send size={17} /></button></form>}<a className="email-link" href="mailto:hello@ascenxion.ai" data-testid="email-cta">Prefer email? hello@ascenxion.ai <ArrowUpRight size={16} /></a></Reveal></section>
      <footer data-testid="site-footer"><span>ASCENXION®</span><span>AI systems for the ambitious.</span><span>Global / Remote-first</span></footer>
    </main>
  );
};

function App() {
  return <Home />;
}

export default App;
