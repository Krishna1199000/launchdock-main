"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";
import Link from "next/link";
import { getConsentState, acceptAllCookies, rejectAllCookies, hasUserConsented } from "@/lib/consent";
import { Button } from "@/components/ui/button";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Check if user has already made a choice
    const hasConsented = hasUserConsented();
    if (!hasConsented) {
      // Small delay to ensure page is loaded
      setTimeout(() => setIsVisible(true), 500);
    }
  }, []);

  const handleAcceptAll = () => {
    acceptAllCookies();
    setIsVisible(false);
    // Trigger analytics initialization if needed
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('consent-accepted'));
    }
  };

  const handleRejectAll = () => {
    rejectAllCookies();
    setIsVisible(false);
    // Ensure analytics are not loaded
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('consent-rejected'));
    }
  };

  // Don't render until mounted to avoid hydration issues
  if (!isMounted || !isVisible) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={handleRejectAll}
            aria-hidden="true"
          />

          {/* Cookie Banner */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30 
            }}
            role="dialog"
            aria-labelledby="cookie-consent-title"
            aria-describedby="cookie-consent-description"
            className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
          >
            <div className="container mx-auto max-w-6xl">
              <div className="glass-card rounded-2xl border border-border/50 bg-card shadow-2xl p-6 sm:p-8">
                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                  {/* Icon and Content */}
                  <div className="flex-1 flex items-start gap-4">
                    <motion.div
                      animate={{ 
                        rotate: [0, -10, 10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        repeatDelay: 3 
                      }}
                      className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0"
                    >
                      <Cookie className="w-6 h-6 text-primary" />
                    </motion.div>
                    <div className="flex-1">
                      <h2 
                        id="cookie-consent-title"
                        className="font-display text-xl font-bold text-foreground mb-2"
                      >
                        We Value Your Privacy
                      </h2>
                      <p 
                        id="cookie-consent-description"
                        className="text-muted-foreground mb-4 leading-relaxed"
                      >
                        We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                        By clicking "Accept all", you consent to our use of cookies.{" "}
                        <Link 
                          href="/privacy" 
                          className="text-primary hover:underline font-medium"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Privacy Policy
                        </Link>
                        {" · "}
                        <Link 
                          href="/cookies" 
                          className="text-primary hover:underline font-medium"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Cookie Policy
                        </Link>
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto lg:flex-shrink-0">
                    <Button
                      variant="outline"
                      onClick={handleRejectAll}
                      className="w-full sm:w-auto px-6 py-2.5 font-medium border-border/50 hover:bg-secondary"
                      aria-label="Reject all cookies"
                    >
                      Reject All
                    </Button>
                    <Button
                      variant="hero"
                      onClick={handleAcceptAll}
                      className="w-full sm:w-auto px-6 py-2.5 font-medium"
                      aria-label="Accept all cookies"
                    >
                      Accept All
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

