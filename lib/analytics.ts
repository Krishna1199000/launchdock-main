/**
 * Analytics Integration
 * Google Analytics with Consent Mode v2 (GDPR compliant)
 * Only loads if user has consented to analytics
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    gtagConsent?: {
      update: (consent: Record<string, string>) => void;
    };
  }
}

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

/**
 * Initialize Google Analytics with consent mode
 */
export function initializeAnalytics(measurementId: string = GA_MEASUREMENT_ID) {
  if (typeof window === 'undefined' || !measurementId) return;

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  
  function gtag(...args: any[]) {
    window.dataLayer!.push(args);
  }

  window.gtag = gtag;

  // Set default consent to 'denied' (GDPR compliant)
  gtag('consent', 'default', {
    'analytics_storage': 'denied',
    'ad_storage': 'denied',
    'wait_for_update': 500,
  });

  // Load Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // Initialize gtag
  gtag('js', new Date());
  gtag('config', measurementId, {
    page_path: window.location.pathname,
  });

  return gtag;
}

/**
 * Update consent for Google Analytics
 * Call this when user accepts/rejects cookies
 */
export function updateAnalyticsConsent(hasAnalyticsConsent: boolean) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('consent', 'update', {
    'analytics_storage': hasAnalyticsConsent ? 'granted' : 'denied',
    'ad_storage': hasAnalyticsConsent ? 'granted' : 'denied',
  });
}

/**
 * Track page view
 */
export function trackPageView(url: string) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
}

/**
 * Track custom event
 */
export function trackEvent(
  eventName: string,
  eventParams?: {
    [key: string]: any;
  }
) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', eventName, eventParams);
}

/**
 * Initialize analytics based on consent
 */
export function initializeAnalyticsWithConsent() {
  if (typeof window === 'undefined') return;

  // Check if analytics consent was given
  const { hasConsentFor } = require('./consent');
  const hasAnalyticsConsent = hasConsentFor('analytics');

  if (hasAnalyticsConsent && GA_MEASUREMENT_ID) {
    initializeAnalytics(GA_MEASUREMENT_ID);
  }

  // Listen for consent updates
  window.addEventListener('consent-updated', (event: any) => {
    const consentState = event.detail;
    if (consentState.preferences.analytics) {
      if (!window.gtag && GA_MEASUREMENT_ID) {
        initializeAnalytics(GA_MEASUREMENT_ID);
      }
      updateAnalyticsConsent(true);
    } else {
      updateAnalyticsConsent(false);
    }
  });
}



