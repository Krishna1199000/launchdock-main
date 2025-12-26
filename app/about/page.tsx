"use client";

import {
  Target,
  Lightbulb,
  Users,
  Award,
  Rocket,
  Sparkles,
  TrendingUp,
  Globe,
  Code,
  Heart,
  Zap,
  Shield,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

const values = [
  {
    title: "Innovation First",
    description: "We stay ahead of the curve, constantly exploring new technologies and methodologies to deliver cutting-edge solutions.",
    icon: Lightbulb,
  },
  {
    title: "Client-Centric",
    description: "Your success is our success. We prioritize understanding your needs and delivering solutions that exceed expectations.",
    icon: Heart,
  },
  {
    title: "Quality Excellence",
    description: "We maintain the highest standards in every project, ensuring robust, scalable, and maintainable code.",
    icon: Award,
  },
  {
    title: "Transparent Communication",
    description: "Clear, honest, and regular communication keeps you informed and involved throughout the development process.",
    icon: Users,
  },
];

const stats = [
  { label: "Projects Delivered", value: "200+", icon: Rocket },
  { label: "Happy Clients", value: "150+", icon: Users },
  { label: "Years of Experience", value: "5+", icon: Award },
  { label: "Countries Served", value: "20+", icon: Globe },
];

const achievements = [
  "Award-winning design and development",
  "99.9% client satisfaction rate",
  "On-time project delivery guarantee",
  "24/7 support and maintenance",
  "Cutting-edge technology stack",
  "Scalable and secure solutions",
];

const services = [
  {
    title: "Web Development",
    description: "Custom web applications built with modern frameworks",
    icon: Code,
  },
  {
    title: "Mobile Apps",
    description: "Native and cross-platform mobile solutions",
    icon: Zap,
  },
  {
    title: "Cloud Solutions",
    description: "Scalable infrastructure and cloud deployment",
    icon: Globe,
  },
  {
    title: "Security First",
    description: "Enterprise-grade security and compliance",
    icon: Shield,
  },
];

export default function AboutPage() {
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
              About LaunchDock
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground"
            >
              Building the Future,{" "}
              <span className="text-primary">
                One Project at a Time
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8"
            >
              We're a passionate team of developers, designers, and innovators dedicated to transforming your ideas into powerful digital solutions.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.05 }}
                  className="p-6 rounded-2xl border border-primary/30 bg-primary/10 backdrop-blur-sm text-center hover:shadow-xl hover:shadow-primary/20 hover:border-primary/50 transition-all"
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
                    className="text-3xl md:text-4xl font-bold text-foreground mb-2"
                  >
                    {stat.value}
                  </motion.div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary w-fit"
              >
                <Target className="w-4 h-4" />
                Our Story
              </motion.div>
              
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                From Vision to{" "}
                <span className="text-primary">Reality</span>
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                LaunchDock was founded with a simple mission: to help businesses thrive in the digital age. We started as a small team of passionate developers who believed that technology should be accessible, powerful, and transformative.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Today, we've grown into a full-service digital agency, but our core values remain unchanged. We're committed to delivering exceptional results, fostering long-term partnerships, and pushing the boundaries of what's possible.
              </p>

              <div className="pt-4">
                <Link href="/case-studies">
                  <Button variant="hero" size="lg" className="group">
                    View Our Work
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="p-8 rounded-3xl border border-primary/30 bg-primary/10 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-6">
                  {services.map((service, index) => {
                    const Icon = service.icon;
                    return (
                      <motion.div
                        key={service.title}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -4 }}
                        className="p-6 rounded-2xl border border-primary/20 bg-background/50 backdrop-blur-sm"
                      >
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-2">{service.title}</h3>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 mb-6 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary"
            >
              <Heart className="w-4 h-4" />
              Our Values
            </motion.div>
            
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Drives Us
            </h2>
            <p className="text-lg text-muted-foreground">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="p-6 rounded-2xl border border-primary/30 bg-primary/10 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/20 hover:border-primary/50 transition-all"
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl border border-primary/30 bg-primary/10 backdrop-blur-sm"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 mb-6 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary w-fit"
              >
                <Award className="w-4 h-4" />
                Our Achievements
              </motion.div>
              
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why Choose{" "}
                <span className="text-primary">LaunchDock</span>
              </h2>
              
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-foreground">{achievement}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary w-fit"
              >
                <TrendingUp className="w-4 h-4" />
                Our Mission
              </motion.div>
              
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Empowering Businesses Through{" "}
                <span className="text-primary">Technology</span>
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our mission is to empower businesses of all sizes with cutting-edge technology solutions that drive growth, enhance efficiency, and create lasting value.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                We believe that every business, regardless of size, deserves access to world-class digital solutions. That's why we work closely with our clients to understand their unique challenges and deliver tailored solutions that make a real impact.
              </p>

              <div className="pt-4">
                <Link href="/contact">
                  <Button variant="hero-outline" size="lg" className="group">
                    Get In Touch
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </motion.div>
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
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 mb-6 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary"
            >
              <Rocket className="w-4 h-4" />
              Ready to Start?
            </motion.div>
            
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Let's Build Something{" "}
              <span className="text-primary">Amazing Together</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join hundreds of satisfied clients who have transformed their businesses with LaunchDock.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button variant="hero" size="lg" className="group">
                  Start Your Project
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/case-studies">
                <Button variant="hero-outline" size="lg" className="group">
                  View Case Studies
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}


