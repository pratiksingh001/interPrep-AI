import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuTrigger,
   DropdownMenuItem,
   DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import {
   ChevronRightIcon,
   TrashIcon,
   PencilIcon,
   MoreVerticalIcon,
} from "lucide-react";
import Link from "next/link";

interface Props {
   meetingId: string;
   meetingName: string;
   onEdit: () => void;
   onRemove: () => void;
}

export const MeetingIdViewHeader = ({
   meetingId,
   meetingName,
   onEdit,
   onRemove,
}: Props) => {
   return (
      <div className="flex items-center justify-between bg-gray-900/50 rounded-xl border border-gray-800 p-6">
         <Breadcrumb>
            <BreadcrumbList>
               <BreadcrumbItem>
                  <BreadcrumbLink
                     asChild
                     className="font-medium text-xl text-white hover:text-blue-400 transition-colors"
                  >
                     <Link href="/meetings">My Meetings</Link>
                  </BreadcrumbLink>
               </BreadcrumbItem>
               <BreadcrumbSeparator className="text-gray-400 text-xl font-medium [&>svg]:size-4">
                  <ChevronRightIcon />
               </BreadcrumbSeparator>
               <BreadcrumbItem>
                  <BreadcrumbLink
                     asChild
                     className="font-medium text-xl text-white"
                  >
                     <Link href={`/meetings/${meetingId}`}>{meetingName}</Link>
                  </BreadcrumbLink>
               </BreadcrumbItem>
            </BreadcrumbList>
         </Breadcrumb>
         <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
               <Button variant="ghost" className="text-white hover:bg-gray-800">
                  <MoreVerticalIcon />
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
               align="end"
               className="bg-gray-900 border-gray-700"
            >
               <DropdownMenuItem
                  onClick={onEdit}
                  className="text-white hover:bg-gray-800"
               >
                  <PencilIcon className="size-4 text-white" />
                  Edit
               </DropdownMenuItem>
               <DropdownMenuItem
                  onClick={onRemove}
                  className="text-white hover:bg-gray-800"
               >
                  <TrashIcon className="size-4 text-white" />
                  Delete
               </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
      </div>
   );
};
