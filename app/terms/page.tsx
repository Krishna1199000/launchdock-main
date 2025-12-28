"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Scale, AlertCircle, Gavel, Handshake, Shield, Lock, Ban, CheckCircle2, Users, ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    icon: Handshake,
    content: [
      "By accessing and using LaunchDock's services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.",
      "These Terms of Service ('Terms') govern your access to and use of LaunchDock's website, services, and applications (collectively, the 'Service'). By using our Service, you agree to comply with and be bound by these Terms."
    ]
  },
  {
    id: "description",
    title: "2. Description of Service",
    icon: FileText,
    content: [
      "LaunchDock provides web development, mobile app development, UI/UX design, and other digital services. We reserve the right to modify, suspend, or discontinue any aspect of our Service at any time, with or without notice.",
      "We make every effort to ensure the accuracy and quality of our services but do not guarantee that the Service will be error-free, uninterrupted, or meet your specific requirements."
    ]
  },
  {
    id: "user-accounts",
    title: "3. User Accounts and Registration",
    icon: Users,
    content: [
      "To access certain features of our Service, you may be required to create an account. You agree to:",
      "• Provide accurate, current, and complete information during registration",
      "• Maintain and promptly update your account information",
      "• Maintain the security of your password and account",
      "• Accept responsibility for all activities that occur under your account",
      "• Notify us immediately of any unauthorized use of your account",
      "We reserve the right to suspend or terminate accounts that violate these Terms or engage in fraudulent, abusive, or illegal activity."
    ]
  },
  {
    id: "use-restrictions",
    title: "4. Acceptable Use Policy",
    icon: Ban,
    content: [
      "You agree not to use the Service:",
      "• For any illegal purpose or in violation of any local, state, national, or international law",
      "• To transmit any harmful code, viruses, or malicious software",
      "• To interfere with or disrupt the Service or servers connected to the Service",
      "• To impersonate any person or entity or falsely state your affiliation",
      "• To harass, abuse, or harm other users",
      "• To collect or store personal data about other users without permission",
      "• To use automated systems to access the Service without permission",
      "• For any purpose that is fraudulent, misleading, or harmful to LaunchDock or others"
    ]
  },
  {
    id: "intellectual-property",
    title: "5. Intellectual Property Rights",
    icon: Shield,
    content: [
      "The Service and its original content, features, and functionality are owned by LaunchDock and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.",
      "For projects developed for you:",
      "• Upon full payment, you receive ownership rights to the custom work created for your project",
      "• LaunchDock retains rights to use completed work in our portfolio and marketing materials",
      "• Third-party components and frameworks remain subject to their respective licenses",
      "You may not reproduce, distribute, modify, or create derivative works of the Service without our express written permission."
    ]
  },
  {
    id: "payments",
    title: "6. Payments and Refunds",
    icon: Scale,
    content: [
      "Payment Terms:",
      "• All fees are due as specified in your project agreement or invoice",
      "• We accept payment via credit card, bank transfer, or other methods specified",
      "• Prices are subject to change with notice for new projects",
      "• Late payments may result in service suspension",
      "Refund Policy:",
      "• Refunds are evaluated on a case-by-case basis",
      "• No refunds for completed work that has been delivered and accepted",
      "• Partial refunds may be available for projects terminated before completion",
      "• All refund requests must be submitted within 30 days of payment",
      "Disputes: Contact us to resolve payment disputes before initiating chargebacks."
    ]
  },
  {
    id: "project-deliverables",
    title: "7. Project Deliverables and Timeline",
    icon: CheckCircle2,
    content: [
      "Project Scope: The scope of work, timeline, and deliverables for each project will be defined in a separate project agreement or statement of work.",
      "Timeline Estimates: All timelines are estimates and not guarantees. Delays may occur due to:",
      "• Client feedback and approval processes",
      "• Scope changes or additional requirements",
      "• Third-party dependencies",
      "• Unforeseen technical challenges",
      "Deliverables: Upon project completion, we will deliver:",
      "• All source code and assets (as specified in the agreement)",
      "• Documentation and deployment guides",
      "• Access credentials and necessary configurations",
      "Revisions: We include reasonable revisions as specified in your project agreement. Additional revisions may incur extra charges."
    ]
  },
  {
    id: "warranties",
    title: "8. Warranties and Disclaimers",
    icon: AlertCircle,
    content: [
      "Service Availability: We strive to provide reliable service but do not guarantee that the Service will be available 100% of the time. Service may be interrupted for maintenance, updates, or due to circumstances beyond our control.",
      "Warranty Disclaimer: THE SERVICE IS PROVIDED 'AS IS' AND 'AS AVAILABLE' WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.",
      "Limitation of Liability: To the maximum extent permitted by law, LaunchDock shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business opportunities.",
      "Maximum Liability: Our total liability shall not exceed the amount you paid to us in the 12 months preceding the claim."
    ]
  },
  {
    id: "confidentiality",
    title: "9. Confidentiality",
    icon: Lock,
    content: [
      "We respect the confidentiality of your business information and project details. We agree to:",
      "• Keep all client information and project details confidential",
      "• Not disclose your information to third parties without consent",
      "• Use your information only for the purposes of providing our services",
      "• Implement reasonable security measures to protect your information",
      "Exceptions: Confidentiality obligations do not apply to information that:",
      "• Was publicly known at the time of disclosure",
      "• Becomes publicly known through no breach of these Terms",
      "• Was independently developed by us without use of your confidential information",
      "• Is required to be disclosed by law or court order"
    ]
  },
  {
    id: "termination",
    title: "10. Termination",
    icon: Gavel,
    content: [
      "Termination by You: You may stop using our Service at any time. If you have an active project, termination terms will be governed by your project agreement.",
      "Termination by Us: We may terminate or suspend your account and access to the Service immediately, without prior notice, if you:",
      "• Violate these Terms of Service",
      "• Engage in fraudulent, abusive, or illegal activity",
      "• Fail to make required payments",
      "• Use the Service in a manner that harms LaunchDock or other users",
      "Effect of Termination: Upon termination:",
      "• Your right to use the Service will immediately cease",
      "• You remain responsible for all fees and charges incurred",
      "• We may delete your account data and information",
      "• Sections of these Terms that by their nature should survive termination will survive"
    ]
  },
  {
    id: "modifications",
    title: "11. Modifications to Terms",
    icon: FileText,
    content: [
      "We reserve the right to modify these Terms at any time. We will notify you of material changes by:",
      "• Posting the updated Terms on our website",
      "• Updating the 'Last Updated' date",
      "• Sending email notification for significant changes (if applicable)",
      "Your continued use of the Service after changes become effective constitutes acceptance of the modified Terms.",
      "If you do not agree to the modified Terms, you must stop using the Service and may terminate your account."
    ]
  },
  {
    id: "governing-law",
    title: "12. Governing Law and Dispute Resolution",
    icon: Gavel,
    content: [
      "Governing Law: These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.",
      "Dispute Resolution: In the event of any dispute arising from these Terms or the Service:",
      "• Parties agree to first attempt to resolve disputes through good faith negotiation",
      "• If negotiation fails, disputes will be resolved through binding arbitration",
      "• Arbitration will be conducted in accordance with [Arbitration Rules/Organization]",
      "• Each party will bear their own costs unless otherwise required by law",
      "Exceptions: Either party may seek injunctive relief in court to prevent irreparable harm or enforce intellectual property rights."
    ]
  },
  {
    id: "contact",
    title: "13. Contact Information",
    icon: Users,
    content: [
      "If you have any questions about these Terms of Service, please contact us:",
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
      ease: [0.42, 0, 0.58, 1] as const,
    },
  },
};

export default function TermsPage() {
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
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-6"
            >
              <Scale className="w-10 h-10 text-primary" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
            >
              Terms of <span className="text-gradient">Service</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg text-muted-foreground mb-4"
            >
              Please read these terms carefully before using our services.
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
                    whileHover={{ scale: 1.01, borderColor: "hsl(var(--primary))" }}
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
                          animate={{ 
                            rotate: isOpen ? 360 : 0,
                            scale: isOpen ? 1.1 : 1
                          }}
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
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0"
                >
                  <Handshake className="w-6 h-6 text-primary" />
                </motion.div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                    Our Commitment to Fair Terms
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    These Terms of Service are designed to create a fair and transparent relationship between LaunchDock and our clients. 
                    We believe in clear communication, mutual respect, and delivering exceptional value.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    If you have questions about any of these terms or need clarification, please don't hesitate to reach out. 
                    We're here to help and ensure you understand your rights and responsibilities when working with us.
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

