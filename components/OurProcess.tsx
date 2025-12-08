"use client"
import { 
  MessageSquare,
  Map,
  Palette,
  Code,
  TestTube,
  Rocket,
  Settings,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const processSteps = [
  {
    icon: MessageSquare,
    title: "Consultation",
    description: "We start by understanding your goals, vision, and business objectives. Through detailed discussions, we identify the best path forward for your project.",
    number: "01"
  },
  {
    icon: Map,
    title: "Planning",
    description: "We create a comprehensive roadmap with clear requirements, timelines, and milestones. Every detail is mapped out before we begin development.",
    number: "02"
  },
  {
    icon: Palette,
    title: "Designing",
    description: "Our design team crafts beautiful UI/UX experiences, creates prototypes, and establishes your brand identity. Design is where vision becomes visual.",
    number: "03"
  },
  {
    icon: Code,
    title: "Development",
    description: "Expert developers bring designs to life with clean code, seamless integrations, and smooth animations. Quality and performance are our priorities.",
    number: "04"
  },
  {
    icon: TestTube,
    title: "Testing",
    description: "Rigorous quality assurance ensures everything works perfectly. We test responsiveness, functionality, and performance across all devices and browsers.",
    number: "05"
  },
  {
    icon: Rocket,
    title: "Launch",
    description: "We deploy your project with precision, optimize for performance, and ensure a smooth launch. Your digital product goes live with confidence.",
    number: "06"
  },
  {
    icon: Settings,
    title: "Maintenance",
    description: "Ongoing support, updates, and monitoring keep your project running smoothly. We're here for the long term, ensuring continuous improvement.",
    number: "07"
  }
];

const OurProcess = () => {
  return (
    <section id="our-process" className="py-32 relative bg-background overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/3 rounded-full blur-[100px] animate-float-delayed" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h2 
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground animate-slide-up"
          >
            How We Build{" "}
            <span className="text-gradient">Exceptional Experiences</span>
          </h2>
          <p 
            className="text-lg md:text-xl text-muted-foreground leading-relaxed animate-slide-up-delayed"
          >
            Our proven process ensures clarity, transparency, and professionalism at every step. 
            From initial consultation to ongoing maintenance, we're with you throughout your journey.
          </p>
        </div>

        {/* Horizontal Stepper with Progress Bar */}
        <div className="max-w-7xl mx-auto">
          {/* Progress Bar - Desktop */}
          <div className="hidden lg:block relative mb-16">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-border/30 -translate-y-1/2" />
            <div 
              className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-primary via-primary to-primary/50 -translate-y-1/2 transition-all duration-1000"
              style={{ 
                width: '100%',
                animation: 'progress-fill 2s ease-out forwards'
              }}
            />
          </div>

          {/* Steps Grid - Horizontal Flow */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-6 lg:gap-4">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              const totalSteps = processSteps.length;
              const progress = ((index + 1) / totalSteps) * 100;
              
              return (
                <div
                  key={index}
                  className="group relative"
                  style={{
                    animation: `slide-up-scale 0.8s ease-out forwards`,
                    animationDelay: `${index * 0.15}s`,
                    opacity: 0,
                    transform: 'translateY(30px) scale(0.9)'
                  }}
                >
                  {/* Step Card */}
                  <div className="
                    relative
                    h-full
                    flex
                    flex-col
                    items-center
                    text-center
                    p-6
                    lg:p-8
                    rounded-3xl
                    bg-card/30
                    backdrop-blur-sm
                    border
                    border-border/20
                    transition-all
                    duration-700
                    group-hover:bg-card/50
                    group-hover:border-primary/30
                    group-hover:shadow-2xl
                    group-hover:shadow-primary/10
                    group-hover:-translate-y-4
                    group-hover:scale-105
                  ">
                    {/* Number Badge - Top */}
                    <div className="
                      absolute
                      -top-6
                      left-1/2
                      -translate-x-1/2
                      w-14
                      h-14
                      rounded-2xl
                      bg-primary
                      text-primary-foreground
                      flex
                      items-center
                      justify-center
                      font-bold
                      text-xl
                      shadow-lg
                      shadow-primary/30
                      transition-all
                      duration-700
                      group-hover:scale-125
                      group-hover:rotate-12
                      group-hover:shadow-xl
                      group-hover:shadow-primary/40
                      z-20
                    ">
                      {step.number.slice(-1)}
                    </div>

                    {/* Icon Container */}
                    <div className="
                      w-20
                      h-20
                      rounded-2xl
                      bg-primary/10
                      flex
                      items-center
                      justify-center
                      mb-6
                      mt-4
                      transition-all
                      duration-700
                      group-hover:bg-primary/20
                      group-hover:scale-110
                      group-hover:rotate-6
                    ">
                      <Icon className="w-10 h-10 text-primary transition-transform duration-700 group-hover:scale-110" />
                    </div>

                    {/* Content */}
                    <h3 className="
                      font-display
                      text-xl
                      md:text-2xl
                      font-bold
                      mb-3
                      text-foreground
                      transition-colors
                      duration-500
                      group-hover:text-primary
                      tracking-tight
                    ">
                      {step.title}
                    </h3>
                    <p className="
                      text-muted-foreground
                      leading-relaxed
                      text-sm
                      md:text-base
                      font-light
                    ">
                      {step.description}
                    </p>

                    {/* Connecting Arrow - Desktop Only */}
                    {index < processSteps.length - 1 && (
                      <div className="hidden xl:block absolute -right-2 top-1/2 -translate-y-1/2 z-10">
                        <ArrowRight className="w-6 h-6 text-primary/30 group-hover:text-primary/60 transition-colors" />
                      </div>
                    )}
                  </div>

                  {/* Progress Indicator - Mobile/Tablet */}
                  <div className="lg:hidden mt-4 flex items-center justify-center gap-2">
                    {processSteps.map((_, i) => (
                      <div
                        key={i}
                        className={`
                          w-2 h-2 rounded-full transition-all duration-500
                          ${i <= index ? 'bg-primary w-8' : 'bg-border/30'}
                        `}
                        style={{
                          animationDelay: `${i * 0.1}s`
                        }}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-24 animate-fade-in" style={{ animationDelay: '1.2s', opacity: 0 }}>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-light tracking-tight">
            Ready to start your project?
          </p>
          <Button 
            variant="hero" 
            size="xl"
            className="group shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
            asChild
          >
            <Link href="/signup">
              Get Started Today
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Button>
        </div>
      </div>

    </section>
  );
};

export default OurProcess;

