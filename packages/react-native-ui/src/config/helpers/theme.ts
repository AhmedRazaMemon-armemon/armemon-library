import { configure, getConfig } from '../config';

/**
 * Set the global theme mode
 * 
 * @param theme - 'light' | 'dark' | 'auto'
 * 
 * @example
 * ```typescript
 * setTheme('dark');  // Force dark mode
 * setTheme('auto');  // Follow system
 * ```
 */
export function setTheme(theme: 'light' | 'dark' | 'auto') {
    configure({ theme });
}
