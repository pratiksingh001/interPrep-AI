"use client";

import { Separator } from "@/components/ui/separator";
import {
   Sidebar,
   SidebarContent,
   SidebarFooter,
   SidebarGroup,
   SidebarGroupContent,
   SidebarHeader,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { BotIcon, VideoIcon, SparklesIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { DashboardUserButton } from "./dashboard-user-button";

const firstSection = [
   {
      icon: VideoIcon,
      label: "Meetings",
      href: "/meetings",
   },
   {
      icon: BotIcon,
      label: "Agents",
      href: "/agents",
   },
];

// const secondSection = [
//    {
//       icon: StarIcon,
//       label: "Upgrade",
//       href: "/upgrade",
//    },
// ];

export const DashboardSidebar = () => {
   const pathname = usePathname();

   return (
      <Sidebar className="border-r border-gray-800 bg-gradient-to-b from-gray-900 to-black">
         <SidebarHeader className="text-white bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-800">
            <motion.div
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.5 }}
            >
               <Link href="/" className="flex items-center gap-3 px-2 pt-2">
                  <motion.div
                     whileHover={{ scale: 1.1, rotate: 5 }}
                     transition={{ duration: 0.3 }}
                  >
                     <Image
                        src="/inter-prep-ai-logo.svg"
                        alt="logo"
                        width={36}
                        height={36}
                        className="rounded-lg"
                     />
                  </motion.div>
                  <p className="text-2xl font-bold bg-gradient-to-r from-white to-sidebar-accent-foreground bg-clip-text text-transparent">
                     interPrep AI
                  </p>
               </Link>
            </motion.div>
         </SidebarHeader>

         <div className="px-4 py-3">
            <Separator className="opacity-20 bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
         </div>

         <SidebarContent>
            <SidebarGroup>
               <SidebarGroupContent>
                  <SidebarMenu>
                     {firstSection.map((item, index) => {
                        const isActive = pathname === item.href;
                        return (
                           <motion.div
                              key={item.href}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.4, delay: index * 0.1 }}
                           >
                              <SidebarMenuItem>
                                 <SidebarMenuButton
                                    asChild
                                    className={cn(
                                       "h-12 rounded-xl transition-all duration-300 group relative overflow-hidden",
                                       "hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-700",
                                       "hover:shadow-lg hover:shadow-primary/10",
                                       isActive &&
                                          "bg-gradient-to-r from-primary/20 to-purple-600/20 border border-primary/30 shadow-lg shadow-primary/20"
                                    )}
                                    isActive={isActive}
                                 >
                                    <Link
                                       href={item.href}
                                       className="flex items-center gap-3 w-full"
                                    >
                                       <motion.div
                                          whileHover={{ scale: 1.1 }}
                                          transition={{ duration: 0.2 }}
                                          className={cn(
                                             "p-2 rounded-lg transition-colors",
                                             isActive
                                                ? "bg-primary/20 text-primary"
                                                : "bg-gray-800 text-gray-300"
                                          )}
                                       >
                                          <item.icon className="size-4" />
                                       </motion.div>
                                       <span className="text-sm font-medium tracking-tight text-gray-300 group-hover:text-white">
                                          {item.label}
                                       </span>
                                       {isActive && (
                                          <motion.div
                                             layoutId="activeIndicator"
                                             className="ml-auto"
                                          >
                                             <SparklesIcon className="size-4 text-primary" />
                                          </motion.div>
                                       )}
                                    </Link>
                                 </SidebarMenuButton>
                              </SidebarMenuItem>
                           </motion.div>
                        );
                     })}
                  </SidebarMenu>
               </SidebarGroupContent>
            </SidebarGroup>

            <div className="px-4 py-3">
               <Separator className="opacity-20 bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
            </div>
         </SidebarContent>

         <SidebarFooter className="border-t border-gray-800 bg-gradient-to-r from-gray-900 to-gray-800">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: 0.6 }}
            >
               <DashboardUserButton />
            </motion.div>
         </SidebarFooter>
      </Sidebar>
   );
};
