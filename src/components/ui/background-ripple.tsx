"use client";
import React, { useState } from "react";

interface BackgroundRippleProps {
   rows?: number;
   cols?: number;
   className?: string;
}

export function BackgroundRipple({
   rows = 20,
   cols = 30,
   className = "",
}: BackgroundRippleProps) {
   const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
   const [clickedBoxes, setClickedBoxes] = useState<Set<number>>(new Set());

   const handleBoxClick = (index: number) => {
      setClickedBoxes(prev => {
         const newSet = new Set(prev);
         if (newSet.has(index)) {
            newSet.delete(index);
         } else {
            newSet.add(index);
         }
         return newSet;
      });
   };

   return (
      <div
         className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      >
         <div
            className="grid h-full w-full pointer-events-auto"
            style={{
               gridTemplateColumns: `repeat(${cols}, 1fr)`,
               gridTemplateRows: `repeat(${rows}, 1fr)`,
            }}
         >
            {[...Array(rows * cols)].map((_, index) => {
               const isClicked = clickedBoxes.has(index);
               const isHovered = hoveredIndex === index;

               return (
                  <div
                     key={index}
                     className={`
                relative cursor-pointer transition-all duration-200 ease-out
                border border-white/5
                ${
                   isClicked
                      ? "bg-blue-500/20 border-blue-500/40"
                      : "bg-white/[0.01]"
                }
                ${isHovered ? "bg-blue-500/10 border-blue-500/30 scale-105" : ""}
              `}
                     onMouseEnter={() => setHoveredIndex(index)}
                     onMouseLeave={() => setHoveredIndex(null)}
                     onClick={() => handleBoxClick(index)}
                     style={{
                        backdropFilter:
                           isHovered || isClicked ? "blur(1px)" : "none",
                     }}
                  />
               );
            })}
         </div>
      </div>
   );
}
