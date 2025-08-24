"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import {
   useMutation,
   useQueryClient,
   useSuspenseQuery,
} from "@tanstack/react-query";
import { MeetingIdViewHeader } from "../components/meeting-id-view-header";
import { useRouter } from "next/navigation";
import { useConfirm } from "@/hooks/use-confirm";
import { useState } from "react";
import UpdateMeetingDialog from "../components/update-meeting-dialog";
import { UpcomingState } from "../components/upcoming-state";
import { ActiveState } from "../components/active-state";
import { CancelledState } from "../components/cancelled-state";
import { ProcessingState } from "../components/processing-state";
import { CompletedState } from "../components/completed-state";

interface Props {
   meetingId: string;
}

export const MeetingIdView = ({ meetingId }: Props) => {
   const trpc = useTRPC();
   const router = useRouter();
   const queryClient = useQueryClient();
   const { data } = useSuspenseQuery(
      trpc.meetings.getOne.queryOptions({
         id: meetingId,
      })
   );
   const [RemoveConfirmation, confirmRemove] = useConfirm(
      "Are you sure",
      "The following action will remove this meeting"
   );
   const [updateMeetingDailogOpen, setUpdateMeetingDialogOpen] =
      useState(false);

   const removeMeeting = useMutation(
      trpc.meetings.remove.mutationOptions({
         onSuccess: () => {
            queryClient.invalidateQueries(
               trpc.meetings.getMany.queryOptions({})
            );
            // Todo: Invalidate free tier usage
            router.push("/meetings");
         },
      })
   );

   const handleRemoveMeeting = async () => {
      const ok = await confirmRemove();
      if (!ok) return;

      await removeMeeting.mutateAsync({ id: meetingId });
   };

   const isActive = data.status === "active";
   const isUpcoming = data.status === "upcoming";
   const isCompleted = data.status === "completed";
   const isProcessing = data.status === "processing";
   const isCancelled = data.status === "cancelled";

   return (
      <>
         <RemoveConfirmation />
         <UpdateMeetingDialog
            open={updateMeetingDailogOpen}
            onOpenChange={setUpdateMeetingDialogOpen}
            initialValues={data}
         />
         <div className="flex-1 py-3 px-3 sm:py-4 sm:px-4 md:px-8 flex flex-col gap-y-3 sm:gap-y-4 bg-black min-h-screen">
            <MeetingIdViewHeader
               meetingId={meetingId}
               meetingName={data.name}
               onEdit={() => setUpdateMeetingDialogOpen(true)}
               onRemove={handleRemoveMeeting}
            />
            {isCancelled && <CancelledState />}
            {isProcessing && <ProcessingState />}
            {isUpcoming && (
               <UpcomingState
                  meetingId={meetingId}
               />
            )}
            {isCompleted && <CompletedState data={data }/>}
            {isActive && <ActiveState meetingId={meetingId} />}
         </div>
      </>
   );
};

export const MeetingsIdViewLoadingState = () => {
   return (
      <LoadingState
         title="Loading meetings..."
         description="This may take a few seconds... "
      />
   );
};

export const MeetingsIdViewErrorState = () => {
   return (
      <ErrorState
         title="Failed to load meetings"
         description="Something went wrong..."
      />
   );
};
