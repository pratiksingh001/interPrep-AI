"use client";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { EmptyState } from "@/components/empty-state";
import { useAgentsFilters } from "../../hooks/use-agents-filters";
import DataPagination from "../components/data-pagination";
import { useRouter } from "next/navigation";
import { ExpandableCard } from "@/components/ui/expandable-card";
import { GridBackground } from "@/components/ui/grid-background";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
   BrainIcon,
   SettingsIcon,
   PlayIcon,
   ClockIcon,
   ActivityIcon,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { GeneratedAvatar } from "@/components/generated-avatar";

const getAgentTypeColor = (type: string) => {
   switch (type?.toLowerCase()) {
      case "interview":
         return "bg-blue-500/10 text-blue-600 border-blue-200";
      case "technical":
         return "bg-purple-500/10 text-purple-600 border-purple-200";
      case "behavioral":
         return "bg-green-500/10 text-green-600 border-green-200";
      case "general":
         return "bg-orange-500/10 text-orange-600 border-orange-200";
      default:
         return "bg-gray-500/10 text-gray-600 border-gray-200";
   }
};


export const AgentsView = () => {
   const router = useRouter();
   const [filters, setFilters] = useAgentsFilters();
   const trpc = useTRPC();
   const { data } = useSuspenseQuery(
      trpc.agents.getMany.queryOptions({
         ...filters,
      })
   );

   if (data.items.length === 0) {
      return (
         <GridBackground>
            <div className="flex-1 pb-4 px-4 md:px-8 flex items-center justify-center">
               <EmptyState
                  title="Create your first agent"
                  description="Create an agent to join your meetings. Each agent will follow your instruction and can participate in the call."
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
               <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Your AI Agents
               </h1>
               <p className="text-gray-300 mt-2">
                  Manage your AI interview assistants and their configurations
               </p>
            </motion.div>

            <div className="grid gap-4">
               {data.items.map((agent, index: number) => (
                  <motion.div
                     key={agent.id}
                     initial={{ opacity: 0, y: 30 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                     <ExpandableCard
                        title={agent.name || "AI Assistant"}
                        subtitle={`AI agent created ${formatDistanceToNow(new Date(agent.createdAt))} ago`}
                        icon={<GeneratedAvatar seed={agent.name || "AI Assistant"} variant="botttsNeutral" className="h-8 w-8" />}
                        badge={
                           <Badge className={getAgentTypeColor("general")}>
                              General
                           </Badge>
                        }
                        onAction={() => router.push(`/agents/${agent.id}`)}
                        actionLabel="Configure"
                        expandedContent={
                           <div className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                 <div className="flex items-center gap-2 text-sm">
                                    <ClockIcon className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">
                                       Created:
                                    </span>
                                    <span>
                                       {formatDistanceToNow(
                                          new Date(agent.createdAt)
                                       )}{" "}
                                       ago
                                    </span>
                                 </div>
                                 <div className="flex items-center gap-2 text-sm">
                                    <ActivityIcon className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">
                                       Status:
                                    </span>
                                    <span className="text-green-600">
                                       Active
                                    </span>
                                 </div>
                                 <div className="flex items-center gap-2 text-sm">
                                    <SettingsIcon className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">
                                       ID:
                                    </span>
                                    <span className="font-mono text-xs">
                                       {agent.id}
                                    </span>
                                 </div>
                              </div>
                              {agent.instructions && (
                                 <div className="pt-2 border-t border-border">
                                    <p className="text-sm text-muted-foreground font-medium mb-2">
                                       Instructions:
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                       {agent.instructions}
                                    </p>
                                 </div>
                              )}
                           </div>
                        }
                        className="transition-all duration-300 hover:border-primary/30"
                     >
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                           <div className="flex items-center gap-1">
                              <BrainIcon className="h-3 w-3" />
                              AI Powered
                           </div>
                           <div className="flex items-center gap-1">
                              <PlayIcon className="h-3 w-3" />
                              Ready to use
                           </div>
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

export const AgentsLoadingState = () => {
   return (
      <LoadingState
         title="Loading agents..."
         description="This may take a few seconds... "
      />
   );
};

export const AgentsErrorState = () => {
   return (
      <ErrorState
         title="Failed to load agents"
         description="Something went wrong..."
      />
   );
};
