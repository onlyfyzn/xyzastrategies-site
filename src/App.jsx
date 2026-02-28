import { useState, useEffect, useRef } from "react";

const CALENDLY_URL = "https://calendly.com/faizaan";

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.8s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.8s cubic-bezier(.22,1,.36,1) ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

const STATS = [
  { value: "2.5B+", label: "Views generated" },
  { value: "20+", label: "Content systems built" },
  { value: "50+", label: "Brands transformed" },
];

const FEATURED_CASES = [
  { client: "Sam Zia", url: "https://www.instagram.com/samm_zia/", category: "Creator Growth", result: "197K → 700K Instagram followers", description: "Full-spectrum growth strategy including content repositioning, audience targeting, and engagement systems." },
  { client: "Emerald Network", url: null, category: "Faceless Media Empire", result: "~1B followers across platforms", description: "Built and managed a network of 20-30 faceless TikTok accounts in the conspiracy and esoteric knowledge niche. Created scalable content systems and SOPs that turned short-form content into a media machine." },
  { client: "10X App / Blake Anderson", url: "https://www.instagram.com/10x/", category: "CMO / Brand Strategy", result: "Full brand & growth infrastructure", description: "Served as CMO and built the marketing infrastructure, content pipelines, and positioning strategy for a consumer app in the creator economy." },
  { client: "Vibecode", url: "https://www.instagram.com/vibecodeapp/", category: "Launch Strategy", result: "10M views at launch", description: "Served as CMO and architected the launch content strategy from scratch. Built viral content loops and distribution systems that generated massive organic traction from day one." },
  { client: "AST & Josh", url: "https://www.instagram.com/affinitysalestraining/", url2: "https://www.instagram.com/joshtalksbiz/", category: "Revenue & Content Growth", result: "5x revenue in 3 months · 2M views/month", description: "Built an in-house marketing team, doubled account following, revamped the brand, and ran the largest entrepreneur event in Ireland. Developed Josh's personal content strategy — pioneering formats that consistently hit 1M+ views per video." },
  { client: "Paydai", url: "https://www.instagram.com/usepaydai/", category: "AI-First Marketing", result: "Pioneered AI-first campaigns", description: "Built and pioneered AI-first marketing campaigns from the ground up and trained a full in-house marketing team to scale execution independently." },
  { client: "A Players Club / James Galligan", url: "https://www.instagram.com/aplayersclub/", url2: "https://www.instagram.com/jamesgalligann/", category: "Personal Brand", result: "Full brand transformation", description: "Consulted on personal brand positioning, visual aesthetic, and content direction — building a cohesive identity engineered for authority and inbound opportunities." },
];

const AVATAR_ROW = [
  { name: "Kinson La", initials: "KL", url: "https://www.instagram.com/buildyourecombrand/", img: null },
  { name: "TheTradingGeek", initials: "BG", url: "https://www.instagram.com/brad.goh/", img: null },
  { name: "Symone Beez", initials: "SB", url: "https://www.instagram.com/symonebeez/", img: null },
  { name: "Jimmy Farley", initials: "JF", url: "https://www.instagram.com/jimpapi/", img: null },
  { name: "AJ Currency", initials: "AJ", url: "https://www.instagram.com/aj.currency/", img: null },
];

const SERVICE_1_BULLETS = [
  "Brand positioning & narrative",
  "Content strategy & systems",
  "Story sequence strategy",
  "Visual identity & aesthetic direction",
  "Audience growth frameworks",
];

const SIDEBAR_FACTS = [
  "Master's in Aerospace Engineering",
  "2.5B+ organic reach built",
  "Consultant to 4 eight-figure brands",
  "Former CMO for Paydai, AST, 10X",
];

const C = { warm: "#fcfaf7", sand: "#f5f2ed", accent: "#b8a080", dark: "#1a1a1a" };

