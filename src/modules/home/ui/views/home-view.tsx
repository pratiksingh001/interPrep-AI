"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export const HomeView = () => {
   const { data: session } = authClient.useSession();
   const router = useRouter();

   if (!session) {
      return <p>Loading...</p>;
   }
   return (
      <div>
         <div>
            <h1 className="pb-4">Welcome {session?.user?.name}</h1>
            <Button
               className="w-full"
               onClick={() =>
                  authClient.signOut({
                     fetchOptions: {
                        onSuccess: () => router.push("/sign-in"),
                     },
                  })
               }
            >
               Sign Out
            </Button>
         </div>
      </div>
   );
};
