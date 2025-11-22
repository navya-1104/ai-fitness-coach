"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Sidebar({ onOpenHistory }: { onOpenHistory?: () => void }) {
  const [open, setOpen] = useState(true);

  return (
    <motion.aside
      initial={{ width: open ? 260 : 64 }}
      animate={{ width: open ? 260 : 64 }}
      transition={{ duration: 0.28 }}
      style={{
        height: "100vh",
        position: "fixed",
        left: 18,
        top: 18,
        borderRadius: 14,
        padding: 12,
        zIndex: 40,
        boxShadow: "0 10px 40px rgba(6,8,20,0.6)",
        background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
        border: "1px solid rgba(255,255,255,0.04)",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        overflow: "hidden",
        backdropFilter: "blur(10px)"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 42, height: 42, borderRadius: 10, background: "linear-gradient(90deg,#7b2fff,#2f6bff)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700 }}>
          AI
        </div>
        {open && <div style={{ fontWeight: 700 }}>AI Fitness</div>}
        <div style={{ marginLeft: "auto" }}>
          <button onClick={() => setOpen(o => !o)} className="btn-ghost" style={{ padding: 6 }}>
            {open ? "«" : "»"}
          </button>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
        <button className="btn-ghost" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          {open ? "Home" : "H"}
        </button>
        <button className="btn-ghost" onClick={() => document.querySelector(".card")?.scrollIntoView({ behavior: "smooth" })}>
          {open ? "Generate Plan" : "G"}
        </button>
        <button className="btn-ghost" onClick={() => onOpenHistory && onOpenHistory()}>
          {open ? "History" : "⏳"}
        </button>
        <button className="btn-ghost" onClick={() => alert("Settings placeholder")}>
          {open ? "Settings" : "⚙"}
        </button>
      </div>

      <div style={{ marginTop: "auto", fontSize: 12, color: "var(--muted)" }}>
        {open && <div>v1.0 • Built with ❤️</div>}
      </div>
    </motion.aside>
  );
}
