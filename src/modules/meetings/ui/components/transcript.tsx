import {useState} from "react"
import { format } from "date-fns"
import { SearchIcon } from "lucide-react"
import Highlighter from "react-highlight-words"
import { useQuery } from "@tanstack/react-query"

import { useTRPC } from "@/trpc/client"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { generateAvatarUri } from "@/lib/avatar"

interface Props {
    meetingId: string;
}

export const Transcript = ({ meetingId }: Props) => {
    const trpc = useTRPC()
    const {data} = useQuery(trpc.meetings.getTranscript.queryOptions({ id: meetingId }))
    const [searchQuery , setSearchQuery] = useState("")
    const filterData = (data ?? []).filter((item) => {
        return item.text.toString().toLowerCase().includes(searchQuery.toLowerCase())
    })

    return (
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-6 sm:px-6 sm:py-8 flex flex-col gap-y-4 sm:gap-y-6 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                <p className="text-lg sm:text-xl font-medium text-white">Transcript</p>
                <div className="relative">
                    <Input 
                        placeholder="Search transcript..."
                        className="pl-9 h-9 w-full sm:w-[200px] bg-gray-800/50 border-gray-700 text-gray-200 placeholder:text-gray-400 focus:border-gray-600"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <SearchIcon 
                        className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400"
                    />
                </div>
            </div>
            <ScrollArea className="h-96">
                <div className="flex flex-col gap-y-4">
                    {filterData.map((item) => {
                        return(
                            <div 
                                key={item.start_ts}
                                className="flex flex-col gap-y-3 hover:bg-gray-800/30 p-4 rounded-lg border border-gray-800/50 transition-colors"
                            >
                                <div className="flex gap-x-3 items-center">
                                    <Avatar className="size-7">
                                        <AvatarImage 
                                            src={item.user.image ?? generateAvatarUri({ seed: String(item.user.name), variant : "initials"})}
                                            alt="User Avatar"
                                        />
                                    </Avatar>
                                    <p className="text-sm font-medium text-white">{String(item.user.name)}</p>
                                    <p className="text-sm text-blue-400 font-medium">
                                        {format(new Date(0,0,0,0,0,0, item.start_ts), "mm:ss")}
                                    </p>
                                </div>
                                <div className="ml-10">
                                    <Highlighter
                                        className="text-sm text-gray-300 leading-relaxed"
                                        highlightClassName="bg-blue-500/30 text-blue-200 px-1 rounded"
                                        searchWords={[searchQuery]}
                                        autoEscape={true}
                                        textToHighlight={item.text}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </ScrollArea>
        </div>
    )
}