"use client";
import { useState, useEffect } from "react";
import {
  Rocket,
  Building2,
  Crown,
  Sparkles,
  Check,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  onPlanAction?: (planId: string) => void;
};

const plans = [
  {
    id: "starter",
    name: "Starter",
    icon: Rocket,
    description: "Perfect for small businesses getting started online",
    price: "From $2,999",
    features: [
      "Modern website / landing page",
      "Basic animations",
      "1 month support",
      "Mobile responsive design",
      "Basic SEO setup",
      "Contact form integration"
    ],
    cta: "Get Quote",
    popular: false
  },
  {
    id: "business",
    name: "Business",
    icon: Building2,
    description: "Ideal for growing businesses with multiple needs",
    price: "From $7,999",
    features: [
      "Multi-page website or app",
      "Premium animations",
      "Basic SEO optimization",
      "Maintenance included",
      "Analytics setup",
      "3 months support",
      "Content management system"
    ],
    cta: "Choose Plan",
    popular: true
  },
  {
    id: "premium",
    name: "Premium",
    icon: Crown,
    description: "Complete solution for established businesses",
    price: "From $14,999",
    features: [
      "Full custom website or web app",
      "Advanced animations + micro-interactions",
      "Branding kit included",
      "Performance optimization",
      "Priority support",
      "6 months support",
      "Advanced SEO & marketing",
      "Custom integrations"
    ],
    cta: "Choose Plan",
    popular: false
  },
  {
    id: "custom",
    name: "Custom",
    icon: Sparkles,
    description: "Tailored solutions for unique requirements",
    price: "Custom",
    features: [
      "Tailored solution",
      "Full flexibility",
      "Enterprise features",
      "Dedicated team",
      "Unlimited revisions",
      "Ongoing partnership",
      "Custom timeline",
      "24/7 priority support"
    ],
    cta: "Contact Us",
    popular: false
  }
];

const pricingQuotes = [
  "The future belongs to those who create it.",
  "Every great business starts with a bold decision.",
  "Your brand is the story you tell the world.",
  "Small steps lead to big success.",
  "Quality is remembered long after price is forgotten.",
  "Success is built on clarity, consistency, and creativity."
];

const Pricing = ({ onPlanAction }: Props) => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [visiblePlans, setVisiblePlans] = useState<Set<string>>(new Set());

  // Quote rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % pricingQuotes.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Staggered animation for plans
  useEffect(() => {
    plans.forEach((plan, index) => {
      setTimeout(() => {
        setVisiblePlans(prev => new Set([...prev, plan.id]));
      }, index * 150);
    });
  }, []);

  return (
    <section id="pricing" className="py-32 relative bg-background">
      {/* Subtle Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[150px] animate-pulse-glow" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h2 
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground animate-slide-up"
          >
            Flexible Pricing for{" "}
            <span className="text-gradient">Every Stage</span>
          </h2>
          <p 
            className="text-lg md:text-xl text-muted-foreground leading-relaxed animate-slide-up-delayed"
          >
            Transparent pricing, flexible plans, and exceptional value. 
            Choose the perfect plan that grows with your business.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const isVisible = visiblePlans.has(plan.id);
            
            return (
              <div
                key={plan.id}
                className="group relative"
                style={{
                  animation: `slide-up-scale 0.8s ease-out forwards`,
                  animationDelay: `${index * 0.15}s`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.9)'
                }}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                    <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-primary text-primary-foreground shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Card */}
                <div className={`
                  h-full
                  relative
                  bg-card
                  border rounded-3xl
                  p-8
                  transition-all duration-700
                  group-hover:shadow-2xl
                  group-hover:shadow-primary/10
                  group-hover:-translate-y-4
                  group-hover:scale-105
                  ${plan.popular 
                    ? 'border-primary/50 shadow-xl shadow-primary/5' 
                    : 'border-border/30 group-hover:border-primary/30'
                  }
                `}>
                  {/* Icon */}
                  <div className="
                    w-16 h-16
                    rounded-2xl
                    bg-primary/10
                    flex items-center justify-center
                    mb-6
                    transition-all duration-700
                    group-hover:bg-primary/20
                    group-hover:scale-110
                    group-hover:rotate-6
                  ">
                    <Icon className="w-8 h-8 text-primary transition-transform duration-700 group-hover:scale-110" />
                  </div>

                  {/* Plan Name & Description */}
                  <h3 className="
                    font-display text-2xl font-bold mb-2 text-foreground
                    transition-colors duration-500
                    group-hover:text-primary
                  ">
                    {plan.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6 font-light">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="text-4xl font-bold text-foreground mb-1">
                      {plan.price}
                    </div>
                    {plan.price !== "Custom" && (
                      <p className="text-sm text-muted-foreground">One-time project</p>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="
                          w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center
                          flex-shrink-0 mt-0.5
                          group-hover:bg-primary/20 transition-colors
                        ">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-sm text-muted-foreground font-light">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button
                    variant={plan.popular ? "hero" : "hero-outline"}
                    size="lg"
                    className="w-full group/btn"
                    onClick={() => onPlanAction?.(plan.id)}
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Animated Quote Section */}
        <div className="max-w-4xl mx-auto">
          <div className="
            relative
            h-32
            flex items-center justify-center
            rounded-3xl
            bg-card/30
            backdrop-blur-sm
            border border-border/20
            p-8
          ">
            <div className="text-center">
              <p 
                key={currentQuote}
                className="
                  text-2xl md:text-3xl font-light text-foreground
                  animate-fade-in
                  italic
                "
                style={{
                  animation: 'fade-in 1s ease-in-out'
                }}
              >
                "{pricingQuotes[currentQuote]}"
              </p>
            </div>
            
            {/* Quote Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {pricingQuotes.map((_, index) => (
                <div
                  key={index}
                  className={`
                    w-2 h-2 rounded-full transition-all duration-500
                    ${index === currentQuote ? 'bg-primary w-8' : 'bg-border/30'}
                  `}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;


