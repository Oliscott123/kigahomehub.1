export function sendTestEvent() {
  const GA_ID = import.meta.env.VITE_GA_ID;
  const PLAUSIBLE = import.meta.env.VITE_PLAUSIBLE_DOMAIN;
  const results = { ga: false, plausible: false };

  try {
    if (GA_ID && typeof window.gtag === 'function') {
      window.gtag('event', 'test_event', { event_category: 'diagnostic', event_label: 'frontend_test' });
      results.ga = true;
    }
  } catch (e) {
    // ignore
  }

  try {
    if (PLAUSIBLE && typeof window.plausible === 'function') {
      // plausible event name should be a single word
      window.plausible('TestEvent');
      results.plausible = true;
    }
  } catch (e) {
    // ignore
  }

  return results;
}
