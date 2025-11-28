// src/constants/colors.js
// Single-file, pro-grade color system (light + dark) with many text tokens and surface/feedback tokens.
// Keep this file as the single source of truth for all colors used across the app.

// import { themeColor } from "../utils/redux/getData/themeColor"; // your brand color helper (optional)

const themeColor = "#173ff5"

// -----------------------------
// LIGHT THEME
// -----------------------------
const light = {
  // TEXT (expanded)

  textShade0: "#FFFFFF",
  textShade1: "#000000",
  textShade2: "#374151",
  textShade3: "#4B5563",
  textShade4: "#6B7280",
  textShade5: "#9CA3AF",




  textPrimary: "#111827",
  textSecondary: "#374151",
  textTertiary: "#4B5563",
  textMuted: "#6B7280",
  textDisabled: "#9CA3AF",
  textInverse: "#FFFFFF",




  textHighlight: "#2563EB",
  textDanger: "#B91C1C",
  textSuccess: "#15803D",
  textWarning: "#B45309",

  // BACKGROUND
  bgPrimary: "#FFFFFF",        // main app background
  bgSecondary: "#F8FAFC",      // secondary page bg
  bgTertiary: "#F1F5F9",
  bgCard: "#F9FAFB",           // card surfaces
  bgElevated: "#EEF2FF",       // slightly elevated
  bgAccent: "#F0F7FF",         // tinted surfaces

  // SURFACES (for cards, lists)
  surfacePrimary: "#FFFFFF",
  surfaceSecondary: "#F6F9FC",
  surfaceHover: "#EEF2FF",
  surfaceMuted: "#FBFBFB",

  // BORDER / DIVIDER
  border: "#E6E9EE",
  borderMuted: "#EDEFF3",
  borderStrong: "#D1D5DB",
  borderFocus: "#3B82F6",

  // BRAND / PRIMARY (uses your themeColor variable where possible)
  primary: themeColor || "#2563EB",
  primaryHover: "#1D4ED8",
  primarySoft: "rgba(37,99,235,0.08)",

  // SEMANTIC / FEEDBACK
  success: "#16A34A",
  successSoft: "rgba(22,163,74,0.08)",
  danger: "#DC2626",
  dangerSoft: "rgba(220,38,38,0.08)",
  warning: "#F59E0B",
  warningSoft: "rgba(245,158,11,0.08)",
  info: "#0EA5E9",
  infoSoft: "rgba(14,165,233,0.08)",

  // OVERLAYS
  overlay: "rgba(0,0,0,0.32)",
  overlayStrong: "rgba(0,0,0,0.56)",

  // STATES
  disabled: "#C7CDD3",
  disabledBg: "#F4F6F8",

  // extras (for charts / badges / subtle accents)
  accent1: "#F97316",
  accent2: "#8B5CF6",
  accent3: "#06B6D4",
};

// -----------------------------
// DARK THEME
// -----------------------------
const dark = {
  // TEXT (expanded)
  textPrimary: "#F8FAFC",
  textHeading: "#F1F5F9",
  textSecondary: "#E6EEF8",
  textTertiary: "#C7D2DA",
  textMuted: "#9CA3AF",
  textDisabled: "#6B7280",
  textPlaceholder: "#6B7280",
  textInverse: "#0B0F18",
  textHighlight: "#60A5FA",
  textLink: "#60A5FA",
  textDanger: "#F87171",
  textSuccess: "#22C55E",
  textWarning: "#F59E0B",

  // BACKGROUND
  bgPrimary: "#0B0F18",
  bgSecondary: "#0F1724",
  bgTertiary: "#111827",
  bgCard: "#101826",
  bgElevated: "#152033",
  bgAccent: "#0D1B2B",

  // SURFACES
  surfacePrimary: "#0F1724",
  surfaceSecondary: "#141B2A",
  surfaceHover: "#192231",
  surfaceMuted: "#0C1116",

  // BORDER / DIVIDER
  border: "#1F2937",
  borderMuted: "#273142",
  borderStrong: "#374151",
  borderFocus: "#6366F1",

  // BRAND / PRIMARY
  primary: "#4F46E5",
  primaryHover: "#4338CA",
  primarySoft: "rgba(79,70,229,0.12)",

  // SEMANTIC / FEEDBACK
  success: "#22C55E",
  successSoft: "rgba(34,197,94,0.12)",
  danger: "#F87171",
  dangerSoft: "rgba(248,113,113,0.12)",
  warning: "#EAB308",
  warningSoft: "rgba(234,179,8,0.12)",
  info: "#38BDF8",
  infoSoft: "rgba(56,189,248,0.12)",

  // OVERLAYS
  overlay: "rgba(0,0,0,0.5)",
  overlayStrong: "rgba(0,0,0,0.8)",

  // STATES
  disabled: "#475569",
  disabledBg: "#0B141E",

  // extras
  accent1: "#FB923C",
  accent2: "#A78BFA",
  accent3: "#06B6D4",
};

// -----------------------------
// MAIN GETTER
// - Simple: getColor(key, themeMode?)
// - themeMode: optional "light" | "dark". If omitted defaults to "light".
// - Returns color string or fallback magenta for obvious missing-key error.
// -----------------------------
export type ColorKey = keyof typeof light;

export const getColor = (key: ColorKey, themeMode: 'light' | 'dark' = "light") => {
  const palette: any = themeMode === "dark" ? dark : light;
  if (!key) return palette.textPrimary; // sensible default
  if (Object.prototype.hasOwnProperty.call(palette, key)) {
    return palette[key];
  }
  // visible fallback so you spot typos in UI quickly
  // eslint-disable-next-line no-console
  console.warn(`[colors] Missing color key "${key}" for theme "${themeMode}"`);
  return "#FF00FF";
};

// -----------------------------
// OPTIONAL: export whole themes so you can inspect or merge externally
// -----------------------------
export const colorThemes = {
  light,
  dark,
};

export const lightTheme = light;
export const darkTheme = dark;

// -----------------------------
// HELPER: list of all keys (optional but handy for dev)
// -----------------------------
export const colorKeys = Object.keys({ ...light, ...dark });
