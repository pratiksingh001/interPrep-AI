"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { GlowingCard } from "@/components/ui/glowing-card";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { GridBackground } from "@/components/ui/grid-background";
import {
   ArrowRightIcon,
   BotIcon,
   VideoIcon,
   PlusIcon,
   TrendingUpIcon,
   SparklesIcon,
   ZapIcon,
   BarChart3Icon,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const quickActions = [
   {
      icon: VideoIcon,
      title: "Schedule New Meeting",
      description: "Set up an interview practice session",
      href: "/meetings",
      action: "New Meeting",
      variant: "default" as const,
   },
   {
      icon: BotIcon,
      title: "Create AI Agent",
      description: "Build a custom interview agent",
      href: "/agents",
      action: "New Agent",
      variant: "outline" as const,
   },
];

const stats = [
   {
      label: "Practice Sessions",
      value: "12",
      change: "+3 this week",
      positive: true,
   },
   {
      label: "AI Agents Created",
      value: "4",
      change: "+1 this month",
      positive: true,
   },
   {
      label: "Success Rate",
      value: "87%",
      change: "+5% improvement",
      positive: true,
   },
];

export const HomeView = () => {
   return (
      <GridBackground>
         <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-8">
            <motion.div
               className="flex flex-col gap-2"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5 }}
            >
               <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Welcome back!
               </h1>
               <p className="text-gray-300 text-lg">
                  Ready to continue your interview preparation journey?
               </p>
            </motion.div>

            {/* Quick Actions with Bento Grid */}
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.2 }}
            >
               <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[12rem]">
                  {quickActions.map((action, index) => (
                     <BentoGridItem
                        key={index}
                        title={action.title}
                        description={action.description}
                        header={
                           <div className="flex w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex-col items-center justify-center">
                              <action.icon className="h-8 w-8 text-primary" />
                           </div>
                        }
                        className={index === 0 ? "md:col-span-2" : ""}
                        icon={<SparklesIcon className="h-4 w-4 text-primary" />}
                     >
                        <Link href={action.href}>
                           <Button variant="default" size="sm" className="mt-2">
                              <PlusIcon className="h-4 w-4 mr-2" />
                              {action.action}
                           </Button>
                        </Link>
                     </BentoGridItem>
                  ))}
               </BentoGrid>
            </motion.div>

            {/* Stats Overview with Glowing Cards */}
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.4 }}
            >
               <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <BarChart3Icon className="h-6 w-6 text-primary" />
                  Your Progress
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {stats.map((stat, index) => (
                     <GlowingCard key={index} className="p-6">
                        <div className="flex flex-col">
                           <div className="flex items-center gap-2 mb-2">
                              <ZapIcon className="h-5 w-5 text-primary" />
                              <span className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                                 <AnimatedCounter
                                    value={parseInt(stat.value)}
                                    suffix={stat.value.includes("%") ? "%" : ""}
                                 />
                              </span>
                           </div>
                           <span className="text-sm font-medium text-gray-400 mb-3">
                              {stat.label}
                           </span>
                           <Badge
                              variant="secondary"
                              className="w-fit text-xs inline-flex items-center gap-1 bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-600 border-green-200"
                           >
                              <TrendingUpIcon className="h-3 w-3 text-green-500" />
                              {stat.change}
                           </Badge>
                        </div>
                     </GlowingCard>
                  ))}
               </div>
            </motion.div>

            {/* Recent Activity with CardSpotlight */}
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.6 }}
            >
               <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold flex items-center gap-2">
                     <VideoIcon className="h-6 w-6 text-primary" />
                     Recent Activity
                  </h2>
                  <Link href="/meetings">
                     <Button
                        variant="outline"
                        size="sm"
                        className="inline-flex items-center gap-2 hover:bg-primary hover:text-primary-foreground"
                     >
                        View All
                        <ArrowRightIcon className="h-4 w-4" />
                     </Button>
                  </Link>
               </div>
               <CardSpotlight className="p-8">
                  <div className="text-center py-8">
                     <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                     >
                        <VideoIcon className="h-16 w-16 text-primary mx-auto mb-4" />
                     </motion.div>
                     <h3 className="font-semibold mb-3 text-xl text-white">
                        No recent sessions
                     </h3>
                     <p className="text-gray-400 mb-6 max-w-md mx-auto">
                        Start a new practice session to see your recent activity
                        here and track your progress
                     </p>
                     <Link href="/meetings">
                        <Button className="inline-flex items-center gap-2 text-lg px-6 py-3">
                           <PlusIcon className="h-5 w-5" />
                           Schedule Meeting
                        </Button>
                     </Link>
                  </div>
               </CardSpotlight>
            </motion.div>
         </div>
      </GridBackground>
   );
};
