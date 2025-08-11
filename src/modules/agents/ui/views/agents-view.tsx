"use client";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";
import { useAgentsFilters } from "../../hooks/use-agents-filters";
import DataPagination from "../components/data-pagination";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/data.table";

export const AgentsView = () => {
   const router = useRouter();
   const [filters, setFilters] = useAgentsFilters();
   const trpc = useTRPC();
   const { data } = useSuspenseQuery(
      trpc.agents.getMany.queryOptions({
         ...filters,
      })
   );
   console.log(data);

   return (
      <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
         {/* <div>{JSON.stringify(data, null, 2)}</div> */}
         {data.items.length >= 1 && (
            <DataTable
               columns={columns}
               data={data.items}
               onRowClick={row => router.push(`/agents/${row.id}`)}
            />
         )}
         {data.items.length >= 1 && (
            <DataPagination
               page={filters.page}
               totalPage={data.totalPages}
               onPageChange={page => setFilters({ page })}
            />
         )}
         {data.items.length === 0 && (
            <EmptyState
               title="Create your first agent"
               description="Create an agent to join your meetings. Each agent will follow your instruction and can participate in the call."
            />
         )}
      </div>
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
