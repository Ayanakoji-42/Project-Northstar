"use client";
import { useEffect, useRef, useState } from "react";

const features = [
  {
    icon: "⚡", title: "Daily Quests", description: "Auto-generated missions based on your goals. Complete them, earn XP, level up your life.",
    color: "#3b82f6", size: "large",
    preview: (
      <div style={{ marginTop: 16 }}>
        {[{ name: "Read 20 pages", xp: 50, done: true }, { name: "Workout 30 min", xp: 80, done: true }, { name: "2hr Deep Work", xp: 120, done: false }].map((q, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ width: 20, height: 20, borderRadius: 6, background: q.done ? "#10b981" : "rgba(255,255,255,0.08)", border: q.done ? "none" : "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>{q.done ? "✓" : ""}</div>
            <span style={{ flex: 1, fontSize: "0.82rem", color: q.done ? "var(--text-muted)" : "var(--text)", textDecoration: q.done ? "line-through" : "none" }}>{q.name}</span>
            <span style={{ fontSize: "0.72rem", background: "rgba(59,130,246,0.15)", color: "#3b82f6", padding: "2px 8px", borderRadius: 100 }}>+{q.xp} XP</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: "📈", title: "XP & Levels", description: "Every action earns experience. Watch your level rise and unlock titles that reflect who you're becoming.",
    color: "#8b5cf6", size: "small",
    preview: (
      <div style={{ marginTop: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Level 7 — Strategist</span>
          <span style={{ fontSize: "0.8rem", color: "#8b5cf6" }}>3,240 / 5,000 XP</span>
        </div>
        <div className="xp-bar"><div className="xp-bar-fill" style={{ width: "64%", background: "linear-gradient(135deg, #8b5cf6, #3b82f6)" }} /></div>
      </div>
    ),
  },
  {
    icon: "🎯", title: "Goals & Vision", description: "Short-term tasks to lifetime dreams. Track every milestone with XP rewards and deadlines.",
    color: "#10b981", size: "small",
    preview: null,
  },
  {
    icon: "🔥", title: "Habit Streaks", description: "Build unbreakable systems. Track daily, weekly, and monthly habits with beautiful heatmaps.",
    color: "#f59e0b", size: "small",
    preview: (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 3, marginTop: 12 }}>
        {Array.from({ length: 28 }, (_, i) => {
          const h = i < 22 ? (Math.random() > 0.3 ? Math.floor(Math.random() * 4) + 1 : 0) : 0;
          return <div key={i} className={`heat-cell heat-${h}`} />;
        })}
      </div>
    ),
  },
  {
    icon: "🏆", title: "Achievements", description: "Hundreds of badges earned through real discipline. Every achievement tells your story.",
    color: "#f59e0b", size: "small",
    preview: (
      <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
        {["📚","💪","🧘","💻","✍️","🌅"].map((e, i) => (
          <div key={i} style={{ width: 36, height: 36, borderRadius: 10, background: i < 4 ? "rgba(245,158,11,0.2)" : "rgba(255,255,255,0.05)", border: i < 4 ? "1px solid rgba(245,158,11,0.4)" : "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", filter: i >= 4 ? "grayscale(1) opacity(0.3)" : "none" }}>{e}</div>
        ))}
      </div>
    ),
  },
  {
    icon: "📊", title: "Analytics", description: "Beautiful charts. Weekly reports. See exactly how you&apos;ve grown compared to last week.",
    color: "#6366f1", size: "large",
    preview: (
      <div style={{ display: "flex", gap: 3, alignItems: "flex-end", height: 60, marginTop: 16 }}>
        {[40, 65, 55, 80, 70, 90, 85].map((h, i) => (
          <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: "4px 4px 0 0", background: `rgba(99,102,241,${0.3 + h / 200})`, transition: "height 0.5s" }} />
        ))}
      </div>
    ),
  },
];

export default function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="features" className="section">
      <div className="container">
        <div ref={ref} style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="badge badge-emerald" style={{ marginBottom: 16 }}>Features</div>
          <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.03em", marginBottom: 16,
            opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)", transition: "all 0.6s" }}>
            Everything you need to win
          </h2>
          <p style={{ color: "var(--text-muted)", maxWidth: 480, margin: "0 auto" }}>
            Not another dashboard. Your personal command center.
          </p>
        </div>

        {/* Bento grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {features.map((f, i) => (
            <div key={i} className={`card card-glow-${["blue","purple","emerald","gold","gold","blue"][i] || "blue"}`}
              style={{ padding: "28px 26px", gridColumn: f.size === "large" ? "span 2" : "span 1",
                opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(30px)",
                transition: `all 0.6s ${i * 0.08}s`,
                background: `linear-gradient(135deg, ${f.color}08, var(--surface))` }}>
              <div style={{ fontSize: "2rem", marginBottom: 12 }}>{f.icon}</div>
              <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.2rem", marginBottom: 8, color: f.color }}>{f.title}</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", lineHeight: 1.6 }}>{f.description}</p>
              {f.preview}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
