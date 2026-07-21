"use client";
import { useState, useEffect } from "react";
import type { Metadata } from "next";

const QUOTES = [
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Discipline is the bridge between goals and accomplishment.", author: "Jim Rohn" },
  { text: "You don't rise to your goals. You fall to your systems.", author: "James Clear" },
  { text: "Every master was once a disaster.", author: "T. Harv Eker" },
  { text: "The pain of discipline is far less than the pain of regret.", author: "Sarah Bombell" },
];

const QUESTS = [
  { id: 1, title: "Read 20 pages", category: "📚 Books", xp: 50, done: false, difficulty: 1 },
  { id: 2, title: "Workout 30 minutes", category: "💪 Fitness", xp: 80, done: true, difficulty: 2 },
  { id: 3, title: "2 hours Deep Work", category: "🧠 Deep Work", xp: 120, done: false, difficulty: 3 },
  { id: 4, title: "Meditate 10 min", category: "🧘 Meditation", xp: 40, done: true, difficulty: 1 },
  { id: 5, title: "Write 300 words", category: "✍️ Writing", xp: 60, done: false, difficulty: 2 },
];

const GOALS = [
  { title: "Read 50 Books This Year", progress: 28, total: 50, color: "#3b82f6", icon: "📚" },
  { title: "100 Workout Sessions", progress: 47, total: 100, color: "#10b981", icon: "💪" },
  { title: "Launch Side Project", progress: 3, total: 5, color: "#8b5cf6", icon: "🚀", unit: "milestones" },
];

const ACHIEVEMENTS_RECENT = [
  { icon: "🔥", title: "Week Warrior", desc: "7 days straight", color: "#f59e0b" },
  { icon: "📚", title: "Bookworm", desc: "25 books read", color: "#3b82f6" },
  { icon: "💻", title: "Code Monk", desc: "30hr deep work", color: "#8b5cf6" },
];

// Build heatmap data (26 weeks × 7 days)
function buildHeatmap() {
  const cells: number[] = [];
  for (let i = 0; i < 182; i++) {
    if (i > 160) { cells.push(0); continue; }
    cells.push(Math.random() > 0.35 ? Math.floor(Math.random() * 4) + 1 : 0);
  }
  return cells;
}

const HEATMAP = buildHeatmap();
const WEEK_DAYS = ["Mon", "Wed", "Fri"];
const MONTHS = ["Feb", "Mar", "Apr", "May", "Jun", "Jul"];

function CircleProgress({ pct, size = 120, stroke = 10, color = "#3b82f6" }: { pct: number; size?: number; stroke?: number; color?: string }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--surface-3)" strokeWidth={stroke} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.34,1.56,0.64,1)", filter: `drop-shadow(0 0 8px ${color}90)` }} />
    </svg>
  );
}

