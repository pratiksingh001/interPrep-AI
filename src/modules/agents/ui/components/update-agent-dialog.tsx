import { ResponsiveDialog } from "@/components/responsive-dialog";
import AgentsForm from "./agents-from";
import { AgentGetOne } from "../../types";

interface NewAgentDialogProps {
   open: boolean;
   onOpenChange: (open: boolean) => void;
   initialValues: AgentGetOne;
}

const UpdateAgentDialog = ({
   open,
   onOpenChange,
   initialValues,
}: NewAgentDialogProps) => {
   return (
      <ResponsiveDialog
         open={open}
         onOpenChange={onOpenChange}
         title="Edit Agent"
         description="Update the agent details"
      >
         <AgentsForm
            onSuccess={() => {
               onOpenChange(false);
            }}
            onCancel={() => {
               onOpenChange(false);
            }}
            initialValues={initialValues}
         />
      </ResponsiveDialog>
   );
};

export default UpdateAgentDialog;
