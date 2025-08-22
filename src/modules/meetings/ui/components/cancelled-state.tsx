import { EmptyState } from "@/components/empty-state";

export const CancelledState = () => {
   return (
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
         <EmptyState
            image="/cancelled.svg"
            title="Meeting Cancelled"
            description="The meeting was cancelled"
         />
      </div>
   );
};
