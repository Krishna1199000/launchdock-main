"use client"
import { 
  Sparkles, 
  Zap, 
  Shield, 
  Clock, 
  DollarSign, 
  Headphones, 
  Layers,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const features = [
  {
    icon: Sparkles,
    title: "Custom-Built Solutions",
    description: "Every project is tailored to your unique needs. No templates, no shortcuts—just solutions designed specifically for your business."
  },
  {
    icon: Zap,
    title: "High-Quality Design & Animation",
    description: "Pixel-perfect designs with smooth animations that captivate users and elevate your brand's digital presence."
  },
  {
    icon: Clock,
    title: "Fast Delivery & Transparent Process",
    description: "Agile workflows ensure timely delivery. We keep you informed at every step with clear communication and progress updates."
  },
  {
    icon: DollarSign,
    title: "Affordable Pricing",
    description: "Premium quality doesn't mean premium prices. We offer competitive rates without compromising on excellence."
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Your success is our priority. Round-the-clock support ensures you're never left in the dark when you need us most."
  },
  {
    icon: Layers,
    title: "End-to-End Services",
    description: "From initial design to development, deployment, and maintenance—we handle every aspect of your digital journey."
  }
];

const WhyChooseUs = () => {
  return (
    <section id="why-choose-us" className="py-16 relative bg-background">
      {/* Subtle Background Effects - Very minimal */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-foreground/1 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-foreground/0.5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h2 
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground animate-slide-up"
          >
            Why Businesses{" "}
            <span className="text-gradient">Trust LaunchDock</span>
          </h2>
          <p 
            className="text-lg md:text-xl text-muted-foreground leading-relaxed animate-slide-up-delayed"
          >
            We don't just build products—we craft experiences that drive growth, 
            engage users, and transform businesses.
          </p>
        </div>

        {/* Features List - Vertical Timeline Style */}
        <div className="max-w-5xl mx-auto mb-10">
          <div className="relative">
            {/* Vertical Line (hidden on mobile) */}
            <div className="hidden md:block absolute left-8 top-0 bottom-0 w-px bg-border/30" />
            
            {/* Features */}
            <div className="space-y-10 md:space-y-12">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                const isEven = index % 2 === 0;
                return (
                  <div
                    key={index}
                    className="group relative"
                    style={{
                      animation: `fade-in 0.8s ease-out forwards`,
                      animationDelay: `${index * 0.1}s`,
                      opacity: 0
                    }}
                  >
                    <div className="flex items-start gap-8 md:gap-12">
                      {/* Icon - Left Side */}
                      <div className="shrink-0 relative z-10">
                        <div className="
                          w-16 h-16
                          md:w-20 md:h-20
                          rounded-full
                          bg-foreground/5
                          flex items-center justify-center
                          transition-all duration-700
                          group-hover:bg-foreground/10
                          group-hover:scale-110
                          group-hover:rotate-6
                          border-2 border-border/20
                          group-hover:border-primary/30
                        ">
                          <Icon className="w-7 h-7 md:w-8 md:h-8 text-foreground stroke-[1.5] transition-colors duration-500 group-hover:text-primary" />
                        </div>
                        {/* Connecting Dot */}
                        <div className="hidden md:block absolute left-1/2 top-full w-2 h-2 -translate-x-1/2 mt-4 rounded-full bg-primary/20 group-hover:bg-primary/40 transition-colors" />
                      </div>

                      {/* Content - Right Side */}
                      <div className="flex-1 pt-2">
                        <div className={`
                          ${isEven ? 'md:pr-12' : 'md:pl-12'}
                        `}>
                          <h3 className="
                            font-display
                            text-3xl
                            md:text-4xl
                            font-bold
                            mb-4
                            text-foreground
                            transition-colors duration-500
                            group-hover:text-primary
                            tracking-tight
                          ">
                            {feature.title}
                          </h3>
                          <p className="
                            text-muted-foreground
                            leading-relaxed
                            text-lg
                            md:text-xl
                            font-light
                            max-w-2xl
                          ">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center animate-fade-in" style={{ animationDelay: '0.8s', opacity: 0 }}>
          <div className="inline-block max-w-2xl">
            <p className="text-xl md:text-2xl text-muted-foreground mb-6 font-light tracking-tight">
              Let's Build Something Amazing Together
            </p>
            <Button 
              variant="hero" 
              size="xl"
              className="group shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
              asChild
            >
              <Link href="/signup">
                Get a Free Quote
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

