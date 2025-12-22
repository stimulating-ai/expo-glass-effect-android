import * as React from 'react';
import type { LiquidGlassViewProps } from './ExpoLiquidGlass.types';
/**
 * LiquidGlassView renders a glass effect with blur, lens refraction, and other visual effects.
 *
 * Must be placed inside a LiquidGlassProvider to work properly.
 * Children of this component are rendered ON TOP of the glass effect.
 *
 * @example
 * ```tsx
 * <LiquidGlassView
 *   style={{ width: 200, height: 100 }}
 *   blurRadius={10}
 *   lensHeight={16}
 *   lensRefractionAmount={32}
 *   vibrancy={true}
 *   surfaceOpacity={0.5}
 *   surfaceColor="#FFFFFF"
 *   cornerRadius={20}
 * >
 *   <Text>Content on the glass</Text>
 * </LiquidGlassView>
 * ```
 */
export declare function LiquidGlassView({ blurRadius, lensHeight, lensRefractionAmount, vibrancy, brightness, contrast, saturation, surfaceOpacity, surfaceColor, cornerRadius, children, style, ...props }: LiquidGlassViewProps): React.JSX.Element;
//# sourceMappingURL=LiquidGlassView.d.ts.map