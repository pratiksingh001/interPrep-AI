"use client";

import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
   ArrowRightIcon,
   BotIcon,
   VideoIcon,
   CheckCircleIcon,
   SparklesIcon,
   StarIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const features = [
   {
      icon: BotIcon,
      title: "AI-Powered Interview Agents",
      description:
         "Create customizable AI agents that conduct realistic interview sessions tailored to your role and experience level.",
   },
   {
      icon: VideoIcon,
      title: "Interactive Meeting Platform",
      description:
         "Join live interview sessions with AI agents in a professional video meeting environment.",
   },
   {
      icon: SparklesIcon,
      title: "Real-time Feedback",
      description:
         "Get instant feedback on your performance, communication skills, and technical answers.",
   },
];

const benefits = [
   "Practice with industry-specific questions",
   "Improve confidence in interview scenarios",
   "Get detailed performance analytics",
   "Prepare for technical and behavioral interviews",
   "Access 24/7 interview practice sessions",
   "Customize difficulty levels and focus areas",
];

export const LandingView = () => {
   return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
         {/* Navigation */}
         <nav className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="flex justify-between items-center h-16">
                  <div className="flex items-center gap-3">
                     <Image
                        src="/inter-prep-ai-logo.svg"
                        alt="InterPrep AI Logo"
                        width={40}
                        height={40}
                        className="rounded-lg"
                     />
                     <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                        InterPrep AI
                     </span>
                  </div>
                  <div className="flex items-center gap-4">
                     <Link href="/sign-in">
                        <Button variant="ghost">Sign In</Button>
                     </Link>
                     <Link href="/sign-up">
                        <Button>Get Started</Button>
                     </Link>
                  </div>
               </div>
            </div>
         </nav>

         {/* Hero Section */}
         <section className="relative pt-20 pb-16 sm:pt-24 sm:pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="text-center">
                  <Badge
                     variant="secondary"
                     className="mb-6 text-sm font-medium"
                  >
                     🚀 Your AI Interview Prep Partner
                  </Badge>

                  <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8">
                     Master Your Next{" "}
                     <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent">
                        Interview
                     </span>
                  </h1>

                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
                     Practice with AI-powered interview agents, receive
                     real-time feedback, and build confidence for your dream
                     job. Join thousands of professionals who've aced their
                     interviews.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                     <Link href="/sign-up">
                        <Button
                           size="sm"
                           className="text-sm px-8 py-4 h-auto inline-flex items-center gap-2"
                        >
                           Start Practicing Now
                           <ArrowRightIcon className="h-5 w-5" />
                        </Button>
                     </Link>
                     <Link href="/sign-in">
                        <Button
                           variant="outline"
                           size="sm"
                           className="text-sm px-8 py-4 h-auto inline-flex items-center gap-2"
                        >
                           <VideoIcon className="h-5 w-5" />
                           Watch Demo
                        </Button>
                     </Link>
                  </div>

                  {/* Platform Preview */}
                  <div className="relative max-w-5xl mx-auto">
                     <div className="relative rounded-2xl border bg-card shadow-2xl overflow-hidden">
                        <Image
                           src="/inter-prep-demo.png"
                           alt="InterPrep AI Platform Preview"
                           width={1200}
                           height={675}
                           className="w-full h-auto"
                           priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Features Section */}
         <section className="py-20 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="text-center mb-16">
                  <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                     Everything You Need to{" "}
                     <span className="text-primary">Succeed</span>
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                     Our comprehensive platform provides all the tools you need
                     to prepare for any interview scenario.
                  </p>
               </div>

               <div className="grid md:grid-cols-3 gap-8">
                  {features.map((feature, index) => (
                     <Card
                        key={index}
                        className="border-0 bg-background/60 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:scale-105"
                     >
                        <CardHeader>
                           <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                              <feature.icon className="h-6 w-6 text-primary" />
                           </div>
                           <CardTitle className="text-xl">
                              {feature.title}
                           </CardTitle>
                           <CardDescription className="text-base leading-relaxed">
                              {feature.description}
                           </CardDescription>
                        </CardHeader>
                     </Card>
                  ))}
               </div>
            </div>
         </section>

         {/* Benefits Section */}
         <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div>
                     <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                        Why Choose{" "}
                        <span className="text-primary">InterPrep AI?</span>
                     </h2>
                     <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                        Join thousands of professionals who have successfully
                        prepared for their interviews using our AI-powered
                        platform.
                     </p>

                     <div className="space-y-4">
                        {benefits.map((benefit, index) => (
                           <div key={index} className="flex items-center gap-3">
                              <CheckCircleIcon className="h-5 w-5 text-primary flex-shrink-0" />
                              <span className="text-muted-foreground">
                                 {benefit}
                              </span>
                           </div>
                        ))}
                     </div>

                     <div className="mt-8 pt-8 border-t">
                        <Link href="/sign-up">
                           <Button
                              size="lg"
                              className="inline-flex items-center gap-2"
                           >
                              Get Started Today
                              <ArrowRightIcon className="h-4 w-4" />
                           </Button>
                        </Link>
                     </div>
                  </div>

                  <div className="relative">
                     <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                        <CardContent className="p-8">
                           <div className="text-center">
                              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                 <StarIcon className="h-10 w-10 text-primary" />
                              </div>
                              <h3 className="text-2xl font-bold mb-4">
                                 Ready to Excel?
                              </h3>
                              <p className="text-muted-foreground mb-6">
                                 Start your interview preparation journey today
                                 and land your dream job with confidence.
                              </p>
                              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                                 <span>⭐</span>
                                 <span>Trusted by 10,000+ professionals</span>
                              </div>
                           </div>
                        </CardContent>
                     </Card>
                  </div>
               </div>
            </div>
         </section>

         {/* CTA Section */}
         <section className="py-20 bg-muted/30">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
               <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  Ready to Ace Your Next Interview?
               </h2>
               <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Join thousands of successful professionals who prepared with
                  InterPrep AI. Start practicing today and boost your
                  confidence.
               </p>
               <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/sign-up">
                     <Button
                        size="lg"
                        className="text-lg px-8 py-6 h-auto inline-flex items-center gap-2"
                     >
                        Start Free Trial
                        <ArrowRightIcon className="h-5 w-5" />
                     </Button>
                  </Link>
                  <Link href="/sign-in">
                     <Button
                        variant="outline"
                        size="lg"
                        className="text-lg px-8 py-6 h-auto"
                     >
                        Sign In
                     </Button>
                  </Link>
               </div>
            </div>
         </section>

         {/* Footer */}
         <footer className="border-t bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
               <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-3">
                     <Image
                        src="/inter-prep-ai-logo.svg"
                        alt="InterPrep AI"
                        width={32}
                        height={32}
                     />
                     <span className="font-semibold text-foreground">
                        InterPrep AI
                     </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                     © 2024 InterPrep AI. All rights reserved.
                  </div>
               </div>
            </div>
         </footer>
      </div>
   );
};
