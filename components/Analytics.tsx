"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initializeAnalyticsWithConsent, trackPageView, updateAnalyticsConsent } from "@/lib/analytics";
import { hasConsentFor, getConsentState, type ConsentState } from "@/lib/consent";

/**
 * Analytics Component
 * Handles Google Analytics initialization and page tracking
 * Only loads if user has consented to analytics cookies
 */
export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Initialize analytics if consent is given
    const hasAnalyticsConsent = hasConsentFor('analytics');
    
    if (hasAnalyticsConsent) {
      initializeAnalyticsWithConsent();
    }

    // Listen for consent changes
    const handleConsentUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<ConsentState>;
      const state = customEvent.detail || getConsentState();
      if (state) {
        updateAnalyticsConsent(state.preferences.analytics);
      }
    };

    const handleConsentAccepted = () => {
      initializeAnalyticsWithConsent();
    };

    window.addEventListener('consent-updated', handleConsentUpdate);
    window.addEventListener('consent-accepted', handleConsentAccepted);

    return () => {
      window.removeEventListener('consent-updated', handleConsentUpdate);
      window.removeEventListener('consent-accepted', handleConsentAccepted);
    };
  }, []);

  // Track page views on route change
  useEffect(() => {
    if (hasConsentFor('analytics') && pathname) {
      trackPageView(pathname);
    }
  }, [pathname]);

  return null; // This component doesn't render anything
}

