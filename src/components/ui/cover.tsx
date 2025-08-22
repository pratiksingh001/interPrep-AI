"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export const Cover = ({
   children,
   className,
}: {
   children?: React.ReactNode;
   className?: string;
}) => {
   const [hovered, setHovered] = useState(false);
   const ref = useRef<HTMLDivElement>(null);
   const [beamPositions, setBeamPositions] = useState<number[]>([]);

   useEffect(() => {
      if (ref.current) {
         const height = ref.current?.clientHeight ?? 0;
         const numberOfBeams = Math.floor(height / 8);
         const positions = Array.from(
            { length: numberOfBeams },
            (_, i) => (i + 1) * (height / (numberOfBeams + 1))
         );
         setBeamPositions(positions);
      }
   }, []);

   return (
      <div
         onMouseEnter={() => setHovered(true)}
         onMouseLeave={() => setHovered(false)}
         ref={ref}
         className={cn(
            "relative group/cover inline-block px-4 py-2 transition duration-300",
            "hover:bg-black/20 rounded-lg border border-transparent hover:border-neutral-700/50",
            className
         )}
      >
         <AnimatePresence>
            {hovered && (
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="absolute inset-0 overflow-hidden rounded-lg"
               >
                  {/* Main animated gradient sweep */}
                  <motion.div
                     initial={{ x: "-100%" }}
                     animate={{ x: "100%" }}
                     transition={{
                        duration: 0.8,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatDelay: 2,
                     }}
                     className="absolute inset-0 w-full h-full"
                     style={{
                        background:
                           "linear-gradient(90deg, transparent 0%, rgba(168, 85, 247, 0.1) 20%, rgba(168, 85, 247, 0.6) 40%, rgba(236, 72, 153, 0.6) 60%, rgba(168, 85, 247, 0.1) 80%, transparent 100%)",
                     }}
                  />

                  {/* Animated beam lines */}
                  {beamPositions.map((position, index) => (
                     <motion.div
                        key={index}
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{
                           duration: 0.6 + Math.random() * 0.4,
                           ease: "easeInOut",
                           repeat: Infinity,
                           repeatDelay: 1.5 + Math.random() * 1,
                           delay: Math.random() * 1.5,
                        }}
                        className="absolute w-full h-[1px]"
                        style={{
                           top: position,
                           background:
                              "linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.8) 50%, transparent 100%)",
                        }}
                     />
                  ))}

                  {/* Static background glow */}
                  <div
                     className="absolute inset-0 opacity-30"
                     style={{
                        background:
                           "radial-gradient(ellipse at center, rgba(168, 85, 247, 0.15) 0%, transparent 70%)",
                     }}
                  />
               </motion.div>
            )}
         </AnimatePresence>

         <motion.span
            animate={{
               color: hovered ? "#ffffff" : "transparent",
            }}
            transition={{ duration: 0.2 }}
            className={cn(
               "relative z-20 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent font-bold",
               hovered && "text-white"
            )}
         >
            {children}
         </motion.span>
      </div>
   );
};
