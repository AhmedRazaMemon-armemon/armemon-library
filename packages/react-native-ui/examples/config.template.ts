/**
 * Complete Configuration Template for @armemon-library/react-native-ui
 * 
 * Copy this file to your project (e.g., src/config/uiConfig.ts)
 * Customize the values as needed, then import and call configure() in your App.tsx
 * 
 * Usage:
 * import { uiConfig } from './config/uiConfig';
 * import { configure } from '@armemon-library/react-native-ui';
 * 
 * configure(uiConfig);
 */

import { configure } from '@armemon-library/react-native-ui';

export const uiConfig = {

    // ============================================================================
    // THEME SYSTEM
    // ============================================================================
    /**
     * Theme mode for the app
     * - 'light': Always use light theme
     * - 'dark': Always use dark theme
     * - 'auto': Follow device system theme (default)
     */
    theme: 'auto' as 'light' | 'dark' | 'auto',

    // ============================================================================
    // SCALING SYSTEM
    // ============================================================================
    scaling: {

        // TEXT SCALING
        // Controls how text components scale
        textScale: {
            /**
             * Scaling mode
             * - 'native': Only respect device accessibility font scale (PixelRatio.getFontScale())
             * - 'custom': Only use customMultiplier (ignore device settings)
             * - 'both': Multiply native × custom (most flexible, default)
             */
            mode: 'both' as 'native' | 'custom' | 'both',

            /**
             * Custom scale multiplier
             * Range: 0.5 - 2.0 (recommended: 0.8 - 1.5)
             * - 1.0 = 100% (no scaling)
             * - 0.8 = 80% (smaller text)
             * - 1.5 = 150% (larger text)
             * 
             * In 'both' mode: effectiveScale = nativeScale × customMultiplier
             * Example: device 1.3 × custom 1.2 = 1.56 total
             */
            customMultiplier: 1.0,

            /**
             * Whether to respect native device font scale
             * (This is mainly for documentation - actual behavior controlled by 'mode')
             */
            respectNative: true,
        },

        // UI SCALING
        // Controls spacing, padding, margins, containers (when using useScaledValue)
        uiScale: {
            /**
             * Enable UI scaling feature
             */
            enabled: true,

            /**
             * UI scale multiplier (independent from text scaling)
             * Range: 0.5 - 2.0 (recommended: 0.8 - 1.5)
             * - 1.0 = 100% (normal spacing)
             * - 0.9 = 90% (compact layout)
             * - 1.3 = 130% (spacious layout)
             * 
             * Use with useScaledValue(20, 'ui') in your components
         * Range: 0.5 - 2.0
         * 
         * Formula: fontSize = baseSize × ratio × effectiveScale
         * 
         * Example: baseSize 14, ratio 1.1, scale 1.2 = 14 × 1.1 × 1.2 = 18.48
         */
            ratio: 1.0,

            // DEFAULT SKIN
            /**
             * Default skin used when no type is specified
             * 
             * Available skins:
             * - Sizes: 'extra-small', 'small', 'medium', 'large', 'extra-large'
             * - Weights: 'extra-light', 'light', 'regular', 'strong', 'bold', 'extra-bold'
             * - Combined: '{size}-{weight}' (e.g., 'large-bold', 'medium-regular')
             */
            defaultSkin: 'medium',

            // DEFAULT COLOR
            /**
             * Default text color (fallback if not specified in theme or props)
             * Set to undefined to always use theme color
             */
            color: undefined as string | undefined,

            // CUSTOM TYPES
            /**
             * Define custom text types with specific configurations
             * Use these to create semantic text styles (e.g., 'heading', 'caption', 'link')
             * 
             * Each type can have:
             * - skin: Which skin to use (e.g., 'large-bold')
             * - fontSize: Override the skin's font size
             * - styles: Additional React Native TextStyle properties
             */
            types: {
                // Example: Page heading
                heading: {
                    skin: 'extra-large-bold',
                    styles: {
                        letterSpacing: 0.5,
                        lineHeight: 32,
                    },
                },

                // Example: Section title
                title: {
                    skin: 'large-bold',
                    styles: {
                        letterSpacing: 0.3,
                    },
                },

                // Example: Subtitle
                subtitle: {
                    skin: 'medium-regular',
                    styles: {
                        opacity: 0.8,
                    },
                },

                // Example: Body text
                body: {
                    skin: 'medium-regular',
                    styles: {
                        lineHeight: 22,
                    },
                },

                // Example: Caption/helper text
                caption: {
                    skin: 'small-light',
                    styles: {
                        opacity: 0.6,
                        letterSpacing: 0.2,
                    },
                },

                // Example: Button text
                button: {
                    skin: 'medium-bold',
                    styles: {
                        textTransform: 'uppercase',
                        letterSpacing: 1,
                    },
                },

                // Example: Link
                link: {
                    skin: 'medium-regular',
                    styles: {
                        textDecorationLine: 'underline',
                    },
                },

                // Example: Brand/logo text
                brand: {
                    fontSize: 28, // Override with specific size
                    styles: {
                        fontWeight: '900',
                        letterSpacing: 2,
                    },
                },

                // Example: Error message
                error: {
                    skin: 'small-bold',
                    styles: {
                        // Color can be set here or in overrides
                    },
                },

                // Add more custom types as needed...
            },

            // STYLE OVERRIDES
            /**
             * Override styles for specific skins or custom types
             * This allows you to customize built-in skins or add custom fonts
             * 
             * Properties you can override:
             * - fontSize: number
             * - fontWeight: '100' | '200' | ... | '900' | 'normal' | 'bold'
             * - fontFamily: string (your custom font)
             * - color: string
             * - Any other React Native TextStyle property
             */
            overrides: {
                // Override built-in skins
                'large-bold': {
                    fontSize: 20,
                    fontWeight: '700',
                    fontFamily: 'CustomFont-Bold', // Your custom font
                },

                'medium-regular': {
                    fontFamily: 'CustomFont-Regular',
                },

                'small-light': {
                    fontFamily: 'CustomFont-Light',
                    fontSize: 11,
                },

                // Override custom types (alternative to defining styles in types)
                'heading': {
                    color: '#1a1a1a', // Dark text for headings
                    fontFamily: 'CustomFont-ExtraBold',
                },

                'error': {
                    color: '#ef4444', // Red for errors
                },

                'link': {
                    color: '#3b82f6', // Blue for links
                },

                // Add more overrides as needed...
            },
        },
    };

    /**
     * ============================================================================
     * USAGE EXAMPLES
     * ============================================================================
     */

    // Example 1: Basic setup in App.tsx
    /*
    import { configure } from '@armemon-library/react-native-ui';
    import { uiConfig } from './config/uiConfig';
    
    function App() {
      // Configure once on app start
      configure(uiConfig);
      
      return <YourApp />;
    }
    */

    // Example 2: Using custom types
    /*
    import { Text } from '@armemon-library/react-native-ui';
    
    function MyComponent() {
      return (
        <View>
          <Text type="heading">Page Title</Text>
          <Text type="subtitle">Section subtitle</Text>
          <Text type="body">Regular body text</Text>
          <Text type="caption">Small helper text</Text>
          <Text type="link" onPress={handlePress}>Click me</Text>
        </View>
      );
    }
    */

    // Example 3: Runtime configuration changes
    /*
    import { setTheme, setCustomTextScale, setUIScale } from '@armemon-library/react-native-ui';
    
    function SettingsScreen() {
      return (
        <View>
          {// Theme controls //}
          <Button title="Dark" onPress={() => setTheme('dark')} />
          <Button title="Light" onPress={() => setTheme('light')} />
          <Button title="Auto" onPress={() => setTheme('auto')} />
          
          {// Text scale controls //}
          <Button title="Small Text" onPress={() => setCustomTextScale(0.9)} />
          <Button title="Normal Text" onPress={() => setCustomTextScale(1.0)} />
          <Button title="Large Text" onPress={() => setCustomTextScale(1.3)} />
          
          {// UI scale controls //}
          <Button title="Compact UI" onPress={() => setUIScale(0.9)} />
          <Button title="Normal UI" onPress={() => setUIScale(1.0)} />
          <Button title="Spacious UI" onPress={() => setUIScale(1.2)} />
        </View>
      );
    }
    */

    // Example 4: Override specific props at component level
    /*
    <Text 
      type="heading"           // Use custom type
      size={24}                // Override font size
      color="#ff0000"          // Override color
      ratio={1.2}              // Override ratio
      disableScaling           // Ignore all scaling
      textStyles={{ fontStyle: 'italic' }}  // Additional styles
    >
      Custom Text
    </Text>
    */

    /**
     * ============================================================================
     * MINIMAL CONFIGURATION EXAMPLE
     * ============================================================================
     * If you don't need all these options, here's a minimal config:
     */

    export const minimalConfig = {
        theme: 'auto',
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
    };

    /**
     * ============================================================================
     * HELPFUL PRESETS
     * ============================================================================
     */

    // Preset: Accessibility-first (respect device, no custom scaling)
    export const accessibilityConfig = {
        theme: 'auto',
        scaling: {
            textScale: {
                mode: 'native',  // Only device scale
                customMultiplier: 1.0,
            },
            uiScale: {
                enabled: false,
                multiplier: 1.0,
            },
        },
    };

    // Preset: Custom control only (for games, design tools)
    export const customControlConfig = {
        theme: 'light',
        scaling: {
            textScale: {
                mode: 'custom',  // Ignore device
                customMultiplier: 1.0,
            },
            uiScale: {
                enabled: true,
                multiplier: 1.0,
            },
        },
    };

    // Preset: Large text for seniors
    export const seniorFriendlyConfig = {
        theme: 'auto',
        scaling: {
            textScale: {
                mode: 'both',
                customMultiplier: 1.3,  // 30% larger by default
            },
            uiScale: {
                enabled: true,
                multiplier: 1.2,  // More spacious UI
            },
        },
        text: {
            defaultSkin: 'medium-bold',  // Bolder by default
        },
    };

    /**
             * Properties you can override:
             * - fontSize: number
             * - fontWeight: '100' | '200' | ... | '900' | 'normal' | 'bold'
             * - fontFamily: string (your custom font)
             * - color: string
             * - Any other React Native TextStyle property
             */
    overrides: {
        // Override built-in skins
        'large-bold': {
            fontSize: 20,
            fontWeight: '700',
            fontFamily: 'CustomFont-Bold', // Your custom font
        },

        'medium-regular': {
            fontFamily: 'CustomFont-Regular',
        },

        'small-light': {
            fontFamily: 'CustomFont-Light',
            fontSize: 11,
        },

        // Override custom types (alternative to defining styles in types)
        'heading': {
            color: '#1a1a1a', // Dark text for headings
            fontFamily: 'CustomFont-ExtraBold',
        },

        'error': {
            color: '#ef4444', // Red for errors
        },

        'link': {
            color: '#3b82f6', // Blue for links
        },

        // Add more overrides as needed...
    },
},
    };