function smoothScroll(e, id) {
  e.preventDefault();
  const el = document.getElementById(id);
  if (el) {
    const y = el.getBoundingClientRect().top + window.pageYOffset - 72;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 clamp(24px, 5vw, 80px)", height: 72,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(252,250,247,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "1px solid transparent",
      transition: "all 0.4s ease",
    }}>
      <a href="#top" onClick={e => smoothScroll(e, "top")} style={{ fontFamily: "var(--serif)", fontSize: 22, color: C.dark, textDecoration: "none", letterSpacing: "-0.02em" }}>Faizaan.</a>
      <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
        {["Work", "Services", "About"].map(t => (
          <a key={t} href={`#${t.toLowerCase()}`} onClick={e => smoothScroll(e, t.toLowerCase())} className="nav-link" style={{ fontFamily: "var(--sans)", fontSize: 13, color: "#666", textDecoration: "none", letterSpacing: "0.06em", textTransform: "uppercase" }}>{t}</a>
        ))}
        <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontFamily: "var(--sans)", fontSize: 13, color: C.warm, background: C.dark, padding: "10px 24px", borderRadius: 100, textDecoration: "none", letterSpacing: "0.04em", textTransform: "uppercase" }}>Book a Call</a>
      </div>
    </nav>
  );
}

