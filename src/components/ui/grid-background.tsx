"use client";
import React from "react";

export function GridBackground({ children }: { children: React.ReactNode }) {
   return (
      <div className="h-full w-full bg-black bg-grid-small-white/[0.1] relative">
         <div className="absolute pointer-events-none inset-0 bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
         {children}
      </div>
   );
}
