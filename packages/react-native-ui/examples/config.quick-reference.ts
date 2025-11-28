/**
 * QUICK REFERENCE: Configure Options
 * Copy-paste ready examples for common scenarios
 */

import { configure } from '@armemon-library/react-native-ui';

// ============================================================================
// 1. MINIMAL SETUP (recommended starting point)
// ============================================================================
configure({
    theme: 'auto',  // 'light' | 'dark' | 'auto'
});

// ============================================================================
// 2. WITH TEXT SCALING
// ============================================================================
configure({
    theme: 'auto',
    scaling: {
        textScale: {
            mode: 'both',           // 'native' | 'custom' | 'both'
            customMultiplier: 1.0,  // 0.8 to 1.5 recommended
        },
    },
});

// ============================================================================
// 3. WITH UI SCALING
// ============================================================================
configure({
    scaling: {
        textScale: {
            mode: 'both',
            customMultiplier: 1.0,
        },
        uiScale: {
            enabled: true,
            multiplier: 1.0,  // 0.8 to 1.5 recommended
        },
    },
});

// ============================================================================
// 4. WITH CUSTOM TEXT TYPES
// ============================================================================
configure({
    text: {
        types: {
            heading: {
                skin: 'extra-large-bold',
                styles: { letterSpacing: 0.5 },
            },
            body: {
                skin: 'medium-regular',
                styles: { lineHeight: 22 },
            },
            caption: {
                skin: 'small-light',
                styles: { opacity: 0.6 },
            },
        },
    },
});

// Usage: <Text type="heading">Title</Text>

// ============================================================================
// 5. WITH CUSTOM FONTS
// ============================================================================
configure({
    text: {
        overrides: {
            'large-bold': {
                fontFamily: 'MyCustomFont-Bold',
                fontSize: 20,
            },
            'medium-regular': {
                fontFamily: 'MyCustomFont-Regular',
            },
        },
    },
});

// ============================================================================
// 6. COMPLETE EXAMPLE (everything together)
// ============================================================================
configure({
    // Theme
    theme: 'auto',

    // Scaling
    scaling: {
        textScale: {
            mode: 'both',
            customMultiplier: 1.0,
        },
        uiScale: {
            enabled: true,
            multiplier: 1.0,
        },
    },

    // Typography
    text: {
        ratio: 1.0,
        defaultSkin: 'medium',

        // Custom types
        types: {
            heading: { skin: 'extra-large-bold' },
            title: { skin: 'large-bold' },
            body: { skin: 'medium-regular' },
            caption: { skin: 'small-light' },
        },

        // Font overrides
        overrides: {
            'large-bold': {
                fontFamily: 'CustomFont-Bold',
                fontSize: 20,
            },
            'medium-regular': {
                fontFamily: 'CustomFont-Regular',
            },
        },
    },
});

// ============================================================================
// RUNTIME CHANGES (after configure)
// ============================================================================
import {
    setTheme,
    setCustomTextScale,
    setUIScale,
    setTextScaleMode
} from '@armemon-library/react-native-ui';

// Change theme
setTheme('dark');        // 'light' | 'dark' | 'auto'

// Change text scale
setCustomTextScale(1.2); // 20% larger text

// Change UI scale
setUIScale(1.3);         // 30% more spacious UI

// Change scaling mode
setTextScaleMode('custom'); // 'native' | 'custom' | 'both'

// ============================================================================
// READING CURRENT VALUES
// ============================================================================
import { useScaling, useTheme, getConfig } from '@armemon-library/react-native-ui';

function MyComponent() {
    // Get scaling values
    const {
        nativeFontScale,      // Device scale (e.g., 1.3)
        customTextScale,      // Your custom scale (e.g., 1.2)
        effectiveTextScale,   // Final scale (e.g., 1.56)
        effectiveUIScale,     // UI scale (e.g., 1.0)
    } = useScaling();

    // Get theme values
    const { theme, colors } = useTheme();

    // Get entire config
    const config = getConfig();

    return <Text>Scale: { effectiveTextScale } </Text>;
}
