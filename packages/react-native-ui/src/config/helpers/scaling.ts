import { configure, getConfig } from '../config';

/**
 * Set the text scaling mode
 * 
 * @param mode - 'native' | 'custom' | 'both'
 * 
 * @example
 * ```typescript
 * setTextScaleMode('native');  // Only device scale
 * setTextScaleMode('custom');  // Only custom
 * setTextScaleMode('both');    // Combine both
 * ```
 */
export function setTextScaleMode(mode: 'native' | 'custom' | 'both') {
    const store = getConfig();
    configure({
        scaling: {
            ...store.scaling,
            textScale: {
                ...store.scaling.textScale,
                mode
            }
        }
    });
}

/**
 * Set the custom text scale multiplier
 * 
 * @param multiplier - Scale factor (0.8 - 1.5 recommended)
 * 
 * @example
 * ```typescript
 * setCustomTextScale(0.9);  // 10% smaller
 * setCustomTextScale(1.0);  // Normal
 * setCustomTextScale(1.3);  // 30% larger
 * ```
 */
export function setCustomTextScale(multiplier: number) {
    const store = getConfig();
    configure({
        scaling: {
            ...store.scaling,
            textScale: {
                ...store.scaling.textScale,
                customMultiplier: multiplier
            }
        }
    });
}

/**
 * Set the UI scale multiplier
 * 
 * @param multiplier - Scale factor (0.8 - 1.5 recommended)
 * 
 * @example
 * ```typescript
 * setUIScale(0.9);  // Compact UI
 * setUIScale(1.0);  // Normal
 * setUIScale(1.3);  // Spacious UI
 * ```
 */
export function setUIScale(multiplier: number) {
    const store = getConfig();
    configure({
        scaling: {
            ...store.scaling,
            uiScale: {
                ...store.scaling.uiScale,
                multiplier
            }
        }
    });
}
