import { TextStyle } from 'react-native';

export type SkinSize = 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large';
export type SkinWeight = 'extra-light' | 'light' | 'regular' | 'strong' | 'bold' | 'extra-bold';

const WEIGHT_MAP: Record<SkinWeight, TextStyle['fontWeight']> = {
    'extra-light': '200',
    light: '300',
    regular: '400',
    strong: '500',
    bold: '700',
    'extra-bold': '800',
};

const SIZES: SkinSize[] = ['extra-small', 'small', 'medium', 'large', 'extra-large'];
const WEIGHTS: SkinWeight[] = ['extra-light', 'light', 'regular', 'strong', 'bold', 'extra-bold'];

export interface ParsedSkin {
    size: SkinSize;
    fontWeight: TextStyle['fontWeight'];
}

/**
 * Parses a skin string (e.g., "extra-large-bold") into size and fontWeight.
 * Format: [size]-[weight] or just [size] (defaults to regular).
 */
export const parseSkin = (skin: string): ParsedSkin => {
    // 1. Try to match exact size first (NO default weight)
    if (SIZES.includes(skin as SkinSize)) {
        return { size: skin as SkinSize, fontWeight: undefined };
    }

    // 2. Try to find a known weight suffix
    for (const weight of WEIGHTS) {
        if (skin.endsWith(`-${weight}`)) {
            const sizePart = skin.slice(0, -(weight.length + 1)); // remove -weight
            if (SIZES.includes(sizePart as SkinSize)) {
                return {
                    size: sizePart as SkinSize,
                    fontWeight: WEIGHT_MAP[weight],
                };
            }
        }
    }

    // 3. Fallback
    console.warn(`[textSkins] Invalid skin format: "${skin}". Defaulting to medium.`);
    return { size: 'medium', fontWeight: undefined };
};
