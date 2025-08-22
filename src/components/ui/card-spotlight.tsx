"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function CardSpotlight({
   children,
   className,
   radius = 350,
}: {
   children: React.ReactNode;
   className?: string;
   radius?: number;
}) {
   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
   const [isHovering, setIsHovering] = useState(false);

   const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
      const { clientX, clientY } = event;
      const rect = event.currentTarget.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      setMousePosition({ x, y });
   };

   return (
      <div
         className={cn(
            "relative overflow-hidden rounded-xl border border-border bg-card p-6",
            className
         )}
         onMouseMove={handleMouseMove}
         onMouseEnter={() => setIsHovering(true)}
         onMouseLeave={() => setIsHovering(false)}
      >
         {isHovering && (
            <motion.div
               className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
               style={{
                  background: `radial-gradient(${radius}px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(76, 175, 80, 0.15), transparent 70%)`,
                  opacity: isHovering ? 1 : 0,
               }}
               initial={{ opacity: 0 }}
               animate={{ opacity: isHovering ? 1 : 0 }}
               transition={{ duration: 0.3 }}
            />
         )}
         <div className="relative z-10">{children}</div>
      </div>
   );
}
