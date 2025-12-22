import type { ViewProps } from 'react-native';

/**
 * Props for the LiquidGlassProvider component.
 * This component wraps your app content to enable backdrop capture for glass effects.
 */
export interface LiquidGlassProviderProps extends ViewProps {
  /**
   * Background color for the backdrop.
   * This color will be visible behind your content and through the glass effect.
   * @default "#FFFFFF"
   */
  backgroundColor?: string;
}

/**
 * Props for the LiquidGlassView component.
 * This component renders the actual glass effect with blur, lens refraction, and other visual effects.
 */
export interface LiquidGlassViewProps extends ViewProps {
  // Blur effect

  /**
   * Blur radius in dp (density-independent pixels).
   * Higher values create a more blurred appearance.
   * @default 10
   */
  blurRadius?: number;

  // Lens refraction (Android 13+ only, ignored on lower versions)

  /**
   * Height of the lens refraction effect in dp.
   * This creates the distinctive "liquid glass" edge distortion.
   * Only works on Android 13+ (API 33).
   * @default 16
   */
  lensHeight?: number;

  /**
   * Amount of lens refraction in dp.
   * Higher values create more pronounced edge distortion.
   * Only works on Android 13+ (API 33).
   * @default 32
   */
  lensRefractionAmount?: number;

  // Color effects

  /**
   * Enable vibrancy effect (1.5x saturation boost).
   * Makes colors behind the glass appear more vivid.
   * @default false
   */
  vibrancy?: boolean;

  /**
   * Brightness adjustment.
   * Range: -1 (darker) to 1 (brighter), 0 is no change.
   * @default 0
   */
  brightness?: number;

  /**
   * Contrast adjustment.
   * Range: 0 (no contrast) to 2 (high contrast), 1 is no change.
   * @default 1
   */
  contrast?: number;

  /**
   * Saturation adjustment.
   * Range: 0 (grayscale) to 2 (highly saturated), 1 is no change.
   * Note: If vibrancy is enabled, saturation is multiplied by 1.5 on top of this value.
   * @default 1
   */
  saturation?: number;

  // Surface overlay

  /**
   * Opacity of the surface overlay on top of the glass effect.
   * Range: 0 (fully transparent) to 1 (fully opaque).
   * @default 0.5
   */
  surfaceOpacity?: number;

  /**
   * Color of the surface overlay.
   * @default "#FFFFFF"
   */
  surfaceColor?: string;

  // Shape

  /**
   * Corner radius in dp for rounded corners.
   * @default 0
   */
  cornerRadius?: number;
}
