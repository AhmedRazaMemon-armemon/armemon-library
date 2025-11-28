import isTablet from '../utils/layout/isTablet';
import { getConfig } from '../config/config';

/**
 * Font size multipliers relative to base size
 * These ratios are based on a modular scale for proportional sizing
 * 
 * All sizes are calculated as: baseSize × multiplier
 */
export const FONT_SIZE_MULTIPLIERS = {
    'extra-small': 0.714,  // ~10px when base is 14
    'small': 0.857,        // ~12px when base is 14
    'medium': 1.0,         // 14px when base is 14 (reference)
    'large': 1.143,        // ~16px when base is 14
    'extra-large': 1.286,  // ~18px when base is 14

    // Legacy support (optional - for backward compatibility)
    'brandTitle': 2.143,   // ~30px when base is 14
    'title': 1.857,        // ~26px when base is 14
    'subTitle': 1.429,     // ~20px when base is 14
} as const;

export type FontSizeName = keyof typeof FONT_SIZE_MULTIPLIERS;

/**
 * Get the base font size for the current device
 * Auto-detects tablet and uses larger base, or uses configured value
 * 
 * @returns Base font size in pixels
 */
export function getBaseFontSize(): number {
    const cfg = getConfig();
    const configuredBase = cfg.text?.baseFontSize;

    // Use configured base if provided
    if (configuredBase != null) {
        return configuredBase;
    }

    // Auto-detect: tablet gets larger base
    const isTab = isTablet();
    return isTab ? 16 : 14;
}

/**
 * Get font size for a specific size name
 * 
 * @param sizeName - Name of the size variant (e.g., 'medium', 'large')
 * @returns Calculated font size in pixels
 * 
 * @example
 * ```typescript
 * const mediumSize = getFontSize('medium');  // 14 on phone, 16 on tablet
 * const largeSize = getFontSize('large');    // ~16 on phone, ~18 on tablet
 * ```
 */
export function getFontSize(sizeName: FontSizeName = 'medium'): number {
    const baseSize = getBaseFontSize();
    const multiplier = FONT_SIZE_MULTIPLIERS[sizeName] || FONT_SIZE_MULTIPLIERS.medium;
    return baseSize * multiplier;
}

/**
 * Legacy export for backward compatibility
 * Now dynamically calculates based on current base
 * 
 * @example
 * ```typescript
 * const size = fontSizes.medium;  // Same as getFontSize('medium')
 * ```
 */
export const fontSizes = new Proxy({} as Record<FontSizeName, number>, {
    get: (target, prop: string) => {
        return getFontSize(prop as FontSizeName);
    }
});
