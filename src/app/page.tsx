import { auth } from "@/lib/auth";
import { LandingView } from "@/modules/landing/ui/views/landing-view";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Page = async () => {
   const session = await auth.api.getSession({
      headers: await headers(),
   });

   if (session) {
      redirect("/meetings");
   }

   return <LandingView />;
};

export default Page;
