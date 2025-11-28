import { getConfig } from '../../config/config';
import { getFontSize, FontSizeName } from '../../constants/fontSizes';
import { useTheme } from '../../context/ThemeContext';
import { useScaling } from '../../context/ScalingContext';
import { parseSkin } from '../../constants/skins';
import { TextProps } from './types';

/**
 * Resolved text configuration
 */
export interface ResolvedTextConfig {
    fontSize: number;
    color: string;
    fontWeight: string;
    fontFamily?: string;
}

/**
 * Hook to resolve all text configuration based on props and global config
 * Handles: skin resolution, parsing, size calculation, color, scaling
 */
export function useTextConfig(props: TextProps): ResolvedTextConfig {
    const { skin, size, color, ratio: instanceRatio, disableScaling } = props;

    const { colors } = useTheme();
    const { effectiveTextScale } = useScaling();
    const cfg = getConfig();
    const textCfg = cfg.text || {};

    // 1. Determine custom skin config
    const customSkinCfg = (skin && textCfg.skins && textCfg.skins[skin]) || {};

    // 2. Determine Skin Name
    // Priority: Configured baseSkin for custom skin -> skin prop (if it's a valid built-in skin) -> defaultSkin -> 'medium'
    let skinName = customSkinCfg.baseSkin;

    if (!skinName && skin) {
        // If skin is not in config, assume skin itself is a built-in skin name
        skinName = skin;
    }

    if (!skinName) {
        skinName = textCfg.defaultSkin || 'medium';
    }

    // 3. Parse Skin (Size + Weight)
    const { size: skinSize, fontWeight: skinWeight } = parseSkin(skinName);

    // 4. Determine Font Size
    // Priority: Prop size -> Override size -> Configured custom skin size -> Built-in skin size
    const skinOverrides = (skin && textCfg.overrides && textCfg.overrides[skin]) || {};

    let baseSize;
    if (size != null) {
        baseSize = size;
    } else if (skinOverrides.fontSize != null) {
        baseSize = skinOverrides.fontSize;
    } else if (customSkinCfg.fontSize != null) {
        baseSize = customSkinCfg.fontSize;
    } else {
        // Use new multiplier-based font size system
        baseSize = getFontSize(skinSize as FontSizeName);
    }

    // 5. Apply Ratio and Scaling
    const cfgRatio = textCfg.ratio != null ? textCfg.ratio : 1;
    const finalRatio = instanceRatio != null ? instanceRatio : cfgRatio;

    const scaleFactor = disableScaling ? 1 : effectiveTextScale;
    const fontSize = baseSize * finalRatio * scaleFactor;

    // 6. Determine Color
    const textColor =
        color ||
        skinOverrides.color ||
        (customSkinCfg.styles && customSkinCfg.styles.color) ||
        customSkinCfg.color ||
        textCfg.color ||
        colors.textPrimary;

    // 7. Determine Font Weight and Family
    const fontWeight = skinOverrides.fontWeight || skinWeight;
    const fontFamily = skinOverrides.fontFamily;

    return {
        fontSize,
        color: textColor,
        fontWeight,
        fontFamily,
    };
}
