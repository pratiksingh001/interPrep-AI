import { auth } from "@/lib/auth";
import {
   MeetingIdView,
   MeetingsIdViewErrorState,
   MeetingsIdViewLoadingState,
} from "@/modules/meetings/ui/views/meeting-id-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
   params: Promise<{
      meetingsId: string;
   }>;
}

const Page = async ({ params }: Props) => {
   const { meetingsId } = await params;
   const session = await auth.api.getSession({
      headers: await headers(),
   });

   if (!session) {
      redirect("/meetings");
   }

   const queryClient = getQueryClient();
   void queryClient.prefetchQuery(
      trpc.meetings.getOne.queryOptions({ id: meetingsId })
   );
   // Todo : Prefetch meeting.getTranscript
   return (
      <HydrationBoundary state={dehydrate(queryClient)}>
         <Suspense fallback={<MeetingsIdViewLoadingState />}>
            <ErrorBoundary fallback={<MeetingsIdViewErrorState />}>
               <MeetingIdView meetingId={meetingsId} />
            </ErrorBoundary>
         </Suspense>
      </HydrationBoundary>
   );
};

export default Page;
