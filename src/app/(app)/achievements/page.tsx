"use client";

const ALL_ACHIEVEMENTS = [
  { icon: "📚", title: "Bookworm", desc: "Read 25 books", progress: 25, total: 25, done: true, category: "Scholar", color: "#3b82f6" },
  { icon: "💪", title: "Iron Will", desc: "100 workout sessions", progress: 47, total: 100, done: false, category: "Athlete", color: "#10b981" },
  { icon: "🔥", title: "Week Warrior", desc: "7 day streak", progress: 7, total: 7, done: true, category: "Discipline", color: "#f59e0b" },
  { icon: "🌅", title: "Early Bird", desc: "Wake at 6AM for 30 days", progress: 5, total: 30, done: false, category: "Discipline", color: "#f59e0b" },
  { icon: "💻", title: "Code Monk", desc: "100 hours deep work coding", progress: 47, total: 100, done: false, category: "Builder", color: "#6366f1" },
  { icon: "🎯", title: "Quest Master", desc: "Complete 365 daily quests", progress: 182, total: 365, done: false, category: "Discipline", color: "#8b5cf6" },
  { icon: "🧘", title: "Inner Peace", desc: "30 meditation sessions", progress: 30, total: 30, done: true, category: "Health", color: "#8b5cf6" },
  { icon: "✍️", title: "Wordsmith", desc: "Write 100 journal entries", progress: 12, total: 100, done: false, category: "Scholar", color: "#ec4899" },
  { icon: "🏆", title: "First Legend", desc: "Reach Level 10", progress: 7, total: 10, done: false, category: "Milestone", color: "#f59e0b" },
  { icon: "🚀", title: "Builder", desc: "Complete a personal project", progress: 1, total: 1, done: true, category: "Builder", color: "#10b981" },
  { icon: "💰", title: "Money Monk", desc: "30 days finance tracking", progress: 8, total: 30, done: false, category: "Finance", color: "#10b981" },
  { icon: "🌍", title: "Polyglot", desc: "365 days language practice", progress: 120, total: 365, done: false, category: "Scholar", color: "#3b82f6" },
];

export default function AchievementsPage() {
  const unlocked = ALL_ACHIEVEMENTS.filter(a => a.done).length;

  return (
    <div style={{ padding: "32px", maxWidth: 1000, margin: "0 auto" }}>
      <div style={{ marginBottom: 32 }}>
        <div className="badge badge-gold" style={{ marginBottom: 12 }}>🏆 Achievements</div>
        <h1 style={{ fontFamily: "Outfit,sans-serif", fontWeight: 900, fontSize: "2.2rem", letterSpacing: "-0.03em", marginBottom: 8 }}>
          Your Legacy
        </h1>
        <p style={{ color: "var(--text-muted)" }}>{unlocked} of {ALL_ACHIEVEMENTS.length} unlocked — each one earned, never bought.</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 32 }}>
        <div className="card" style={{ padding: "18px", textAlign: "center" }}>
          <div style={{ fontFamily: "Outfit,sans-serif", fontWeight: 800, fontSize: "2rem" }} className="text-gradient-gold">{unlocked}</div>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: 4 }}>Unlocked</div>
        </div>
        <div className="card" style={{ padding: "18px", textAlign: "center" }}>
          <div style={{ fontFamily: "Outfit,sans-serif", fontWeight: 800, fontSize: "2rem", color: "var(--text-muted)" }}>{ALL_ACHIEVEMENTS.length - unlocked}</div>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: 4 }}>Remaining</div>
        </div>
        <div className="card" style={{ padding: "18px", textAlign: "center" }}>
          <div style={{ fontFamily: "Outfit,sans-serif", fontWeight: 800, fontSize: "2rem", color: "#f59e0b" }}>{Math.round((unlocked/ALL_ACHIEVEMENTS.length)*100)}%</div>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: 4 }}>Complete</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
        {ALL_ACHIEVEMENTS.map((a, i) => (
          <div key={i} className={`card ${a.done ? "card-glow-gold" : ""}`} style={{
            padding: "22px", textAlign: "center",
            filter: a.done ? "none" : "grayscale(0.5) opacity(0.5)",
            transition: "all 0.3s",
            background: a.done ? `linear-gradient(135deg, ${a.color}10, var(--surface))` : "var(--surface)",
          }}>
            <div style={{ fontSize: "2.5rem", marginBottom: 10, filter: a.done ? "none" : "grayscale(1)",
              textShadow: a.done ? `0 0 20px ${a.color}80` : "none" }}>{a.icon}</div>
            <h3 style={{ fontFamily: "Outfit,sans-serif", fontWeight: 700, fontSize: "0.9rem", marginBottom: 4, color: a.done ? a.color : "var(--text-muted)" }}>{a.title}</h3>
            <p style={{ fontSize: "0.75rem", color: "var(--text-faint)", marginBottom: 10 }}>{a.desc}</p>
            {!a.done && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: "0.62rem", color: "var(--text-faint)" }}>{a.progress}/{a.total}</span>
                </div>
                <div className="xp-bar" style={{ height: 4 }}>
                  <div className="xp-bar-fill" style={{ width: `${(a.progress/a.total)*100}%`, background: a.color }} />
                </div>
              </div>
            )}
            {a.done && <div style={{ fontSize: "0.7rem", color: "var(--gold)", fontWeight: 600 }}>✓ UNLOCKED</div>}
            <div style={{ marginTop: 8 }}><span className="badge" style={{ background: `${a.color}15`, color: a.color, fontSize: "0.6rem" }}>{a.category}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}
