import { useScaling } from '../../context/ScalingContext';

/**
 * Hook to scale any numeric value based on the scaling mode.
 * 
 * @param value - The base value to scale
 * @param mode - 'text' for text scaling, 'ui' for UI scaling
 * @returns Scaled value
 * 
 * @example
 * ```tsx
 * // Scale a font size with text scaling
 * const fontSize = useScaledValue(16, 'text');
 * 
 * // Scale padding with UI scaling
 * const padding = useScaledValue(20, 'ui');
 * ```
 */
export function useScaledValue(value: number, mode: 'text' | 'ui' = 'text'): number {
    const { effectiveTextScale, effectiveUIScale } = useScaling();

    if (mode === 'text') {
        return value * effectiveTextScale;
    }

    return value * effectiveUIScale;
}
