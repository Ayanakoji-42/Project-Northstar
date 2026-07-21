"use client";
import { useEffect, useRef, useState } from "react";

const steps = [
  { num: "01", icon: "🎯", title: "Choose Your Path", body: "Select the life categories that matter — fitness, books, coding, business, creativity. Build your own system.", color: "#3b82f6" },
  { num: "02", icon: "⚔️", title: "Accept Your Quests", body: "Each morning, new quests appear based on your goals. Complete them. Earn XP. Repeat.", color: "#8b5cf6" },
  { num: "03", icon: "🌟", title: "Level Up Your Life", body: "Watch your character grow as you grow. Unlock titles, achievements, and cosmetics — all through real discipline.", color: "#10b981" },
];

const testimonials = [
  { name: "Alex Chen", role: "Developer & Athlete", avatar: "#3b82f6", quote: "I've tried every productivity app. NORTHSTAR is the first one that made me actually excited to show up every day. My coding streak is 90 days strong.", xp: "14,200 XP", level: "Strategist" },
  { name: "Maya Patel", role: "Pre-Med Student", avatar: "#8b5cf6", quote: "The quest system changed how I study. Instead of dreading long sessions, I'm chasing XP. My GPA went up a full point.", xp: "22,800 XP", level: "Scholar" },
  { name: "Jordan Wright", role: "Entrepreneur", avatar: "#10b981", quote: "Building a startup is hard. Having a system that rewards my daily discipline — not just outcomes — keeps me grounded and consistent.", xp: "31,500 XP", level: "Builder" },
];

const faqs = [
  { q: "Is this free?", a: "The core experience — quests, XP, levels, habits, goals, journal, analytics — is completely free. Forever. We'll never lock real progress behind a paywall." },
  { q: "Can I customize my categories?", a: "Yes. You can add unlimited custom categories. Default ones are just a starting point. Your life, your system." },
  { q: "Is this another streak anxiety app?", a: "No. We reward total progress — XP earned, milestones hit, personal bests — more than perfect attendance. Missing a day doesn't reset your identity." },
  { q: "How is this different from Habitica or Duolingo?", a: "This is built around becoming the main character of your real life — not a game character. The XP you earn reflects actual decisions you make every day." },
  { q: "Will there be mobile apps?", a: "Yes — iOS and Android apps are on the roadmap. The web app is fully responsive in the meantime." },
];

