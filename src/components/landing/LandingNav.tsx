"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const links = [
  { label: "Mission", href: "#mission" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how" },
  { label: "Community", href: "#community" },
];

export default function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(7,7,15,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
    >
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px", maxWidth: 1280, margin: "0 auto" }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 20px rgba(139,92,246,0.4)",
          }}>
            <span style={{ fontSize: 14, fontWeight: 900, color: "white", fontFamily: "Outfit, sans-serif" }}>N</span>
          </div>
          <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "1.1rem", color: "white", letterSpacing: "-0.02em" }}>
            NORTHSTAR
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex" style={{ gap: 4 }}>
          {links.map(l => (
            <a key={l.href} href={l.href} style={{
              padding: "8px 16px", borderRadius: 10, color: "var(--text-muted)",
              fontSize: "0.875rem", fontWeight: 500, textDecoration: "none",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--text)", e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)", e.currentTarget.style.background = "transparent")}
            >{l.label}</a>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <Link href="/login" style={{
            padding: "8px 18px", borderRadius: 10, color: "var(--text-muted)",
            fontSize: "0.875rem", fontWeight: 500, textDecoration: "none",
            transition: "color 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "white")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
          >Sign in</Link>
          <Link href="/signup" className="btn btn-primary" style={{ padding: "9px 20px", fontSize: "0.875rem" }}>
            Start Free
          </Link>
        </div>
      </div>
    </nav>
  );
}
