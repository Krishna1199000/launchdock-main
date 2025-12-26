"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft, ExternalLink, TrendingUp, Users, Zap, Award, CheckCircle2, Filter, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";

const caseStudies = [
  {
    id: 1,
    title: "SaaS Launchpad Platform",
    client: "TechStart Inc.",
    category: "Web Application",
    industry: "SaaS",
    duration: "4 months",
    team: "5 members",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop&q=80",
    challenge: "TechStart needed a scalable SaaS platform to manage their growing customer base and automate complex workflows. They required real-time analytics, multi-tenant architecture, and seamless integrations.",
    solution: "We built a modern Next.js application with TypeScript, implementing a robust backend with PostgreSQL and Redis caching. Integrated Stripe for payments, implemented real-time features with WebSockets, and created an intuitive admin dashboard.",
    results: [
      { metric: "+38%", label: "Conversion Rate", icon: TrendingUp },
      { metric: "2.5x", label: "User Growth", icon: Users },
      { metric: "99.9%", label: "Uptime", icon: Zap },
      { metric: "4.8/5", label: "User Rating", icon: Award },
    ],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Redis", "AWS"],
    metrics: {
      conversion: "+38%",
      growth: "2.5x",
      uptime: "99.9%",
      satisfaction: "4.8/5"
    },
    testimonial: {
      quote: "LaunchDock transformed our vision into a production-ready platform. The attention to detail and technical excellence exceeded our expectations.",
      author: "Sarah Johnson",
      role: "CEO, TechStart Inc."
    },
    accent: "from-emerald-400/20 via-sky-400/25 to-blue-500/25",
  },
  {
    id: 2,
    title: "E-Commerce Marketplace",
    client: "Neon Commerce",
    category: "E-Commerce",
    industry: "Retail",
    duration: "6 months",
    team: "7 members",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop&q=80",
    challenge: "Neon Commerce wanted to create a multi-vendor marketplace that could handle thousands of products, real-time inventory, and provide a seamless shopping experience across web and mobile platforms.",
    solution: "We developed a full-stack e-commerce platform with Next.js, implementing advanced search, recommendation engine, and real-time inventory management. Built mobile apps with React Native and integrated payment gateways for global transactions.",
    results: [
      { metric: "-28%", label: "Cart Abandonment", icon: TrendingUp },
      { metric: "3.2x", label: "Revenue Growth", icon: Users },
      { metric: "1.2s", label: "Load Time", icon: Zap },
      { metric: "50k+", label: "Active Users", icon: Award },
    ],
    technologies: ["Next.js", "React Native", "PostgreSQL", "Stripe", "AWS S3", "Elasticsearch"],
    metrics: {
      conversion: "-28%",
      growth: "3.2x",
      performance: "1.2s",
      users: "50k+"
    },
    testimonial: {
      quote: "The platform LaunchDock built for us has revolutionized our business. Sales have tripled and customer satisfaction is at an all-time high.",
      author: "Michael Chen",
      role: "Founder, Neon Commerce"
    },
    accent: "from-amber-400/20 via-orange-500/25 to-rose-500/25",
  },
  {
    id: 3,
    title: "Health & Fitness Mobile App",
    client: "FitLife Pro",
    category: "Mobile Application",
    industry: "Health & Fitness",
    duration: "5 months",
    team: "6 members",
    image: "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=1200&h=800&fit=crop&q=80",
    challenge: "FitLife Pro needed an engaging mobile app that could personalize workout plans using AI, track user progress in real-time, and build a community around fitness goals.",
    solution: "We created a React Native app with AI-powered personalization, integrated fitness tracking APIs, built social features for community engagement, and implemented gamification to boost user retention.",
    results: [
      { metric: "+63%", label: "Weekly Retention", icon: TrendingUp },
      { metric: "4.5M", label: "Workouts Completed", icon: Users },
      { metric: "4.9/5", label: "App Store Rating", icon: Zap },
      { metric: "2.1M", label: "Active Users", icon: Award },
    ],
    technologies: ["React Native", "Node.js", "MongoDB", "TensorFlow", "Firebase", "Stripe"],
    metrics: {
      retention: "+63%",
      workouts: "4.5M",
      rating: "4.9/5",
      users: "2.1M"
    },
    testimonial: {
      quote: "LaunchDock delivered beyond our expectations. The app's AI features and user experience have made us a leader in the fitness app space.",
      author: "Emily Rodriguez",
      role: "Product Lead, FitLife Pro"
    },
    accent: "from-pink-400/20 via-fuchsia-500/25 to-violet-500/25",
  },
  {
    id: 4,
    title: "FinTech Analytics Dashboard",
    client: "Stealth Fintech",
    category: "Web Application",
    industry: "Finance",
    duration: "3 months",
    team: "4 members",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&q=80",
    challenge: "A financial services company required a secure, real-time analytics dashboard with bank-grade security, complex data visualizations, and compliance with financial regulations.",
    solution: "We built a secure dashboard with advanced data visualization, real-time market data integration, comprehensive security measures, and full compliance with financial regulations including SOC 2 and GDPR.",
    results: [
      { metric: "99.98%", label: "Uptime", icon: TrendingUp },
      { metric: "300ms", label: "P99 Latency", icon: Zap },
      { metric: "10k+", label: "Users Onboarded", icon: Users },
      { metric: "SOC 2", label: "Compliance", icon: Award },
    ],
    technologies: ["Vue.js", "Python", "PostgreSQL", "D3.js", "Docker", "AWS"],
    metrics: {
      uptime: "99.98%",
      latency: "300ms",
      users: "10k+",
      compliance: "SOC 2"
    },
    testimonial: {
      quote: "The security and performance of the platform LaunchDock built is exceptional. It handles millions of transactions seamlessly.",
      author: "David Park",
      role: "CTO, Stealth Fintech"
    },
    accent: "from-indigo-400/20 via-blue-500/25 to-cyan-400/25",
  },
  {
    id: 5,
    title: "Creator OS Platform",
    client: "Content Creators Co.",
    category: "Web Application",
    industry: "Media & Entertainment",
    duration: "5 months",
    team: "6 members",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=800&fit=crop&q=80",
    challenge: "Content Creators Co. needed a comprehensive platform to help creators manage their content, analytics, collaborations, and monetization all in one place.",
    solution: "We developed a creator-focused platform with content management, analytics dashboards, collaboration tools, payment processing, and social media integrations to streamline creator workflows.",
    results: [
      { metric: "-42%", label: "Time to Launch", icon: TrendingUp },
      { metric: "5x", label: "Creator Productivity", icon: Users },
      { metric: "100k+", label: "Active Creators", icon: Zap },
      { metric: "$2M+", label: "Creator Earnings", icon: Award },
    ],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "AWS", "GraphQL"],
    metrics: {
      efficiency: "-42%",
      productivity: "5x",
      creators: "100k+",
      earnings: "$2M+"
    },
    testimonial: {
      quote: "LaunchDock understood our vision perfectly. The platform has become essential for thousands of creators worldwide.",
      author: "Alex Thompson",
      role: "Founder, Content Creators Co."
    },
    accent: "from-sky-400/20 via-cyan-500/25 to-indigo-500/25",
  },
  {
    id: 6,
    title: "AI-Powered Operations Console",
    client: "OpsTech Solutions",
    category: "Web Application",
    industry: "Enterprise",
    duration: "4 months",
    team: "5 members",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&q=80",
    challenge: "OpsTech needed an intelligent operations console that could automate workflows, predict issues, and provide real-time insights across their entire infrastructure.",
    solution: "We built an AI-powered operations platform with machine learning for predictive analytics, automated workflow orchestration, real-time monitoring, and intelligent alerting systems.",
    results: [
      { metric: "99.98%", label: "Uptime", icon: TrendingUp },
      { metric: "-60%", label: "Incident Response Time", icon: Zap },
      { metric: "Weekly", label: "Release Frequency", icon: Users },
      { metric: "Zero", label: "Critical Bugs", icon: Award },
    ],
    technologies: ["React", "Python", "TensorFlow", "Kubernetes", "Prometheus", "Grafana"],
    metrics: {
      uptime: "99.98%",
      response: "-60%",
      releases: "Weekly",
      bugs: "Zero"
    },
    testimonial: {
      quote: "LaunchDock's AI implementation has transformed our operations. We've reduced incidents by 60% and improved reliability significantly.",
      author: "Jennifer Martinez",
      role: "VP Engineering, OpsTech Solutions"
    },
    accent: "from-emerald-400/20 via-lime-500/25 to-amber-400/25",
  },
];

