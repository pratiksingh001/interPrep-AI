"use client";
import React from "react";
import { motion } from "framer-motion";

export function FloatingParticles() {
   const particles = Array.from({ length: 6 }, (_, i) => i);

   return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         {particles.map(i => (
            <motion.div
               key={i}
               className="absolute w-1 h-1 bg-primary/30 rounded-full"
               initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
               }}
               animate={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
               }}
               transition={{
                  duration: Math.random() * 10 + 20,
                  repeat: Infinity,
                  ease: "linear",
               }}
            />
         ))}
      </div>
   );
}
