import { ResponsiveDialog } from "@/components/responsive-dialog";
import MeetingsForm from "./meetings-form";
import { MeetingGetOne } from "../../types";

interface UpdateMeetingialogProps {
   open: boolean;
   onOpenChange: (open: boolean) => void;
   initialValues: MeetingGetOne;
}

const UpdateMeetingDialog = ({
   open,
   onOpenChange,
   initialValues,
}: UpdateMeetingialogProps) => {
   return (
      <ResponsiveDialog
         open={open}
         onOpenChange={onOpenChange}
         title="Edit Meeting"
         description="Change the meeting details"
      >
         <MeetingsForm
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

export default UpdateMeetingDialog;
