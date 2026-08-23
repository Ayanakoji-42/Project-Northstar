"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/hq",           icon: "🏠", label: "Headquarters" },
  { href: "/quests",       icon: "⚔️",  label: "Daily Quests" },
  { href: "/habits",       icon: "🔥", label: "Habits" },
  { href: "/goals",        icon: "🎯", label: "Goals" },
  { href: "/achievements", icon: "🏆", label: "Achievements" },
  { href: "/journal",      icon: "📓", label: "Journal" },
  { href: "/analytics",    icon: "📊", label: "Analytics" },
  { href: "/profile",      icon: "👤", label: "Profile" },
  { href: "/settings",     icon: "⚙️",  label: "Settings" },
];

// Mock user data
const USER = { name: "Alex", level: 7, title: "Strategist", xp: 3240, xpNext: 5000, streak: 12, avatar: "#8b5cf6" };

export default function AppSidebar() {
  const pathname = usePathname();
  const xpPct = (USER.xp / USER.xpNext) * 100;

  return (
    <aside style={{
      width: 240, flexShrink: 0, height: "100vh", position: "sticky", top: 0,
      background: "var(--surface)", borderRight: "1px solid var(--border)",
      display: "flex", flexDirection: "column", padding: "20px 12px", overflow: "auto",
    }}>
      {/* Logo */}
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", marginBottom: 28, padding: "0 6px" }}>
        <div style={{ width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg, #3b82f6, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 16px rgba(139,92,246,0.5)" }}>
          <span style={{ fontFamily: "Outfit,sans-serif", fontWeight: 900, fontSize: 13, color: "white" }}>N</span>
        </div>
        <span style={{ fontFamily: "Outfit,sans-serif", fontWeight: 800, fontSize: "0.95rem", color: "white" }}>NORTHSTAR</span>
      </Link>

      {/* User card */}
      <div style={{ background: "var(--surface-2)", borderRadius: 14, padding: "14px", marginBottom: 20, border: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div style={{ position: "relative" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: USER.avatar, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "white", fontSize: "0.9rem", boxShadow: `0 0 14px ${USER.avatar}60` }}>
              {USER.name[0]}
            </div>
            <div style={{ position: "absolute", bottom: -2, right: -2, width: 16, height: 16, borderRadius: "50%", background: "linear-gradient(135deg, #3b82f6, #8b5cf6)", border: "2px solid var(--surface-2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.5rem", fontWeight: 900, color: "white" }}>
              {USER.level}
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div 
             className="truncate"
             style={{ fontWeight: 600, fontSize: "0.875rem"}}
            ></div>
            <div style={{ color: "var(--purple)", fontSize: "0.72rem", fontWeight: 600 }}>{USER.title}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>🔥 {USER.streak}d</div>
          </div>
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
            <span style={{ fontSize: "0.65rem", color: "var(--text-faint)" }}>XP</span>
            <span style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>{USER.xp.toLocaleString()} / {USER.xpNext.toLocaleString()}</span>
          </div>
          <div className="xp-bar"><div className="xp-bar-fill" style={{ width: `${xpPct}%` }} /></div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
        {nav.map(item => (
          <Link key={item.href} href={item.href} className={`sidebar-link ${pathname === item.href || pathname.startsWith(item.href + "/") ? "active" : ""}`}>
            <span style={{ fontSize: "1rem", lineHeight: 1 }}>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Bottom */}
      <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--border)" }}>
        <Link href="/" className="sidebar-link" style={{ fontSize: "0.8rem" }}>
          <span>←</span> Back to site
        </Link>
      </div>
    </aside>
  );
}
