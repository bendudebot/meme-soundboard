/**
 * Design tokens for Meme Soundboard
 * Apple Glassmorphism - iOS Control Center / visionOS inspired
 */

// =============================================================================
// COLORS
// =============================================================================

export const COLORS = {
  // Background - Deep dark with subtle blue undertone
  background: {
    primary: '#000000',
    secondary: '#0A0A0C',
    gradient: ['#0A0A0C', '#141418', '#0A0A0C'] as const,
  },

  // Glass surfaces
  glass: {
    light: 'rgba(255, 255, 255, 0.08)',
    medium: 'rgba(255, 255, 255, 0.12)',
    strong: 'rgba(255, 255, 255, 0.18)',
    border: 'rgba(255, 255, 255, 0.1)',
    borderLight: 'rgba(255, 255, 255, 0.06)',
  },

  // Accent colors - subtle, desaturated
  accent: {
    primary: 'rgba(139, 92, 246, 0.9)',      // Purple
    secondary: 'rgba(99, 102, 241, 0.9)',    // Indigo
    blue: 'rgba(59, 130, 246, 0.9)',
    cyan: 'rgba(6, 182, 212, 0.9)',
    green: 'rgba(34, 197, 94, 0.9)',
    amber: 'rgba(245, 158, 11, 0.9)',
    rose: 'rgba(244, 63, 94, 0.9)',
    pink: 'rgba(236, 72, 153, 0.9)',
  },

  // Text
  text: {
    primary: 'rgba(255, 255, 255, 0.95)',
    secondary: 'rgba(255, 255, 255, 0.7)',
    tertiary: 'rgba(255, 255, 255, 0.5)',
    muted: 'rgba(255, 255, 255, 0.3)',
  },

  // Status
  favorite: '#FF375F',
  success: '#30D158',
} as const;

// =============================================================================
// GLASS EFFECT STYLES
// =============================================================================

export const GLASS = {
  // Standard glass card
  card: {
    backgroundColor: COLORS.glass.light,
    borderWidth: 1,
    borderColor: COLORS.glass.border,
  },

  // Elevated glass (more prominent)
  elevated: {
    backgroundColor: COLORS.glass.medium,
    borderWidth: 1,
    borderColor: COLORS.glass.border,
  },

  // Subtle glass (less prominent)
  subtle: {
    backgroundColor: COLORS.glass.light,
    borderWidth: 0.5,
    borderColor: COLORS.glass.borderLight,
  },

  // Active/selected state
  active: {
    backgroundColor: COLORS.glass.strong,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
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

  // Border radius - generous for glass effect
  radiusSmall: 10,
  radiusMedium: 16,
  radiusLarge: 20,
  radiusXL: 24,
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
    title: 32,
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
  // Press feedback - subtle for glass
  press: {
    scale: 0.94,
    duration: 100,
  },

  // Spring configs (reanimated)
  spring: {
    gentle: { damping: 20, stiffness: 180 },
    bouncy: { damping: 12, stiffness: 200 },
    snappy: { damping: 20, stiffness: 400 },
  },

  // Timing
  duration: {
    fast: 150,
    normal: 250,
    slow: 400,
  },
} as const;

// =============================================================================
// SHADOWS - Very soft for glass
// =============================================================================

export const SHADOWS = {
  soft: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 8,
  },
  glow: (color: string, opacity = 0.4) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: opacity,
    shadowRadius: 16,
    elevation: 0,
  }),
} as const;

// =============================================================================
// BLUR INTENSITIES
// =============================================================================

export const BLUR = {
  light: 20,
  medium: 40,
  strong: 80,
} as const;

// =============================================================================
// SOUND BUTTON ACCENT COLORS (subtle tints for glass)
// =============================================================================

export const SOUND_TINTS = {
  purple: 'rgba(139, 92, 246, 0.25)',
  blue: 'rgba(59, 130, 246, 0.25)',
  cyan: 'rgba(6, 182, 212, 0.25)',
  green: 'rgba(34, 197, 94, 0.25)',
  amber: 'rgba(245, 158, 11, 0.25)',
  orange: 'rgba(249, 115, 22, 0.25)',
  rose: 'rgba(244, 63, 94, 0.25)',
  pink: 'rgba(236, 72, 153, 0.25)',
  slate: 'rgba(100, 116, 139, 0.25)',
  violet: 'rgba(139, 92, 246, 0.25)',
} as const;

export type SoundTint = keyof typeof SOUND_TINTS;

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
