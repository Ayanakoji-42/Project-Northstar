"use client";
import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView();
  useEffect(() => {
    if (!inView) return;
    const start = Date.now(), dur = 2000;
    const tick = () => {
      const t = Math.min((Date.now() - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.floor(eased * target));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const stats = [
  { value: 10000, suffix: "+", label: "Active Builders", color: "#3b82f6" },
  { value: 1200000, suffix: "+", label: "XP Earned Today", color: "#8b5cf6" },
  { value: 94, suffix: "%", label: "Report Progress", color: "#10b981" },
  { value: 365, suffix: " days", label: "Longest Streak", color: "#f59e0b" },
];

const reasons = [
  { icon: "🧠", title: "Progress is visible", body: "When you can see your XP bar move, your brain releases dopamine — the same chemical that makes games addictive, now working for your real life." },
  { icon: "🎯", title: "Small wins compound", body: "Completing a 10-minute quest builds the identity of someone who shows up. Over time, that identity becomes unshakeable." },
  { icon: "🔥", title: "Streaks create identity", body: "After 7 days of showing up, you don't do habits — you are the person who does them. Consistency sculpts character." },
  { icon: "🏆", title: "Rewards make it real", body: "Achievements aren't vanity. They're proof of commitment, stored permanently on your timeline — your legend, written in data." },
];

export default function MissionSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <>
      {/* Mission */}
      <section id="mission" className="section" style={{ position: "relative" }}>
        <div className="container">
          <div ref={ref} style={{ textAlign: "center", marginBottom: 80 }}>
            <div className="badge badge-purple" style={{ marginBottom: 20 }}>Our Mission</div>
            <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              letterSpacing: "-0.03em", lineHeight: 1.05, maxWidth: 800, margin: "0 auto 24px",
              opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(30px)", transition: "all 0.7s cubic-bezier(0.4,0,0.2,1)" }}>
              Stop watching others win.<br />
              <span className="text-gradient">Start building yourself.</span>
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", maxWidth: 580, margin: "0 auto",
              opacity: inView ? 1 : 0, transition: "all 0.7s 0.2s cubic-bezier(0.4,0,0.2,1)" }}>
              This isn&apos;t another productivity app. It&apos;s your personal RPG — where every real-world action earns XP,
              every day adds to your streak, and every achievement is earned, not bought.
            </p>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20, marginBottom: 100 }}>
            {stats.map((s, i) => (
              <div key={i} className="card" style={{ textAlign: "center", padding: "32px 24px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 50% 0%, ${s.color}18, transparent 70%)` }} />
                <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "2.8rem",
                  color: s.color, letterSpacing: "-0.03em", textShadow: `0 0 30px ${s.color}60` }}>
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </div>
                <div style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginTop: 8, fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Why gamification */}
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="badge badge-blue" style={{ marginBottom: 16 }}>The Science</div>
            <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.03em" }}>
              Why gamification works
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {reasons.map((r, i) => (
              <div key={i} className="card" style={{ padding: "32px 28px" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: 16 }}>{r.icon}</div>
                <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.1rem", marginBottom: 12 }}>{r.title}</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.7 }}>{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
