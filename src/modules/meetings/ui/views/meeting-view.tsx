"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { EmptyState } from "@/components/empty-state";
import { useRouter } from "next/navigation";
import { useMeetingsFilters } from "../../hooks/use-meetings-filters";
import DataPagination from "@/components/data-pagination";
import { ExpandableCard } from "@/components/ui/expandable-card";
import { GridBackground } from "@/components/ui/grid-background";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
   VideoIcon,
   CalendarIcon,
   ClockIcon,
   UserIcon,
   PlayIcon,
   SettingsIcon,
   TrendingUpIcon,
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";

const getStatusColor = (status: string) => {
   switch (status?.toLowerCase()) {
      case "upcoming":
         return "bg-blue-500/10 text-blue-600 border-blue-200";
      case "active":
         return "bg-green-500/10 text-green-600 border-green-200";
      case "completed":
         return "bg-gray-500/10 text-gray-600 border-gray-200";
      case "cancelled":
         return "bg-red-500/10 text-red-600 border-red-200";
      default:
         return "bg-gray-500/10 text-gray-600 border-gray-200";
   }
};

const getStatusIcon = (status: string) => {
   switch (status?.toLowerCase()) {
      case "upcoming":
         return <CalendarIcon className="h-4 w-4" />;
      case "active":
         return <PlayIcon className="h-4 w-4" />;
      case "completed":
         return <TrendingUpIcon className="h-4 w-4" />;
      case "cancelled":
         return <ClockIcon className="h-4 w-4" />;
      default:
         return <VideoIcon className="h-4 w-4" />;
   }
};

export const MeetingsView = () => {
   const trpc = useTRPC();
   const router = useRouter();
   const [filters, setFilters] = useMeetingsFilters();
   const { data } = useSuspenseQuery(
      trpc.meetings.getMany.queryOptions({
         ...filters,
      })
   );

   if (data.items.length === 0) {
      return (
         <GridBackground>
            <div className="flex-1 pb-4 px-4 md:px-8 flex items-center justify-center">
               <EmptyState
                  title="Create your first meeting"
                  description="Schedule a meeting to find out your knowledge gaps. So, you can work on it."
               />
            </div>
         </GridBackground>
      );
   }

   return (
      <GridBackground>
         <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-6">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5 }}
            >
               <h1 className="text-3xl font-bold tracking-tight text-white">
                  Your Meetings
               </h1>
               <p className="text-gray-400 mt-2 text-lg">
                  Manage and track your interview preparation sessions
               </p>
            </motion.div>

            <div className="grid gap-4">
               {data.items.map((meeting, index: number) => (
                  <motion.div
                     key={meeting.id}
                     initial={{ opacity: 0, y: 30 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                     <ExpandableCard
                        title={meeting.name || "Interview Session"}
                        subtitle={`Meeting scheduled for ${format(new Date(meeting.createdAt), "PPP")}`}
                        icon={getStatusIcon(meeting.status)}
                        badge={
                           <Badge className={getStatusColor(meeting.status)}>
                              {meeting.status || "Upcoming"}
                           </Badge>
                        }
                        onAction={() => router.push(`/meetings/${meeting.id}`)}
                        actionLabel="View Details"
                        expandedContent={
                           <div className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                 <div className="flex items-center gap-2 text-sm">
                                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">
                                       Created:
                                    </span>
                                    <span>
                                       {formatDistanceToNow(
                                          new Date(meeting.createdAt)
                                       )}{" "}
                                       ago
                                    </span>
                                 </div>
                                 <div className="flex items-center gap-2 text-sm">
                                    <UserIcon className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">
                                       ID:
                                    </span>
                                    <span className="font-mono text-xs">
                                       {meeting.id}
                                    </span>
                                 </div>
                                 <div className="flex items-center gap-2 text-sm">
                                    <SettingsIcon className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">
                                       Status:
                                    </span>
                                    <span className="capitalize">
                                       {meeting.status || "Upcoming"}
                                    </span>
                                 </div>
                              </div>
                           </div>
                        }
                        className="transition-all duration-300 hover:border-primary/30"
                     >
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                           <div className="flex items-center gap-1">
                              <ClockIcon className="h-3 w-3" />
                              {formatDistanceToNow(
                                 new Date(meeting.createdAt)
                              )}{" "}
                              ago
                           </div>
                           {meeting.agent_id && (
                              <div className="flex items-center gap-1">
                                 <UserIcon className="h-3 w-3" />
                                 Agent assigned
                              </div>
                           )}
                        </div>
                     </ExpandableCard>
                  </motion.div>
               ))}
            </div>

            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{
                  duration: 0.5,
                  delay: data.items.length * 0.1 + 0.2,
               }}
            >
               <DataPagination
                  page={filters.page}
                  totalPage={data.totalPages}
                  onPageChange={page => setFilters({ page })}
               />
            </motion.div>
         </div>
      </GridBackground>
   );
};

export const MeetingsLoadingState = () => {
   return (
      <LoadingState
         title="Loading meetings..."
         description="This may take a few seconds... "
      />
   );
};

export const MeetingsErrorState = () => {
   return (
      <ErrorState
         title="Failed to load meetings"
         description="Something went wrong..."
      />
   );
};
