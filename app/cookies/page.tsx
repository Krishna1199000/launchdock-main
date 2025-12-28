"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, Eye, Settings, BarChart3, Target, Shield, Database, ChevronDown, CheckCircle2, Info } from "lucide-react";
import Navbar from "@/components/Navbar";

const sections = [
  {
    id: "introduction",
    title: "1. Introduction to Cookies",
    icon: Cookie,
    content: [
      "This Cookie Policy explains how LaunchDock uses cookies and similar technologies on our website. It explains what these technologies are, why we use them, and your rights to control our use of them.",
      "Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to website owners."
    ]
  },
  {
    id: "what-are-cookies",
    title: "2. What Are Cookies?",
    icon: Info,
    content: [
      "Cookies are small pieces of data stored on your device (computer, tablet, or mobile) when you visit a website. They contain information about your browsing activity and preferences.",
      "Types of data cookies may collect:",
      "• Your browsing history on our website",
      "• Your preferences and settings",
      "• Login and authentication information",
      "• Analytics and performance data",
      "Cookies help websites remember your actions and preferences over time, so you don't have to keep re-entering them whenever you come back to the site or browse from one page to another."
    ]
  },
  {
    id: "types-of-cookies",
    title: "3. Types of Cookies We Use",
    icon: Settings,
    content: [
      "Essential Cookies: These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility. These cookies cannot be disabled.",
      "Performance Cookies: These cookies collect information about how you use our website, such as which pages you visit most often. This data helps us improve website performance and user experience.",
      "Functionality Cookies: These cookies allow the website to remember choices you make (such as your username, language, or region) and provide enhanced, personalized features.",
      "Targeting/Advertising Cookies: These cookies are used to deliver advertisements that are relevant to you and your interests. They also help measure the effectiveness of advertising campaigns.",
      "Analytics Cookies: These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously."
    ]
  },
  {
    id: "how-we-use",
    title: "4. How We Use Cookies",
    icon: Eye,
    content: [
      "We use cookies for various purposes, including:",
      "• Authentication: To keep you logged in and maintain your session",
      "• Preferences: To remember your settings and preferences",
      "• Analytics: To understand how our website is used and improve it",
      "• Security: To protect against fraudulent activity and ensure security",
      "• Performance: To optimize website speed and functionality",
      "• Personalization: To provide customized content and recommendations",
      "• Marketing: To deliver relevant advertisements and track campaign effectiveness",
      "All data collected through cookies is used in accordance with our Privacy Policy."
    ]
  },
  {
    id: "third-party",
    title: "5. Third-Party Cookies",
    icon: Database,
    content: [
      "In addition to our own cookies, we may also use various third-party cookies to report usage statistics, deliver advertisements, and analyze website performance. These third parties may include:",
      "• Analytics providers (e.g., Google Analytics)",
      "• Advertising networks and partners",
      "• Social media platforms",
      "• Customer support and chat services",
      "• Performance monitoring tools",
      "These third-party cookies are subject to the respective privacy policies of these third parties. We do not control these cookies, and we recommend you review the privacy policies of these third parties."
    ]
  },
  {
    id: "cookie-duration",
    title: "6. Cookie Duration",
    icon: BarChart3,
    content: [
      "Session Cookies: These cookies are temporary and are deleted when you close your browser. They are used to maintain your session while browsing our website.",
      "Persistent Cookies: These cookies remain on your device for a set period or until you delete them. They are used to remember your preferences and actions across multiple visits.",
      "Cookie Lifespan:",
      "• Essential cookies: Usually session-based or short-term",
      "• Performance cookies: Typically last up to 2 years",
      "• Functionality cookies: Usually last up to 1 year",
      "• Targeting cookies: Typically last up to 2 years",
      "You can see the specific expiration date of cookies in your browser settings."
    ]
  },
  {
    id: "managing-cookies",
    title: "7. Managing Your Cookie Preferences",
    icon: Settings,
    content: [
      "You have the right to accept or reject cookies. Most web browsers automatically accept cookies, but you can modify your browser settings to decline cookies if you prefer.",
      "Browser Settings:",
      "• Chrome: Settings > Privacy and Security > Cookies and other site data",
      "• Firefox: Options > Privacy & Security > Cookies and Site Data",
      "• Safari: Preferences > Privacy > Cookies and website data",
      "• Edge: Settings > Privacy, Search, and Services > Cookies",
      "Cookie Preferences: We may provide a cookie preference center where you can manage your cookie choices. This allows you to opt-in or opt-out of non-essential cookies.",
      "Impact of Disabling: If you disable cookies, some features of our website may not function properly, and your experience may be limited."
    ]
  },
  {
    id: "analytics",
    title: "8. Analytics and Tracking",
    icon: BarChart3,
    content: [
      "We use analytics cookies to understand how visitors interact with our website. This helps us:",
      "• Identify popular content and features",
      "• Improve website navigation and user experience",
      "• Detect and fix technical issues",
      "• Measure the effectiveness of our marketing campaigns",
      "Analytics Tools: We may use tools such as Google Analytics, which uses cookies to collect information about your use of our website. This information is used to compile reports and help us improve the site.",
      "Opt-Out: You can opt-out of Google Analytics by installing the Google Analytics Opt-out Browser Add-on, available at: https://tools.google.com/dlpage/gaoptout"
    ]
  },
  {
    id: "do-not-track",
    title: "9. Do Not Track Signals",
    icon: Shield,
    content: [
      "Some browsers include a 'Do Not Track' (DNT) feature that signals to websites you visit that you do not want to have your online activity tracked.",
      "Currently, there is no industry standard for how DNT signals should be interpreted. Our website does not currently respond to DNT browser signals or mechanisms.",
      "However, you can control cookie preferences through your browser settings and our cookie preference center (if available).",
      "We respect your privacy choices and will continue to monitor developments around DNT browser technology."
    ]
  },
  {
    id: "mobile-devices",
    title: "10. Cookies on Mobile Devices",
    icon: Cookie,
    content: [
      "Mobile devices may use different technologies for tracking, such as:",
      "• Cookies (similar to desktop browsers)",
      "• Mobile advertising IDs (e.g., Apple IDFA, Google Advertising ID)",
      "• Local storage and session storage",
      "Managing Mobile Cookies:",
      "• iOS: Settings > Safari > Block All Cookies or Clear History and Website Data",
      "• Android: Chrome Settings > Site Settings > Cookies",
      "• You can also manage cookies through individual app settings",
      "Mobile advertising IDs can typically be reset in your device settings, allowing you to opt-out of personalized advertising."
    ]
  },
  {
    id: "updates",
    title: "11. Updates to This Cookie Policy",
    icon: Info,
    content: [
      "We may update this Cookie Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors.",
      "We will notify you of any material changes by:",
      "• Posting the updated policy on this page",
      "• Updating the 'Last Updated' date",
      "• Sending email notification for significant changes (if applicable)",
      "• Displaying a prominent notice on our website",
      "We encourage you to review this Cookie Policy periodically to stay informed about how we use cookies."
    ]
  },
  {
    id: "contact",
    title: "12. Contact Us About Cookies",
    icon: Shield,
    content: [
      "If you have any questions, concerns, or requests regarding our use of cookies or this Cookie Policy, please contact us:",
      "• Email: support@launchdock.me",
      "• Website: launchdock.me",
      "• Address: [Your Company Address]",
      "We will respond to your inquiry within a reasonable timeframe and assist you with managing your cookie preferences."
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

export default function CookiesPage() {
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
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 150, damping: 12 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-6"
            >
              <Cookie className="w-10 h-10 text-primary" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
            >
              Cookie <span className="text-gradient">Policy</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg text-muted-foreground mb-4"
            >
              Learn about how we use cookies and how you can manage your preferences.
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
                    rotate: [0, -10, 10, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0"
                >
                  <Cookie className="w-6 h-6 text-primary" />
                </motion.div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                    Your Cookie Choices Matter
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We respect your privacy and give you control over your cookie preferences. 
                    While some cookies are essential for our website to function, you can choose 
                    to accept or decline non-essential cookies.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    If you have questions about cookies or need help managing your preferences, 
                    please don't hesitate to contact us. We're here to help you understand 
                    how we use cookies and make informed choices.
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