/**
 * ============================================================================
 * USAGE EXAMPLES
 * ============================================================================
 */

// Example 1: Basic setup in App.tsx
/*
import { configure } from '@armemon-library/react-native-ui';
import { uiConfig } from './config/uiConfig';
 
function App() {
  // Configure once on app start
  configure(uiConfig);
  
  return <YourApp />;
}
*/

// Example 2: Using custom types
/*
import { Text } from '@armemon-library/react-native-ui';
 
function MyComponent() {
  return (
    <View>
      <Text type="heading">Page Title</Text>
      <Text type="subtitle">Section subtitle</Text>
      <Text type="body">Regular body text</Text>
      <Text type="caption">Small helper text</Text>
      <Text type="link" onPress={handlePress}>Click me</Text>
    </View>
  );
}
*/

// Example 3: Runtime configuration changes
/*
import { setTheme, setCustomTextScale, setUIScale } from '@armemon-library/react-native-ui';
 
function SettingsScreen() {
  return (
    <View>
      {// Theme controls //}
      <Button title="Dark" onPress={() => setTheme('dark')} />
      <Button title="Light" onPress={() => setTheme('light')} />
      <Button title="Auto" onPress={() => setTheme('auto')} />
      
      {// Text scale controls //}
      <Button title="Small Text" onPress={() => setCustomTextScale(0.9)} />
      <Button title="Normal Text" onPress={() => setCustomTextScale(1.0)} />
      <Button title="Large Text" onPress={() => setCustomTextScale(1.3)} />
      
      {// UI scale controls //}
      <Button title="Compact UI" onPress={() => setUIScale(0.9)} />
      <Button title="Normal UI" onPress={() => setUIScale(1.0)} />
      <Button title="Spacious UI" onPress={() => setUIScale(1.2)} />
    </View>
  );
}
*/

