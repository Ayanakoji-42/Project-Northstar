"use client";
import { useState } from "react";

const ALL_QUESTS = [
  { id: 1, title: "Read 20 pages", category: "📚 Books", xp: 50, done: false, difficulty: 1, desc: "Pick up your current book and read for focused time." },
  { id: 2, title: "Workout 30 minutes", category: "💪 Fitness", xp: 80, done: true, difficulty: 2, desc: "Gym, run, bodyweight — any movement counts." },
  { id: 3, title: "2 hours Deep Work", category: "🧠 Deep Work", xp: 120, done: false, difficulty: 3, desc: "No distractions. Phone away. Pure focus." },
  { id: 4, title: "Meditate 10 min", category: "🧘 Meditation", xp: 40, done: true, difficulty: 1, desc: "Breathe. Clear the noise." },
  { id: 5, title: "Write 300 words", category: "✍️ Writing", xp: 60, done: false, difficulty: 2, desc: "Journal, blog, story — just write." },
  { id: 6, title: "Drink 2L water", category: "🥗 Health", xp: 30, done: false, difficulty: 1, desc: "Stay hydrated. Simple but powerful." },
  { id: 7, title: "Code for 1 hour", category: "💻 Coding", xp: 90, done: false, difficulty: 2, desc: "Build something. Anything." },
];

export default function QuestsPage() {
  const [quests, setQuests] = useState(ALL_QUESTS);
  const [flash, setFlash] = useState<number | null>(null);

  const toggle = (id: number) => {
    setQuests(q => q.map(x => x.id === id ? { ...x, done: !x.done } : x));
    const q = quests.find(x => x.id === id);
    if (!q?.done) { setFlash(id); setTimeout(() => setFlash(null), 800); }
  };

  const done = quests.filter(q => q.done).length;
  const totalXP = quests.filter(q => q.done).reduce((s, q) => s + q.xp, 0);

  return (
    <div style={{ padding: "32px", maxWidth: 900, margin: "0 auto" }}>
      <div style={{ marginBottom: 32 }}>
        <div className="badge badge-blue" style={{ marginBottom: 12 }}>⚔️ Daily Quests</div>
        <h1 style={{ fontFamily: "Outfit,sans-serif", fontWeight: 900, fontSize: "2.2rem", letterSpacing: "-0.03em", marginBottom: 8 }}>
          Today&apos;s Missions
        </h1>
        <p style={{ color: "var(--text-muted)" }}>{done}/{quests.length} complete · {totalXP} XP earned today</p>
      </div>

      {/* Progress bar */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Daily progress</span>
          <span style={{ fontSize: "0.8rem", color: "var(--blue)" }}>{Math.round((done/quests.length)*100)}%</span>
        </div>
        <div className="xp-bar" style={{ height: 10 }}>
          <div className="xp-bar-fill" style={{ width: `${(done/quests.length)*100}%` }} />
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {quests.map(q => (
          <div key={q.id} onClick={() => toggle(q.id)} className="card" style={{
            padding: "18px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: 16,
            background: flash === q.id ? "rgba(16,185,129,0.12)" : q.done ? "rgba(16,185,129,0.05)" : "var(--surface)",
            borderColor: q.done ? "rgba(16,185,129,0.2)" : "var(--border)",
            transition: "all 0.25s",
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: 9, flexShrink: 0,
              background: q.done ? "#10b981" : "transparent", border: q.done ? "none" : "2px solid var(--border)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", color: "white",
              transition: "all 0.3s", boxShadow: q.done ? "0 0 16px rgba(16,185,129,0.5)" : "none",
            }}>{q.done && "✓"}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: "0.95rem", textDecoration: q.done ? "line-through" : "none", color: q.done ? "var(--text-muted)" : "var(--text)" }}>{q.title}</div>
              <div style={{ color: "var(--text-faint)", fontSize: "0.78rem", marginTop: 3 }}>{q.desc}</div>
              <div style={{ marginTop: 6 }}><span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{q.category}</span></div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
              <span className="badge badge-blue">+{q.xp} XP</span>
              <span style={{ fontSize: "0.72rem" }}>{"⭐".repeat(q.difficulty)}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: 24, padding: "20px 24px", background: "linear-gradient(135deg, rgba(59,130,246,0.08), rgba(139,92,246,0.08))", textAlign: "center" }}>
        <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
          Complete all quests to earn <strong style={{ color: "#f59e0b" }}>Bonus XP</strong> and the <span className="badge badge-gold">Day Slayer</span> achievement
        </p>
      </div>
    </div>
  );
}
