"use client";

import {
  Palette,
  Search,
  Layers,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Users,
  Eye,
  Zap,
  Rocket,
  Target,
  PenTool,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

const features = [
  {
    title: "User Research",
    description: "Deep understanding of your users through comprehensive research and analysis.",
    icon: Search,
    details: [
      "User interviews and surveys",
      "Competitive analysis and benchmarking",
      "User personas and journey mapping",
      "Usability testing and feedback",
    ],
  },
  {
    title: "Prototyping",
    description: "Interactive prototypes that bring your ideas to life before development begins.",
    icon: PenTool,
    details: [
      "Low and high-fidelity wireframes",
      "Interactive prototypes with Figma",
      "User flow and information architecture",
      "Rapid iteration and testing",
    ],
  },
  {
    title: "Design Systems",
    description: "Comprehensive design systems that ensure consistency and scalability.",
    icon: Layers,
    details: [
      "Component libraries and style guides",
      "Design tokens and variables",
      "Responsive design patterns",
      "Accessibility standards compliance",
    ],
  },
];

const benefits = [
  {
    title: "User-Centered",
    description: "Designs focused on user needs and goals",
    icon: Users,
  },
  {
    title: "Beautiful & Functional",
    description: "Stunning visuals that drive conversions",
    icon: Eye,
  },
  {
    title: "Fast Iteration",
    description: "Rapid prototyping and testing cycles",
    icon: Zap,
  },
  {
    title: "Scalable Systems",
    description: "Design systems that grow with you",
    icon: Rocket,
  },
];

const process = [
  {
    step: "01",
    title: "Research & Discovery",
    description: "Understand users, business goals, and market context.",
  },
  {
    step: "02",
    title: "Ideation & Wireframing",
    description: "Brainstorm solutions and create initial wireframes.",
  },
  {
    step: "03",
    title: "Design & Prototyping",
    description: "Create high-fidelity designs and interactive prototypes.",
  },
  {
    step: "04",
    title: "Testing & Refinement",
    description: "Test with users and refine based on feedback.",
  },
];

export default function UIUXDesignPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Animated Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 -right-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, -60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-1/2 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 py-20 sm:py-32">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 mb-6 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary"
            >
              <Sparkles className="w-4 h-4" />
              UI/UX Design
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground"
            >
              Beautiful, Intuitive{" "}
              <span className="text-primary">
                Designs
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8"
            >
              Designs that engage users and drive conversions through thoughtful user experience.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/contact">
                <Button variant="hero" size="lg" className="group">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/case-studies">
                <Button variant="hero-outline" size="lg" className="group">
                  View Case Studies
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Design Services
            </h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive design solutions from research to implementation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="p-8 rounded-3xl border border-primary/30 bg-primary/10 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/20 hover:border-primary/50 transition-all"
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  <ul className="space-y-3">
                    {feature.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Our Design Services?
            </h2>
            <p className="text-lg text-muted-foreground">
              We create designs that users love and businesses trust
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="p-6 rounded-2xl border border-primary/30 bg-primary/10 backdrop-blur-sm text-center hover:shadow-xl hover:shadow-primary/20 hover:border-primary/50 transition-all"
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Design Process
            </h2>
            <p className="text-lg text-muted-foreground">
              A user-centered approach to design
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {process.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="p-6 rounded-2xl border border-primary/30 bg-primary/10 backdrop-blur-sm">
                  <div className="text-4xl font-bold text-primary/20 mb-4">{item.step}</div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-primary/30" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center p-12 rounded-3xl bg-primary/10 border border-primary/20"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Transform Your Design?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let's create beautiful, user-centered designs together.
            </p>
            <Link href="/contact">
              <Button variant="hero" size="lg" className="group">
                Start Your Project
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}


