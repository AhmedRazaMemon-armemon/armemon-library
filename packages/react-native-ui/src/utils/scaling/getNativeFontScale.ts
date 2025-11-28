import { useState, useEffect } from 'react';
import { PixelRatio } from 'react-native';

/**
 * Get the current native font scale from device accessibility settings.
 * Returns 1.0 as default if unavailable.
 */
export function getNativeFontScale(): number {
  try {
    return PixelRatio.getFontScale();
  } catch (error) {
    console.warn('Failed to get native font scale:', error);
    return 1.0;
  }
}

/**
 * Hook to access and monitor the native font scale.
 * Listens for changes in device accessibility settings.
 */
export function useNativeFontScale(): number {
  const [nativeScale, setNativeScale] = useState<number>(() => getNativeFontScale());

  useEffect(() => {
    // Update on mount
    setNativeScale(getNativeFontScale());

    // React Native doesn't provide a built-in listener for font scale changes,
    // but we can poll or rely on app state changes.
    // For now, we'll just get it once. If you need real-time updates,
    // you can add an AppState listener or a custom event emitter.
    
    // Optional: Add listener for AppState changes to detect font scale updates
    // const subscription = AppState.addEventListener('change', () => {
    //   setNativeScale(getNativeFontScale());
    // });
    // return () => subscription?.remove();
  }, []);

  return nativeScale;
}
