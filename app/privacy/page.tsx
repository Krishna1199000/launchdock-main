"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Lock, Eye, FileText, UserCheck, Database, Globe, ChevronDown, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";

const sections = [
  {
    id: "introduction",
    title: "1. Introduction",
    icon: FileText,
    content: [
      "Welcome to LaunchDock. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.",
      "Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access or use our services."
    ]
  },
  {
    id: "information-collected",
    title: "2. Information We Collect",
    icon: Database,
    content: [
      "We collect information that you provide directly to us, including:",
      "• Name and contact information (email address, phone number, mailing address)",
      "• Account credentials (username, password)",
      "• Business information (company name, job title)",
      "• Payment information (processed securely through third-party payment processors)",
      "• Project information and communication preferences",
      "We also automatically collect certain information when you visit our website, such as IP address, browser type, device information, and usage data through cookies and similar technologies."
    ]
  },
  {
    id: "how-we-use",
    title: "3. How We Use Your Information",
    icon: Eye,
    content: [
      "We use the information we collect for various purposes, including:",
      "• To provide, maintain, and improve our services",
      "• To process your transactions and manage your account",
      "• To communicate with you about your projects and respond to your inquiries",
      "• To send you technical notices, updates, and support messages",
      "• To detect, prevent, and address technical issues and security threats",
      "• To personalize your experience and deliver relevant content",
      "• To comply with legal obligations and enforce our terms of service"
    ]
  },
  {
    id: "data-sharing",
    title: "4. Data Sharing and Disclosure",
    icon: Globe,
    content: [
      "We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:",
      "• With service providers who assist us in operating our website and conducting our business (subject to confidentiality agreements)",
      "• When required by law or to respond to legal process",
      "• To protect our rights, property, or safety, or that of our users or others",
      "• In connection with a merger, acquisition, or sale of assets (with notice to users)",
      "• With your explicit consent"
    ]
  },
  {
    id: "data-security",
    title: "5. Data Security",
    icon: Lock,
    content: [
      "We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:",
      "• Encryption of data in transit and at rest",
      "• Regular security assessments and updates",
      "• Access controls and authentication mechanisms",
      "• Secure data storage and backup procedures",
      "However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security."
    ]
  },
  {
    id: "your-rights",
    title: "6. Your Privacy Rights",
    icon: UserCheck,
    content: [
      "Depending on your location, you may have certain rights regarding your personal information, including:",
      "• The right to access and receive a copy of your personal data",
      "• The right to rectify inaccurate or incomplete information",
      "• The right to request deletion of your personal data",
      "• The right to object to processing of your personal data",
      "• The right to data portability",
      "• The right to withdraw consent at any time",
      "To exercise these rights, please contact us using the information provided in the 'Contact Us' section below."
    ]
  },
  {
    id: "cookies",
    title: "7. Cookies and Tracking Technologies",
    icon: Eye,
    content: [
      "We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.",
      "You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.",
      "We use cookies for:",
      "• Authentication and session management",
      "• Preferences and settings",
      "• Analytics and performance monitoring",
      "• Advertising and marketing (with your consent)"
    ]
  },
  {
    id: "data-retention",
    title: "8. Data Retention",
    icon: Database,
    content: [
      "We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.",
      "When we no longer need your personal information, we will securely delete or anonymize it. Account information is typically retained for the duration of your account lifecycle and may be retained for a reasonable period thereafter for legal and business purposes."
    ]
  },
  {
    id: "children-privacy",
    title: "9. Children's Privacy",
    icon: Shield,
    content: [
      "Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you become aware that a child has provided us with personal information, please contact us, and we will take steps to delete such information."
    ]
  },
  {
    id: "changes",
    title: "10. Changes to This Privacy Policy",
    icon: FileText,
    content: [
      "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the 'Last Updated' date.",
      "You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page."
    ]
  },
  {
    id: "contact",
    title: "11. Contact Us",
    icon: UserCheck,
    content: [
      "If you have any questions about this Privacy Policy or our data practices, please contact us:",
      "• Email: support@launchdock.me",
      "• Website: launchdock.me",
      "• Address: [Your Company Address]",
      "We will respond to your inquiry within a reasonable timeframe."
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function PrivacyPage() {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set([sections[0].id]));

  const toggleSection = (id: string) => {
    setOpenSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

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
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-6"
            >
              <Shield className="w-10 h-10 text-primary" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
            >
              Privacy <span className="text-gradient">Policy</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg text-muted-foreground mb-4"
            >
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex items-center justify-center gap-2 text-sm text-muted-foreground"
            >
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-4xl mx-auto space-y-4"
          >
            {sections.map((section, index) => {
              const Icon = section.icon;
              const isOpen = openSections.has(section.id);
              
              return (
                <motion.div
                  key={section.id}
                  variants={itemVariants}
                  className="overflow-hidden"
                >
                  <motion.div
                    className="glass-card rounded-2xl overflow-hidden border border-border/30"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.button
                      onClick={() => toggleSection(section.id)}
                      className="w-full p-6 flex items-center justify-between text-left hover:bg-secondary/30 transition-colors"
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-4">
                        <motion.div
                          className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center"
                          animate={{ rotate: isOpen ? 360 : 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Icon className="w-6 h-6 text-primary" />
                        </motion.div>
                        <h2 className="font-display text-xl font-bold text-foreground">
                          {section.title}
                        </h2>
                      </div>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      </motion.div>
                    </motion.button>
                    
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-2">
                            <motion.div
                              initial={{ y: -10, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.1 }}
                              className="space-y-4 text-muted-foreground leading-relaxed"
                            >
                              {section.content.map((paragraph, pIndex) => (
                                <motion.p
                                  key={pIndex}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.1 + pIndex * 0.05 }}
                                  className={paragraph.startsWith("•") ? "ml-4" : ""}
                                >
                                  {paragraph}
                                </motion.p>
                              ))}
                            </motion.div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-4xl mx-auto mt-16"
          >
            <div className="glass-card rounded-2xl p-8 border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <div className="flex items-start gap-4">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0"
                >
                  <Shield className="w-6 h-6 text-primary" />
                </motion.div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                    Our Commitment to You
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We are committed to protecting your privacy and handling your data with care and respect. 
                    Your trust is important to us, and we strive to be transparent about how we collect and use your information. 
                    If you have any questions or concerns, please don't hesitate to contact us.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

