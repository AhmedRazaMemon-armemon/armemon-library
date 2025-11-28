import React from 'react';
import { Text as RNText, Pressable } from 'react-native';
import { getMarginStyles, getPaddingStyles } from '../../utils/layout/getStyles';
import { getConfig } from '../../config/config';
import { useTextConfig } from './useTextConfig';
import { TextProps } from './types';

/**
 * Text component with advanced configuration and scaling support
 * 
 * @example
 * ```tsx
 * <Text skin="large-bold">Title</Text>
 * <Text skin="medium" color="#333">Body text</Text>
 * <Text size={20} ratio={1.2}>Custom sized</Text>
 * ```
 */
const Text: React.FC<TextProps> = (props) => {
    const {
        children,
        skin,
        textStyles,
        align = 'left',
        margin,
        padding,
        onPress,
        opacity,
        numberOfLines,
        ...restProps
    } = props;

    // Get resolved configuration
    const { fontSize, color, fontWeight, fontFamily } = useTextConfig(props);

    // Get config for custom skin styles
    const cfg = getConfig();
    const textCfg = cfg.text || {};
    const customSkinCfg = (skin && textCfg.skins && textCfg.skins[skin]) || {};

    // Get margin and padding styles
    const marginStyles = getMarginStyles(margin);
    const paddingStyles = getPaddingStyles(padding);

    // Combine all styles
    const combinedStyle = [
        {
            fontSize,
            color,
            fontWeight,
            fontFamily,
            textAlign: align,
            ...marginStyles,
            ...paddingStyles,
            ...(customSkinCfg.styles || {}),
        },
        textStyles,
    ];

    // Text content
    const content = (
        <RNText style={combinedStyle} numberOfLines={numberOfLines} {...restProps}>
            {children}
        </RNText>
    );

    // Optional touchable wrapper
    if (onPress || opacity) {
        return (
            <Pressable
                style={({ pressed }) => [
                    { opacity: pressed ? (opacity != null ? opacity : 0.6) : 1 },
                ]}
                onPress={onPress}
            >
                {content}
            </Pressable>
        );
    }

    return content;
};

export default Text;
