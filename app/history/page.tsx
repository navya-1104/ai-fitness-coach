"use client";

import { useEffect, useState } from "react";

export default function HistoryPage() {
  const [plans, setPlans] = useState<any[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("plans") || "[]");
    setPlans(saved);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 20 }}>
        📜 History
      </h1>

      {plans.length === 0 && (
        <div style={{ opacity: 0.7 }}>No saved plans yet.</div>
      )}

      {plans.map((p) => (
        <div
          key={p.id}
          style={{
            padding: 14,
            marginBottom: 16,
            borderRadius: 10,
            background: "var(--card)",
            boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
          }}
        >
          <div style={{ fontWeight: 600 }}>{p.input?.name}</div>
          <div style={{ fontSize: 13, opacity: 0.7 }}>
            {new Date(p.createdAt).toLocaleString()}
          </div>

          <pre
            style={{
              whiteSpace: "pre-wrap",
              marginTop: 10,
              fontSize: 14,
              opacity: 0.9,
            }}
          >
            {p.plan}
          </pre>
        </div>
      ))}
    </div>
  );
}
