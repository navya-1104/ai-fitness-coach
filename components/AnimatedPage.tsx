"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AnimatedPage({ children, show = true }: { children: React.ReactNode; show?: boolean }) {
  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          key="page"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.42 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