const categories = ["All", "Web Application", "Mobile Application", "E-Commerce"];

export default function CaseStudiesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCase, setSelectedCase] = useState<number | null>(null);

  const filteredCases = selectedCategory === "All" 
    ? caseStudies 
    : caseStudies.filter(cs => cs.category === selectedCategory);

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
          className="absolute top-1/2 -right-40 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl"
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
          className="absolute bottom-0 left-1/2 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl"
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
              Case Studies
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground"
            >
              Real Results from{" "}
              <span className="bg-gradient-to-r from-primary via-sky-400 to-violet-500 bg-clip-text text-transparent">
                Real Projects
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg sm:text-xl text-muted-foreground leading-relaxed"
            >
              Explore how we've helped businesses transform their digital presence, 
              drive growth, and achieve measurable results.
            </motion.p>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-12"
          >
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1, type: "spring" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                    : "bg-card border border-border/50 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="relative z-10 py-12 pb-20">
        <div className="container mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredCases.map((caseStudy, index) => (
                <motion.div
                  key={caseStudy.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -8 }}
                  className="group relative"
                >
                  <div className="relative h-full overflow-hidden rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary hover:shadow-2xl hover:shadow-primary/20">
                    
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                      <motion.img
                        src={caseStudy.image}
                        alt={caseStudy.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        whileHover={{ scale: 1.1 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                      
                      {/* Category Badge */}
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        className="absolute top-4 left-4"
                      >
                        <span className="inline-flex items-center gap-2 rounded-full bg-primary/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-primary-foreground">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          {caseStudy.category}
                        </span>
                      </motion.div>

                      {/* Metric Badge */}
                      <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="absolute top-4 right-4"
                      >
                        <div className="rounded-full bg-background/90 backdrop-blur-sm px-3 py-1.5 text-xs font-bold text-foreground">
                          {caseStudy.results[0].metric}
                        </div>
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                          {caseStudy.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {caseStudy.client} · {caseStudy.industry}
                        </p>
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {caseStudy.challenge}
                      </p>

                      {/* Quick Stats */}
                      <div className="flex flex-wrap gap-3 pt-4 border-t border-border/50">
                        {caseStudy.results.slice(0, 2).map((result, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + idx * 0.1 }}
                            className="flex items-center gap-2"
                          >
                            <result.icon className="w-4 h-4 text-primary" />
                            <span className="text-xs font-semibold text-foreground">{result.metric}</span>
                            <span className="text-xs text-muted-foreground">{result.label}</span>
                          </motion.div>
                        ))}
                      </div>

                      {/* View Details Button */}
                      <motion.button
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedCase(caseStudy.id)}
                        className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary font-semibold transition-colors group"
                      >
                        View Case Study
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Detailed Case Study Modal */}
      <AnimatePresence>
        {selectedCase && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/80 backdrop-blur-md"
            onClick={() => setSelectedCase(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[90vh] overflow-y-auto rounded-3xl border border-border/50 bg-card shadow-2xl"
            >
              {(() => {
                const caseStudy = caseStudies.find(cs => cs.id === selectedCase);
                if (!caseStudy) return null;

                return (
                  <>
                    {/* Header Image */}
                    <div className="relative h-80 overflow-hidden">
                      <img
                        src={caseStudy.image}
                        alt={caseStudy.title}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                      
                      <button
                        onClick={() => setSelectedCase(null)}
                        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="p-8 space-y-8">
                      {/* Title & Meta */}
                      <div>
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="inline-block mb-4 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-[0.2em]"
                        >
                          {caseStudy.category}
                        </motion.span>
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                          {caseStudy.title}
                        </h2>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <span>{caseStudy.client}</span>
                          <span>·</span>
                          <span>{caseStudy.industry}</span>
                          <span>·</span>
                          <span>{caseStudy.duration}</span>
                          <span>·</span>
                          <span>{caseStudy.team}</span>
                        </div>
                      </div>

                      {/* Results Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {caseStudy.results.map((result, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + idx * 0.1 }}
                            className="p-4 rounded-2xl bg-gradient-to-br from-primary/10 via-sky-500/5 to-violet-500/10 border border-primary/20"
                          >
                            <result.icon className="w-6 h-6 text-primary mb-2" />
                            <div className="text-2xl font-bold text-foreground mb-1">{result.metric}</div>
                            <div className="text-xs text-muted-foreground">{result.label}</div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Challenge & Solution */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 }}
                          className="space-y-4"
                        >
                          <h3 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-rose-500" />
                            Challenge
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">{caseStudy.challenge}</p>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 }}
                          className="space-y-4"
                        >
                          <h3 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                            Solution
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">{caseStudy.solution}</p>
                        </motion.div>
                      </div>

                      {/* Technologies */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="space-y-4"
                      >
                        <h3 className="font-display text-2xl font-bold text-foreground">Technologies Used</h3>
                        <div className="flex flex-wrap gap-2">
                          {caseStudy.technologies.map((tech, idx) => (
                            <motion.span
                              key={idx}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.7 + idx * 0.05 }}
                              className="px-4 py-2 rounded-full bg-secondary border border-border/50 text-sm font-medium text-foreground"
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>

                      {/* Testimonial */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-sky-500/5 to-violet-500/10 border border-primary/20"
                      >
                        <p className="text-lg text-foreground mb-4 italic">"{caseStudy.testimonial.quote}"</p>
                        <div>
                          <p className="font-semibold text-foreground">{caseStudy.testimonial.author}</p>
                          <p className="text-sm text-muted-foreground">{caseStudy.testimonial.role}</p>
                        </div>
                      </motion.div>

                      {/* CTA */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-sky-500/5 to-violet-500/10 border border-primary/20"
                      >
                        <div>
                          <h4 className="font-display text-xl font-bold text-foreground mb-2">
                            Ready to start your project?
                          </h4>
                          <p className="text-muted-foreground">
                            Let's discuss how we can help bring your vision to life.
                          </p>
                        </div>
                        <Link href="/#contact">
                          <Button variant="hero" size="lg" className="group">
                            Get Started
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </motion.div>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative z-10 py-20"
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-sky-500/5 to-violet-500/10 border border-primary/20"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Create Your Success Story?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let's work together to build something extraordinary.
            </p>
            <Link href="/#contact">
              <Button variant="hero" size="lg" className="group">
                Start Your Project
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}

