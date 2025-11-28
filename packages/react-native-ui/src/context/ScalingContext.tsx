import React, { createContext, useState, useContext, useMemo, useEffect } from 'react';
import { getConfig, subscribe } from '../config/config';
import { useNativeFontScale } from '../utils/scaling/getNativeFontScale';

/**
 * Scaling configuration interface
 */
export interface ScalingContextType {
    // Current native font scale from device
    nativeFontScale: number;

    // Custom text scale multiplier
    customTextScale: number;

    // UI scale multiplier
    uiScale: number;

    // Computed effective scales
    effectiveTextScale: number;
    effectiveUIScale: number;

    // Setters
    setCustomTextScale: (scale: number) => void;
    setUIScale: (scale: number) => void;
    setTextScaleMode: (mode: 'native' | 'custom' | 'both') => void;
}

export const ScalingContext = createContext<ScalingContextType | null>(null);

/**
 * Hook to access scaling values and controls.
 * Works with or without ScalingProvider.
 */
export const useScaling = (): ScalingContextType => {
    const context = useContext(ScalingContext);
    const nativeFontScale = useNativeFontScale();

    // State for the "no-provider" mode
    const [customTextScale, setCustomTextScaleState] = useState<number>(1.0);
    const [uiScale, setUIScaleState] = useState<number>(1.0);
    const [textScaleMode, setTextScaleModeState] = useState<'native' | 'custom' | 'both'>('both');

    // Helper to get values from global config
    const getScalingConfig = () => {
        const cfg = getConfig();
        return cfg.scaling || {
            textScale: { mode: 'both', customMultiplier: 1.0, respectNative: true },
            uiScale: { enabled: true, multiplier: 1.0 }
        };
    };

    // Sync with global config if no provider
    useEffect(() => {
        if (context) return;

        const updateScaling = () => {
            const scalingCfg = getScalingConfig();
            setCustomTextScaleState(scalingCfg.textScale.customMultiplier);
            setUIScaleState(scalingCfg.uiScale.multiplier);
            setTextScaleModeState(scalingCfg.textScale.mode);
        };

        updateScaling();
        const unsubscribe = subscribe(updateScaling);
        return () => { unsubscribe(); };
    }, [context]);

    if (context) {
        return context;
    }

    // Fallback for no provider - calculate effective scales
    const calculateEffectiveTextScale = () => {
        const mode = textScaleMode;

        switch (mode) {
            case 'native':
                return nativeFontScale;
            case 'custom':
                return customTextScale;
            case 'both':
            default:
                return nativeFontScale * customTextScale;
        }
    };

    const effectiveTextScale = calculateEffectiveTextScale();
    const effectiveUIScale = uiScale;

    // Bridge setters to global config
    const handleSetCustomTextScale = (scale: number) => {
        const { setCustomTextScale: setGlobalCustomTextScale } = require('../config/config');
        setGlobalCustomTextScale(scale);
    };

    const handleSetUIScale = (scale: number) => {
        const { setUIScale: setGlobalUIScale } = require('../config/config');
        setGlobalUIScale(scale);
    };

    const handleSetTextScaleMode = (mode: 'native' | 'custom' | 'both') => {
        const { setTextScaleMode: setGlobalTextScaleMode } = require('../config/config');
        setGlobalTextScaleMode(mode);
    };

    return {
        nativeFontScale,
        customTextScale,
        uiScale,
        effectiveTextScale,
        effectiveUIScale,
        setCustomTextScale: handleSetCustomTextScale,
        setUIScale: handleSetUIScale,
        setTextScaleMode: handleSetTextScaleMode,
    };
};

interface ScalingProviderProps {
    children: React.ReactNode;
}

/**
 * Optional ScalingProvider component.
 * If not used, useScaling will work with global config.
 */
export const ScalingProvider: React.FC<ScalingProviderProps> = ({ children }) => {
    const nativeFontScale = useNativeFontScale();
    const [customTextScale, setCustomTextScaleState] = useState<number>(1.0);
    const [uiScale, setUIScaleState] = useState<number>(1.0);
    const [textScaleMode, setTextScaleModeState] = useState<'native' | 'custom' | 'both'>('both');

    // Sync with global config
    useEffect(() => {
        const updateScaling = () => {
            const cfg = getConfig();
            const scalingCfg = cfg.scaling || {
                textScale: { mode: 'both', customMultiplier: 1.0, respectNative: true },
                uiScale: { enabled: true, multiplier: 1.0 }
            };

            setCustomTextScaleState(scalingCfg.textScale.customMultiplier);
            setUIScaleState(scalingCfg.uiScale.multiplier);
            setTextScaleModeState(scalingCfg.textScale.mode);
        };

        updateScaling();
        const unsubscribe = subscribe(updateScaling);
        return () => { unsubscribe(); };
    }, []);

    // Calculate effective scales
    const calculateEffectiveTextScale = () => {
        switch (textScaleMode) {
            case 'native':
                return nativeFontScale;
            case 'custom':
                return customTextScale;
            case 'both':
            default:
                return nativeFontScale * customTextScale;
        }
    };

    const effectiveTextScale = calculateEffectiveTextScale();
    const effectiveUIScale = uiScale;

    // Bridge setters to global config
    const handleSetCustomTextScale = (scale: number) => {
        const { setCustomTextScale: setGlobalCustomTextScale } = require('../config/config');
        setGlobalCustomTextScale(scale);
    };

    const handleSetUIScale = (scale: number) => {
        const { setUIScale: setGlobalUIScale } = require('../config/config');
        setGlobalUIScale(scale);
    };

    const handleSetTextScaleMode = (mode: 'native' | 'custom' | 'both') => {
        const { setTextScaleMode: setGlobalTextScaleMode } = require('../config/config');
        setGlobalTextScaleMode(mode);
    };

    const value = useMemo(
        () => ({
            nativeFontScale,
            customTextScale,
            uiScale,
            effectiveTextScale,
            effectiveUIScale,
            setCustomTextScale: handleSetCustomTextScale,
            setUIScale: handleSetUIScale,
            setTextScaleMode: handleSetTextScaleMode,
        }),
        [nativeFontScale, customTextScale, uiScale, effectiveTextScale, effectiveUIScale]
    );

    return (
        <ScalingContext.Provider value={value}>
            {children}
        </ScalingContext.Provider>
    );
};