export default function HQPage() {
  const [quests, setQuests] = useState(QUESTS);
  const [quote] = useState(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  const [xpAnim, setXpAnim] = useState(false);

  const completed = quests.filter(q => q.done).length;
  const completedPct = Math.round((completed / quests.length) * 100);

  const toggleQuest = (id: number) => {
    setQuests(prev => prev.map(q => q.id === id ? { ...q, done: !q.done } : q));
    if (!quests.find(q => q.id === id)?.done) setXpAnim(true);
    setTimeout(() => setXpAnim(false), 2000);
  };

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div style={{ padding: "32px", maxWidth: 1200, margin: "0 auto" }}>
      {/* XP Flyout */}
      {xpAnim && (
        <div style={{ position: "fixed", top: "20%", right: 40, zIndex: 100,
          background: "linear-gradient(135deg, #3b82f6, #8b5cf6)", borderRadius: 12, padding: "10px 20px",
          fontFamily: "Outfit,sans-serif", fontWeight: 800, color: "white", fontSize: "1.1rem",
          animation: "slide-up 0.4s ease both", boxShadow: "0 0 30px rgba(139,92,246,0.5)" }}>
          +XP ⚡
        </div>
      )}

      {/* Header row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
        <div>
          <div className="badge badge-purple" style={{ marginBottom: 10 }}>🏠 Headquarters</div>
          <h1 style={{ fontFamily: "Outfit,sans-serif", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 2.6rem)", letterSpacing: "-0.03em", marginBottom: 6 }}>
            {greeting}, <span className="text-gradient">Alex</span>. ⚡
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} — Your legend continues today.
          </p>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 12, padding: "10px 16px", textAlign: "center" }}>
            <div style={{ fontSize: "0.65rem", color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Streak</div>
            <div style={{ fontFamily: "Outfit,sans-serif", fontWeight: 800, fontSize: "1.3rem", color: "#f59e0b" }}>🔥 12</div>
          </div>
          <div style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 12, padding: "10px 16px", textAlign: "center" }}>
            <div style={{ fontSize: "0.65rem", color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Level</div>
            <div style={{ fontFamily: "Outfit,sans-serif", fontWeight: 800, fontSize: "1.3rem" }} className="text-gradient">7</div>
          </div>
          <div style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 12, padding: "10px 16px", textAlign: "center" }}>
            <div style={{ fontSize: "0.65rem", color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Total XP</div>
            <div style={{ fontFamily: "Outfit,sans-serif", fontWeight: 800, fontSize: "1.3rem", color: "#8b5cf6" }}>3.2K</div>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>

        {/* Today's Quests — spans 2 cols */}
        <div className="card" style={{ gridColumn: "span 2", padding: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <div>
              <h2 style={{ fontFamily: "Outfit,sans-serif", fontWeight: 700, fontSize: "1.1rem" }}>⚔️ Today&apos;s Quests</h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", marginTop: 2 }}>{completed}/{quests.length} complete</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <CircleProgress pct={completedPct} size={52} stroke={5} color="#3b82f6" />
              <div style={{ position: "absolute" }}></div>
              <span className="badge badge-blue">{completedPct}%</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {quests.map(q => (
              <div key={q.id} onClick={() => toggleQuest(q.id)} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
                borderRadius: 12, cursor: "pointer", transition: "all 0.2s",
                background: q.done ? "rgba(16,185,129,0.06)" : "var(--surface-2)",
                border: `1px solid ${q.done ? "rgba(16,185,129,0.2)" : "var(--border)"}`,
              }}>
                <div style={{ width: 22, height: 22, borderRadius: 7, flexShrink: 0, transition: "all 0.3s",
                  background: q.done ? "#10b981" : "transparent", border: q.done ? "none" : "2px solid var(--border)",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", color: "white",
                  boxShadow: q.done ? "0 0 12px rgba(16,185,129,0.5)" : "none" }}>
                  {q.done && "✓"}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "0.875rem", fontWeight: 500, color: q.done ? "var(--text-muted)" : "var(--text)", textDecoration: q.done ? "line-through" : "none" }}>{q.title}</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-faint)", marginTop: 2 }}>{q.category}</div>
                </div>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <span>{"⭐".repeat(q.difficulty)}</span>
                  <span className="badge badge-blue" style={{ fontSize: "0.68rem" }}>+{q.xp} XP</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* XP Card */}
          <div className="card card-glow-purple" style={{ padding: "22px", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% -20%, rgba(139,92,246,0.15), transparent 70%)" }} />
            <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 12, position: "relative" }}>
              <CircleProgress pct={64} size={90} stroke={8} color="#8b5cf6" />
              <div style={{ position: "absolute", textAlign: "center" }}>
                <div style={{ fontFamily: "Outfit,sans-serif", fontWeight: 900, fontSize: "1.4rem", lineHeight: 1 }}>7</div>
                <div style={{ fontSize: "0.55rem", color: "var(--text-faint)" }}>LVL</div>
              </div>
            </div>
            <div className="badge badge-purple" style={{ marginBottom: 6 }}>Strategist</div>
            <p style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>1,760 XP to Level 8</p>
          </div>

          {/* Motivation quote */}
          <div className="card" style={{ padding: "20px" }}>
            <div style={{ fontSize: "1.5rem", color: "var(--text-faint)", lineHeight: 1, marginBottom: 10 }}>&ldquo;</div>
            <p style={{ color: "var(--text)", fontSize: "0.85rem", lineHeight: 1.6, fontStyle: "italic", marginBottom: 10 }}>{quote.text}</p>
            <p style={{ color: "var(--text-faint)", fontSize: "0.72rem" }}>— {quote.author}</p>
          </div>
        </div>

        {/* Goals */}
        <div className="card" style={{ gridColumn: "span 2", padding: "24px" }}>
          <h2 style={{ fontFamily: "Outfit,sans-serif", fontWeight: 700, fontSize: "1.1rem", marginBottom: 18 }}>🎯 Active Goals</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {GOALS.map((g, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span>{g.icon}</span>
                    <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>{g.title}</span>
                  </div>
                  <span style={{ fontSize: "0.8rem", color: g.color, fontWeight: 600 }}>
                    {g.progress}/{g.total} {g.unit || ""}
                  </span>
                </div>
                <div className="xp-bar" style={{ height: 8 }}>
                  <div className="xp-bar-fill" style={{ width: `${(g.progress / g.total) * 100}%`, background: `linear-gradient(90deg, ${g.color}cc, ${g.color})` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent achievements */}
        <div className="card" style={{ padding: "22px" }}>
          <h2 style={{ fontFamily: "Outfit,sans-serif", fontWeight: 700, fontSize: "1rem", marginBottom: 16 }}>🏆 Recent Achievements</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {ACHIEVEMENTS_RECENT.map((a, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `${a.color}20`, border: `1px solid ${a.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0 }}>{a.icon}</div>
                <div>
                  <div style={{ fontSize: "0.82rem", fontWeight: 600 }}>{a.title}</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{a.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity heatmap */}
        <div className="card" style={{ gridColumn: "span 3", padding: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <h2 style={{ fontFamily: "Outfit,sans-serif", fontWeight: 700, fontSize: "1.1rem" }}>📅 Consistency Map</h2>
            <span className="badge badge-emerald">182 days tracked</span>
          </div>
          <div style={{ display: "flex", gap: 4, alignItems: "flex-start", overflowX: "auto" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 3, marginTop: 16, marginRight: 4 }}>
              {WEEK_DAYS.map(d => <div key={d} style={{ height: 14, fontSize: "0.6rem", color: "var(--text-faint)", display: "flex", alignItems: "center" }}>{d}</div>)}
            </div>
            <div>
              <div style={{ display: "flex", gap: 3, marginBottom: 4 }}>
                {MONTHS.map(m => <div key={m} style={{ width: 84, fontSize: "0.6rem", color: "var(--text-faint)" }}>{m}</div>)}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(26, 14px)", gridTemplateRows: "repeat(7, 14px)", gap: 3 }}>
                {HEATMAP.map((h, i) => (
                  <div key={i} className={`heat-cell heat-${h}`} data-tooltip={`${h > 0 ? h * 30 : 0}min`} style={{ transition: "transform 0.15s", cursor: "default" }}
                    onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.3)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")} />
                ))}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 12 }}>
            <span style={{ fontSize: "0.7rem", color: "var(--text-faint)" }}>Less</span>
            {[0,1,2,3,4].map(h => <div key={h} className={`heat-cell heat-${h}`} style={{ width: 10, height: 10 }} />)}
            <span style={{ fontSize: "0.7rem", color: "var(--text-faint)" }}>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}
