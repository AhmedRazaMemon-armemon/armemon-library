import deepMerge from '../utils/layout/deepMerge';
import defaultTheme from './defaults/themeDefaults';
import defaultScaling from './defaults/scalingDefaults';
import defaultText from './defaults/textDefaults';

/**
 * ============================================================================
 * GLOBAL CONFIG STORE
 * ============================================================================
 */
let store: any = {
  ...defaultTheme,
  scaling: defaultScaling,
  text: defaultText,
};

/**
 * ============================================================================
 * SUBSCRIPTION SYSTEM
 * ============================================================================
 */
const listeners: Set<() => void> = new Set();

/**
 * Subscribe to configuration changes
 * 
 * @param listener - Callback function to call when config changes
 * @returns Unsubscribe function
 * 
 * @example
 * ```typescript
 * const unsubscribe = subscribe(() => {
 *   console.log('Config changed!', getConfig());
 * });
 * 
 * // Later...
 * unsubscribe();
 * ```
 */
export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notify() {
  listeners.forEach((l) => l());
}

/**
 * ============================================================================
 * CORE CONFIGURATION API
 * ============================================================================
 */

/**
 * Configure the library
 * Call this once in app entry (optional)
 * 
 * @param userConfig - Configuration object to merge with defaults
 * @returns Updated configuration
 * 
 * @example
 * ```typescript
 * configure({ 
 *   theme: 'dark',
 *   text: { 
 *     baseFontSize: 16,
 *     ratio: 1.2, 
 *   },
 *   scaling: {
 *     textScale: {
 *       mode: 'both',
 *       customMultiplier: 1.2
 *     }
 *   }
 * })
 * ```
 */
export function configure(userConfig: any = {}) {
  store = deepMerge(store, userConfig);
  notify();
  return store;
}

/**
 * Get the current configuration
 * 
 * @returns Current configuration object
 * 
 * @example
 * ```typescript
 * const config = getConfig();
 * console.log(config.theme);  // 'auto'
 * console.log(config.text.baseFontSize);  // 14
 * ```
 */
export function getConfig() {
  return store;
}

// Re-export helpers for convenience
export { setTheme } from './helpers/theme';

