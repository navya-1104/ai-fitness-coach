"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { formatPlanWithEmojis } from "@/lib/formatPlan";

type Props = {
  planText: string;
  lastInput: any;
  setPlan: (s: string | null) => void;
};

export default function PlanView({ planText, lastInput, setPlan }: Props) {
  const [quote, setQuote] = useState("");
  const [quoteLoading, setQuoteLoading] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  // Format plan (with emoji enhancement)
  const formatted = formatPlanWithEmojis(planText || "");

  // EXERCISE EXTRACTION (simple keyword detection)
  function extractExercises(md: string) {
    const lines = md.split("\n");
    const names = new Set<string>();

    for (const l of lines) {
      const t = l.trim().replace(/^-+\s*/, "");
      if (!t) continue;

      if (
        /squat|push|jump|plank|bridge|lunge|deadlift|press|row|crunch|dip|burpee|curl|mountain/i.test(
          t
        ) ||
        /\b(rep|reps|seconds|minutes)\b/i.test(t)
      ) {
        const clean = t.split(":")[0].split("(")[0].trim();
        const name = clean.split(" ").slice(0, 4).join(" ");
        if (name.length > 2) names.add(name);
      }
    }

    return Array.from(names).slice(0, 8);
  }

  // EXERCISE CARDS (beautiful gradients)
  const ExercisesGrid = () => {
    const exercises = extractExercises(planText || "");
    if (!exercises.length) return null;

    const gradients = [
      "linear-gradient(135deg,#a18cd1,#fbc2eb)",
      "linear-gradient(135deg,#a1c4fd,#c2e9fb)",
      "linear-gradient(135deg,#fbc2eb,#a6c1ee)",
      "linear-gradient(135deg,#fad0c4,#ffd1ff)",
      "linear-gradient(135deg,#d4fc79,#96e6a1)",
      "linear-gradient(135deg,#84fab0,#8fd3f4)",
      "linear-gradient(135deg,#fccb90,#d57eeb)",
      "linear-gradient(135deg,#fda085,#f6d365)",
    ];

    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))",
          gap: 14,
          marginTop: 18,
        }}
      >
        {exercises.map((name, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              padding: 14,
              borderRadius: 14,
              color: "#fff",
              fontWeight: 600,
              background: gradients[i % gradients.length],
              textShadow: "0 2px 6px rgba(0,0,0,0.25)",
              boxShadow: "0 8px 26px rgba(0,0,0,0.18)",
            }}
          >
            💪 {name}
          </motion.div>
        ))}
      </div>
    );
  };

  // TEXT TO SPEECH
  const playTTS = () => {
    if (!planText) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(planText);
    u.rate = 1;
    window.speechSynthesis.speak(u);
  };

  const stopTTS = () => window.speechSynthesis.cancel();

  // PDF EXPORT — FIXED & CLEAN
  const exportPDF = async () => {
    if (!rootRef.current) return;

    try {
      const originalHTML = rootRef.current.innerHTML;

      const printableHTML = `
        <div style="background:#fff; color:#000; padding:20px; font-size:16px; line-height:1.6;">
          ${formatted.replace(/color:[^;"]+;?/g, "")}
        </div>
      `;

      rootRef.current.innerHTML = printableHTML;

      const html2pdf = (await import("html2pdf.js")).default;

      await html2pdf()
        .from(rootRef.current)
        .set({
          margin: 10,
          filename: "fitness-plan.pdf",
          html2canvas: { scale: 2 },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        })
        .save();

      rootRef.current.innerHTML = originalHTML;
    } catch (e) {
      console.error(e);
      alert("PDF generation failed");
    }
  };

  // Save plan locally
  const saveLocal = () => {
    const saved = JSON.parse(localStorage.getItem("plans") || "[]");
    saved.unshift({
      id: Date.now(),
      createdAt: new Date().toISOString(),
      input: lastInput,
      plan: planText,
      quote,
    });
    localStorage.setItem("plans", JSON.stringify(saved));
    alert("Saved ✓");
  };

  // Regenerate plan
  const regenerate = async () => {
    if (!lastInput) return alert("No input to regenerate");
    setPlan(null);

    try {
      const r = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lastInput),
      });
      const d = await r.json();
      setPlan(d?.plan ?? "Error regenerating.");
    } catch {
      alert("Failed to regenerate");
    }
  };

  // Generate motivational quote
  const getQuote = async () => {
    setQuoteLoading(true);
    try {
      const r = await fetch("/api/quote", { method: "POST" });
      const d = await r.json();
      setQuote(d.quote);

      setTimeout(() => {
        const u = new SpeechSynthesisUtterance(d.quote);
        window.speechSynthesis.speak(u);
      }, 300);
    } catch {
      setQuote("Keep pushing — you are stronger than you think.");
    }
    setQuoteLoading(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
      {/* PLAN CONTENT */}
      <div
        ref={rootRef}
        className="plan-root"
        style={{
          padding: 16,
          borderRadius: 12,
          background: "var(--card)",
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: formatted }} />
      </div>

      {/* BUTTONS */}
      <div className="controls" style={{ marginTop: 16 }}>
        <button className="btn" onClick={playTTS}>Read My Plan</button>
        <button className="btn-ghost" onClick={stopTTS}>Stop</button>
        <button className="btn" onClick={exportPDF}>Export PDF</button>
        <button className="btn-ghost" onClick={saveLocal}>Save</button>
        <button className="btn-ghost" onClick={regenerate}>Regenerate</button>
        <button className="btn" onClick={getQuote} disabled={quoteLoading}>
          {quoteLoading ? "Loading..." : "Motivate Me"}
        </button>
      </div>

      {/* MOTIVATION TEXT */}
      {quote && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 17 }}>✨ Motivation</div>
          <div style={{ marginTop: 8, opacity: 0.9 }}>{quote}</div>
        </motion.div>
      )}

      {/* EXERCISE CARDS */}
      <ExercisesGrid />
    </motion.div>
  );
}
