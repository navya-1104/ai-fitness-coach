"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function UserForm({ onStart, onResult }: { onStart: (i: any) => void; onResult: (s: string) => void; }) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "Female",
    height: "",
    weight: "",
    goal: "Weight Loss",
    level: "Beginner",
    location: "Home",
    dietPref: "Veg",
    extras: "",
  });
  const [loading, setLoading] = useState(false);

  const handle = (e: any) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    onStart(form);
    setLoading(true);
    try {
      const res = await fetch("/api/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await res.json();
      if (data?.plan) onResult(data.plan);
      else onResult(JSON.stringify(data));
    } catch (err: any) {
      onResult("Error: " + (err?.message || String(err)));
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.36 }} onSubmit={submit} className="col">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div className="field">
          <label className="label">Name</label>
          <input name="name" className="input" value={form.name} onChange={handle} placeholder="Your name" />
        </div>

        <div className="field">
          <label className="label">Age</label>
          <input name="age" type="number" className="input" value={form.age} onChange={handle} placeholder="Age" />
        </div>

        <div className="field">
          <label className="label">Gender</label>
          <select name="gender" className="select" value={form.gender} onChange={handle}>
            <option>Female</option>
            <option>Male</option>
            <option>Other</option>
          </select>
        </div>

        <div className="field">
          <label className="label">Height (cm)</label>
          <input name="height" type="number" className="input" value={form.height} onChange={handle} placeholder="e.g., 170" />
        </div>

        <div className="field">
          <label className="label">Weight (kg)</label>
          <input name="weight" type="number" className="input" value={form.weight} onChange={handle} placeholder="e.g., 65" />
        </div>

        <div className="field">
          <label className="label">Fitness Goal</label>
          <select name="goal" className="select" value={form.goal} onChange={handle}>
            <option>Weight Loss</option>
            <option>Muscle Gain</option>
            <option>Maintain</option>
          </select>
        </div>

        <div className="field">
          <label className="label">Fitness Level</label>
          <select name="level" className="select" value={form.level} onChange={handle}>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>

        <div className="field">
          <label className="label">Workout Location</label>
          <select name="location" className="select" value={form.location} onChange={handle}>
            <option>Home</option>
            <option>Gym</option>
            <option>Outdoor</option>
          </select>
        </div>

        <div className="field">
          <label className="label">Diet Preference</label>
          <select name="dietPref" className="select" value={form.dietPref} onChange={handle}>
            <option>Veg</option>
            <option>Non-Veg</option>
            <option>Vegan</option>
            <option>Keto</option>
          </select>
        </div>
      </div>

      <div className="field">
        <label className="label">Optional notes (medical history, equipment)</label>
        <textarea name="extras" className="textarea" value={form.extras} onChange={handle} placeholder="Allergies, equipment, medical history..." />
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
        <button className="btn" type="submit" disabled={loading}>{loading ? "Generating..." : "Generate Plan"}</button>
        <button type="button" className="btn-ghost" onClick={() => setForm({ name: "", age: "", gender: "Female", height: "", weight: "", goal: "Weight Loss", level: "Beginner", location: "Home", dietPref: "Veg", extras: "" })}>Reset</button>
      </div>
    </motion.form>
  );
}
