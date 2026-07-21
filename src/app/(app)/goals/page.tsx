"use client";
import { useState } from "react";

const GOALS = [
  { id: 1, title: "Read 50 Books This Year", icon: "📚", category: "Books", progress: 28, total: 50, unit: "books", deadline: "Dec 31, 2025", xpReward: 2000, difficulty: "Hard", milestones: [{ label: "10 books", done: true }, { label: "25 books", done: true }, { label: "50 books", done: false }], tab: "yearly" },
  { id: 2, title: "Complete 100 Workouts", icon: "💪", category: "Fitness", progress: 47, total: 100, unit: "sessions", deadline: "Dec 31, 2025", xpReward: 3000, difficulty: "Epic", milestones: [{ label: "25 workouts", done: true }, { label: "50 workouts", done: false }, { label: "100 workouts", done: false }], tab: "yearly" },
  { id: 3, title: "Launch My Side Project", icon: "🚀", category: "Business", progress: 3, total: 5, unit: "milestones", deadline: "Sep 30, 2025", xpReward: 5000, difficulty: "Epic", milestones: [{ label: "Idea defined", done: true }, { label: "MVP built", done: true }, { label: "Beta users", done: true }, { label: "Launch", done: false }, { label: "First $100", done: false }], tab: "monthly" },
  { id: 4, title: "Master Spanish", icon: "🌍", category: "Languages", progress: 120, total: 365, unit: "days", deadline: "Dec 31, 2026", xpReward: 8000, difficulty: "Legendary", milestones: [{ label: "A1 Level", done: true }, { label: "A2 Level", done: false }, { label: "B1 Level", done: false }], tab: "lifetime" },
];

const TABS = ["all", "monthly", "yearly", "lifetime"] as const;

export default function GoalsPage() {
  const [tab, setTab] = useState<string>("all");
  const filtered = tab === "all" ? GOALS : GOALS.filter(g => g.tab === tab);

  const difficultyColor = (d: string) => ({
    Easy: "#10b981", Medium: "#3b82f6", Hard: "#8b5cf6", Epic: "#f59e0b", Legendary: "#ef4444"
  })[d] || "#3b82f6";

  return (
    <div style={{ padding: "32px", maxWidth: 900, margin: "0 auto" }}>
      <div style={{ marginBottom: 32 }}>
        <div className="badge badge-emerald" style={{ marginBottom: 12 }}>🎯 Goals</div>
        <h1 style={{ fontFamily: "Outfit,sans-serif", fontWeight: 900, fontSize: "2.2rem", letterSpacing: "-0.03em", marginBottom: 8 }}>Your Vision</h1>
        <p style={{ color: "var(--text-muted)" }}>Short-term tasks to lifetime dreams. Every goal earns XP.</p>
      </div>

      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 28, flexWrap: "wrap" }}>
        <div className="tab-bar" style={{ width: "auto" }}>
          {TABS.map(t => (
            <button key={t} className={`tab-item ${tab === t ? "active" : ""}`} onClick={() => setTab(t)} style={{ textTransform: "capitalize" }}>{t}</button>
          ))}
        </div>
        <button className="btn btn-primary" style={{ padding: "9px 18px", fontSize: "0.85rem", marginLeft: "auto" }}>+ Add Goal</button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {filtered.map(g => {
          const pct = Math.round((g.progress / g.total) * 100);
          return (
            <div key={g.id} className="card" style={{ padding: "24px" }}>
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 18 }}>
                <div style={{ fontSize: "2rem", flexShrink: 0 }}>{g.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 4 }}>
                    <h3 style={{ fontFamily: "Outfit,sans-serif", fontWeight: 700, fontSize: "1.05rem" }}>{g.title}</h3>
                    <span className="badge" style={{ background: `${difficultyColor(g.difficulty)}18`, color: difficultyColor(g.difficulty), fontSize: "0.65rem" }}>{g.difficulty}</span>
                  </div>
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                    <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>📅 {g.deadline}</span>
                    <span style={{ fontSize: "0.78rem", color: "var(--gold)" }}>+{g.xpReward.toLocaleString()} XP on completion</span>
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontFamily: "Outfit,sans-serif", fontWeight: 800, fontSize: "1.5rem" }} className="text-gradient">{pct}%</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{g.progress}/{g.total} {g.unit}</div>
                </div>
              </div>
              <div className="xp-bar" style={{ height: 8, marginBottom: 16 }}>
                <div className="xp-bar-fill" style={{ width: `${pct}%` }} />
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {g.milestones.map((m, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 100,
                    background: m.done ? "rgba(16,185,129,0.12)" : "var(--surface-2)",
                    border: `1px solid ${m.done ? "rgba(16,185,129,0.3)" : "var(--border)"}` }}>
                    <span style={{ fontSize: "0.7rem" }}>{m.done ? "✓" : "○"}</span>
                    <span style={{ fontSize: "0.75rem", color: m.done ? "var(--emerald)" : "var(--text-muted)" }}>{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
