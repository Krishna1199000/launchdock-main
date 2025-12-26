"use client";

import { useState } from "react";
import { 
  MessageSquare,
  Map,
  Palette,
  Code,
  TestTube,
  Rocket,
  Settings,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const processSteps = [
  {
    icon: MessageSquare,
    title: "Consultation",
    description:
      "We start by understanding your goals, vision, and business objectives so every pixel and feature is aligned with your outcomes.",
    number: "01",
    project: {
      name: "SaaS Launchpad",
      type: "Discovery & Strategy",
      metric: "+38% conversion from first call to proposal",
      accent: "from-emerald-400/80 via-emerald-500/80 to-sky-500/80",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop&q=80",
    },
  },
  {
    icon: Map,
    title: "Planning",
    description:
      "We create a crystal-clear roadmap with milestones, ownership, and timelines so you always know exactly what's happening next.",
    number: "02",
    project: {
      name: "Creator OS",
      type: "Product Roadmapping",
      metric: "-42% time-to-launch across multiple releases",
      accent: "from-sky-500/80 via-cyan-500/80 to-indigo-500/80",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop&q=80",
    },
  },
  {
    icon: Palette,
    title: "Designing",
    description:
      "We design immersive, on-brand experiences with motion and micro-interactions that make your product feel premium and alive.",
    number: "03",
    project: {
      name: "Neon Commerce",
      type: "Product & Brand Design",
      metric: "+71% increase in session duration post re-design",
      accent: "from-pink-500/80 via-fuchsia-500/80 to-violet-500/80",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop&q=80",
    },
  },
  {
    icon: Code,
    title: "Development",
    description:
      "Our engineers ship clean, scalable, and blazingly fast experiences using modern stacks and best practices.",
    number: "04",
    project: {
      name: "LaunchDock Studio",
      type: "Full-stack Platform",
      metric: "Core vitals in the top 5% across the industry",
      accent: "from-indigo-500/80 via-blue-500/80 to-cyan-500/80",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop&q=80",
    },
  },
  {
    icon: TestTube,
    title: "Testing",
    description:
      "We pressure-test flows, integrations, and edge cases to make sure everything feels stable, smooth, and trustworthy.",
    number: "05",
    project: {
      name: "Ops Console",
      type: "QA & Reliability",
      metric: "99.98% uptime under real-world load",
      accent: "from-emerald-500/80 via-lime-500/80 to-amber-400/80",
      image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&h=600&fit=crop&q=80",
    },
  },
  {
    icon: Rocket,
    title: "Launch",
    description:
      "We orchestrate a stress-free launch, optimize for performance, and monitor live metrics so you can go to market with confidence.",
    number: "06",
    project: {
      name: "Stealth Fintech",
      type: "Launch & Scale",
      metric: "First 10k users onboarded in under 30 days",
      accent: "from-orange-500/80 via-rose-500/80 to-red-500/80",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop&q=80",
    },
  },
  {
    icon: Settings,
    title: "Maintenance",
    description:
      "We stay in the loop with ongoing improvements, optimizations, and new experiments as your product and team grow.",
    number: "07",
    project: {
      name: "Growth Engine",
      type: "Continuous Delivery",
      metric: "Weekly releases without breaking core flows",
      accent: "from-sky-500/80 via-emerald-500/80 to-teal-500/80",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80",
    },
  },
];

type Props = {
  onAction?: () => void;
};

const OurProcess = ({ onAction }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = processSteps[activeIndex];

  return (
    <section
      id="our-process"
      className="relative overflow-hidden bg-background py-16 sm:py-20"
    >
      {/* Background orbits */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-[-10%] h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-[-10%] h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-4xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-primary/80 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_0_6px_rgba(59,130,246,0.35)]" />
            Our Process
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            How We Build{" "}
            <span className="bg-gradient-to-r from-primary via-sky-400 to-violet-500 bg-clip-text text-transparent">
              Exceptional Experiences
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg md:text-xl leading-relaxed text-muted-foreground">
            From the very first conversation to ongoing optimization,
            everything is designed to feel premium, transparent, and fast.
            Watch how a featured project evolves at every stage.
          </p>
        </div>

        {/* Layout: steps + featured project */}
        <div className="mx-auto flex max-w-7xl flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1.3fr)] lg:items-start">
          {/* Steps column */}
          <div>
            {/* Progress rail - desktop */}
            <div className="relative mb-10 hidden lg:block">
              <div className="h-1 w-full overflow-hidden rounded-full bg-border/50">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary via-sky-400 to-violet-500"
                  initial={{ width: "0%" }}
                  animate={{
                    width: `${((activeIndex + 1) / processSteps.length) * 100}%`,
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                <span>
                  Step {String(activeIndex + 1).padStart(2, "0")} of{" "}
                  {String(processSteps.length).padStart(2, "0")}
                </span>
                <span>Scroll or hover through the journey</span>
              </div>
          </div>

            <div className="space-y-4 sm:space-y-5">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
                const isActive = index === activeIndex;
              
              return (
                  <motion.button
                    key={step.title}
                    type="button"
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    whileHover={{ y: -4, scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: index * 0.04 }}
                    className={`group relative w-full overflow-hidden rounded-3xl border px-4 py-4 text-left shadow-sm transition-all duration-300 sm:px-5 sm:py-5 md:px-6 md:py-6 ${
                      isActive
                        ? "border-primary/70 bg-gradient-to-br from-primary/8 via-background/90 to-sky-500/5 shadow-primary/20"
                        : "border-border/60 bg-card/60 hover:border-primary/40 hover:bg-card/80"
                    }`}
                  >
                    {/* Glow accent */}
                    <motion.div
                      className="pointer-events-none absolute inset-0 opacity-0 mix-blend-screen group-hover:opacity-100"
                      initial={false}
                      animate={{ opacity: isActive ? 1 : 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="absolute -inset-24 bg-radial from-primary/15 via-transparent to-transparent" />
                    </motion.div>

                    <div className="relative flex items-start gap-4 sm:gap-5">
                      {/* Step index */}
                      <div className="flex flex-col items-center gap-3">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-2xl text-sm font-bold text-primary-foreground shadow-lg shadow-primary/40 transition-all duration-300 sm:h-14 sm:w-14 sm:text-base ${
                            isActive
                              ? "bg-gradient-to-br from-primary via-sky-500 to-violet-500 scale-105"
                              : "bg-primary"
                          }`}
                        >
                          {step.number}
                        </div>
                        <div className="hidden h-20 w-px rounded-full bg-gradient-to-b from-primary/40 via-border/50 to-transparent sm:block" />
                      </div>

                      {/* Main content */}
                      <div className="flex-1">
                        <div className="mb-3 flex flex-wrap items-center gap-3 sm:mb-4">
                          <div className="flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                            <Icon className="h-3.5 w-3.5 text-primary" />
                            <span>{step.title}</span>
                          </div>
                          <span className="text-xs text-muted-foreground/80">
                            Phase {index + 1} &mdash;{" "}
                            {index === 0
                              ? "Kickoff & alignment"
                              : index === processSteps.length - 1
                              ? "Long-term support"
                              : "In-flight build"}
                          </span>
                        </div>

                        <p className="text-sm sm:text-[15px] md:text-base leading-relaxed text-muted-foreground">
                          {step.description}
                        </p>

                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-[13px] text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            <span>
                              Typical duration:{" "}
                              {index === 0
                                ? "1–2 days"
                                : index === 1
                                ? "3–5 days"
                                : index === 2
                                ? "1–2 weeks"
                                : index === 3
                                ? "2–6 weeks"
                                : index === 4
                                ? "3–7 days"
                                : index === 5
                                ? "Launch week"
                                : "Ongoing"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="hidden sm:inline text-muted-foreground/70">
                              See featured project impact
                            </span>
                            <ArrowRight className="h-4 w-4 text-primary transition-transform duration-300 group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Featured project column */}
          <motion.div
            key={activeStep.title}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="relative"
          >
            {/* Floating glow */}
            <div className="pointer-events-none absolute -inset-8 rounded-[32px] bg-gradient-to-br from-primary/15 via-sky-500/10 to-violet-500/10 opacity-80 blur-2xl" />

            <div className="relative overflow-hidden rounded-[28px] border border-border/80 bg-gradient-to-br from-background/90 via-background/90 to-slate-950/90 shadow-[0_24px_80px_rgba(15,23,42,0.75)]">
              <div className="flex items-center justify-between gap-4 border-b border-border/80 bg-gradient-to-r from-slate-950/80 via-slate-900/80 to-slate-950/80 px-5 py-4 sm:px-6">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground/80">
                    Featured Project Snapshot
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Currently in{" "}
                    <span className="font-medium text-primary">
                      {activeStep.title}
                    </span>{" "}
                    phase
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="text-xs text-muted-foreground">
                    Live in production
                  </span>
                </div>
              </div>

              <div className="space-y-6 px-5 py-6 sm:px-6 sm:py-7">
                {/* Hero project tile */}
                <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-gradient-to-br from-slate-950 via-slate-950/95 to-slate-900/90 p-5 sm:p-6">
                  <motion.div
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${activeStep.project.accent} opacity-60 mix-blend-soft-light`}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />

                  <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-300/80">
                        {activeStep.project.type}
                      </p>
                      <h3 className="mt-2 font-display text-xl sm:text-2xl font-semibold tracking-tight text-white">
                        {activeStep.project.name}
                      </h3>
                      <p className="mt-2 max-w-md text-xs sm:text-sm text-slate-200/80">
                        We paired strategic thinking with bold motion design and
                        rock-solid engineering to make this product feel
                        instantly premium.
                      </p>
                    </div>

                    <div className="mt-2 flex flex-col items-start gap-2 sm:items-end">
                      <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-300 ring-1 ring-emerald-400/40">
                        {activeStep.project.metric}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-200/80">
                        <span className="inline-flex h-6 items-center rounded-full bg-slate-900/80 px-2 text-[11px] font-medium text-slate-100 ring-1 ring-white/10">
                          ✦ Built with LaunchDock
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Animated mock window */}
                  <div className="relative mt-5 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 p-3 shadow-inner">
                    <div className="mb-2 flex items-center justify-between text-[10px] font-medium text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-300/80" />
                        <span className="h-1.5 w-1.5 rounded-full bg-rose-400/80" />
                      </div>
                      <span>Preview · {activeStep.title}</span>
                    </div>

                    <div className="relative h-32 sm:h-36 overflow-hidden rounded-xl bg-transparent">
                      {/* Background image */}
                      <motion.img
                        key={activeStep.title}
                        src={activeStep.project.image}
                        alt={activeStep.title}
                        className="absolute inset-0 h-full w-full object-cover"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5 }}
                      />
                      
                      {/* Content overlay */}
                      <motion.div
                        className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border border-white/10 bg-black/70 backdrop-blur-sm px-3 py-2 text-[11px] text-slate-100"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                      >
                        <span className="truncate">
                          {activeStep.title} ·{" "}
                          <span className="text-slate-300">
                            {activeStep.description.slice(0, 80)}
                            {activeStep.description.length > 80 ? "…" : ""}
                          </span>
                        </span>
                        <ArrowRight className="ml-2 h-3.5 w-3.5 text-sky-300" />
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Meta + CTA */}
                <div className="flex flex-col gap-4 border-t border-border/70 pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-xs sm:text-[13px] text-muted-foreground">
                    <p className="font-medium text-foreground">
                      Ready to see your idea in this spotlight?
                    </p>
                    <p className="mt-1">
                      We’ll map your product into this process and show you the
                      potential impact before we write a single line of code.
                    </p>
        </div>

          <Button 
            variant="hero" 
                    size="lg"
                    className="group w-full justify-center sm:w-auto shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40"
                    onClick={onAction}
                  >
                    Book a build session
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurProcess;
