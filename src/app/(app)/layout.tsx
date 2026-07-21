import AppSidebar from "@/components/layout/AppSidebar";
import type { Metadata } from "next";

export const metadata: Metadata = { title: { template: "%s | NORTHSTAR HQ", default: "HQ | NORTHSTAR" } };

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>
      <AppSidebar />
      <main style={{ flex: 1, overflow: "auto", minWidth: 0 }}>
        {children}
      </main>
    </div>
  );
}
