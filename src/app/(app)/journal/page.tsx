"use client";
import { useState } from "react";

const PROMPTS = [
  "What was the most valuable thing you did today?",
  "What held you back, and why?",
  "What are you grateful for right now?",
  "What do you want to accomplish tomorrow?",
  "How are you feeling on a scale of 1-10 and why?",
];

const MOODS = [
  { emoji: "😤", label: "Focused", color: "#3b82f6" },
  { emoji: "😊", label: "Happy", color: "#10b981" },
  { emoji: "😐", label: "Neutral", color: "#8888aa" },
  { emoji: "😔", label: "Low", color: "#8b5cf6" },
  { emoji: "🔥", label: "Motivated", color: "#f59e0b" },
];

const ENTRIES = [
  { date: "Today", title: "Day 12 — On focus and distractions", mood: "🔥", preview: "Today I managed to get 3 hours of deep work done without checking my phone once. The key was..." },
  { date: "Yesterday", title: "Reflecting on the week", mood: "😊", preview: "It's been a solid week. Finished 2 chapters, hit every workout, and finally pushed the side project..." },
  { date: "3 days ago", title: "Struggling with consistency", mood: "😐", preview: "Missed meditation this morning. Not beating myself up — just noting it and moving forward..." },
];

export default function JournalPage() {
  const [mode, setMode] = useState<"list"|"write">("list");
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [mood, setMood] = useState<number | null>(null);
  const [prompt, setPrompt] = useState(PROMPTS[Math.floor(Math.random() * PROMPTS.length)]);

  return (
    <div style={{ padding: "32px", maxWidth: 860, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
        <div>
          <div className="badge badge-purple" style={{ marginBottom: 12 }}>📓 Journal</div>
          <h1 style={{ fontFamily: "Outfit,sans-serif", fontWeight: 900, fontSize: "2.2rem", letterSpacing: "-0.03em", marginBottom: 8 }}>Private Journal</h1>
          <p style={{ color: "var(--text-muted)" }}>Your thoughts. Your story. Only yours.</p>
        </div>
        <button className="btn btn-primary" style={{ padding: "10px 22px" }} onClick={() => setMode(mode === "list" ? "write" : "list")}>
          {mode === "list" ? "+ New Entry" : "← All Entries"}
        </button>
      </div>

      {mode === "list" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {ENTRIES.map((e, i) => (
            <div key={i} className="card" style={{ padding: "22px 24px", cursor: "pointer" }} onClick={() => setMode("write")}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ fontSize: "1.8rem", flexShrink: 0 }}>{e.mood}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 6 }}>
                    <h3 style={{ fontFamily: "Outfit,sans-serif", fontWeight: 600, fontSize: "1rem" }}>{e.title}</h3>
                  </div>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.6 }}>{e.preview}</p>
                </div>
                <span style={{ fontSize: "0.75rem", color: "var(--text-faint)", flexShrink: 0 }}>{e.date}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card" style={{ padding: "28px 32px" }}>
          {/* Mood picker */}
          <div style={{ marginBottom: 24 }}>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: 12 }}>How are you feeling?</p>
            <div style={{ display: "flex", gap: 10 }}>
              {MOODS.map((m, i) => (
                <button key={i} onClick={() => setMood(i)} style={{
                  padding: "8px 14px", borderRadius: 10, border: `2px solid ${mood === i ? m.color : "var(--border)"}`,
                  background: mood === i ? `${m.color}20` : "var(--surface-2)", cursor: "pointer",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 4, transition: "all 0.2s",
                }}>
                  <span style={{ fontSize: "1.3rem" }}>{m.emoji}</span>
                  <span style={{ fontSize: "0.65rem", color: mood === i ? m.color : "var(--text-faint)" }}>{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Prompt */}
          <div style={{ marginBottom: 20, padding: "14px 18px", background: "rgba(139,92,246,0.08)", borderRadius: 12, border: "1px solid rgba(139,92,246,0.2)", display: "flex", gap: 10, alignItems: "center" }}>
            <span style={{ fontSize: "1rem" }}>💡</span>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", flex: 1, fontStyle: "italic" }}>{prompt}</p>
            <button onClick={() => setPrompt(PROMPTS[Math.floor(Math.random() * PROMPTS.length)])} style={{ background: "none", border: "none", color: "var(--purple)", cursor: "pointer", fontSize: "0.8rem" }}>↻</button>
          </div>

          <input className="input" placeholder="Entry title..." value={title} onChange={e => setTitle(e.target.value)} style={{ marginBottom: 14, fontSize: "1rem", fontWeight: 600, fontFamily: "Outfit,sans-serif" }} />
          <textarea className="input" placeholder="Write your thoughts..." value={content} onChange={e => setContent(e.target.value)}
            style={{ minHeight: 280, resize: "vertical", lineHeight: 1.8, fontSize: "0.9rem", marginBottom: 18 }} />

          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button className="btn btn-secondary" onClick={() => setMode("list")}>Cancel</button>
            <button className="btn btn-primary" onClick={() => setMode("list")}>Save Entry 📓</button>
          </div>
        </div>
      )}
    </div>
  );
}
