"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import UserForm from "@/components/UserForm";
import PlanView from "@/components/PlanView";

/**
 * Page layout: vertical. Theme toggle here controls [data-theme] on <html>.
 * Light L2 is a bright gradient which is set when data-theme="light".
 */

export default function Home() {
  const [plan, setPlan] = useState<string | null>(null);
  const [lastInput, setLastInput] = useState<any>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = (localStorage.getItem("theme") as "dark" | "light") || "dark";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  return (
    <>
      <header className="header">
        <div className="brand">
          <div className="logo">AI</div>
          <div>
            <div className="title">AI Fitness Coach</div>
            <div className="subtitle">Personalized plans · TTS · PDF · Save</div>
          </div>
        </div>

        <div className="row">
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="main-vertical"
      >
        {/* FORM (top) */}
        <section className="card">
          <UserForm
            onStart={(input) => {
              setPlan(null);
              setLastInput(input);
            }}
            onResult={(text) => setPlan(text)}
          />
        </section>

        {/* PLAN (below the form) */}
        <section className="card">
          {plan ? (
            <PlanView planText={plan} lastInput={lastInput} setPlan={setPlan} />
          ) : (
            <div className="col">
              <div style={{ fontWeight: 700, fontSize: 18 }}>Your plan will appear here</div>
              <div className="small-muted">After you generate a plan, it shows up right below the form. Export it, read it aloud, save to history, or regenerate anytime.</div>
            </div>
          )}
        </section>
      </motion.div>
    </>
  );
}
