"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import {
   PanelLeftCloseIcon,
   PanelLeftIcon,
   SearchIcon,
   SparklesIcon,
} from "lucide-react";
import { DashBoardCommand } from "./dashboard-command";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const DashboardNavbar = () => {
   const { state, toggleSidebar, isMobile } = useSidebar();
   const [commandOpen, setCommandOpen] = useState(false);

   useEffect(() => {
      const down = (e: KeyboardEvent) => {
         if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            setCommandOpen(open => !open);
         }
      };
      document.addEventListener("keydown", down);
      return () => document.removeEventListener("keydown", down);
   }, []);

   return (
      <>
         <DashBoardCommand open={commandOpen} setOpen={setCommandOpen} />
         <motion.nav
            className="flex px-4 gap-x-3 items-center py-3 border-b border-gray-800 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
         >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
               <Button
                  className="size-9 border-gray-700 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 text-gray-300 hover:text-white"
                  variant="outline"
                  onClick={toggleSidebar}
               >
                  <motion.div
                     animate={{
                        rotate: state === "collapsed" || isMobile ? 0 : 180,
                     }}
                     transition={{ duration: 0.3 }}
                  >
                     {state === "collapsed" || isMobile ? (
                        <PanelLeftIcon className="size-4" />
                     ) : (
                        <PanelLeftCloseIcon className="size-4" />
                     )}
                  </motion.div>
               </Button>
            </motion.div>

            <motion.div
               whileHover={{ scale: 1.02 }}
               whileTap={{ scale: 0.98 }}
               className="relative"
            >
               <Button
                  className="h-9 w-[280px] justify-start font-normal text-gray-400 hover:text-white border-gray-700 hover:bg-primary/5 hover:border-primary/30 transition-all duration-300 relative overflow-hidden group"
                  variant="outline"
                  size="sm"
                  onClick={() => setCommandOpen(open => !open)}
               >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <SearchIcon className="mr-2" />
                  Search anything...
                  <motion.div
                     animate={{ scale: [1, 1.1, 1] }}
                     transition={{ duration: 2, repeat: Infinity }}
                     className="ml-auto"
                  >
                     <SparklesIcon className="size-3 text-primary/60" />
                  </motion.div>
                  <kbd className="ml-2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-gray-800/50 px-1.5 font-mono text-[10px] font-medium text-gray-400">
                     <span className="text-xs">⌘</span>K
                  </kbd>
               </Button>
            </motion.div>
         </motion.nav>
      </>
   );
};
