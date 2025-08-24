import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { VideoIcon } from "lucide-react";

interface Props {
   meetingId: string;
}
export const UpcomingState = ({
   meetingId,
}: Props) => {
   return (
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl px-3 py-4 sm:px-4 sm:py-5 flex flex-col gap-y-6 sm:gap-y-8 items-center justify-center">
         <EmptyState
            image="/upcoming.svg"
            title="Not started yet"
            description="Once you start this meeting the summary will appear here"
         />
         <div className="flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2 w-full">
            <Link href={`/call/${123}`}>
            </Link>
            <Link href={`/call/${meetingId}`}>
               <Button
                  className="w-full lg:w-auto cursor-pointer"
               >
                  <VideoIcon />
                  Start meeting
               </Button>
            </Link>
         </div>
      </div>
   );
};
