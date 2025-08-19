import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { VideoIcon, BanIcon } from "lucide-react";

interface Props {
   meetingId: string;
   onCancelMeeting: () => void;
   isCancelling: boolean;
}
export const UpcomingState = ({
   meetingId,
   onCancelMeeting,
   isCancelling,
}: Props) => {
   return (
      <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
         <EmptyState
            image="/upcoming.svg"
            title="Not started yet"
            description="Once you start this meeting the summary will appear here"
         />
         <div className="flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2 w-full">
            <Link href={`/call/${123}`}>
               <Button
                  className="w-full lg:w-auto cursor-pointer"
                  variant="secondary"
                  onClick={onCancelMeeting}
                  disabled={isCancelling}
               >
                  <BanIcon />
                  Cancel meeting
               </Button>
            </Link>
            <Link href={`/call/${meetingId}`}>
               <Button
                  className="w-full lg:w-auto cursor-pointer"
                  disabled={isCancelling}
               >
                  <VideoIcon />
                  Start meeting
               </Button>
            </Link>
         </div>
      </div>
   );
};
