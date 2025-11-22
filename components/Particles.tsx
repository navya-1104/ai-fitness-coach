"use client";
import React from "react";
import { motion } from "framer-motion";

const blobs = Array.from({ length: 7 }).map((_, i) => ({
  id: i,
  size: 100 + Math.floor(Math.random() * 220),
  left: Math.floor(Math.random() * 100),
  top: Math.floor(Math.random() * 100),
  delay: Math.random() * 4,
  hue: 200 + Math.floor(Math.random() * 140)
}));

export default function Particles() {
  return (
    <div aria-hidden className="particles-root" style={{
      position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden"
    }}>
      {blobs.map(b => (
        <motion.div
          key={b.id}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 0.18, y: [0, -30, 0] }}
          transition={{
            duration: 18 + Math.random() * 10,
            repeat: Infinity,
            repeatType: "reverse",
            delay: b.delay
          }}
          style={{
            position: "absolute",
            left: `${b.left}%`,
            top: `${b.top}%`,
            width: b.size,
            height: b.size,
            borderRadius: "50%",
            filter: "blur(40px)",
            background: `radial-gradient(circle at 30% 20%, hsla(${b.hue},90%,65%,0.9), hsla(${b.hue},80%,55%,0.3) 40%, transparent 60%)`,
            transform: "translateZ(0)"
          }}
        />
      ))}
    </div>
  );
}
