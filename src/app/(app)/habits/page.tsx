"use client";
import { useState } from "react";

const HABITS = [
  { id: 1, icon: "📚", name: "Read daily", category: "Books", streak: 28, best: 45, done: true, color: "#3b82f6", xp: 30 },
  { id: 2, icon: "💪", name: "Workout", category: "Fitness", streak: 12, best: 30, done: true, color: "#10b981", xp: 50 },
  { id: 3, icon: "🧘", name: "Meditate", category: "Meditation", streak: 7, best: 14, done: false, color: "#8b5cf6", xp: 25 },
  { id: 4, icon: "🌅", name: "Wake at 6AM", category: "Health", streak: 5, best: 21, done: false, color: "#f59e0b", xp: 35 },
  { id: 5, icon: "💻", name: "Code daily", category: "Coding", streak: 31, best: 31, done: true, color: "#6366f1", xp: 60 },
  { id: 6, icon: "✍️", name: "Journal", category: "Writing", streak: 4, best: 10, done: false, color: "#ec4899", xp: 20 },
];

function buildWeekData() {
  const days = ["M","T","W","T","F","S","S"];
  return days.map((d, i) => ({ day: d, done: i < 5 ? Math.random() > 0.3 : false }));
}

export default function HabitsPage() {
  const [habits, setHabits] = useState(HABITS.map(h => ({ ...h, week: buildWeekData() })));
  const [view, setView] = useState<"grid"|"list">("list");

  const toggle = (id: number) => setHabits(prev => prev.map(h => h.id === id ? { ...h, done: !h.done } : h));

  return (
    <div style={{ padding: "32px", maxWidth: 900, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
        <div>
          <div className="badge badge-gold" style={{ marginBottom: 12 }}>🔥 Habits</div>
          <h1 style={{ fontFamily: "Outfit,sans-serif", fontWeight: 900, fontSize: "2.2rem", letterSpacing: "-0.03em", marginBottom: 8 }}>Daily Rituals</h1>
          <p style={{ color: "var(--text-muted)" }}>Build systems, not goals. Show up every day.</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <div className="tab-bar" style={{ width: "auto" }}>
            <button className={`tab-item ${view === "list" ? "active" : ""}`} onClick={() => setView("list")}>List</button>
            <button className={`tab-item ${view === "grid" ? "active" : ""}`} onClick={() => setView("grid")}>Grid</button>
          </div>
          <button className="btn btn-primary" style={{ padding: "8px 16px", fontSize: "0.85rem" }}>+ Add Habit</button>
        </div>
      </div>

      {/* Summary row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 28 }}>
        {[
          { label: "Active Habits", value: habits.length, color: "#3b82f6" },
          { label: "Done Today", value: habits.filter(h => h.done).length, color: "#10b981" },
          { label: "Longest Streak", value: `${Math.max(...habits.map(h => h.best))}d`, color: "#f59e0b" },
        ].map((s, i) => (
          <div key={i} className="card" style={{ padding: "18px", textAlign: "center" }}>
            <div style={{ fontFamily: "Outfit,sans-serif", fontWeight: 800, fontSize: "1.8rem", color: s.color }}>{s.value}</div>
            <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {habits.map(h => (
          <div key={h.id} className="card" style={{ padding: "18px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: `${h.color}20`, border: `1px solid ${h.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", flexShrink: 0 }}>{h.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span style={{ fontWeight: 600, fontSize: "0.95rem" }}>{h.name}</span>
                  <span className="badge" style={{ background: `${h.color}18`, color: h.color, fontSize: "0.65rem" }}>{h.category}</span>
                </div>
                {/* Week dots */}
                <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                  {h.week.map((d, i) => (
                    <div key={i} data-tooltip={d.day} style={{ width: 18, height: 18, borderRadius: 5, background: d.done ? h.color : "var(--surface-3)", opacity: d.done ? 1 : 0.4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.5rem", color: "white" }}>{d.day}</div>
                  ))}
                  <span style={{ marginLeft: 6, fontSize: "0.7rem", color: "var(--text-faint)" }}>This week</span>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "Outfit,sans-serif", fontWeight: 800, fontSize: "1.3rem", color: "#f59e0b" }}>🔥{h.streak}</div>
                  <div style={{ fontSize: "0.62rem", color: "var(--text-faint)" }}>streak</div>
                </div>
                <button onClick={() => toggle(h.id)} style={{
                  width: 36, height: 36, borderRadius: 10, cursor: "pointer", border: "none", transition: "all 0.3s",
                  background: h.done ? "#10b981" : "var(--surface-3)", color: "white", fontSize: "1rem",
                  boxShadow: h.done ? "0 0 16px rgba(16,185,129,0.5)" : "none",
                }}>{h.done ? "✓" : "○"}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
