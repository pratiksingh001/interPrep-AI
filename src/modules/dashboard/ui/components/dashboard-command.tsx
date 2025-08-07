import {
   CommandResponsiveDialog,
   CommandInput,
   CommandItem,
   CommandList,
} from "@/components/ui/command";
import { Dispatch, SetStateAction } from "react";

interface Props {
   open: boolean;
   setOpen: Dispatch<SetStateAction<boolean>>;
}

export const DashBoardCommand = ({ open, setOpen }: Props) => {
   return (
      <CommandResponsiveDialog open={open} onOpenChange={setOpen}>
         <CommandInput placeholder="Find a meeting or agent" />
         <CommandList>
            <CommandItem>Test 1</CommandItem>
            <CommandItem>Test 2</CommandItem>
            <CommandItem>Test 3</CommandItem>
         </CommandList>
      </CommandResponsiveDialog>
   );
};
