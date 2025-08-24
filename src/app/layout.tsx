import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next";

import { TRPCReactProvider } from "@/trpc/client";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
   subsets: ["latin"],
});

export const metadata: Metadata = {
   title: "interPrep AI",
   description: "Your interview prep partner",
   icons: {
      icon: [
         {
            url: "/inter-prep-ai-logo.svg",
            type: "image/svg+xml",
         },
         {
            url: "/favicon.ico",
            sizes: "32x32",
         },
      ],
   },
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <NuqsAdapter>
         <TRPCReactProvider>
            <html lang="en" suppressHydrationWarning className="dark">
               <body
                  className={`${inter.className} antialiased bg-black text-white`}
               >
                  <Toaster />
                  {children}
               </body>
            </html>
         </TRPCReactProvider>
      </NuqsAdapter>
   );
}
