import React, { createContext, useState, useContext, useMemo, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '../constants/colors';
import { getConfig, subscribe, setTheme as setGlobalTheme } from '../config/config';

interface ThemeContextType {
    theme: 'light' | 'dark';
    setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
    colors: any;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    const systemScheme = useColorScheme();

    // State for the "no-provider" mode
    const [globalTheme, setGlobalThemeState] = useState<'light' | 'dark'>('light');

    // Helper to calculate effective theme from global config
    const getEffectiveTheme = () => {
        const cfg = getConfig();
        const mode = cfg.theme || 'auto';
        if (mode === 'auto') {
            return systemScheme === 'dark' ? 'dark' : 'light';
        }
        return mode;
    };

    useEffect(() => {
        if (context) return;

        const updateTheme = () => {
            setGlobalThemeState(getEffectiveTheme());
        };

        updateTheme();
        const unsubscribe = subscribe(updateTheme);
        return () => { unsubscribe(); }; // Fix: Ensure void return
    }, [context, systemScheme]);

    if (context) {
        return context;
    }

    // Fallback for no provider
    const colorThemes = {
        light: lightTheme,
        dark: darkTheme,
    };

    // Bridge local setTheme to global config
    const handleSetTheme = (value: React.SetStateAction<'light' | 'dark'>) => {
        const current = globalTheme;
        const next = typeof value === 'function' ? value(current) : value;
        setGlobalTheme(next);
    };

    const handleToggleTheme = () => {
        setGlobalTheme(globalTheme === 'light' ? 'dark' : 'light');
    };

    return {
        theme: globalTheme,
        setTheme: handleSetTheme,
        colors: (colorThemes as any)[globalTheme],
        toggleTheme: handleToggleTheme,
    };
};

interface ThemeProviderProps {
    children: React.ReactNode;
    initialTheme?: 'light' | 'dark';
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, initialTheme }) => {
    const systemScheme = useColorScheme();
    const [theme, setThemeState] = useState<'light' | 'dark'>('light');

    const getEffectiveTheme = () => {
        const cfg = getConfig();
        const mode = cfg.theme || 'auto';
        if (mode === 'auto') {
            return systemScheme === 'dark' ? 'dark' : 'light';
        }
        return mode;
    };

    useEffect(() => {
        const updateTheme = () => {
            setThemeState(getEffectiveTheme());
        };
        updateTheme();
        const unsubscribe = subscribe(updateTheme);
        return () => { unsubscribe(); };
    }, [systemScheme]);

    const colorThemes = {
        light: lightTheme,
        dark: darkTheme,
    };

    const toggleTheme = () => {
        // In Provider mode, we might want to update the local state or global?
        // For now, let's keep it local to the provider or warn.
        // Ideally, toggleTheme should update the GLOBAL config if we want consistency.
        // But let's stick to the previous behavior for now.
        setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    const value = useMemo(
        () => ({
            theme,
            setTheme: setThemeState,
            colors: (colorThemes as any)[theme],
            toggleTheme,
        }),
        [theme]
    );

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};
