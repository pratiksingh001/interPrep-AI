import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next";

import { TRPCReactProvider } from "@/trpc/client";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
   subsets: ["latin"],
});

export const metadata: Metadata = {
   title: "InterPrep AI",
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
            <html lang="en" suppressHydrationWarning>
               <body className={`${inter.className} antialiased`}>
                  <ThemeProvider
                     attribute="class"
                     defaultTheme="system"
                     enableSystem
                     disableTransitionOnChange
                  >
                     <Toaster />
                     {children}
                  </ThemeProvider>
               </body>
            </html>
         </TRPCReactProvider>
      </NuqsAdapter>
   );
}
