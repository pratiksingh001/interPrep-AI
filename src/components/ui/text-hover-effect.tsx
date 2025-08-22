"use client";
import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export const TextHoverEffect = ({
   text,
   duration,
   className,
}: {
   text: string;
   duration?: number;
   className?: string;
}) => {
   const letters = text.split("");
   const ref = useRef<HTMLDivElement>(null);

   return (
      <div
         ref={ref}
         className={`relative inline-block ${className}`}
         style={{
            perspective: "1000px",
         }}
      >
         {letters.map((letter, i) => (
            <HoverLetter key={i} letter={letter} duration={duration} />
         ))}
      </div>
   );
};

const HoverLetter = ({
   letter,
   duration,
}: {
   letter: string;
   duration?: number;
}) => {
   const mouseX = useMotionValue(0);
   const mouseY = useMotionValue(0);

   const dampen = 40;
   const rotateX = useSpring(
      useTransform(mouseY, [-0.5, 0.5], [15 / dampen, -15 / dampen])
   );
   const rotateY = useSpring(
      useTransform(mouseX, [-0.5, 0.5], [-15 / dampen, 15 / dampen])
   );

   const handleMouseMove = (event: React.MouseEvent<HTMLSpanElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
   };

   const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
   };

   return (
      <motion.span
         onMouseMove={handleMouseMove}
         onMouseLeave={handleMouseLeave}
         style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
         }}
         whileHover={{
            scale: 1.1,
            transition: { duration: duration || 0.2 },
         }}
         className="inline-block cursor-pointer bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
      >
         {letter === " " ? "\u00A0" : letter}
      </motion.span>
   );
};
