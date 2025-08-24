import { MeetingGetOne } from "../../types"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SparkleIcon, FileTextIcon, FileVideoIcon, ClockFadingIcon, BookOpenTextIcon } from "lucide-react"
import Markdown from "react-markdown"
import Link from "next/link"
import { GeneratedAvatar } from "@/components/generated-avatar"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { formatDuration } from "@/lib/utils"
import { Transcript } from "./transcript"

interface Props {
    data: MeetingGetOne
}
export const CompletedState = ({data}: Props) => {
    return (
        <div className="flex flex-col gap-y-4">
            <Tabs defaultValue="summary">
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl px-2 sm:px-3">
                    <ScrollArea>
                        <TabsList className="p-0 bg-transparent justify-start rounded-none h-13">
                            <TabsTrigger
                            className="text-gray-400 rounded-none bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-white data-[state=active]:text-white h-full hover:text-gray-200 "
                             value="summary"
                            >
                                <BookOpenTextIcon className="size-4" />
                                Summary
                            </TabsTrigger>
                            <TabsTrigger
                            className="text-gray-400 rounded-none bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-white data-[state=active]:text-white h-full hover:text-gray-200 "
                             value="transcript"
                            >
                                <FileTextIcon className="size-4" />
                                Transcript
                            </TabsTrigger>
                            <TabsTrigger
                            className="text-gray-400 rounded-none bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-white data-[state=active]:text-white h-full hover:text-gray-200 "
                             value="recording"
                            >
                                <FileVideoIcon className="size-4" />
                                Recording
                            </TabsTrigger>
                        </TabsList>
                        <ScrollBar orientation="horizontal"/>
                    </ScrollArea>
                </div>

                <TabsContent value="transcript">
                    <Transcript meetingId={data.id} />
                </TabsContent>
                <TabsContent value="recording">
                    <div className="bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-6 sm:px-6 sm:py-8">
                        <video 
                            src={data.recordingUrl!}
                            className="w-full max-w-full rounded-lg"
                            controls
                        />
                    </div>
                </TabsContent>
                <TabsContent value="summary">
                    <div className="bg-gray-900/50 border border-gray-800 rounded-xl">
                        <div className="px-4 py-6 sm:px-6 sm:py-8 gap-y-4 sm:gap-y-6 flex flex-col">
                            <h2 className="text-xl sm:text-2xl font-medium capitalize text-white break-words">{data.name}</h2>
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-x-3 sm:items-center">
                                <Link
                                    href={`/agents/${data.agent.id}`}
                                    className="flex items-center gap-x-2 underline underline-offset-4 capitalize text-gray-300 hover:text-white transition-colors"
                                >
                                    <GeneratedAvatar 
                                        variant="botttsNeutral"
                                        seed={data.agent.name}
                                        className="size-5"
                                    />
                                    {data.agent.name}
                                </Link>
                                <p className="text-sm sm:text-base text-gray-400">{data.startedAt ? format(data.startedAt, "PPP") : ""}</p>
                            </div>
                            <div className="flex gap-x-2 items-center">
                                <SparkleIcon className="size-4 text-blue-400" />
                                <p className="text-gray-300 font-medium">General Summary</p>
                            </div>
                            <Badge
                                variant="outline"
                                className="bg-blue-500/20 text-blue-300 border-blue-500/30 flex items-center gap-x-2 [&>svg]:size-4 w-fit"
                            >
                                <ClockFadingIcon />
                                {data.duration ? formatDuration(data.duration) : "No duration"}
                            </Badge>
                            <div className="prose prose-invert max-w-none">
                                <Markdown
                                    components={{
                                        h1: (props) => (
                                            <h1 className="text-xl sm:text-2xl font-medium mb-4 sm:mb-6 text-white" {...props} />
                                        ),
                                        h2: (props) => (
                                            <h2 className="text-lg sm:text-xl font-medium mb-4 sm:mb-6 text-white" {...props} />
                                        ),
                                        h3: (props) => (
                                            <h3 className="text-base sm:text-lg font-medium mb-4 sm:mb-6 text-white" {...props} />
                                        ),
                                        h4: (props) => (
                                            <h4 className="text-sm sm:text-base font-medium mb-4 sm:mb-6 text-white" {...props} />
                                        ),
                                        p: (props) => (
                                            <p className="mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base text-gray-300" {...props} />
                                        ),
                                        ul: (props) => (
                                            <ul className="list-disc list-inside mb-4 sm:mb-6 text-sm sm:text-base text-gray-300" {...props} />
                                        ),
                                        ol: (props) => (
                                            <ol className="list-decimal list-inside mb-4 sm:mb-6 text-sm sm:text-base text-gray-300" {...props} />
                                        ),
                                        li: (props) => (
                                            <li className="mb-1 text-gray-300" {...props} />
                                        ),
                                        strong: (props) => (
                                            <strong className="font-semibold text-white" {...props} />
                                        ),
                                        code: (props) => (
                                            <code className="bg-gray-800 px-2 py-1 rounded text-gray-200" {...props} />
                                        ),
                                        blockquote: (props) => (
                                            <blockquote className="border-l-4 border-gray-600 pl-4 italic my-4 text-gray-400" {...props} />
                                        ),
                                    }}
                                >
                                    {data.summary}
                                </Markdown>
                            </div>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    ) 
}