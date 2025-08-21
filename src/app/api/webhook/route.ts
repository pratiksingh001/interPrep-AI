import { and, eq, not } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { agents, meetings } from "@/db/schema";
import { streamVideo } from "@/lib/stream-video";

import {
//    CallEndedEvent,
//    MessageNewEvent,
//    CallTranscriptionReadyEvent,
//    CallRecordingReadyEvent,
    CallSessionParticipantLeftEvent,
    CallSessionStartedEvent,
} from "@stream-io/node-sdk";
import { db } from "@/db";

function verifySignatureWithSDK(body: string, signature: string) {
   return streamVideo.verifyWebhook(body, signature);
}

export async function POST(req: NextRequest) {
   const signature = req.headers.get("x-signature");
   const apiKey = req.headers.get("x-api-key");

   if (!signature || !apiKey) {
      return NextResponse.json(
         { error: "Missing signature or api key" },
         { status: 400 }
      );
   }

   const body = await req.text();

   if (!verifySignatureWithSDK(body, signature)) {
      return NextResponse.json({ error: "Invalid Signature" }, { status: 401 });
   }

   let payload: unknown;
   try {
      payload = JSON.parse(body) as Record<string, unknown>;
   } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
   }

   const eventType = (payload as Record<string, unknown>)?.type;

   if (eventType === "call.session_started") {
      const event = payload as CallSessionStartedEvent;
      const meetingId = event.call.custom?.meetingId;

      if (!meetingId) {
         return NextResponse.json(
            { error: "Missing meetingId" },
            { status: 400 }
         );
      }

      const [exixtingMeeting] = await db
         .select()
         .from(meetings)
         .where(
            and(
               eq(meetings.id, meetingId),
               eq(meetings.status, "upcoming"),
               not(eq(meetings.status, "completed")),
               not(eq(meetings.status, "active")),
               not(eq(meetings.status, "cancelled")),
               not(eq(meetings.status, "processing"))
            )
         );

      if (!exixtingMeeting) {
         return NextResponse.json(
            { error: "Meeting not found" },
            { status: 404 }
         );
      }

      await db
         .update(meetings)
         .set({
            status: "active",
            startedAt: new Date(),
         })
         .where(eq(meetings.id, exixtingMeeting.id));
      
      const [existingAgent] = await db
         .select()
         .from(agents)
         .where(eq(agents.id, exixtingMeeting.agent_id))

      if(!existingAgent){
        return NextResponse.json(
            { error: "Agent not found" },
            { status: 404 }
         );
      }

      const call = streamVideo.video.call("default", meetingId)
      const realTimeClient = await streamVideo.video.connectOpenAi({
        call,
        openAiApiKey: process.env.OPENAI_API_KEY!,
        agentUserId: existingAgent.id
      })

      realTimeClient.updateSession({
        instructions: existingAgent.instructions
      })
   }else if(eventType === "call.session_participant_left"){
    const event = payload as CallSessionParticipantLeftEvent;
    const meetingId = event.call_cid.split(":")[1];

    if(!meetingId){
        return NextResponse.json({error: "Missing meeting id"}, {status: 400})
    }

      const call = streamVideo.video.call("default", meetingId)
      await call.end()

   }

   return NextResponse.json({ status: "ok" });
}
