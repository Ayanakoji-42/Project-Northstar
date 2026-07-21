"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ParticleField from "./ParticleField";

const words = ["LEGEND.", "STORY.", "EMPIRE.", "FUTURE."];

export default function HeroSection() {
  const [wordIdx, setWordIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const mouseRef = useRef({ x: 0, y: 0 });
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setWordIdx(i => (i + 1) % words.length); setVisible(true); }, 400);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(139,92,246,0.12) 0%, transparent 70%)`;
      }
    };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      <ParticleField />

      {/* Mouse glow */}
      <div ref={glowRef} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1, transition: "background 0.1s" }} />

      {/* Background orbs */}
      <div className="orb orb-purple animate-float-slow" style={{ width: 600, height: 600, top: "-20%", left: "60%", zIndex: 1 }} />
      <div className="orb orb-blue animate-float" style={{ width: 400, height: 400, top: "40%", left: "-10%", zIndex: 1, animationDelay: "-3s" }} />
      <div className="orb orb-gold animate-float-slow" style={{ width: 300, height: 300, bottom: "10%", right: "20%", zIndex: 1, animationDelay: "-6s" }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 24px", maxWidth: 1100, margin: "0 auto" }}>
        {/* Eyebrow */}
        <div className="animate-slide-up" style={{ animationDelay: "0.1s", marginBottom: 32, display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.3)", borderRadius: 100, padding: "8px 20px" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#8b5cf6", display: "inline-block", boxShadow: "0 0 8px #8b5cf6" }} />
          <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#8b5cf6", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            The RPG for Real Life
          </span>
        </div>

        {/* Main heading */}
        <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <h1 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, lineHeight: 1.0, letterSpacing: "-0.04em", marginBottom: 0 }}>
            <div style={{ fontSize: "clamp(4rem, 13vw, 11rem)", color: "white", display: "block" }}>BUILD</div>
            <div style={{ fontSize: "clamp(4rem, 13vw, 11rem)", color: "white", display: "block" }}>YOUR</div>
            <div style={{ fontSize: "clamp(4rem, 13vw, 11rem)", display: "block",
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6, #10b981)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              backgroundSize: "200%", animation: "gradient-shift 4s ease infinite",
              transition: "opacity 0.4s", opacity: visible ? 1 : 0 }}>
              OWN {words[wordIdx]}
            </div>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="animate-slide-up" style={{ animationDelay: "0.4s", fontSize: "clamp(1rem, 2.5vw, 1.3rem)", color: "var(--text-muted)",
          maxWidth: 580, margin: "28px auto 0", lineHeight: 1.6, fontWeight: 400 }}>
          Life isn&apos;t meant to be watched. It&apos;s meant to be played.
          <br />
          <span style={{ color: "var(--text-faint)" }}>Don&apos;t follow someone else&apos;s journey — build your own.</span>
        </p>

        {/* CTAs */}
        <div className="animate-slide-up" style={{ animationDelay: "0.6s", display: "flex", gap: 14, justifyContent: "center", marginTop: 44, flexWrap: "wrap" }}>
          <Link href="/signup" className="btn btn-primary" style={{ fontSize: "1rem", padding: "14px 32px", borderRadius: 14 }}>
            <span>⚡</span> Start Your Journey
          </Link>
          <a href="#features" className="btn btn-secondary" style={{ fontSize: "1rem", padding: "14px 32px", borderRadius: 14 }}>
            Explore Features →
          </a>
        </div>

        {/* Social proof */}
        <div className="animate-slide-up" style={{ animationDelay: "0.8s", marginTop: 56, display: "flex", alignItems: "center", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: -8 }}>
            {["#3b82f6","#8b5cf6","#10b981","#f59e0b","#6366f1"].map((c, i) => (
              <div key={i} style={{ width: 34, height: 34, borderRadius: "50%", background: c,
                border: "2px solid var(--bg)", marginLeft: i === 0 ? 0 : -10,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.75rem", fontWeight: 700, color: "white" }}>
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            Join <strong style={{ color: "white" }}>10,000+</strong> builders on their journey
          </p>
        </div>

        {/* Scroll indicator */}
        <div style={{ marginTop: 80, display: "flex", justifyContent: "center" }}>
          <div className="animate-float" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: "var(--text-faint)", fontSize: "0.75rem" }}>
            <span>Scroll to explore</span>
            <div style={{ width: 1, height: 50, background: "linear-gradient(to bottom, var(--text-faint), transparent)" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
