"use client";

import { useState } from "react";
import {
  HelpCircle,
  Search,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Rocket,
  CreditCard,
  Settings,
  Shield,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";

const faqCategories = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: Rocket,
  },
  {
    id: "billing",
    title: "Billing & Payments",
    icon: CreditCard,
  },
  {
    id: "technical",
    title: "Technical Support",
    icon: Settings,
  },
  {
    id: "account",
    title: "Account & Security",
    icon: Shield,
  },
];

const faqs = [
  {
    category: "getting-started",
    question: "How do I get started with LaunchDock?",
    answer: "Getting started is easy! Simply sign up for an account, verify your email, and you'll have access to our dashboard. From there, you can create your first project, invite team members, and start building. Check out our Getting Started guide in the documentation for detailed steps.",
  },
  {
    category: "getting-started",
    question: "What do I need to start a project?",
    answer: "To start a project, you'll need: 1) A verified account, 2) A project idea or requirements document, 3) Budget allocation (if applicable), and 4) Your team members' contact information. Our team will guide you through the entire process once you submit a project request.",
  },
  {
    category: "getting-started",
    question: "How long does it take to complete a project?",
    answer: "Project timelines vary based on complexity and scope. Simple websites typically take 2-4 weeks, while complex applications can take 3-6 months. We provide detailed timelines during the initial consultation and keep you updated throughout the development process.",
  },
  {
    category: "billing",
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, Mastercard, American Express), bank transfers, and digital payment methods like PayPal and Stripe. All payments are processed securely through our encrypted payment gateway.",
  },
  {
    category: "billing",
    question: "Can I get a refund?",
    answer: "Yes, we offer refunds within 14 days of project initiation if you're not satisfied with our services. Refunds are processed within 5-7 business days. For ongoing projects, we work on milestone-based payments, so you only pay for completed work.",
  },
  {
    category: "billing",
    question: "Do you offer payment plans?",
    answer: "Absolutely! We offer flexible payment plans for larger projects. You can split payments across milestones, with options for monthly or quarterly installments. Contact our billing team to discuss a payment plan that works for you.",
  },
  {
    category: "technical",
    question: "What technologies do you use?",
    answer: "We use modern, industry-standard technologies including Next.js, React, TypeScript, Node.js, PostgreSQL, AWS, and more. Our tech stack is chosen based on your project requirements to ensure scalability, performance, and maintainability.",
  },
  {
    category: "technical",
    question: "Do you provide hosting and maintenance?",
    answer: "Yes! We offer comprehensive hosting solutions and ongoing maintenance packages. Our hosting includes 99.9% uptime guarantee, automatic backups, SSL certificates, and 24/7 monitoring. Maintenance packages include updates, security patches, and technical support.",
  },
  {
    category: "technical",
    question: "Can I integrate third-party services?",
    answer: "Definitely! We can integrate with any third-party service or API you need, including payment gateways (Stripe, PayPal), email services (SendGrid, Mailchimp), analytics tools, CRM systems, and more. Just let us know your requirements during planning.",
  },
  {
    category: "account",
    question: "How do I reset my password?",
    answer: "Click on 'Forgot Password' on the sign-in page, enter your email address, and you'll receive a password reset link. The link expires after 1 hour for security. If you don't receive the email, check your spam folder or contact support.",
  },
  {
    category: "account",
    question: "How secure is my data?",
    answer: "Security is our top priority. We use industry-standard encryption (SSL/TLS), secure authentication (JWT tokens), regular security audits, and comply with GDPR and SOC 2 standards. Your data is stored in secure, encrypted databases with regular backups.",
  },
  {
    category: "account",
    question: "Can I change my account information?",
    answer: "Yes, you can update your account information anytime from the dashboard. Go to Settings > Profile to update your name, email, phone number, and other details. Email changes require verification for security purposes.",
  },
];

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
              FAQ
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground"
            >
              Frequently Asked{" "}
              <span className="text-primary">
                Questions
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8"
            >
              Find answers to common questions about LaunchDock.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="relative max-w-2xl mx-auto"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            {/* Category Filters */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(null)}
                className={`px-6 py-3 rounded-full text-sm font-semibold transition-all ${
                  selectedCategory === null
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                    : "bg-card border border-border/50 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                All Questions
              </motion.button>
              {faqCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <motion.button
                    key={category.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: (index + 1) * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-6 py-3 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
                      selectedCategory === category.id
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                        : "bg-card border border-border/50 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {category.title}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* FAQ Items */}
          <div className="max-w-4xl mx-auto space-y-4">
            <AnimatePresence>
              {filteredFaqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-6 rounded-2xl border border-primary/30 bg-primary/10 backdrop-blur-sm transition-all hover:shadow-lg"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full flex items-center justify-between gap-4 text-left"
                    >
                      <h3 className="font-display text-lg font-bold text-foreground flex-1">
                        {faq.question}
                      </h3>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-primary flex-shrink-0" />
                      )}
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 pt-4 border-t border-primary/30"
                        >
                          <p className="text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {filteredFaqs.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <HelpCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  No results found. Try a different search term or category.
                </p>
              </motion.div>
            )}
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
              Still Have Questions?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Can't find what you're looking for? Contact our support team.
            </p>
            <a href="/support">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold transition-all shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40"
              >
                Contact Support
              </motion.button>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}






