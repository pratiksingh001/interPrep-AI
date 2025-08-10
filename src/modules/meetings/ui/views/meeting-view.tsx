"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

export const MeetingsView = () => {
   const trpc = useTRPC();
   const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));

   return <div>{JSON.stringify(data)}</div>;
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
