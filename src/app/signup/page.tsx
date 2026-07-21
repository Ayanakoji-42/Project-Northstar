"use client";
import { useState } from "react";
import Link from "next/link";

const CATEGORIES = [
  { id: "fitness", icon: "💪", label: "Fitness" },
  { id: "books", icon: "📚", label: "Reading" },
  { id: "coding", icon: "💻", label: "Coding" },
  { id: "deepwork", icon: "🧠", label: "Deep Work" },
  { id: "meditation", icon: "🧘", label: "Meditation" },
  { id: "business", icon: "💼", label: "Business" },
  { id: "writing", icon: "✍️", label: "Writing" },
  { id: "language", icon: "🌍", label: "Languages" },
  { id: "finance", icon: "💰", label: "Finance" },
  { id: "creativity", icon: "🎨", label: "Creativity" },
  { id: "health", icon: "🥗", label: "Health" },
  { id: "sleep", icon: "🌙", label: "Sleep" },
];

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const toggleCat = (id: string) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  const finish = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setDone(true);
    await new Promise(r => setTimeout(r, 1800));
    window.location.href = "/hq";
  };

  const steps = ["Account", "Your Path", "Welcome"];

  if (done) return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
      <div className="animate-scale-in" style={{ textAlign: "center" }}>
        <div style={{ fontSize: "5rem", marginBottom: 20, animation: "float 2s ease-in-out infinite" }}>⭐</div>
        <h1 style={{ fontFamily: "Outfit,sans-serif", fontWeight: 900, fontSize: "2.5rem", marginBottom: 12 }}>Your legend begins.</h1>
        <p style={{ color: "var(--text-muted)" }}>Entering your Headquarters...</p>
        <div style={{ width: 200, margin: "24px auto 0" }}>
          <div className="xp-bar"><div className="xp-bar-fill animate-shimmer" style={{ width: "100%" }} /></div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", position: "relative", overflow: "hidden" }}>
      <div className="orb orb-blue animate-float-slow" style={{ width: 500, height: 500, top: "-15%", left: "-10%", opacity: 0.4 }} />
      <div className="orb orb-purple animate-float" style={{ width: 400, height: 400, bottom: "-15%", right: "-5%", opacity: 0.4 }} />

      <div style={{ width: "100%", maxWidth: step === 2 ? 580 : 440, position: "relative", zIndex: 1 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", marginBottom: 28 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #3b82f6, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "Outfit,sans-serif", fontWeight: 900, fontSize: 14, color: "white" }}>N</span>
            </div>
            <span style={{ fontFamily: "Outfit,sans-serif", fontWeight: 800, fontSize: "1rem", color: "white" }}>NORTHSTAR</span>
          </Link>

          {/* Step indicators */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 24 }}>
            {steps.map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: i + 1 <= step ? "linear-gradient(135deg, #3b82f6, #8b5cf6)" : "var(--surface-3)", border: i + 1 <= step ? "none" : "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 700, color: "white", transition: "all 0.3s" }}>
                    {i + 1 < step ? "✓" : i + 1}
                  </div>
                  <span style={{ fontSize: "0.75rem", color: i + 1 === step ? "var(--text)" : "var(--text-faint)", display: step === 1 && i === 0 ? "inline" : step === 2 && i === 1 ? "inline" : "none" }}>{s}</span>
                </div>
                {i < steps.length - 1 && <div style={{ width: 24, height: 1, background: i + 1 < step ? "var(--blue)" : "var(--border)", transition: "background 0.3s" }} />}
              </div>
            ))}
          </div>
        </div>

        <div className="glass" style={{ borderRadius: 24, padding: "36px 32px" }}>
          {step === 1 && (
            <>
              <h2 style={{ fontFamily: "Outfit,sans-serif", fontWeight: 800, fontSize: "1.6rem", marginBottom: 6 }}>Create your account</h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: 28 }}>It&apos;s free. It always will be.</p>

              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                <button onClick={() => { setStep(2); }} className="btn btn-secondary" style={{ width: "100%", justifyContent: "center", padding: "13px", borderRadius: 12 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                  Sign up with Google
                </button>
                <button onClick={() => { setStep(2); }} className="btn btn-secondary" style={{ width: "100%", justifyContent: "center", padding: "13px", borderRadius: 12 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                  Sign up with GitHub
                </button>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div className="divider" /><span style={{ color: "var(--text-faint)", fontSize: "0.78rem", whiteSpace: "nowrap" }}>or with email</span><div className="divider" />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <input className="input" type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} />
                <input className="input" type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} />
                <input className="input" type="password" placeholder="Password (min 8 chars)" value={password} onChange={e => setPassword(e.target.value)} />
                <button id="signup-next" className="btn btn-primary" style={{ width: "100%", padding: "14px", borderRadius: 12, fontSize: "0.95rem" }} onClick={() => name && email && password.length >= 6 && setStep(2)}>
                  Continue →
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 style={{ fontFamily: "Outfit,sans-serif", fontWeight: 800, fontSize: "1.6rem", marginBottom: 6 }}>Choose your path</h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: 24 }}>Select the areas where you want to level up. Pick as many as you like — you can change this anytime.</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 28 }}>
                {CATEGORIES.map(c => (
                  <button key={c.id} onClick={() => toggleCat(c.id)} style={{
                    padding: "14px 10px", borderRadius: 12, border: selected.includes(c.id) ? "2px solid var(--blue)" : "1px solid var(--border)",
                    background: selected.includes(c.id) ? "var(--blue-dim)" : "var(--surface-2)",
                    color: selected.includes(c.id) ? "var(--text)" : "var(--text-muted)",
                    cursor: "pointer", transition: "all 0.2s", display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                    boxShadow: selected.includes(c.id) ? "0 0 20px var(--blue-glow)" : "none",
                  }}>
                    <span style={{ fontSize: "1.4rem" }}>{c.icon}</span>
                    <span style={{ fontSize: "0.75rem", fontWeight: 600 }}>{c.label}</span>
                  </button>
                ))}
              </div>
              <button id="signup-finish" className="btn btn-primary" style={{ width: "100%", padding: "14px", borderRadius: 12, fontSize: "0.95rem" }} onClick={finish} disabled={loading}>
                {loading ? "Setting up your HQ..." : `Build My Legend ⚡ (${selected.length} selected)`}
              </button>
            </>
          )}
        </div>

        {step === 1 && (
          <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.875rem", marginTop: 20 }}>
            Already have an account? <Link href="/login" style={{ color: "var(--blue)", textDecoration: "none", fontWeight: 600 }}>Sign in</Link>
          </p>
        )}
      </div>
    </div>
  );
}
