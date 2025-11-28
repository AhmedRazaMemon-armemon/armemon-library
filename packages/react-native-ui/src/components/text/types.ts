import { StyleProp, TextStyle } from 'react-native';
import { getConfig } from '../../config/config';

/**
 * All available text skin combinations
 */
export interface TextSkins {
    'extra-small': {};
    'small': {};
    'medium': {};
    'large': {};
    'extra-large': {};

    // Extra Small Variants
    'extra-small-extra-light': {};
    'extra-small-light': {};
    'extra-small-regular': {};
    'extra-small-strong': {};
    'extra-small-bold': {};
    'extra-small-extra-bold': {};

    // Small Variants
    'small-extra-light': {};
    'small-light': {};
    'small-regular': {};
    'small-strong': {};
    'small-bold': {};
    'small-extra-bold': {};

    // Medium Variants
    'medium-extra-light': {};
    'medium-light': {};
    'medium-regular': {};
    'medium-strong': {};
    'medium-bold': {};
    'medium-extra-bold': {};

    // Large Variants
    'large-extra-light': {};
    'large-light': {};
    'large-regular': {};
    'large-strong': {};
    'large-bold': {};
    'large-extra-bold': {};

    // Extra Large Variants
    'extra-large-extra-light': {};
    'extra-large-light': {};
    'extra-large-regular': {};
    'extra-large-strong': {};
    'extra-large-bold': {};
    'extra-large-extra-bold': {};
}

/**
 * Built-in skin names (const object for autocomplete)
 */
const BUILT_IN_SKINS = {
    // Base sizes
    extraSmall: 'extra-small',
    small: 'small',
    medium: 'medium',
    large: 'large',
    extraLarge: 'extra-large',

    // Extra Small Variants
    extraSmallExtraLight: 'extra-small-extra-light',
    extraSmallLight: 'extra-small-light',
    extraSmallRegular: 'extra-small-regular',
    extraSmallStrong: 'extra-small-strong',
    extraSmallBold: 'extra-small-bold',
    extraSmallExtraBold: 'extra-small-extra-bold',

    // Small Variants
    smallExtraLight: 'small-extra-light',
    smallLight: 'small-light',
    smallRegular: 'small-regular',
    smallStrong: 'small-strong',
    smallBold: 'small-bold',
    smallExtraBold: 'small-extra-bold',

    // Medium Variants
    mediumExtraLight: 'medium-extra-light',
    mediumLight: 'medium-light',
    mediumRegular: 'medium-regular',
    mediumStrong: 'medium-strong',
    mediumBold: 'medium-bold',
    mediumExtraBold: 'medium-extra-bold',

    // Large Variants
    largeExtraLight: 'large-extra-light',
    largeLight: 'large-light',
    largeRegular: 'large-regular',
    largeStrong: 'large-strong',
    largeBold: 'large-bold',
    largeExtraBold: 'large-extra-bold',

    // Extra Large Variants
    extraLargeExtraLight: 'extra-large-extra-light',
    extraLargeLight: 'extra-large-light',
    extraLargeRegular: 'extra-large-regular',
    extraLargeStrong: 'extra-large-strong',
    extraLargeBold: 'extra-large-bold',
    extraLargeExtraBold: 'extra-large-extra-bold',
} as const;

/**
 * Dynamic SKINS object that includes both built-in and custom skins
 * 
 * Built-in skins have camelCase keys for autocomplete
 * Custom skins are accessed by their string name
 * 
 * @example
 * ```tsx
 * import { SKINS } from '@armemon-library/react-native-ui';
 * 
 * // Built-in skins (autocomplete works!)
 * <Text skin={SKINS.largeBold}>Hello</Text>
 * 
 * // Custom skins (after configure)
 * <Text skin={SKINS.aaa}>Custom</Text>
 * <Text skin={SKINS.heading}>Heading</Text>
 * ```
 */
export const SKINS: typeof BUILT_IN_SKINS & { [K in keyof TextSkins]: K } & Record<string, string> = new Proxy(BUILT_IN_SKINS, {
    get(target, prop: string) {
        // First check if it's a built-in skin
        if (prop in target) {
            return target[prop as keyof typeof target];
        }

        // Then check if it's a custom skin from config
        const config = getConfig();
        const customSkins = config.text?.skins || {};

        if (prop in customSkins) {
            // Return the custom skin name as-is
            return prop;
        }

        // Not found
        return undefined;
    },

    // Allow checking if a custom skin exists
    has(target, prop: string) {
        if (prop in target) return true;

        const config = getConfig();
        const customSkins = config.text?.skins || {};
        return prop in customSkins;
    },

    // Support Object.keys() to list all available skins
    ownKeys(target) {
        const builtInKeys = Object.keys(target);
        const config = getConfig();
        const customSkins = config.text?.skins || {};
        const customKeys = Object.keys(customSkins);

        return [...builtInKeys, ...customKeys];
    },
}) as any;

/**
 * Text skin type - can be a predefined skin or custom string
 */
export type TextSkin = keyof TextSkins | (string & {});

/**
 * Props for the Text component
 */
export interface TextProps {
    /** Text content */
    children?: React.ReactNode;

    /** Skin name (e.g., 'medium-bold', 'large') or custom skin name */
    skin?: TextSkin;

    /** Override font size */
    size?: number;

    /** Text color */
    color?: string;

    /** Additional text styles */
    textStyles?: StyleProp<TextStyle>;

    /** Text alignment */
    align?: 'left' | 'center' | 'right';

    /** Font size ratio multiplier */
    ratio?: number;

    /** Margin (number, object, or string) */
    margin?: number | object | string;

    /** Padding (number, object, or string) */
    padding?: number | object | string;

    /** Press handler */
    onPress?: () => void;

    /** Opacity when pressed */
    opacity?: number;

    /** Number of lines to show */
    numberOfLines?: number;

    /** Disable scaling for this text instance */
    disableScaling?: boolean;

    /** Any other React Native Text props */
    [key: string]: any;
}
