"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "./button";

interface ExpandableCardProps {
   title: string;
   subtitle?: string;
   children: React.ReactNode;
   expandedContent?: React.ReactNode;
   className?: string;
   onAction?: () => void;
   actionLabel?: string;
   icon?: React.ReactNode;
   badge?: React.ReactNode;
}

export function ExpandableCard({
   title,
   subtitle,
   children,
   expandedContent,
   className,
   onAction,
   actionLabel,
   icon,
   badge,
}: ExpandableCardProps) {
   const [isExpanded, setIsExpanded] = useState(false);

   return (
      <motion.div
         className={cn(
            "rounded-xl border border-gray-800 bg-gray-900/50 overflow-hidden group cursor-pointer",
            "hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300",
            className
         )}
         whileHover={{ y: -2 }}
         transition={{ duration: 0.2 }}
         layout
      >
         <div
            className="p-4 sm:p-6 relative"
            onClick={() => expandedContent && setIsExpanded(!isExpanded)}
         >
            {/* Desktop Layout */}
            <div className="hidden sm:flex items-start justify-between">
               <div className="flex items-start gap-4 flex-1">
                  {icon && (
                     <motion.div
                        className="p-3 rounded-lg bg-primary/10 text-primary"
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                     >
                        {icon}
                     </motion.div>
                  )}
                  <div className="flex-1 min-w-0">
                     <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-white text-lg truncate">
                           {title}
                        </h3>
                        {badge}
                     </div>
                     {subtitle && (
                        <p className="text-gray-400 text-sm mb-3">{subtitle}</p>
                     )}
                     {children}
                  </div>
               </div>
               <div className="flex items-center gap-2 ml-4">
                  {onAction && actionLabel && (
                     <Button
                        onClick={e => {
                           e.stopPropagation();
                           onAction();
                        }}
                        size="sm"
                        variant="outline"
                        className="hover:bg-primary hover:text-primary-foreground"
                     >
                        {actionLabel}
                     </Button>
                  )}
                  {expandedContent && (
                     <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                     >
                        <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                     </motion.div>
                  )}
               </div>
            </div>

            {/* Mobile Layout */}
            <div className="sm:hidden">
               <div className="flex items-start gap-3 mb-3">
                  {icon && (
                     <motion.div
                        className="p-2 rounded-lg bg-primary/10 text-primary flex-shrink-0"
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                     >
                        {icon}
                     </motion.div>
                  )}
                  <div className="flex-1 min-w-0">
                     <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-white text-base break-words">
                           {title}
                        </h3>
                        {badge}
                     </div>
                     {subtitle && (
                        <p className="text-gray-400 text-sm mb-2">{subtitle}</p>
                     )}
                  </div>
                  {expandedContent && (
                     <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex-shrink-0"
                     >
                        <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                     </motion.div>
                  )}
               </div>
               
               <div className="mb-3">
                  {children}
               </div>
               
               {onAction && actionLabel && (
                  <Button
                     onClick={e => {
                        e.stopPropagation();
                        onAction();
                     }}
                     size="sm"
                     variant="outline"
                     className="w-full hover:bg-primary hover:text-primary-foreground"
                  >
                     {actionLabel}
                  </Button>
               )}
            </div>
         </div>

         <AnimatePresence>
            {isExpanded && expandedContent && (
               <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-gray-800 bg-gray-800/20"
               >
                  <div className="p-4 pt-3 sm:p-6 sm:pt-4">{expandedContent}</div>
               </motion.div>
            )}
         </AnimatePresence>
      </motion.div>
   );
}
