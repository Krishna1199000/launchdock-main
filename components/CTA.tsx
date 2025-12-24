"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, MessageSquare } from "lucide-react";

type Props = {
  onAction?: () => void;
  onViewProcess?: () => void;
};

const CTA = ({ onAction, onViewProcess }: Props) => {
  return (
    <section id="about" className="py-16 relative">
      <div className="container mx-auto px-6">
        <div className="relative overflow-hidden rounded-3xl">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary to-primary/10" />
          <div className="absolute inset-0 glass-card" />
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/30 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/20 rounded-full blur-[80px]" />

          <div className="relative z-10 px-8 py-12 md:px-12 md:py-16">
            <div className="max-w-3xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-8">
                <MessageSquare className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground">Let's Talk</span>
              </div>

              {/* Heading */}
              <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
                Ready to Launch Your{" "}
                <span className="text-gradient">Next Big Idea?</span>
              </h2>

              {/* Description */}
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                Let's collaborate and bring your vision to life. Whether you need a website, 
                mobile app, or custom software solution – we're here to help you succeed.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="hero" size="xl" className="group" onClick={onAction}>
                  <Mail className="w-5 h-5" />
                  Schedule a Call
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="hero-outline" size="xl" onClick={onViewProcess}>
                  View Our Process
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center justify-center gap-8 mt-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  Free Consultation
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  Quick Response
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  No Commitment
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
