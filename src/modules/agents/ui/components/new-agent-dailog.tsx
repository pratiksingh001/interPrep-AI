import { ResponsiveDialog } from "@/components/responsive-dialog";
import AgentsForm from "./agents-from";

interface NewAgentDialogProps {
   open: boolean;
   onOpenChange: (open: boolean) => void;
}

const NewAgentDialog = ({ open, onOpenChange }: NewAgentDialogProps) => {
   return (
      <ResponsiveDialog
         open={open}
         onOpenChange={onOpenChange}
         title="New Agent"
         description="Create a new agent"
      >
         <AgentsForm
            onSuccess={() => {
               onOpenChange(false);
            }}
            onCancel={() => {
               onOpenChange(false);
            }}
         />
      </ResponsiveDialog>
   );
};

export default NewAgentDialog;
