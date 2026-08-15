import { useEffect, useState } from "react";
import "@/App.css";
import axios from "axios";
import { ArrowUpRight, ChevronDown, Menu, X, MoveDown, Check, Send } from "lucide-react";
import Lenis from "lenis";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const projects = [
  { number: "01", title: "Aetheris", type: "Autonomous logistics", metric: "84%", detail: "less dispatch latency", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=85" },
  { number: "02", title: "Vortex", type: "Enterprise knowledge engine", metric: "12M+", detail: "documents indexed", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=85" },
  { number: "03", title: "NeuralCore", type: "Omnichannel concierge", metric: "3.8×", detail: "conversion lift", image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=1400&q=85" },
  { number: "04", title: "Synthetix", type: "Biopharma R&D copilot", metric: "6×", detail: "faster synthesis", image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1400&q=85" }
];
const services = ["Production AI workflows", "Autonomous AI agents", "AI-driven web architecture", "Cognitive chatbots & voice"];

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", project: "" });
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, syncTouch: true });
    let frame;
    const raf = (time) => { lenis.raf(time); frame = requestAnimationFrame(raf); };
    frame = requestAnimationFrame(raf);
    const onScroll = () => {
      const hero = document.getElementById("hero-immersion");
      if (!hero) return;
      const progress = Math.min(Math.max(-hero.getBoundingClientRect().top / (hero.offsetHeight - window.innerHeight), 0), 1);
      document.documentElement.style.setProperty("--hero-progress", progress.toFixed(3));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(frame); lenis.destroy(); };
  }, []);

  const submitInquiry = async (event) => {
    event.preventDefault();
    try { await axios.post(`${API}/inquiries`, form); } catch (error) { console.warn("Inquiry endpoint unavailable", error); }
    setSubmitted(true);
  };
  const goTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  return (
    <main>
      <nav className="nav" data-testid="site-navigation"><button className="brand" onClick={() => goTo("top")} data-testid="brand-home">ASCENXION<span>®</span></button><div className={`nav-links ${menuOpen ? "open" : ""}`}><button onClick={() => goTo("work")} data-testid="nav-work">Work</button><button onClick={() => goTo("capabilities")} data-testid="nav-capabilities">Capabilities</button><button onClick={() => goTo("contact")} data-testid="nav-contact">Contact</button></div><button className="nav-cta" onClick={() => goTo("contact")} data-testid="nav-strategy-button">Book a strategy call <ArrowUpRight size={15} /></button><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} data-testid="mobile-menu-button">{menuOpen ? <X /> : <Menu />}</button></nav>
      <section className="hero-immersion" id="hero-immersion" data-testid="hero-section"><div className="hero-stage"><div className="hero-image" data-testid="hero-immersion-image"></div><div className="hero-grain"></div><div className="hero-orbit orbit-one"></div><div className="hero-orbit orbit-two"></div><div className="hero-overlay"></div><div className="hero-copy"><p className="eyebrow" data-testid="hero-eyebrow">AI systems / 001 — 2025</p><h1 data-testid="hero-heading">Make your<br /><em>next move</em><br />intelligent.</h1><p className="hero-sub" data-testid="hero-description">We design and deploy production-grade AI systems that turn ambitious businesses into category leaders.</p><button className="circle-cta" onClick={() => goTo("work")} data-testid="hero-explore-button"><MoveDown size={18} /> <span>Explore<br />the work</span></button></div><div className="hero-glass glass-status" data-testid="hero-status-card"><span className="status-dot"></span><span>Connection protocol</span><strong>ACTIVE</strong></div><div className="hero-glass glass-coordinate" data-testid="hero-coordinate-card"><span>40° 44′ 55.8″ N</span><span>73° 59′ 11.1″ W</span><small>THE NEXT IS CLOSER THAN IT LOOKS</small></div><div className="hero-focus" data-testid="hero-focus-point"><span></span></div><div className="hero-foot"><span data-testid="hero-scroll-label">Scroll to connect</span><span>© ASCENXION 2025</span><span>Built for the next</span></div></div></section>
      <section className="statement" data-testid="statement-section"><p className="eyebrow">The new advantage</p><h2 data-testid="statement-heading">The businesses<br />that <em>adapt</em> first<br />define what comes next.</h2><p className="statement-copy">Ascenxion partners with teams ready to move beyond experiments. We build the intelligence layer that makes work faster, sharper, and unmistakably yours.</p><div className="stat-row"><div><strong>24<span>+</span></strong><small>Systems shipped</small></div><div><strong>08</strong><small>Industries transformed</small></div><div><strong>∞</strong><small>Room to scale</small></div></div></section>
      <section className="work-section" id="work" data-testid="work-section"><div className="section-head"><div><p className="eyebrow">Selected systems / 004</p><h2>Work that<br /><em>moves</em> markets.</h2></div><p className="section-note">A small selection of the systems we've designed for teams thinking in decades, not quarters.</p></div><div className="project-grid">{projects.map((project, index) => <article className={`project-card card-${index + 1}`} key={project.number} data-testid={`project-card-${index + 1}`}><div className="project-image" style={{ backgroundImage: `url(${project.image})` }}></div><div className="project-shade"></div><div className="project-meta"><span>{project.number} / 2025</span><ArrowUpRight size={18} /></div><div className="project-title"><p>{project.type}</p><h3>{project.title}</h3><strong>{project.metric}</strong><small>{project.detail}</small></div></article>)}</div></section>
      <section className="capabilities" id="capabilities" data-testid="capabilities-section"><div className="cap-head"><p className="eyebrow">What we build</p><h2>Intelligence,<br /><em>engineered.</em></h2></div><div className="service-list">{services.map((service, index) => <div className="service" key={service} data-testid={`service-item-${index + 1}`}><span>0{index + 1}</span><h3>{service}</h3><ArrowUpRight size={20} /></div>)}</div></section>
      <section className="contact-section" id="contact" data-testid="contact-section"><div className="contact-art"></div><div className="contact-inner"><p className="eyebrow">Have a system in mind?</p><h2>Let’s build<br /><em>what’s next.</em></h2><p>Tell us where you're going. We'll show you the shortest path to get there.</p>{submitted ? <div className="success-message" data-testid="inquiry-success"><Check size={22} /> Received. We’ll be in touch shortly.</div> : <form onSubmit={submitInquiry} data-testid="inquiry-form"><input required placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} data-testid="inquiry-name-input" /><input required type="email" placeholder="Work email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} data-testid="inquiry-email-input" /><input placeholder="Company (optional)" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} data-testid="inquiry-company-input" /><textarea required placeholder="What are you looking to build?" value={form.project} onChange={e => setForm({ ...form, project: e.target.value })} data-testid="inquiry-project-input" /><button type="submit" className="submit-button" data-testid="inquiry-submit-button">Start the conversation <Send size={17} /></button></form>}<a className="email-link" href="mailto:hello@ascenxion.ai" data-testid="email-cta">Prefer email? hello@ascenxion.ai <ArrowUpRight size={16} /></a></div></section>
      <footer data-testid="site-footer"><span>ASCENXION®</span><span>AI systems for the ambitious.</span><span>Global / Remote-first</span></footer>
    </main>
  );
};

function App() {
  return <Home />;
}

export default App;
