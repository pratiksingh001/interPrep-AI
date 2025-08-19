"use client";

import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
   ArrowRightIcon,
   BotIcon,
   VideoIcon,
   PlusIcon,
   TrendingUpIcon,
} from "lucide-react";
import Link from "next/link";

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
      <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-6">
         <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Welcome back!</h1>
            <p className="text-muted-foreground">
               Ready to continue your interview preparation journey?
            </p>
         </div>

         {/* Quick Actions */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
               <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                              <action.icon className="h-5 w-5 text-primary" />
                           </div>
                           <div>
                              <CardTitle className="text-lg">
                                 {action.title}
                              </CardTitle>
                              <CardDescription>
                                 {action.description}
                              </CardDescription>
                           </div>
                        </div>
                        <Link href={action.href}>
                           <Button
                              variant={action.variant}
                              size="sm"
                              className="inline-flex items-center gap-1"
                           >
                              <PlusIcon className="h-4 w-4" />
                              {action.action}
                           </Button>
                        </Link>
                     </div>
                  </CardHeader>
               </Card>
            ))}
         </div>

         {/* Stats Overview */}
         <div>
            <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               {stats.map((stat, index) => (
                  <Card key={index}>
                     <CardContent className="pt-6">
                        <div className="flex flex-col">
                           <span className="text-2xl font-bold">
                              {stat.value}
                           </span>
                           <span className="text-sm font-medium text-muted-foreground mb-2">
                              {stat.label}
                           </span>
                           <Badge
                              variant="secondary"
                              className="w-fit text-xs inline-flex items-center gap-1"
                           >
                              <TrendingUpIcon className="h-3 w-3 text-green-500" />
                              {stat.change}
                           </Badge>
                        </div>
                     </CardContent>
                  </Card>
               ))}
            </div>
         </div>

         {/* Recent Activity */}
         <div>
            <div className="flex items-center justify-between mb-4">
               <h2 className="text-xl font-semibold">Recent Activity</h2>
               <Link href="/meetings">
                  <Button
                     variant="outline"
                     size="sm"
                     className="inline-flex items-center gap-1"
                  >
                     View All
                     <ArrowRightIcon className="h-4 w-4" />
                  </Button>
               </Link>
            </div>
            <Card>
               <CardContent className="pt-6">
                  <div className="text-center py-8">
                     <VideoIcon className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                     <h3 className="font-medium mb-2">No recent sessions</h3>
                     <p className="text-sm text-muted-foreground mb-4">
                        Start a new practice session to see your recent activity
                        here
                     </p>
                     <Link href="/meetings">
                        <Button className="inline-flex items-center gap-2">
                           <PlusIcon className="h-4 w-4" />
                           Schedule Meeting
                        </Button>
                     </Link>
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
   );
};
