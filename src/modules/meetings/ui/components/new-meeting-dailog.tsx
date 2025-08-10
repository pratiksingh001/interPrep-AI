import { ResponsiveDialog } from "@/components/responsive-dialog";
import MeetingsForm from "./meetings-form";
import { useRouter } from "next/navigation";

interface NewMeetingialogProps {
   open: boolean;
   onOpenChange: (open: boolean) => void;
}

const NewMeetingDialog = ({ open, onOpenChange }: NewMeetingialogProps) => {
   const router = useRouter();

   return (
      <ResponsiveDialog
         open={open}
         onOpenChange={onOpenChange}
         title="New Meeting"
         description="Create a new meeting"
      >
         <MeetingsForm
            onSuccess={id => {
               onOpenChange(false);
               router.push(`/meetings/${id}`);
            }}
            onCancel={() => {
               onOpenChange(false);
            }}
         />
      </ResponsiveDialog>
   );
};

export default NewMeetingDialog;
