/**
 * Design tokens for Meme Soundboard
 * Modern, dark theme inspired by Spotify/premium music apps
 */

// =============================================================================
// COLORS
// =============================================================================

export const COLORS = {
  // Background
  background: {
    primary: '#0D0D0F',
    secondary: '#141416',
    tertiary: '#1A1A1E',
    elevated: '#212126',
  },

  // Accent - subtle purple/blue tones
  accent: {
    primary: '#8B5CF6',
    secondary: '#6366F1',
    muted: 'rgba(139, 92, 246, 0.15)',
  },

  // Text
  text: {
    primary: '#FFFFFF',
    secondary: 'rgba(255, 255, 255, 0.7)',
    tertiary: 'rgba(255, 255, 255, 0.5)',
    muted: 'rgba(255, 255, 255, 0.3)',
  },

  // UI Elements
  border: 'rgba(255, 255, 255, 0.08)',
  overlay: 'rgba(0, 0, 0, 0.5)',

  // Status
  favorite: '#EF4444',
  success: '#22C55E',
} as const;

// =============================================================================
// SPACING & LAYOUT
// =============================================================================

export const LAYOUT = {
  // Screen padding
  screenPadding: 16,

  // Grid
  gridColumns: 4,
  gridGap: 10,

  // Border radius
  radiusSmall: 8,
  radiusMedium: 12,
  radiusLarge: 16,
  radiusFull: 9999,
} as const;

// =============================================================================
// TYPOGRAPHY
// =============================================================================

export const TYPOGRAPHY = {
  sizes: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 20,
    xxl: 24,
    title: 28,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    heavy: '800' as const,
  },
} as const;

// =============================================================================
// ANIMATIONS
// =============================================================================

export const ANIMATION = {
  // Press feedback
  press: {
    scale: 0.92,
    duration: 80,
  },

  // Spring configs (reanimated)
  spring: {
    gentle: { damping: 15, stiffness: 150 },
    bouncy: { damping: 10, stiffness: 200 },
    snappy: { damping: 20, stiffness: 300 },
  },

  // Timing
  duration: {
    fast: 150,
    normal: 250,
    slow: 400,
  },
} as const;

// =============================================================================
// SHADOWS
// =============================================================================

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  glow: (color: string) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 0,
  }),
} as const;

// =============================================================================
// APP CONFIG
// =============================================================================

export const CONFIG = {
  // Interstitial ad frequency
  interstitialFrequency: 10,

  // Long press delay for favorites
  longPressDelay: 400,

  // FlatList optimization
  flatList: {
    initialNumToRender: 20,
    maxToRenderPerBatch: 16,
    windowSize: 5,
  },
} as const;
