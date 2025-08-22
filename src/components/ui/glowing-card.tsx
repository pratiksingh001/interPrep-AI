"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function GlowingCard({
   children,
   className,
   glowColor = "rgba(76, 175, 80, 0.5)",
}: {
   children: React.ReactNode;
   className?: string;
   glowColor?: string;
}) {
   return (
      <motion.div
         className={cn(
            "relative rounded-xl border border-gray-800 bg-gray-900/50 p-6 overflow-hidden",
            className
         )}
         whileHover={{ scale: 1.02 }}
         transition={{ duration: 0.3 }}
      >
         <div
            className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 blur-xl"
            style={{
               background: `radial-gradient(circle at 50% 50%, ${glowColor}, transparent 70%)`,
            }}
         />
         <div className="relative z-10">{children}</div>
      </motion.div>
   );
}
