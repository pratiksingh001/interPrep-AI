"use client";
import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

interface AnimatedCounterProps {
   value: number;
   className?: string;
   suffix?: string;
}

export function AnimatedCounter({
   value,
   className,
   suffix = "",
}: AnimatedCounterProps) {
   const ref = useRef<HTMLSpanElement>(null);
   const motionValue = useMotionValue(0);
   const springValue = useSpring(motionValue, {
      damping: 60,
      stiffness: 100,
   });
   const isInView = useInView(ref, { once: true, margin: "0px" });

   useEffect(() => {
      if (isInView) {
         motionValue.set(value);
      }
   }, [motionValue, isInView, value]);

   useEffect(
      () =>
         springValue.on("change", latest => {
            if (ref.current) {
               ref.current.textContent =
                  Intl.NumberFormat("en-US").format(Math.floor(latest)) +
                  suffix;
            }
         }),
      [springValue, suffix]
   );

   return <span className={className} ref={ref} />;
}
