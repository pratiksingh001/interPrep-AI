"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import NewAgentDialog from "./new-agent-dailog";

export const AgentsListHeader = () => {
   const [isDialogOpen, setIsDialogOpen] = useState(false);
   const handleOpenChange = (open: boolean) => {
      setIsDialogOpen(open);
   };
   return (
      <>
         <NewAgentDialog open={isDialogOpen} onOpenChange={handleOpenChange} />
         <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
            <div className="flex items-center justify-between">
               <h5 className="font-medium text-xl">My Agents</h5>
               <Button onClick={() => setIsDialogOpen(true)}>
                  <PlusIcon />
                  New Agent
               </Button>
            </div>
         </div>
      </>
   );
};