export default function HowItWorksSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* How It Works */}
      <section id="how" className="section" style={{ background: "linear-gradient(to bottom, transparent, rgba(14,14,28,0.5), transparent)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="badge badge-blue" style={{ marginBottom: 16 }}>How It Works</div>
            <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.03em" }}>
              Three steps to your legend
            </h2>
          </div>
          <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {steps.map((s, i) => (
              <div key={i} className="card" style={{ padding: "36px 30px", position: "relative", overflow: "hidden",
                opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(40px)", transition: `all 0.7s ${i * 0.15}s` }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }} />
                <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "3.5rem", color: `${s.color}20`, lineHeight: 1, marginBottom: 16 }}>{s.num}</div>
                <div style={{ fontSize: "2rem", marginBottom: 16 }}>{s.icon}</div>
                <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.3rem", marginBottom: 12, color: s.color }}>{s.title}</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.7 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="community" className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="badge badge-gold" style={{ marginBottom: 16 }}>Community</div>
            <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.03em", marginBottom: 16 }}>
              Real builders, real results
            </h2>
            <p style={{ color: "var(--text-muted)" }}>Join thousands who chose to build their own legend.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            {testimonials.map((t, i) => (
              <div key={i} className="card" style={{ padding: "28px", position: "relative" }}>
                <div style={{ fontSize: "2rem", color: "var(--text-faint)", marginBottom: 16, lineHeight: 1 }}>&ldquo;</div>
                <p style={{ color: "var(--text)", fontSize: "0.925rem", lineHeight: 1.7, marginBottom: 20 }}>{t.quote}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: t.avatar, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "white", fontSize: "0.9rem" }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.875rem" }}>{t.name}</div>
                    <div style={{ color: "var(--text-muted)", fontSize: "0.78rem" }}>{t.role}</div>
                  </div>
                  <div style={{ marginLeft: "auto", textAlign: "right" }}>
                    <div className="badge badge-purple" style={{ fontSize: "0.68rem" }}>{t.level}</div>
                    <div style={{ color: "var(--text-muted)", fontSize: "0.72rem", marginTop: 4 }}>{t.xp}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="badge badge-purple" style={{ marginBottom: 16 }}>Roadmap</div>
            <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.03em" }}>
              Where we&apos;re going
            </h2>
          </div>
          <div style={{ maxWidth: 640, margin: "0 auto", position: "relative" }}>
            <div style={{ position: "absolute", left: 19, top: 0, bottom: 0, width: 2, background: "linear-gradient(to bottom, var(--blue), var(--purple), var(--emerald))" }} />
            {[
              { label: "Now", title: "Core Platform", items: ["Daily quests & XP", "Habit tracking", "Goals system", "Analytics dashboard"], done: true },
              { label: "Q3 2025", title: "Social Layer", items: ["Public profiles", "Friends & followers", "Achievement sharing", "Leaderboards"], done: false },
              { label: "Q4 2025", title: "AI Coach", items: ["Personalized quest generation", "Progress insights", "Behavioral nudges", "Voice journaling"], done: false },
              { label: "2026", title: "Mobile Apps", items: ["iOS & Android", "Apple Health sync", "Widgets", "Wearable support"], done: false },
            ].map((phase, i) => (
              <div key={i} style={{ display: "flex", gap: 24, marginBottom: 48 }}>
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: phase.done ? "var(--emerald)" : "var(--surface-3)", border: `3px solid ${phase.done ? "var(--emerald)" : "var(--border)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", boxShadow: phase.done ? "0 0 20px var(--emerald-glow)" : "none" }}>
                    {phase.done ? "✓" : "○"}
                  </div>
                </div>
                <div className="card" style={{ flex: 1, padding: "24px" }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 8 }}>
                    <span className={`badge ${phase.done ? "badge-emerald" : "badge-purple"}`}>{phase.label}</span>
                    <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.05rem" }}>{phase.title}</h3>
                  </div>
                  <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                    {phase.items.map((item, j) => (
                      <li key={j} style={{ color: "var(--text-muted)", fontSize: "0.875rem", padding: "3px 0", display: "flex", gap: 8 }}>
                        <span style={{ color: phase.done ? "var(--emerald)" : "var(--text-faint)" }}>→</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container" style={{ maxWidth: 720 }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="badge badge-blue" style={{ marginBottom: 16 }}>FAQ</div>
            <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "-0.03em" }}>Questions? We have answers.</h2>
          </div>
          {faqs.map((faq, i) => (
            <div key={i} className="accordion-item">
              <button className="accordion-trigger" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                {faq.q}
                <span style={{ transform: openFaq === i ? "rotate(45deg)" : "none", transition: "transform 0.3s", fontSize: "1.2rem", color: "var(--text-muted)" }}>+</span>
              </button>
              {openFaq === i && <div className="accordion-content">{faq.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="section">
        <div className="container">
          <div style={{ borderRadius: 28, padding: "80px 40px", textAlign: "center", position: "relative", overflow: "hidden",
            background: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.15))",
            border: "1px solid rgba(139,92,246,0.2)" }}>
            <div className="orb orb-blue animate-float" style={{ width: 400, height: 400, top: "-50%", left: "-10%", opacity: 0.4 }} />
            <div className="orb orb-purple animate-float-slow" style={{ width: 300, height: 300, bottom: "-30%", right: "5%", opacity: 0.4 }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.03em", marginBottom: 16 }}>
                Your legend starts<br /><span className="text-gradient">today.</span>
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", maxWidth: 480, margin: "0 auto 36px" }}>
                Free forever. No credit card. Just you, your goals, and the discipline to build something real.
              </p>
              <a href="/signup" className="btn btn-primary" style={{ fontSize: "1.1rem", padding: "16px 40px", borderRadius: 16 }}>
                ⚡ Start Building Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "48px 0" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: "linear-gradient(135deg, #3b82f6, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 12, fontWeight: 900, color: "white" }}>N</span>
            </div>
            <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "0.95rem" }}>NORTHSTAR</span>
          </div>
          <p style={{ color: "var(--text-faint)", fontSize: "0.8rem" }}>
            Build your own legend. © {new Date().getFullYear()} NORTHSTAR.
          </p>
          <div style={{ display: "flex", gap: 20 }}>
            {["Privacy", "Terms", "Contact"].map(l => (
              <a key={l} href="#" style={{ color: "var(--text-faint)", fontSize: "0.8rem", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-faint)")}>{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
