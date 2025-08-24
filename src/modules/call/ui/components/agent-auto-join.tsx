"use client";

import { useEffect } from "react";
import { useCall } from "@stream-io/video-react-sdk";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";

export const AgentAutoJoin = () => {
   const call = useCall();
   const trpc = useTRPC();
   
   const { mutateAsync: generateAgentToken } = useMutation(
      trpc.meetings.generateAgentToken.mutationOptions()
   );

   useEffect(() => {
      if (!call) return;

      const handleAgentJoin = async () => {
         try {
            // Get call custom data which includes agent info
            const customData = call.state.custom;
            const agentId = customData?.agentId;
            const agentInstructions = customData?.agentInstructions;

            if (!agentId || !agentInstructions) {
               console.log("No agent configuration found for this call");
               return;
            }

            // Generate agent token with context
            await generateAgentToken({ agentId });
            
            console.log(`Agent ${customData?.agentName} is ready to join with context:`);
            console.log(`Role: ${customData?.agentName}`);
            console.log(`Instructions: ${agentInstructions}`);
            
            // Store agent context in sessionStorage so it can be accessed by other components
            if (typeof window !== 'undefined') {
               sessionStorage.setItem('agentContext', JSON.stringify({
                  agentId,
                  agentName: customData?.agentName,
                  instructions: agentInstructions,
                  isInitialized: true
               }));
            }
            
         } catch (error) {
            console.error("Failed to initialize agent:", error);
         }
      };

      // Wait for call to be fully initialized
      const subscription = call.state.custom$.subscribe((customData) => {
         if (customData && call.state.callingState === "joined") {
            handleAgentJoin();
         }
      });

      return () => {
         subscription.unsubscribe();
      };
   }, [call, generateAgentToken]);

   return null; // This is a utility component with no UI
};