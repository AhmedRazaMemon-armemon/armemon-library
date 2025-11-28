/**
 * Default scaling configuration
 */
export default {
    textScale: {
        mode: 'both' as 'native' | 'custom' | 'both',
        customMultiplier: 1.0,
        respectNative: true,
    },
    uiScale: {
        enabled: true,
        multiplier: 1.0,
    },
};