function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { requestAnimationFrame(() => setLoaded(true)); }, []);
  const t = (d) => ({ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(40px)", transition: `opacity 1s cubic-bezier(.22,1,.36,1) ${d}s, transform 1s cubic-bezier(.22,1,.36,1) ${d}s` });
  return (
    <section id="top" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px clamp(24px, 5vw, 80px) 80px" }}>
      <div style={{ maxWidth: 900 }}>
        <p style={{ ...t(0.1), fontFamily: "var(--sans)", fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", color: "#999", marginBottom: 24 }}>Founder Branding · Content Systems · Growth Strategy</p>
        <h1 style={{ ...t(0.25), fontFamily: "var(--serif)", fontSize: "clamp(48px, 7vw, 96px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.03em", color: C.dark, margin: 0 }}>
          I turn founders into<br />brands that <span style={{ fontStyle: "italic", color: C.accent }}>compound.</span>
        </h1>
        <p style={{ ...t(0.45), fontFamily: "var(--sans)", fontSize: 18, lineHeight: 1.7, color: "#666", maxWidth: 580, marginTop: 32 }}>
          I help founders and entrepreneurs build personal brands that attract deals, talent, and opportunities — through content systems, positioning, and marketing infrastructure engineered to scale.
        </p>
        <div style={{ ...t(0.6), display: "flex", gap: 16, marginTop: 40, flexWrap: "wrap" }}>
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontFamily: "var(--sans)", fontSize: 14, color: C.warm, background: C.dark, padding: "14px 36px", borderRadius: 100, textDecoration: "none", letterSpacing: "0.04em" }}>Work With Me</a>
          <a href="#work" onClick={e => smoothScroll(e, "work")} className="btn-outline" style={{ fontFamily: "var(--sans)", fontSize: 14, color: C.dark, background: "transparent", padding: "14px 36px", borderRadius: 100, textDecoration: "none", letterSpacing: "0.04em", border: "1px solid rgba(0,0,0,0.15)" }}>See My Work</a>
        </div>
      </div>
      <div style={{ ...t(0.8), display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32, marginTop: "auto", paddingTop: 80, borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        {STATS.map((s, i) => (
          <div key={i}>
            <div style={{ fontFamily: "var(--serif)", fontSize: 36, color: C.dark, letterSpacing: "-0.02em" }}>{s.value}</div>
            <div style={{ fontFamily: "var(--sans)", fontSize: 13, color: "#999", marginTop: 4, letterSpacing: "0.02em" }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionLabel({ children }) {
  return <p style={{ fontFamily: "var(--sans)", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: C.accent, margin: "0 0 16px" }}>{children}</p>;
}

function CaseCard({ cs, index }) {
  const [hovered, setHovered] = useState(false);
  const ClientName = cs.url ? (
    <a href={cs.url} target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none", borderBottom: "1px solid rgba(0,0,0,0.1)", transition: "border-color 0.2s" }}
      onMouseEnter={e => e.target.style.borderColor = C.accent}
      onMouseLeave={e => e.target.style.borderColor = "rgba(0,0,0,0.1)"}
    >{cs.client}</a>
  ) : cs.client;
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{
      background: "#fff", borderRadius: 16, padding: "36px 32px",
      border: "1px solid rgba(0,0,0,0.04)",
      transition: "all 0.4s cubic-bezier(.22,1,.36,1)",
      transform: hovered ? "translateY(-4px)" : "translateY(0)",
      boxShadow: hovered ? "0 12px 40px rgba(0,0,0,0.06)" : "0 2px 8px rgba(0,0,0,0.02)",
      display: "flex", flexDirection: "column", height: "100%",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <span style={{ fontFamily: "var(--sans)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: C.accent }}>{cs.category}</span>
        <span style={{ fontFamily: "var(--serif)", fontSize: 13, color: "#ccc", fontStyle: "italic" }}>0{index + 1}</span>
      </div>
      <h3 style={{ fontFamily: "var(--serif)", fontSize: 22, fontWeight: 400, color: C.dark, margin: "0 0 8px", letterSpacing: "-0.01em" }}>{ClientName}</h3>
      <div style={{ fontFamily: "var(--serif)", fontSize: 18, color: C.accent, fontStyle: "italic", margin: "0 0 16px", lineHeight: 1.3 }}>{cs.result}</div>
      <p style={{ fontFamily: "var(--sans)", fontSize: 14, lineHeight: 1.7, color: "#888", margin: 0, marginTop: "auto" }}>{cs.description}</p>
    </div>
  );
}

function WorkSection() {
  return (
    <section id="work" style={{ padding: "120px clamp(24px, 5vw, 80px)", background: C.sand }}>
      <FadeIn>
        <SectionLabel>Selected Work</SectionLabel>
        <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(36px, 4.5vw, 56px)", fontWeight: 400, letterSpacing: "-0.02em", color: C.dark, margin: "0 0 64px", lineHeight: 1.1 }}>
          Results that speak <span style={{ fontStyle: "italic" }}>for themselves.</span>
        </h2>
      </FadeIn>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginBottom: 24 }}>
        {FEATURED_CASES.slice(0, 3).map((cs, i) => <FadeIn key={i} delay={i * 0.08}><CaseCard cs={cs} index={i} /></FadeIn>)}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24, marginBottom: 24 }}>
        {FEATURED_CASES.slice(3, 5).map((cs, i) => <FadeIn key={i + 3} delay={(i + 3) * 0.08}><CaseCard cs={cs} index={i + 3} /></FadeIn>)}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
        {FEATURED_CASES.slice(5, 7).map((cs, i) => <FadeIn key={i + 5} delay={(i + 5) * 0.08}><CaseCard cs={cs} index={i + 5} /></FadeIn>)}
      </div>
      <FadeIn delay={0.15}>
        <div style={{ marginTop: 64, paddingTop: 48, borderTop: "1px solid rgba(0,0,0,0.06)" }}>
          <p style={{ fontFamily: "var(--sans)", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "#999", margin: "0 0 28px" }}>Also worked with</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 28, alignItems: "center" }}>
            {AVATAR_ROW.map((p, i) => (
              <a key={i} href={p.url} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", transition: "opacity 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.opacity = 0.7}
                onMouseLeave={e => e.currentTarget.style.opacity = 1}
              >
                {p.img ? (
                  <img src={p.img} alt={p.name} style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover", border: `2px solid ${C.sand}` }} />
                ) : (
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: C.dark, color: C.warm, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--sans)", fontSize: 12, fontWeight: 500, letterSpacing: "0.04em" }}>{p.initials}</div>
                )}
                <span style={{ fontFamily: "var(--sans)", fontSize: 14, color: "#666" }}>{p.name}</span>
              </a>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

function ServicesSection() {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(null);
  return (
    <section id="services" style={{ padding: "120px clamp(24px, 5vw, 80px)" }}>
      <FadeIn>
        <SectionLabel>Services</SectionLabel>
        <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(36px, 4.5vw, 56px)", fontWeight: 400, letterSpacing: "-0.02em", color: C.dark, margin: "0 0 64px", lineHeight: 1.1 }}>What I <span style={{ fontStyle: "italic" }}>build</span> for you.</h2>
      </FadeIn>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
        <FadeIn delay={0.05}>
          <div onMouseEnter={() => setHovered(0)} onMouseLeave={() => setHovered(null)} style={{
            padding: 48, borderRadius: 16, border: "1px solid rgba(0,0,0,0.06)",
            background: hovered === 0 ? C.dark : "#fff",
            transition: "all 0.45s cubic-bezier(.22,1,.36,1)", height: "100%",
          }}>
            <div style={{ fontFamily: "var(--serif)", fontSize: 13, color: C.accent, marginBottom: 20, fontStyle: "italic" }}>01</div>
            <h3 style={{ fontFamily: "var(--serif)", fontSize: 28, fontWeight: 400, margin: "0 0 12px", color: hovered === 0 ? C.warm : C.dark, letterSpacing: "-0.01em", transition: "color 0.4s" }}>Founder Personal Branding</h3>
            <p style={{ fontFamily: "var(--serif)", fontSize: 15, fontStyle: "italic", margin: "0 0 20px", color: hovered === 0 ? "rgba(184,160,128,0.9)" : C.accent, transition: "color 0.4s" }}>Your business has revenue. Now build the brand behind it.</p>
            <p style={{ fontFamily: "var(--sans)", fontSize: 14, lineHeight: 1.75, margin: "0 0 24px", color: hovered === 0 ? "rgba(252,250,247,0.65)" : "#888", transition: "color 0.4s" }}>
              End-to-end personal brand buildout for founders doing 6-8 figures. Positioning, content strategy, visual identity, audience growth, story sequences that convert, and systems that run without you. Designed to make you the face of your industry — attracting deals, talent, and opportunities on autopilot.
            </p>
            <button onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }} style={{
              background: "none", border: "none", cursor: "pointer", padding: 0,
              fontFamily: "var(--sans)", fontSize: 13, letterSpacing: "0.06em", textTransform: "uppercase",
              color: C.accent, display: "flex", alignItems: "center", gap: 8,
            }}>
              {expanded ? "Hide details" : "What's included"}
              <span style={{ display: "inline-block", transform: expanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease", fontSize: 11 }}>▼</span>
            </button>
            <div style={{ maxHeight: expanded ? 300 : 0, overflow: "hidden", transition: "max-height 0.5s cubic-bezier(.22,1,.36,1), opacity 0.4s ease", opacity: expanded ? 1 : 0, marginTop: expanded ? 20 : 0 }}>
              {SERVICE_1_BULLETS.map((b, i) => (
                <div key={i} style={{
                  padding: "10px 0",
                  borderTop: i === 0 ? `1px solid ${hovered === 0 ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}` : "none",
                  borderBottom: `1px solid ${hovered === 0 ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
                  fontFamily: "var(--sans)", fontSize: 13,
                  color: hovered === 0 ? "rgba(252,250,247,0.7)" : "#888",
                  display: "flex", gap: 10, alignItems: "center", transition: "color 0.4s, border-color 0.4s",
                }}>
                  <span style={{ color: C.accent, fontSize: 7 }}>●</span>{b}
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div onMouseEnter={() => setHovered(1)} onMouseLeave={() => setHovered(null)} style={{
            padding: 48, borderRadius: 16, border: "1px solid rgba(0,0,0,0.06)",
            background: hovered === 1 ? C.dark : "#fff",
            transition: "all 0.45s cubic-bezier(.22,1,.36,1)", height: "100%",
          }}>
            <div style={{ fontFamily: "var(--serif)", fontSize: 13, color: C.accent, marginBottom: 20, fontStyle: "italic" }}>02</div>
            <h3 style={{ fontFamily: "var(--serif)", fontSize: 28, fontWeight: 400, margin: "0 0 12px", color: hovered === 1 ? C.warm : C.dark, letterSpacing: "-0.01em", transition: "color 0.4s" }}>Consulting & Advisory</h3>
            <p style={{ fontFamily: "var(--serif)", fontSize: 15, fontStyle: "italic", margin: "0 0 20px", color: hovered === 1 ? "rgba(184,160,128,0.9)" : C.accent, transition: "color 0.4s" }}>A strategist in your corner.</p>
            <p style={{ fontFamily: "var(--sans)", fontSize: 14, lineHeight: 1.75, margin: 0, color: hovered === 1 ? "rgba(252,250,247,0.65)" : "#888", transition: "color 0.4s" }}>
              High-level strategic consulting for founders who need clarity, direction, and a second brain. Every engagement starts with a tailored deep-dive into your brand — no templates, no fluff, just a roadmap built around your unfair advantages.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" style={{ padding: "120px clamp(24px, 5vw, 80px)", background: C.sand }}>
      <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 80, alignItems: "start" }}>
        <FadeIn>
          <SectionLabel>About</SectionLabel>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 400, letterSpacing: "-0.02em", color: C.dark, margin: "0 0 36px", lineHeight: 1.2 }}>
            The strategist founders call<br /><span style={{ fontStyle: "italic" }}>when they're ready to be seen.</span>
          </h2>
          <div style={{ fontFamily: "var(--sans)", fontSize: 15, lineHeight: 1.85, color: "#666", display: "flex", flexDirection: "column", gap: 22 }}>
            <p style={{ margin: 0 }}>I hold a Master's in Aerospace Engineering — but I've spent the last several years building personal brands, content empires, and marketing systems for founders and creators doing 6-8 figures.</p>
            <p style={{ margin: 0 }}>It started with sending 50 DMs a day offering editing services. It evolved into building a network of faceless accounts reaching a billion people, and serving as CMO for multiple companies across the creator economy.</p>
            <p style={{ margin: 0 }}>Today I work with founders who've built the business but haven't built the brand. I help them become the face of their industry — through personal brand positioning, content systems, story-driven sales strategies, and growth infrastructure that runs without them. Every engagement is tailored from scratch — no templates, no cookie-cutter frameworks.</p>
          </div>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{
              width: "100%", aspectRatio: "1", borderRadius: 16,
              background: `linear-gradient(145deg, ${C.dark} 0%, #2a2a2a 100%)`,
              display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8,
            }}>
              <span style={{ fontFamily: "var(--serif)", fontSize: 48, color: C.accent, fontStyle: "italic" }}>F</span>
              <span style={{ fontFamily: "var(--sans)", fontSize: 11, color: "rgba(252,250,247,0.35)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Your photo here</span>
            </div>
            <div style={{ background: C.dark, borderRadius: 16, padding: "36px 32px" }}>
              {SIDEBAR_FACTS.map((item, i) => (
                <div key={i} style={{
                  padding: "13px 0",
                  borderBottom: i < SIDEBAR_FACTS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  fontFamily: "var(--sans)", fontSize: 14, color: "rgba(252,250,247,0.75)",
                  display: "flex", gap: 12, alignItems: "baseline",
                }}>
                  <span style={{ color: C.accent, fontSize: 7 }}>●</span>{item}
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section style={{ padding: "140px clamp(24px, 5vw, 80px)", textAlign: "center" }}>
      <FadeIn>
        <SectionLabel>Let's Work Together</SectionLabel>
        <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(40px, 5.5vw, 72px)", fontWeight: 400, letterSpacing: "-0.03em", color: C.dark, margin: "0 0 24px", lineHeight: 1.1 }}>
          Ready to become the brand<br /><span style={{ fontStyle: "italic", color: C.accent }}>behind the business?</span>
        </h2>
        <p style={{ fontFamily: "var(--sans)", fontSize: 17, lineHeight: 1.7, color: "#888", maxWidth: 520, margin: "0 auto 40px" }}>
          Every engagement starts with a tailored deep-dive into your brand. No templates — just strategy built around your unfair advantages.
        </p>
        <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{
          display: "inline-block", fontFamily: "var(--sans)", fontSize: 15,
          color: C.warm, background: C.dark, padding: "18px 48px", borderRadius: 100,
          textDecoration: "none", letterSpacing: "0.04em",
        }}>Book a Strategy Call</a>
      </FadeIn>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      padding: "40px clamp(24px, 5vw, 80px)", borderTop: "1px solid rgba(0,0,0,0.06)",
      display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16,
    }}>
      <span style={{ fontFamily: "var(--serif)", fontSize: 16, color: "#ccc" }}>© 2026 Faizaan · XYZA Strategies</span>
      <div style={{ display: "flex", gap: 24 }}>
        {[{ label: "Instagram", url: "https://www.instagram.com/onlyfyzn/" }, { label: "LinkedIn", url: "https://www.linkedin.com/in/faizaanbaig/" }, { label: "Twitter / X", url: "https://x.com/onlyfyzn" }].map(s => (
          <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className="nav-link" style={{ fontFamily: "var(--sans)", fontSize: 13, color: "#999", textDecoration: "none", letterSpacing: "0.04em" }}>{s.label}</a>
        ))}
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap');
        :root { --serif: 'Instrument Serif', Georgia, serif; --sans: 'DM Sans', sans-serif; }
        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; padding: 0; background: ${C.warm}; color: ${C.dark}; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        ::selection { background: ${C.accent}; color: #fff; }
        .nav-link { transition: color 0.2s ease; }
        .nav-link:hover { color: ${C.dark} !important; }
        .btn-primary { transition: opacity 0.2s ease; }
        .btn-primary:hover { opacity: 0.85; }
        .btn-outline { transition: border-color 0.2s ease; }
        .btn-outline:hover { border-color: rgba(0,0,0,0.4) !important; }
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; }
          #services > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <Nav />
      <Hero />
      <WorkSection />
      <ServicesSection />
      <AboutSection />
      <CTASection />
      <Footer />
    </>
  );
}
