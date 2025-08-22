"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Cover } from "@/components/ui/cover";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Boxes } from "@/components/ui/background-boxes";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Meteors } from "@/components/ui/meteors";
import { GlowingCard } from "@/components/ui/glowing-card";
import { GridBackground } from "@/components/ui/grid-background";
import {
   ArrowRightIcon,
   VideoIcon,
   CheckCircleIcon,
   SparklesIcon,
   StarIcon,
   ZapIcon,
   BrainIcon,
   TrendingUpIcon,
   UsersIcon,
   AwardIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const features = [
   {
      icon: BrainIcon,
      title: "AI-Powered Interview Agents",
      description:
         "Create customizable AI agents that conduct realistic interview sessions tailored to your role and experience level.",
      gradient: "from-blue-500 to-purple-600",
   },
   {
      icon: VideoIcon,
      title: "Interactive Meeting Platform",
      description:
         "Join live interview sessions with AI agents in a professional video meeting environment.",
      gradient: "from-purple-500 to-pink-600",
   },
   {
      icon: ZapIcon,
      title: "Real-time Feedback",
      description:
         "Get instant feedback on your performance, communication skills, and technical answers.",
      gradient: "from-green-500 to-teal-600",
   },
];

const stats = [
   {
      icon: UsersIcon,
      number: "10,000+",
      label: "Active Users",
      description: "Professionals trust our platform",
   },
   {
      icon: TrendingUpIcon,
      number: "95%",
      label: "Success Rate",
      description: "Users land their dream jobs",
   },
   {
      icon: AwardIcon,
      number: "50,000+",
      label: "Interviews",
      description: "Practice sessions completed",
   },
];

const benefits = [
   "🎯 Practice with industry-specific questions",
   "💪 Improve confidence in interview scenarios",
   "📊 Get detailed performance analytics",
   "🎭 Prepare for technical and behavioral interviews",
   "⏰ Access 24/7 interview practice sessions",
   "🎚️ Customize difficulty levels and focus areas",
];

export const LandingView = () => {
   return (
      <div className="min-h-screen bg-black overflow-hidden">
         {/* Navigation */}
         <motion.nav
            className="border-b border-neutral-800 bg-black/80 backdrop-blur-sm sticky top-0 z-50"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
         >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="flex justify-between items-center h-16">
                  <div className="flex items-center gap-3">
                     <motion.div
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                     >
                        <Image
                           src="/inter-prep-ai-logo.svg"
                           alt="InterPrep AI Logo"
                           width={40}
                           height={40}
                           className="rounded-lg"
                        />
                     </motion.div>
                     <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        InterPrep AI
                     </span>
                  </div>
                  <div className="flex items-center gap-4">
                     <Link href="/sign-in">
                        <Button
                           variant="ghost"
                           className="text-white hover:bg-white/10"
                        >
                           Sign In
                        </Button>
                     </Link>
                     <Link href="/sign-up">
                        <Button>Get Started</Button>
                     </Link>
                  </div>
               </div>
            </div>
         </motion.nav>

         {/* Hero Section with Text Hover Effect */}
         <section className="relative pt-20 pb-16 sm:pt-32 sm:pb-20 overflow-hidden">
            <Boxes />
            {/* <BackgroundBeams /> */}
            <Meteors number={30} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
               <div className="text-center">
                  <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.6, delay: 0.2 }}
                  >
                     <Badge
                        variant="secondary"
                        className="mb-8 text-sm font-medium bg-gradient-to-r from-primary/20 to-purple-600/20 text-primary border-primary/30"
                     >
                        <SparklesIcon className="w-4 h-4 mr-2" />
                        Your AI Interview Prep Partner
                     </Badge>
                  </motion.div>

                  <motion.div
                     initial={{ opacity: 0, y: 30 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.8, delay: 0.4 }}
                     className="mb-8"
                  >
                     <div className="text-4xl sm:text-6xl lg:text-8xl font-bold tracking-tight text-white">
                        Master Your Next{" "}
                        <Cover className="inline-block">Interview</Cover>
                     </div>
                  </motion.div>

                  <motion.p
                     className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed"
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.6, delay: 0.6 }}
                  >
                     Practice with AI-powered interview agents, receive
                     real-time feedback, and build confidence for your dream
                     job. Join thousands of professionals who have aced their
                     interviews.
                  </motion.p>

                  <motion.div
                     className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20"
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.6, delay: 0.8 }}
                  >
                     <Link href="/sign-up">
                        <Button size="lg" className="text-lg px-8 py-4 h-auto">
                           Start Practicing Now
                           <ArrowRightIcon className="h-5 w-5 ml-2" />
                        </Button>
                     </Link>
                     <Link href="/sign-in">
                        <Button
                           variant="outline"
                           size="lg"
                           className="text-lg px-8 py-4 h-auto border-gray-600 text-gray-300 hover:bg-white/10 hover:text-white"
                        >
                           <VideoIcon className="h-5 w-5 mr-2" />
                           Watch Demo
                        </Button>
                     </Link>
                  </motion.div>

                  {/* Platform Preview with Container Scroll Animation */}
                  <ContainerScroll
                     titleComponent={
                        <div className="text-center mb-4">
                           <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
                              Experience the Platform
                           </h2>
                           <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                              See how InterPrep AI transforms your interview
                              preparation
                           </p>
                        </div>
                     }
                  >
                     <Image
                        src="/inter-prep-demo.png"
                        alt="InterPrep AI Platform Preview"
                        width={1200}
                        height={675}
                        className="w-full h-full object-cover rounded-xl"
                        priority
                     />
                  </ContainerScroll>
               </div>
            </div>
         </section>

         {/* Features Section */}
         <section className="py-20 relative">
            <GridBackground>
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                  <motion.div
                     className="text-center mb-16"
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.6 }}
                     viewport={{ once: true }}
                  >
                     <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
                        Everything You Need to{" "}
                        <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                           Succeed
                        </span>
                     </h2>
                     <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Our comprehensive platform provides all the tools you
                        need to prepare for any interview scenario.
                     </p>
                  </motion.div>

                  <div className="grid md:grid-cols-3 gap-8">
                     {features.map((feature, index) => (
                        <motion.div
                           key={index}
                           initial={{ opacity: 0, y: 30 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           transition={{ duration: 0.5, delay: index * 0.2 }}
                           viewport={{ once: true }}
                        >
                           <GlowingCard className="border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300">
                              <div className="p-8">
                                 <div
                                    className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-6 shadow-lg`}
                                 >
                                    <feature.icon className="h-8 w-8 text-white" />
                                 </div>
                                 <h3 className="text-xl font-bold mb-4 text-white">
                                    {feature.title}
                                 </h3>
                                 <p className="text-gray-400 leading-relaxed">
                                    {feature.description}
                                 </p>
                              </div>
                           </GlowingCard>
                        </motion.div>
                     ))}
                  </div>
               </div>
            </GridBackground>
         </section>

         {/* Stats Section */}
         <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <motion.div
                  className="grid md:grid-cols-3 gap-8"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
               >
                  {stats.map((stat, index) => (
                     <motion.div
                        key={index}
                        className="text-center relative"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                     >
                        <div className="relative">
                           <Meteors number={3} />
                           <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-8 relative overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-purple-500/5" />
                              <stat.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                              <div className="text-4xl font-bold text-white mb-2">
                                 {stat.number}
                              </div>
                              <div className="text-xl font-semibold text-primary mb-2">
                                 {stat.label}
                              </div>
                              <div className="text-gray-400 text-sm">
                                 {stat.description}
                              </div>
                           </div>
                        </div>
                     </motion.div>
                  ))}
               </motion.div>
            </div>
         </section>

         {/* Benefits Section */}
         <section className="py-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <motion.div
                     initial={{ opacity: 0, x: -30 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     transition={{ duration: 0.6 }}
                     viewport={{ once: true }}
                  >
                     <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
                        Why Choose{" "}
                        <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                           InterPrep AI?
                        </span>
                     </h2>
                     <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                        Join thousands of professionals who have successfully
                        prepared for their interviews using our AI-powered
                        platform.
                     </p>

                     <div className="space-y-6">
                        {benefits.map((benefit, index) => (
                           <motion.div
                              key={index}
                              className="flex items-center gap-4 text-lg text-gray-300"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.4, delay: index * 0.1 }}
                              viewport={{ once: true }}
                           >
                              <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                                 <CheckCircleIcon className="h-5 w-5 text-white" />
                              </div>
                              <span>{benefit}</span>
                           </motion.div>
                        ))}
                     </div>

                     <motion.div
                        className="mt-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        viewport={{ once: true }}
                     >
                        <Link href="/sign-up">
                           <Button size="lg" className="text-lg px-8 py-4">
                              Get Started Today
                              <ArrowRightIcon className="h-5 w-5 ml-2" />
                           </Button>
                        </Link>
                     </motion.div>
                  </motion.div>

                  <motion.div
                     className="relative"
                     initial={{ opacity: 0, x: 30 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     transition={{ duration: 0.6 }}
                     viewport={{ once: true }}
                  >
                     <div className="relative">
                        <Meteors number={5} />
                        <GlowingCard className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 overflow-hidden">
                           <div className="p-10 text-center">
                              <motion.div
                                 className="w-24 h-24 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-primary/25"
                                 whileHover={{ scale: 1.1, rotate: 10 }}
                                 transition={{ duration: 0.3 }}
                              >
                                 <StarIcon className="h-12 w-12 text-white" />
                              </motion.div>
                              <h3 className="text-3xl font-bold mb-6 text-white">
                                 Ready to Excel?
                              </h3>
                              <p className="text-gray-400 mb-8 text-lg">
                                 Start your interview preparation journey today
                                 and land your dream job with confidence.
                              </p>
                              <div className="flex items-center justify-center gap-2 text-primary">
                                 <span className="text-2xl">⭐</span>
                                 <span className="font-medium">
                                    Trusted by 10,000+ professionals
                                 </span>
                              </div>
                           </div>
                        </GlowingCard>
                     </div>
                  </motion.div>
               </div>
            </div>
         </section>

         {/* CTA Section */}
         <section className="py-20 relative">
            <BackgroundBeams className="opacity-30" />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
               <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
               >
                  <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
                     Ready to Ace Your Next Interview?
                  </h2>
                  <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                     Join thousands of successful professionals who prepared
                     with InterPrep AI. Start practicing today and boost your
                     confidence.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                     <Link href="/sign-up">
                        <Button size="lg" className="text-xl px-10 py-6 h-auto">
                           Start Free Trial
                           <ArrowRightIcon className="h-6 w-6 ml-2" />
                        </Button>
                     </Link>
                     <Link href="/sign-in">
                        <Button
                           variant="outline"
                           size="lg"
                           className="text-xl px-10 py-6 h-auto border-gray-600 text-gray-300 hover:bg-white/10 hover:text-white"
                        >
                           Sign In
                        </Button>
                     </Link>
                  </div>
               </motion.div>
            </div>
         </section>

         {/* Footer */}
         <footer className="border-t border-gray-800 bg-gray-900/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
               <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-3">
                     <Image
                        src="/inter-prep-ai-logo.svg"
                        alt="InterPrep AI"
                        width={32}
                        height={32}
                     />
                     <span className="font-semibold text-white">
                        InterPrep AI
                     </span>
                  </div>
                  <div className="text-sm text-gray-400">
                     © 2024 InterPrep AI. All rights reserved.
                  </div>
               </div>
            </div>
         </footer>
      </div>
   );
};
