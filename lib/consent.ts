/**
 * Cookie Consent Management
 * GDPR-compliant consent management system
 */

export type ConsentType = 'essential' | 'analytics' | 'marketing' | 'functional';

export interface ConsentPreferences {
  essential: boolean; // Always true, cannot be disabled
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

export interface ConsentState {
  hasConsented: boolean;
  preferences: ConsentPreferences;
  timestamp: number;
}

const CONSENT_STORAGE_KEY = 'launchdock-cookie-consent';
const CONSENT_COOKIE_NAME = 'cookie-consent';
const CONSENT_EXPIRY_DAYS = 365;

/**
 * Get current consent state from localStorage
 */
export function getConsentState(): ConsentState | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!stored) return null;

    const state = JSON.parse(stored) as ConsentState;
    // Validate the state structure
    if (state && state.hasConsented && state.preferences) {
      return state;
    }
    return null;
  } catch (error) {
    console.error('Error reading consent state:', error);
    return null;
  }
}

/**
 * Save consent state to localStorage and cookies
 */
export function saveConsentState(preferences: Partial<ConsentPreferences>, acceptAll: boolean = false): void {
  if (typeof window === 'undefined') return;

  const consentState: ConsentState = {
    hasConsented: true,
    preferences: {
      essential: true, // Always true
      analytics: acceptAll ? true : (preferences.analytics ?? false),
      marketing: acceptAll ? true : (preferences.marketing ?? false),
      functional: acceptAll ? true : (preferences.functional ?? false),
    },
    timestamp: Date.now(),
  };

  try {
    // Save to localStorage
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consentState));

    // Save to cookie for server-side access
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + CONSENT_EXPIRY_DAYS);
    document.cookie = `${CONSENT_COOKIE_NAME}=${JSON.stringify(consentState)}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;

    // Dispatch custom event for other scripts to listen to
    window.dispatchEvent(new CustomEvent('consent-updated', { detail: consentState }));
  } catch (error) {
    console.error('Error saving consent state:', error);
  }
}

/**
 * Reject all non-essential cookies
 */
export function rejectAllCookies(): void {
  saveConsentState({
    analytics: false,
    marketing: false,
    functional: false,
  }, false);
}

/**
 * Accept all cookies
 */
export function acceptAllCookies(): void {
  saveConsentState({
    analytics: true,
    marketing: true,
    functional: true,
  }, true);
}

/**
 * Check if user has given consent
 */
export function hasUserConsented(): boolean {
  const state = getConsentState();
  return state?.hasConsented ?? false;
}

/**
 * Check if a specific consent type is allowed
 */
export function hasConsentFor(type: ConsentType): boolean {
  if (type === 'essential') return true; // Essential cookies are always allowed
  
  const state = getConsentState();
  if (!state?.hasConsented) return false;

  return state.preferences[type] ?? false;
}

/**
 * Get consent preferences
 */
export function getConsentPreferences(): ConsentPreferences | null {
  const state = getConsentState();
  return state?.preferences ?? null;
}

/**
 * Reset consent (for testing or user preference change)
 */
export function resetConsent(): void {
  if (typeof window === 'undefined') return;

  localStorage.removeItem(CONSENT_STORAGE_KEY);
  document.cookie = `${CONSENT_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  window.dispatchEvent(new CustomEvent('consent-reset'));
}