// Example 4: Override specific props at component level
/*
<Text 
  type="heading"           // Use custom type
  size={24}                // Override font size
  color="#ff0000"          // Override color
  ratio={1.2}              // Override ratio
  disableScaling           // Ignore all scaling
  textStyles={{ fontStyle: 'italic' }}  // Additional styles
>
  Custom Text
</Text>
*/

/**
 * ============================================================================
 * MINIMAL CONFIGURATION EXAMPLE
 * ============================================================================
 * If you don't need all these options, here's a minimal config:
 */

export const minimalConfig = {
    theme: 'auto',
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
};

/**
 * ============================================================================
 * HELPFUL PRESETS
 * ============================================================================
 */

// Preset: Accessibility-first (respect device, no custom scaling)
export const accessibilityConfig = {
    theme: 'auto',
    scaling: {
        textScale: {
            mode: 'native',  // Only device scale
            customMultiplier: 1.0,
        },
        uiScale: {
            enabled: false,
            multiplier: 1.0,
        },
    },
};

// Preset: Custom control only (for games, design tools)
export const customControlConfig = {
    theme: 'light',
    scaling: {
        textScale: {
            mode: 'custom',  // Ignore device
            customMultiplier: 1.0,
        },
        uiScale: {
            enabled: true,
            multiplier: 1.0,
        },
    },
};

// Preset: Large text for seniors
export const seniorFriendlyConfig = {
    theme: 'auto',
    scaling: {
        textScale: {
            mode: 'both',
            customMultiplier: 1.3,  // 30% larger by default
        },
        uiScale: {
            enabled: true,
            multiplier: 1.2,  // More spacious UI
        },
    },
    text: {
        defaultSkin: 'medium-bold',  // Bolder by default
    },
};

/**
 * ============================================================================
 * DEFAULT VALUES (if you don't call configure)
 * ============================================================================
 */
export const defaultLibraryConfig = {
    theme: 'auto',
    scaling: {
        textScale: {
            mode: 'both',
            customMultiplier: 1.0,
            respectNative: true,
        },
        uiScale: {
            enabled: true,
            multiplier: 1.0,
        },
    },
    text: {
        baseFontSize: undefined,  // Auto-detect
        ratio: 1.0,
        defaultSkin: 'medium',
        color: undefined,
        types: {},
        overrides: {},
    },
};
