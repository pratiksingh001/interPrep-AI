"use client";
import { useState } from "react";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import {
   useMutation,
   useQueryClient,
   useSuspenseQuery,
} from "@tanstack/react-query";
import { AgentIdViewHeader } from "../components/agent-id-view-header";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Badge } from "@/components/ui/badge";
import { VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import UpdateAgentDialog from "../components/update-agent-dialog";

interface Props {
   agentId: string;
}

export const AgentIdView = ({ agentId }: Props) => {
   const router = useRouter();
   const trpc = useTRPC();
   const queryClient = useQueryClient();

   const [updateAgentDialogOpen, setUpdateAgentDialogOpen] = useState(false);

   const { data } = useSuspenseQuery(
      trpc.agents.getOne.queryOptions({ id: agentId })
   );

   const removeAgent = useMutation(
      trpc.agents.remove.mutationOptions({
         onSuccess: async () => {
            await queryClient.invalidateQueries(
               trpc.agents.getMany.queryOptions({})
            );
            // Todo: Invalidate free tier usage
            router.push("/agents");
         },
         onError: error => {
            toast.error(error.message);
         },
      })
   );

   const [RemoveConfirmation, confirmRemove] = useConfirm(
      "Are you sure?",
      `The following action will remove ${data.meetingCount} associated meetings`
   );

   const handleRemoveAgent = async () => {
      const ok = await confirmRemove();

      if (!ok) return;

      await removeAgent.mutateAsync({ id: agentId });
   };
   return (
      <>
         <RemoveConfirmation />
         <UpdateAgentDialog
            open={updateAgentDialogOpen}
            onOpenChange={setUpdateAgentDialogOpen}
            initialValues={data}
         />
         <div className="flex-1 px-4 py-4 md:px-8 flex flex-col gap-y-4 bg-black min-h-screen">
            <AgentIdViewHeader
               agentId={agentId}
               agentName={data.name}
               onEdit={() => setUpdateAgentDialogOpen(true)}
               onRemove={handleRemoveAgent}
            />
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl">
               <div className="px-6 py-6 gap-y-6 flex flex-col col-span-5">
                  <div className="flex items-center gap-x-4">
                     <GeneratedAvatar
                        variant="botttsNeutral"
                        seed={data.name}
                        className="size-12"
                     />
                     <h2 className="text-2xl font-medium text-white">
                        {data.name}
                     </h2>
                  </div>
                  <Badge
                     variant="outline"
                     className="flex items-center gap-x-2 [&>svg]:size-4 w-fit bg-blue-500/10 text-blue-400 border-blue-400/30"
                  >
                     <VideoIcon className="text-blue-400" />
                     {data.meetingCount}{" "}
                     {data.meetingCount === 1 ? "meeting" : "meetings"}
                  </Badge>
                  <div className="flex flex-col gap-y-4">
                     <p className="text-lg font-medium text-white">
                        Instructions
                     </p>
                     <p className="text-gray-300 leading-relaxed">
                        {data.instructions}
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export const AgentsIdLoadingState = () => {
   return (
      <LoadingState
         title="Loading agents..."
         description="This may take a few seconds... "
      />
   );
};

export const AgentsIdErrorState = () => {
   return (
      <ErrorState
         title="Failed to load agents"
         description="Something went wrong..."
      />
   );
};
