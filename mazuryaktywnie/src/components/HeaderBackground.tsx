"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function HeaderBackground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <div className="absolute inset-0 overflow-hidden z-[-1] pointer-events-none transition-colors duration-1000">
      {isDark ? (
        // NIGHT SCENE
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-black to-slate-900">
          {/* Stars */}
          {[...Array(40)].map((_, i) => {
            const size = Math.random() * 2.5 + 1;
            const isTwinkly = Math.random() > 0.7;
            return (
              <motion.div
                key={`star-${i}`}
                className={`absolute rounded-full ${Math.random() > 0.8 ? 'bg-blue-100' : Math.random() > 0.8 ? 'bg-yellow-100' : 'bg-white'}`}
                style={{
                  width: size + "px",
                  height: size + "px",
                  top: Math.random() * 100 + "%",
                  left: Math.random() * 100 + "%",
                  boxShadow: isTwinkly ? "0 0 4px rgba(255,255,255,0.8)" : "none"
                }}
                animate={{ opacity: [0.1, isTwinkly ? 1 : 0.7, 0.1] }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                }}
              />
            );
          })}
          {/* Moon */}
          <motion.div
            className="absolute top-2 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-10 w-12 h-12 bg-amber-50 rounded-full"
            animate={{ boxShadow: ["0 0 15px rgba(255,255,255,0.5)", "0 0 35px rgba(255,255,255,0.9)", "0 0 15px rgba(255,255,255,0.5)"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Moon craters */}
            <div className="absolute top-3 right-3 w-3 h-3 bg-black/10 rounded-full" />
            <div className="absolute bottom-3 left-2 w-2 h-2 bg-black/10 rounded-full" />
            <div className="absolute top-5 left-4 w-1.5 h-1.5 bg-black/10 rounded-full" />
          </motion.div>
          {/* Night Clouds */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`ncloud-${i}`}
              className="absolute w-24 h-6 bg-slate-700/30 rounded-full blur-md"
              style={{
                top: Math.random() * 60 + 20 + "%",
              }}
              initial={{ x: "-100%" }}
              animate={{ x: "200vw" }}
              transition={{
                duration: Math.random() * 20 + 30,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * -20,
              }}
            />
          ))}
        </div>
      ) : (
        // DAY SCENE
        <div className="absolute inset-0 bg-gradient-to-r from-white from-10% via-sky-200 to-blue-100">
          {/* Day Clouds */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`dcloud-${i}`}
              className="absolute w-32 h-10 bg-white/70 rounded-full blur-sm"
              style={{
                top: Math.random() * 60 + 10 + "%",
              }}
              initial={{ x: "-100%" }}
              animate={{ x: "150vw" }}
              transition={{
                duration: Math.random() * 15 + 25,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * -15,
              }}
            />
          ))}
          {/* Sun */}
          <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-20 w-16 h-16 bg-yellow-100/50 rounded-full blur-xl animate-pulse" />
        </div>
      )}
    </div>
  );
}
